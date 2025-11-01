import { HttpClient } from '../core/HttpClient';
import { ApiResponse, AuthResponse, QRCodeLoginResponse } from '../types';
export declare class AuthService {
    private httpClient;
    private qrLoginToken;
    private qrLoginSignature;
    constructor(httpClient: HttpClient);
    /**
     * 获取设备ID
     */
    private getDeviceId;
    /**
     * 二维码登录 - 获取登录二维码
     */
    qrLogin(): Promise<ApiResponse<QRCodeLoginResponse>>;
    /**
     * 检查二维码登录状态
     */
    checkQrLoginStatus(): Promise<ApiResponse<AuthResponse>>;
    /**
     * 确认二维码登录
     */
    private confirmQrLogin;
    /**
     * 获取服务令牌 - 生成与后端相同的tokenInfo结构
     */
    private getServiceToken;
    /**
     * 生成令牌
     */
    private generateToken;
}
