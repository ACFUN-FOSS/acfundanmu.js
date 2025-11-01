import { HttpClient } from './core/HttpClient';
import { AuthService } from './services/AuthService';
import { BadgeService } from './services/BadgeService';
import { DanmuService } from './services/DanmuService';
import { GiftService } from './services/GiftService';
import { LiveService } from './services/LiveService';
import { UserService } from './services/UserService';
import { LivePreviewService } from './services/LivePreviewService';
import { ManagerService } from './services/ManagerService';
import { ReplayService } from './services/ReplayService';
import { ApiConfig } from './types';
export declare class AcFunLiveApi {
    private httpClient;
    auth: AuthService;
    badge: BadgeService;
    danmu: DanmuService;
    gift: GiftService;
    live: LiveService;
    user: UserService;
    livePreview: LivePreviewService;
    manager: ManagerService;
    replay: ReplayService;
    constructor(config?: ApiConfig);
    /**
     * 设置认证令牌
     */
    setAuthToken(token: string): void;
    /**
     * 清除认证令牌
     */
    clearAuthToken(): void;
    /**
     * 检查认证状态
     */
    isAuthenticated(): boolean;
    /**
     * 获取HTTP客户端实例（高级用法）
     */
    getHttpClient(): HttpClient;
    /**
     * 销毁实例，清理资源
     */
    destroy(): void;
}
export default AcFunLiveApi;
