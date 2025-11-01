export interface SignOptions {
    url: string;
    formData?: URLSearchParams;
    securityKey: string;
}
export declare class SignUtils {
    /**
     * 生成客户端签名
     * 参照Go源码中的genClientSign方法实现
     */
    static generateClientSign(options: SignOptions): string;
    /**
     * 验证签名是否有效
     */
    static validateClientSign(sign: string, options: SignOptions): boolean;
}
