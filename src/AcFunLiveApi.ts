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

export class AcFunLiveApi {
  private httpClient: HttpClient;
  public auth: AuthService;
  public badge: BadgeService;
  public danmu: DanmuService;
  public gift: GiftService;
  public live: LiveService;
  public user: UserService;
  public livePreview: LivePreviewService;
  public manager: ManagerService;
  public replay: ReplayService;

  constructor() {
    this.httpClient = new HttpClient({});
    this.auth = new AuthService(this.httpClient);
    this.badge = new BadgeService(this.httpClient);
    this.danmu = new DanmuService(this.httpClient);
    this.gift = new GiftService(this.httpClient);
    this.live = new LiveService(this.httpClient);
    this.user = new UserService(this.httpClient);
    this.livePreview = new LivePreviewService(this.httpClient);
    this.manager = new ManagerService(this.httpClient);
    this.replay = new ReplayService(this.httpClient);
  }

  /**
   * 设置认证令牌
   */
  public setAuthToken(token: string): void {
    // 验证token格式，如果是JSON字符串则直接使用，否则包装为tokenInfo对象
    let finalToken: string;
    
    try {
      // 尝试解析为JSON
      const tokenInfo = JSON.parse(token);
      // 如果是有效的JSON对象，直接使用
      finalToken = token;
    } catch (error) {
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
  public clearAuthToken(): void {
    this.httpClient.removeHeader('Authorization');
  }

  /**
   * 检查认证状态
   */
  public isAuthenticated(): boolean {
    // 简化认证检查，直接返回false，因为AuthService不提供token验证功能
    return false;
  }

  /**
   * 获取HTTP客户端实例（高级用法）
   */
  public getHttpClient(): HttpClient {
    return this.httpClient;
  }

  /**
   * 销毁实例，清理资源
   */
  public destroy(): void {
    this.clearAuthToken();
    // TODO: 清理其他资源
  }
}

// 默认导出
export default AcFunLiveApi;