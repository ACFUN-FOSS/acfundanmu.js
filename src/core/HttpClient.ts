import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import http from 'http';
import https from 'https';
import dns from 'dns';
import fs from 'fs';
import { ApiConfig, ApiResponse, TokenInfo } from '../types';
import { SignUtils } from './SignUtils';

// 扩展AxiosRequestConfig以支持sign参数
export interface SignedAxiosRequestConfig extends AxiosRequestConfig {
  sign?: boolean;
}

export class HttpClient {
  private client: AxiosInstance;
  private config: ApiConfig;

  constructor(config?: ApiConfig) {
    this.config = config || {};
    const preferIPv4 = this.config.preferIPv4 ?? true;
    if ((dns as any).setDefaultResultOrder && preferIPv4) {
      (dns as any).setDefaultResultOrder('ipv4first');
    }

    let ca: Buffer | undefined;
    const caPath = this.config.caPath || process.env.ACFUN_CA_FILE || process.env.NODE_EXTRA_CA_CERTS;
    if (caPath) {
      try {
        ca = fs.readFileSync(caPath);
      } catch {}
    }

    const httpsAgent = new https.Agent({
      keepAlive: true,
      maxSockets: 50,
      timeout: 30000,
      ca,
      minVersion: this.config.minTlsVersion || 'TLSv1.2',
      maxVersion: 'TLSv1.3',
    });

    const httpAgent = new http.Agent({
      keepAlive: true,
      maxSockets: 50,
      timeout: 30000,
    });

    let proxy: any = undefined;
    if (this.config.proxy) {
      proxy = this.config.proxy;
    } else {
      const proxyEnv = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
      if (proxyEnv) {
        try {
          const u = new URL(proxyEnv);
          proxy = {
            protocol: (u.protocol || 'http:').replace(':', ''),
            host: u.hostname,
            port: parseInt(u.port || (u.protocol === 'https:' ? '443' : '80'), 10),
            auth: u.username ? { username: u.username, password: u.password || '' } : undefined,
          };
        } catch {}
      }
    }

    this.client = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout || 10000,
      headers: this.config.headers || {},
      httpAgent,
      httpsAgent,
      proxy,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // 请求拦截器
    this.client.interceptors.request.use(
      (config) => {
        // 自动添加认证token
        const authHeader = this.getAuthHeader();
        if (authHeader) {
          config.headers.Authorization = authHeader;
        }
        
        // 添加默认请求头
        if (!config.headers.Referer) {
          config.headers.Referer = 'https://www.acfun.cn/';
        }
        if (!config.headers['User-Agent']) {
          config.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
        }
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error) => {
        const config: any = error?.config || {};
        const message: string = error?.message || '';
        const code: string = error?.code || '';
        const maxRetries = typeof this.config.retryCount === 'number' ? this.config.retryCount : 3;
        const current = config.__retryCount || 0;
        
        // Determine if we should retry
        // Retry on:
        // 1. Network errors (no response)
        // 2. Server errors (5xx)
        // 3. Rate limiting (429)
        // 4. Specific connection errors (original logic)
        const isNetworkError = !error.response;
        const isServerError = error.response && (error.response.status >= 500 || error.response.status === 429);
        const isConnectionError = code === 'ECONNRESET' || 
                                 code === 'EPROTO' || 
                                 code === 'ETIMEDOUT' ||
                                 code?.startsWith('ERR_SSL') || 
                                 message?.includes('disconnected before secure TLS connection');

        const shouldRetry = current < maxRetries && (isNetworkError || isServerError || isConnectionError);
        
        if (shouldRetry) {
          config.__retryCount = current + 1;
          const base = 300;
          const wait = Math.min(Math.floor(base * Math.pow(1.8, current)), 2000); // Cap wait time at 2s
          await new Promise((r) => setTimeout(r, wait));
          return this.client.request(config);
        }
        return Promise.reject(error);
      }
    );
  }

  private getFullUrl(url: string): string {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `${this.config.baseUrl || ''}${url}`;
  }

  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const fullUrl = this.getFullUrl(url);
      const response = await this.client.get(fullUrl, config);
      return {
        success: true,
        data: response.data,
        headers: response.headers,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async post<T = any>(url: string, data?: any, config?: SignedAxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const fullUrl = this.getFullUrl(url);
      // 如果需要签名，生成签名并获取更新后的配置
      let finalConfig = config || {};
      let requestData = data;
      
      if (config?.sign) {
        finalConfig = await this.addSignatureToRequest(fullUrl, data, config);
        // 使用finalConfig中的data（包含签名）
        requestData = finalConfig.data;
      }
      
      const response = await this.client.post(fullUrl, requestData, finalConfig);
      return {
        success: true,
        data: response.data,
        headers: response.headers,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const fullUrl = this.getFullUrl(url);
      const response = await this.client.put(fullUrl, data, config);
      return {
        success: true,
        data: response.data,
        headers: response.headers,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const fullUrl = this.getFullUrl(url);
      const response = await this.client.delete(fullUrl, config);
      return {
        success: true,
        data: response.data,
        headers: response.headers,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: any): ApiResponse {
    // TODO: 实现详细的错误处理逻辑
    return {
      success: false,
      error: error.message || '请求失败',
      code: error.response?.status || 500,
    };
  }

  public setHeader(key: string, value: string): void {
    this.client.defaults.headers.common[key] = value;
  }

  public removeHeader(key: string): void {
    delete this.client.defaults.headers.common[key];
  }

  /**
   * 获取认证头
   */
  public getAuthHeader(): string | null {
    const headers = this.client.defaults.headers.common;
    const authHeader = headers.Authorization;
    
    // 确保返回的是字符串类型
    if (typeof authHeader === 'string') {
      return authHeader;
    } else if (authHeader === null || authHeader === undefined) {
      return null;
    } else {
      // 如果是其他类型，转换为字符串
      return String(authHeader);
    }
  }

  /**
   * 解析token字符串
   */
  public parseToken(token: string): TokenInfo {
    try {
      return JSON.parse(token) as TokenInfo;
    } catch (error) {
      throw new Error('token格式无效，无法解析');
    }
  }

  /**
   * 构建请求头
   */
  public buildHeaders(tokenInfo: TokenInfo): Record<string, string> {
    const headers: Record<string, string> = {
      'Referer': 'https://www.acfun.cn/',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    };

    // 添加Cookie
    if (tokenInfo.cookies && tokenInfo.cookies.length > 0) {
      headers['Cookie'] = tokenInfo.cookies.join('; ');
    } else {
      // 游客用户需要设置_did cookie
      headers['Cookie'] = `_did=${tokenInfo.deviceID}`;
    }

    return headers;
  }

  /**
   * 从认证头中解析token信息
   */
  public parseTokenFromAuthHeader(): TokenInfo | null {
    const authHeader = this.getAuthHeader();
    if (!authHeader) {
      return null;
    }
    
    // 现在Authorization头直接是JSON字符串，不需要Bearer前缀验证
    const token = authHeader;
    return this.parseToken(token);
  }

  /**
   * 验证token信息是否完整
   */
  public validateTokenInfo(tokenInfo: TokenInfo): string | null {
    if (!tokenInfo || !tokenInfo.userID || !tokenInfo.serviceToken || !tokenInfo.deviceID) {
      return 'token信息不完整，缺少必要的字段';
    }
    return null;
  }

  /**
   * 获取并验证token信息
   */
  public getValidatedTokenInfo(): { tokenInfo: TokenInfo | null; error: string | null } {
    const tokenInfo = this.parseTokenFromAuthHeader();
    if (!tokenInfo) {
      return { tokenInfo: null, error: '缺少认证token，请先调用setAuthToken方法设置token' };
    }
    
    const validationError = this.validateTokenInfo(tokenInfo);
    if (validationError) {
      return { tokenInfo: null, error: validationError };
    }
    
    return { tokenInfo, error: null };
  }

  /**
   * 为请求添加签名
   */
  private async addSignatureToRequest(url: string, data: any, config: SignedAxiosRequestConfig): Promise<SignedAxiosRequestConfig> {
    try {
      // 获取token信息
      const { tokenInfo, error } = this.getValidatedTokenInfo();
      if (error || !tokenInfo) {
        throw new Error(`无法获取token信息: ${error}`);
      }

      // 检查是否有securityKey
      if (!tokenInfo.securityKey) {
        throw new Error('token信息中缺少securityKey，无法生成签名');
      }

      // 将data转换为URLSearchParams格式，用于生成签名
      let formDataForSign: URLSearchParams = new URLSearchParams();
      
      if (typeof data === 'string') {
        formDataForSign = new URLSearchParams(data);
      } else if (data instanceof URLSearchParams) {
        formDataForSign = new URLSearchParams(data); // 创建副本，避免修改原数据
      } else if (data && typeof data === 'object') {
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null && key !== '__clientSign') {
            formDataForSign.append(key, String(value));
          }
        });
      }

      // 生成签名 - 使用不包含__clientSign的formData
      const clientSign = SignUtils.generateClientSign({
        url,
        formData: formDataForSign,
        securityKey: tokenInfo.securityKey
      });

      // 创建包含签名的最终数据
      let finalData;
      
      if (typeof data === 'string') {
        // 如果是字符串，解析后添加签名
        const params = new URLSearchParams(data);
        params.append('__clientSign', clientSign);
        finalData = params.toString();
      } else if (data instanceof URLSearchParams) {
        // 如果是URLSearchParams，创建副本后添加签名
        finalData = new URLSearchParams(data);
        finalData.append('__clientSign', clientSign);
      } else if (data && typeof data === 'object') {
        // 如果是对象，创建新对象并添加签名
        finalData = { ...data, __clientSign: clientSign };
      } else {
        // 如果没有数据，创建只包含签名的对象
        finalData = { __clientSign: clientSign };
      }
      
      // 返回更新后的配置
      return {
        ...config,
        data: finalData
      };
      
    } catch (error) {
      throw new Error(`添加签名失败: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
