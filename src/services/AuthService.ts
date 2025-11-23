import { HttpClient } from '../core/HttpClient';
import { ApiResponse, AuthResponse, QRCodeLoginResponse, TokenInfo } from '../types';
import { apiGet, apiPost, apiGetWithoutAuth, apiPostWithoutAuth } from '../core/ApiUtils';

export class AuthService {
  private httpClient: HttpClient;
  private qrLoginToken: string | null = null;
  private qrLoginSignature: string | null = null;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * 获取设备ID
   */
  private getDeviceId(): string {
    // 生成随机设备ID，格式为32位十六进制字符串
    const chars = '0123456789abcdef';
    let deviceId = '';
    for (let i = 0; i < 32; i++) {
      deviceId += chars[Math.floor(Math.random() * chars.length)];
    }
    return deviceId;
  }

  /**
   * 二维码登录 - 获取登录二维码
   */
  public async qrLogin(): Promise<ApiResponse<QRCodeLoginResponse>> {
    try {
      const timestamp = Date.now();
      const url = `https://scan.acfun.cn/rest/pc-direct/qr/start?type=WEB_LOGIN&_=${timestamp}`;
      
      // 使用无需认证的GET请求函数
      const response = await apiGetWithoutAuth<any>(this.httpClient, url, '获取登录二维码');
      
      if (!response.success || !response.data) {
        return {
          success: false,
          error: `获取登录二维码失败，响应为 ${JSON.stringify(response)}`
        };
      }

      const data = response.data;
      
      // 二维码登录API可能没有result字段，直接检查必要的字段是否存在
      // 如果API返回错误信息，直接返回错误
      if (data.error_msg || data.error) {
        return {
          success: false,
          error: `获取登录二维码失败: ${data.error_msg || data.error}`,
          code: data.result
        };
      }

      const expireTime = data.expireTime;
      if (!expireTime || expireTime <= 0) {
        return {
          success: false,
          error: `获取登录二维码失效时间失败，响应为 ${JSON.stringify(data)}`
        };
      }

      const qrLoginSignature = data.qrLoginSignature;
      if (!qrLoginSignature) {
        return {
          success: false,
          error: `获取qrLoginSignature失败，响应为 ${JSON.stringify(data)}`
        };
      }

      const imageData = data.imageData;
      if (!imageData) {
        return {
          success: false,
          error: `获取imageData失败，响应为 ${JSON.stringify(data)}`
        };
      }

      const qrLoginToken = data.qrLoginToken;
      if (!qrLoginToken) {
        return {
          success: false,
          error: `获取qrLoginToken失败，响应为 ${JSON.stringify(data)}`
        };
      }

      // 保存二维码登录相关信息
      this.qrLoginToken = qrLoginToken;
      this.qrLoginSignature = qrLoginSignature;

      return {
        success: true,
        data: {
          qrCode: imageData,
          expiresIn: expireTime,
          qrLoginToken,
          qrLoginSignature
        }
      };
    } catch (error) {
      return {
        success: false,
        error: `二维码登录请求失败: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  /**
   * 检查二维码登录状态
   */
  public async checkQrLoginStatus(): Promise<ApiResponse<AuthResponse>> {
    if (!this.qrLoginToken || !this.qrLoginSignature) {
      return {
        success: false,
        error: '请先调用qrLogin获取二维码'
      };
    }

    try {
      const timestamp = Date.now();
      const url = `https://scan.acfun.cn/rest/pc-direct/qr/scanResult?qrLoginToken=${this.qrLoginToken}&qrLoginSignature=${this.qrLoginSignature}&_=${timestamp}`;
      
      // 使用无需认证的GET请求函数
      const response = await apiGetWithoutAuth<any>(this.httpClient, url, '检查二维码登录状态');
      
      if (!response.success) {
        return response as ApiResponse<AuthResponse>;
      }

      const data = response.data;
      
      // 处理特定错误码
      if (data.result === 100400002 && data.error_msg === 'token expired') {
        return {
          success: false,
          error: '二维码已过期，请重新获取',
          code: data.result
        };
      }

      const status = data.status;
      if (!status) {
        return {
          success: false,
          error: `获取二维码扫描状态失败，响应为 ${JSON.stringify(data)}`
        };
      }

      if (status !== 'SCANNED') {
        return {
          success: false,
          error: `二维码状态为 ${status}，请等待用户扫描`,
          code: data.result
        };
      }

      // 更新签名
      const newSignature = data.qrLoginSignature;
      if (!newSignature) {
        return {
          success: false,
          error: `获取新的qrLoginSignature失败，响应为 ${JSON.stringify(data)}`
        };
      }
      this.qrLoginSignature = newSignature;

      // 二维码已扫描，继续确认登录
      return await this.confirmQrLogin();
    } catch (error) {
      return {
        success: false,
        error: `检查二维码状态失败: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  /**
   * 确认二维码登录
   */
  private async confirmQrLogin(): Promise<ApiResponse<AuthResponse>> {
    if (!this.qrLoginToken || !this.qrLoginSignature) {
      return {
        success: false,
        error: '二维码登录信息不完整'
      };
    }

    try {
      const timestamp = Date.now();
      const url = `https://scan.acfun.cn/rest/pc-direct/qr/acceptResult?qrLoginToken=${this.qrLoginToken}&qrLoginSignature=${this.qrLoginSignature}&_=${timestamp}`;
      
      // 使用无需认证的GET请求函数
      const response = await apiGetWithoutAuth<any>(this.httpClient, url, '确认二维码登录');
      
      if (!response.success) {
        return response as ApiResponse<AuthResponse>;
      }

      const data = response.data;
      
      // 处理特定错误码
      if (data.result === 100400004 && data.error_msg === 'user cancel') {
        return {
          success: false,
          error: '用户取消了登录',
          code: data.result
        };
      }

      const status = data.status;
      if (!status) {
        return {
          success: false,
          error: `确认二维码登录失败，响应为 ${JSON.stringify(data)}`
        };
      }

      if (status !== 'ACCEPTED') {
        return {
          success: false,
          error: `二维码状态为 ${status}，请等待用户确认`,
          code: data.result
        };
      }

      // 登录成功，组装cookies并获取服务令牌
      // 根据source目录逻辑，需要从响应头中提取cookies
      const responseCookies = response.headers?.['set-cookie'] || [];
      
      // 调试信息：打印响应头
      
      const cookies = responseCookies.map((cookie: string) => {
        // 提取cookie的name=value部分
        const cookieParts = cookie.split(';')[0].split('=');
        if (cookieParts.length >= 2) {
          return `${cookieParts[0]}=${cookieParts[1]}`;
        }
        return cookie;
      });
      
      
      // 根据source目录逻辑，二维码登录成功后需要获取cookies
      // 然后调用getServiceToken来获取完整的tokenInfo
      return await this.getServiceToken(cookies);
    } catch (error) {
      return {
        success: false,
        error: `确认二维码登录失败: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  /**
   * 获取服务令牌 - 生成与后端相同的tokenInfo结构
   */
  private async getServiceToken(cookies?: string[]): Promise<ApiResponse<AuthResponse>> {
    try {
      const deviceId = this.getDeviceId();
      
      // 根据后端逻辑，需要调用不同的API来获取tokenInfo
      // 对于登录用户，调用getTokenURL；对于游客，调用loginURL
      let url: string;
      let formData: URLSearchParams = new URLSearchParams();
      let requestCookies: string[] = [];
      
      if (cookies && cookies.length > 0) {
        // 登录用户：调用getTokenURL
        url = 'https://id.app.acfun.cn/rest/web/token/get';
        formData.append('sid', 'acfun.midground.api');
        // 登录用户需要传递二维码登录获取的cookies
        requestCookies = cookies;
      } else {
        // 游客用户：调用loginURL
        url = 'https://id.app.acfun.cn/rest/app/visitor/login';
        formData.append('sid', 'acfun.api.visitor');
        // 游客需要设置_did cookie
        requestCookies = [`_did=${deviceId}`];
      }
      
      // 使用无需认证的POST请求函数
      const response = await apiPostWithoutAuth<any>(this.httpClient, url, '获取服务令牌', formData.toString(), {
        headers: {
          'Cookie': requestCookies.join('; '),
          'Referer': 'https://live.acfun.cn/',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      if (!response.success) {
        return response as ApiResponse<AuthResponse>;
      }

      const data = response.data;

      // 根据后端逻辑生成完整的tokenInfo
      const userId = data.userId || data.userID || '';
      let securityKey: string;
      let serviceToken: string;
      
      if (cookies && cookies.length > 0) {
        // 登录用户：securityKey来自ssecurity，serviceToken来自midgroundSt字段
        securityKey = data.ssecurity || '';
        serviceToken = data['acfun.midground.api_st'] || data.serviceToken || '';
      } else {
        // 游客用户：securityKey来自acSecurity，serviceToken来自visitorSt字段
        securityKey = data.acSecurity || '';
        serviceToken = data['acfun.api.visitor_st'] || data.serviceToken || '';
      }

      // 生成完整的tokenInfo对象（与后端WebSocket接口一致）
      // 根据source目录逻辑，cookies需要正确存储在tokenInfo中
      const tokenInfo = {
        userID: userId,
        securityKey: securityKey,
        serviceToken: serviceToken,
        deviceID: deviceId,
        cookies: cookies || [] // 正确存储cookies数组
      };

      // 生成并保存token
      const token = this.generateToken(tokenInfo);
      
      // 登录成功后自动设置全局token
      this.httpClient.setHeader('Authorization', `Bearer ${token}`);
      
      return {
        success: true,
        data: {
          token: token,
          userId: userId,
          expiresAt: data.expireTime || (Date.now() + 24 * 60 * 60 * 1000),
          tokenInfo: tokenInfo // 返回完整的tokenInfo结构
        }
      };
    } catch (error) {
      return {
        success: false,
        error: `获取服务令牌失败: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }




  /**
   * 生成令牌
   */
  private generateToken(tokenInfo: { userID: string; securityKey: string; serviceToken: string; deviceID: string; cookies: string[] }): string {
    // 生成与后端一致的token格式，包含完整的tokenInfo信息
    return JSON.stringify({
      userID: tokenInfo.userID,
      securityKey: tokenInfo.securityKey,
      serviceToken: tokenInfo.serviceToken,
      deviceID: tokenInfo.deviceID,
      cookies: tokenInfo.cookies
    });
  }
}
