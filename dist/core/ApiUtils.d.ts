import { HttpClient } from './HttpClient';
import { ApiResponse, TokenInfo } from '../types';
/**
 * API工具函数，用于处理常见的API调用模式
 */
/**
 * 检查认证状态
 */
export declare function checkAuth(httpClient: HttpClient): string | null;
/**
 * 验证API响应结果
 */
export declare function validateApiResponse(data: any, expectedCode?: number): {
    isValid: boolean;
    error?: string;
    code?: any;
};
/**
 * 处理API调用错误
 */
export declare function handleApiError(error: any, operation: string): ApiResponse<any>;
/**
 * 通用GET请求包装函数
 */
export declare function apiGet<T>(httpClient: HttpClient, url: string, operation: string, expectedCode?: number): Promise<ApiResponse<T>>;
/**
 * 无需认证的GET请求包装函数（用于二维码登录等不需要token的接口）
 */
export declare function apiGetWithoutAuth<T>(httpClient: HttpClient, url: string, operation: string, expectedCode?: number): Promise<ApiResponse<T>>;
/**
 * 无需认证的POST请求包装函数（用于二维码登录等不需要token的接口）
 */
export declare function apiPostWithoutAuth<T>(httpClient: HttpClient, url: string, operation: string, data?: any, config?: any, expectedCode?: number): Promise<ApiResponse<T>>;
/**
 * 构建快手API URL
 */
export declare function buildKuaiShouApiUrl(baseUrl: string, tokenInfo: TokenInfo, apiStParam?: string): string;
/**
 * 构建快手API通用表单数据
 */
export declare function buildKuaiShouFormData(tokenInfo: TokenInfo, additionalParams?: Record<string, string>): URLSearchParams;
/**
 * 构建快手API请求头
 */
export declare function buildKuaiShouHeaders(tokenInfo: TokenInfo, contentType?: string): Record<string, string>;
/**
 * 通用POST请求包装函数
 */
export declare function apiPost<T>(httpClient: HttpClient, url: string, operation: string, data?: any, config?: any, expectedCode?: number): Promise<ApiResponse<T>>;
/**
 * 快手API通用POST请求包装函数
 */
export declare function kuaiShouApiPost<T>(httpClient: HttpClient, baseUrl: string, operation: string, additionalParams?: Record<string, string>, expectedCode?: number): Promise<ApiResponse<T>>;
/**
 * 构建Cookie字符串
 */
export declare function buildCookieString(cookies: string[] | null, deviceID: string): string;
/**
 * 从响应头中提取Cookie
 */
export declare function extractCookiesFromHeaders(headers: Record<string, string>): string[];
/**
 * 合并Cookie数组
 */
export declare function mergeCookies(existingCookies: string[], newCookies: string[]): string[];
/**
 * 构建通用表单数据
 */
export declare function buildFormData(params: Record<string, string | number | boolean>): URLSearchParams;
/**
 * 构建JSON请求体
 */
export declare function buildJsonBody(data: any): string;
/**
 * 构建多部分表单数据
 */
export declare function buildMultipartFormData(params: Record<string, any>): FormData;
/**
 * 构建通用请求头
 */
export declare function buildCommonHeaders(contentType?: string): Record<string, string>;
/**
 * 构建ACFun API通用请求头
 */
export declare function buildAcFunHeaders(referer?: string): Record<string, string>;
