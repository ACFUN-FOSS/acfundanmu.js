import { HttpClient } from './HttpClient';
import { ApiResponse, TokenInfo } from '../types';

/**
 * API工具函数，用于处理常见的API调用模式
 */

/**
 * 检查认证状态
 */
export function checkAuth(httpClient: HttpClient): string | null {
  const authHeader = httpClient.getAuthHeader();
  if (!authHeader) {
    return '请先设置认证token';
  }
  return null;
}

/**
 * 验证API响应结果
 */
export function validateApiResponse(data: any, expectedCode: number = 0): { isValid: boolean; error?: string; code?: any } {
  // 检查二维码登录API的特殊响应格式
  if (data.result !== undefined && data.result !== null) {
    if (data.result !== expectedCode) {
      return {
        isValid: false,
        error: `API调用失败，响应为 ${JSON.stringify(data)}`,
        code: data.result
      };
    }
    return { isValid: true };
  }
  
  // 检查其他可能的响应格式
  if (data.channelListData && data.channelListData.result !== undefined && data.channelListData.result !== null) {
    if (data.channelListData.result !== expectedCode) {
      return {
        isValid: false,
        error: `API调用失败，响应为 ${JSON.stringify(data)}`,
        code: data.channelListData.result
      };
    }
    return { isValid: true };
  }
  
  // 对于二维码登录等特殊API，如果没有result字段，直接返回成功
  // 因为有些API（如二维码登录）的响应格式不同，不需要result字段验证
  return { isValid: true };
}

/**
 * 处理API调用错误
 */
export function handleApiError(error: any, operation: string): ApiResponse<any> {
  return {
    success: false,
    error: `${operation}失败: ${error instanceof Error ? error.message : String(error)}`
  };
}

/**
 * 通用GET请求包装函数
 */
export async function apiGet<T>(
  httpClient: HttpClient,
  url: string,
  operation: string,
  expectedCode: number = 0
): Promise<ApiResponse<T>> {
  try {
    // 检查认证
    const authError = checkAuth(httpClient);
    if (authError) {
      return {
        success: false,
        error: authError
      };
    }

    // 发送GET请求
    const response = await httpClient.get<any>(url);
    if (!response.success) {
      return {
        success: false,
        error: response.error || `${operation}失败`
      };
    }

    // 验证API响应
    const validation = validateApiResponse(response.data, expectedCode);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error,
        code: validation.code
      };
    }

    return {
      success: true,
      data: response.data,
      headers: response.headers
    };
  } catch (error) {
    return handleApiError(error, operation);
  }
}

/**
 * 无需认证的GET请求包装函数（用于二维码登录等不需要token的接口）
 */
export async function apiGetWithoutAuth<T>(
  httpClient: HttpClient,
  url: string,
  operation: string,
  expectedCode: number = 0
): Promise<ApiResponse<T>> {
  try {
    // 发送GET请求（跳过认证检查）
    const response = await httpClient.get<any>(url);
    
    if (!response.success) {
      return {
        success: false,
        error: response.error || `${operation}失败`
      };
    }

    // 验证API响应
    const validation = validateApiResponse(response.data, expectedCode);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error,
        code: validation.code
      };
    }

    return {
      success: true,
      data: response.data,
      headers: response.headers
    };
  } catch (error) {
    return handleApiError(error, operation);
  }
}

/**
 * 无需认证的POST请求包装函数（用于二维码登录等不需要token的接口）
 */
export async function apiPostWithoutAuth<T>(
  httpClient: HttpClient,
  url: string,
  operation: string,
  data?: any,
  config?: any,
  expectedCode: number = 0
): Promise<ApiResponse<T>> {
  try {
    // 发送POST请求（跳过认证检查）
    const response = await httpClient.post<any>(url, data, config);
    
    if (!response.success) {
      return {
        success: false,
        error: response.error || `${operation}失败`
      };
    }

    // 验证API响应
    const validation = validateApiResponse(response.data, expectedCode);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error,
        code: validation.code
      };
    }

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return handleApiError(error, operation);
  }
}

/**
 * 构建快手API URL
 */
export function buildKuaiShouApiUrl(
  baseUrl: string,
  tokenInfo: TokenInfo,
  apiStParam: string = 'acfun.midground.api_st'
): string {
  const apiSt = tokenInfo.cookies && tokenInfo.cookies.length > 0 ? 'acfun.midground.api_st' : 'acfun.api.visitor_st';
  return `${baseUrl}&userId=${tokenInfo.userID}&did=${tokenInfo.deviceID}&${apiSt}=${encodeURIComponent(tokenInfo.serviceToken)}`;
}

/**
 * 构建快手API通用表单数据
 */
export function buildKuaiShouFormData(tokenInfo: TokenInfo, additionalParams?: Record<string, string>): URLSearchParams {
  const formData = new URLSearchParams();
  formData.append('visitorId', tokenInfo.userID.toString());
  
  if (additionalParams) {
    Object.entries(additionalParams).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }
  
  return formData;
}

/**
 * 构建快手API请求头
 */
export function buildKuaiShouHeaders(tokenInfo: TokenInfo, contentType: string = 'application/x-www-form-urlencoded'): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': contentType,
    'Referer': 'https://live.acfun.cn/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  };

  // 设置cookies
  if (tokenInfo.cookies && tokenInfo.cookies.length > 0) {
    headers['Cookie'] = tokenInfo.cookies.map((cookie: string) => {
      const parts = cookie.split(';')[0].split('=');
      return `${parts[0]}=${parts[1]}`;
    }).join('; ');
  } else {
    headers['Cookie'] = `_did=${tokenInfo.deviceID}`;
  }

  return headers;
}

/**
 * 通用POST请求包装函数
 */
export async function apiPost<T>(
  httpClient: HttpClient,
  url: string,
  operation: string,
  data?: any,
  config?: any,
  expectedCode: number = 0
): Promise<ApiResponse<T>> {
  try {
    // 检查认证
    const authError = checkAuth(httpClient);
    if (authError) {
      return {
        success: false,
        error: authError
      };
    }

    // 发送POST请求
    const response = await httpClient.post<any>(url, data, config);
    
    if (!response.success) {
      return {
        success: false,
        error: response.error || `${operation}失败`
      };
    }

    // 验证API响应
    const validation = validateApiResponse(response.data, expectedCode);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error,
        code: validation.code
      };
    }

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return handleApiError(error, operation);
  }
}

/**
 * 快手API通用POST请求包装函数
 */
export async function kuaiShouApiPost<T>(
  httpClient: HttpClient,
  baseUrl: string,
  operation: string,
  additionalParams?: Record<string, string>,
  expectedCode: number = 1
): Promise<ApiResponse<T>> {
  try {
    // 获取并验证token信息
    const { tokenInfo, error } = httpClient.getValidatedTokenInfo();
    if (error || !tokenInfo) {
      return { success: false, error: error || 'token信息为空' };
    }

    // 构建URL
    const url = buildKuaiShouApiUrl(baseUrl, tokenInfo);
    
    // 构建表单数据
    const formData = buildKuaiShouFormData(tokenInfo, additionalParams);
    
    // 构建请求头
    const headers = buildKuaiShouHeaders(tokenInfo);
    
    // 发送POST请求
    const response = await httpClient.post<any>(url, formData.toString(), { headers });
    
    if (!response.success) {
      return {
        success: false,
        error: response.error || `${operation}失败`
      };
    }

    const data = response.data;
    
    // 检查API响应结果
    if (data.result !== expectedCode) {
      const errorMessage = data.error_msg || data.msg || '未知错误';
      return {
        success: false,
        error: `${operation}失败: ${errorMessage} (错误码: ${data.result})`,
        code: data.result
      };
    }

    return {
      success: true,
      data: data.data || data
    };
  } catch (error) {
    return handleApiError(error, operation);
  }
}

/**
 * 构建Cookie字符串
 */
export function buildCookieString(cookies: string[] | null, deviceID: string): string {
  if (cookies && cookies.length > 0) {
    return cookies.map((cookie: string) => {
      const parts = cookie.split(';')[0].split('=');
      return `${parts[0]}=${parts[1]}`;
    }).join('; ');
  } else {
    return `_did=${deviceID}`;
  }
}

/**
 * 从响应头中提取Cookie
 */
export function extractCookiesFromHeaders(headers: Record<string, string>): string[] {
  const cookies: string[] = [];
  
  // 处理Set-Cookie头
  const setCookieHeaders = headers['set-cookie'] || headers['Set-Cookie'];
  if (setCookieHeaders) {
    if (Array.isArray(setCookieHeaders)) {
      cookies.push(...setCookieHeaders);
    } else {
      cookies.push(setCookieHeaders);
    }
  }
  
  // 处理Cookie头
  const cookieHeader = headers['cookie'] || headers['Cookie'];
  if (cookieHeader) {
    const cookiePairs = cookieHeader.split(';').map(cookie => cookie.trim());
    cookies.push(...cookiePairs);
  }
  
  return cookies;
}

/**
 * 合并Cookie数组
 */
export function mergeCookies(existingCookies: string[], newCookies: string[]): string[] {
  const cookieMap = new Map<string, string>();
  
  // 先添加现有Cookie
  existingCookies.forEach(cookie => {
    const [name, value] = cookie.split('=');
    if (name && value) {
      cookieMap.set(name.trim(), value.trim());
    }
  });
  
  // 用新Cookie覆盖或添加
  newCookies.forEach(cookie => {
    const [name, value] = cookie.split('=');
    if (name && value) {
      cookieMap.set(name.trim(), value.trim());
    }
  });
  
  return Array.from(cookieMap.entries()).map(([name, value]) => `${name}=${value}`);
}

/**
 * 构建通用表单数据
 */
export function buildFormData(params: Record<string, string | number | boolean>): URLSearchParams {
  const formData = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  
  return formData;
}

/**
 * 构建JSON请求体
 */
export function buildJsonBody(data: any): string {
  return JSON.stringify(data);
}

/**
 * 构建多部分表单数据
 */
export function buildMultipartFormData(params: Record<string, any>): FormData {
  const formData = new FormData();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
  });
  
  return formData;
}

/**
 * 构建通用请求头
 */
export function buildCommonHeaders(contentType: string = 'application/x-www-form-urlencoded'): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': contentType,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  };
  
  return headers;
}

/**
 * 构建ACFun API通用请求头
 */
export function buildAcFunHeaders(referer: string = 'https://www.acfun.cn/'): Record<string, string> {
  const headers = buildCommonHeaders();
  headers['Referer'] = referer;
  return headers;
}