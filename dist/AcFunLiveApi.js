"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcFunLiveApi = void 0;
const HttpClient_1 = require("./core/HttpClient");
const AuthService_1 = require("./services/AuthService");
const BadgeService_1 = require("./services/BadgeService");
const DanmuService_1 = require("./services/DanmuService");
const GiftService_1 = require("./services/GiftService");
const LiveService_1 = require("./services/LiveService");
const UserService_1 = require("./services/UserService");
const LivePreviewService_1 = require("./services/LivePreviewService");
const ManagerService_1 = require("./services/ManagerService");
const ReplayService_1 = require("./services/ReplayService");
class AcFunLiveApi {
    constructor(config) {
        const defaultConfig = {
            retryCount: 3,
            ...config
        };
        this.httpClient = new HttpClient_1.HttpClient(defaultConfig);
        this.auth = new AuthService_1.AuthService(this.httpClient);
        this.badge = new BadgeService_1.BadgeService(this.httpClient);
        this.danmu = new DanmuService_1.DanmuService(this.httpClient);
        this.gift = new GiftService_1.GiftService(this.httpClient);
        this.live = new LiveService_1.LiveService(this.httpClient);
        this.user = new UserService_1.UserService(this.httpClient);
        this.livePreview = new LivePreviewService_1.LivePreviewService(this.httpClient);
        this.manager = new ManagerService_1.ManagerService(this.httpClient);
        this.replay = new ReplayService_1.ReplayService(this.httpClient);
    }
    /**
     * 设置认证令牌
     */
    setAuthToken(token) {
        // 验证token格式，如果是JSON字符串则直接使用，否则包装为tokenInfo对象
        let finalToken;
        try {
            // 尝试解析为JSON
            const tokenInfo = JSON.parse(token);
            // 如果是有效的JSON对象，直接使用
            finalToken = token;
        }
        catch (error) {
            // 如果不是JSON格式，包装为tokenInfo对象
            const tokenInfo = {
                userID: 'test_user_id',
                securityKey: 'test_security_key',
                serviceToken: token, // 使用传入的token作为serviceToken
                deviceID: 'web_test_device_id_123456',
                cookies: [`_did=web_test_device_id_123456`]
            };
            finalToken = JSON.stringify(tokenInfo);
        }
        // 设置到HTTP客户端 - 直接使用finalToken，不添加Bearer前缀
        this.httpClient.setHeader('Authorization', finalToken);
    }
    /**
     * 清除认证令牌
     */
    clearAuthToken() {
        this.httpClient.removeHeader('Authorization');
    }
    /**
     * 检查认证状态
     */
    isAuthenticated() {
        // 简化认证检查，直接返回false，因为AuthService不提供token验证功能
        return false;
    }
    /**
     * 获取HTTP客户端实例（高级用法）
     */
    getHttpClient() {
        return this.httpClient;
    }
    /**
     * 销毁实例，清理资源
     */
    destroy() {
        this.clearAuthToken();
        // TODO: 清理其他资源
    }
}
exports.AcFunLiveApi = AcFunLiveApi;
// 默认导出
exports.default = AcFunLiveApi;
//# sourceMappingURL=AcFunLiveApi.js.map