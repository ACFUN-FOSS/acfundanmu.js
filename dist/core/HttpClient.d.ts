import { AxiosRequestConfig } from 'axios';
import { ApiConfig, ApiResponse, TokenInfo } from '../types';
export interface SignedAxiosRequestConfig extends AxiosRequestConfig {
    sign?: boolean;
}
export declare class HttpClient {
    private client;
    private config;
    constructor(config?: ApiConfig);
    private setupInterceptors;
    private getFullUrl;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
    post<T = any>(url: string, data?: any, config?: SignedAxiosRequestConfig): Promise<ApiResponse<T>>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
    private handleError;
    setHeader(key: string, value: string): void;
    removeHeader(key: string): void;
    /**
     * 获取认证头
     */
    getAuthHeader(): string | null;
    /**
     * 解析token字符串
     */
    parseToken(token: string): TokenInfo;
    /**
     * 构建请求头
     */
    buildHeaders(tokenInfo: TokenInfo): Record<string, string>;
    /**
     * 从认证头中解析token信息
     */
    parseTokenFromAuthHeader(): TokenInfo | null;
    /**
     * 验证token信息是否完整
     */
    validateTokenInfo(tokenInfo: TokenInfo): string | null;
    /**
     * 获取并验证token信息
     */
    getValidatedTokenInfo(): {
        tokenInfo: TokenInfo | null;
        error: string | null;
    };
    /**
     * 为请求添加签名
     */
    private addSignatureToRequest;
}
