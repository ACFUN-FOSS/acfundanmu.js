import { HttpClient } from '../core/HttpClient';
import { ApiResponse } from '../types';
import { apiGet, apiPost, validateApiResponse } from '../core/ApiUtils';



export interface UserInfoResponse {
  userId: string;
  userName: string;
  avatar: string;
  level: number;
  fansCount: number;
  followCount: number;
  signature?: string;
  isLive: boolean;
  liveRoomId?: string;
  avatarFrame?: string;
  contributeCount?: number;
  verifiedText?: string;
  isJoinUpCollege?: boolean;
  isFollowing?: boolean;
  isFollowed?: boolean;
  likeCount?: number;
}

export class UserService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }



  /**
   * 获取用户信息
   */
  public async getUserInfo(userId: string): Promise<ApiResponse<UserInfoResponse>> {
    try {
      // 构建请求URL
      const url = `https://www.acfun.cn/rest/pc-direct/user/userInfo?userId=${userId}`;
      
      // 使用通用GET请求函数
      const response = await apiGet<any>(this.httpClient, url, '获取用户信息');
      
      if (!response.success) {
        return response as ApiResponse<UserInfoResponse>;
      }

      const data = response.data;
      
      // 解析用户信息
      const profile = data.profile;
      if (!profile) {
        return {
          success: false,
          error: '用户信息数据为空'
        };
      }

      const userInfo: UserInfoResponse = {
        userId: profile.userId?.toString() || userId,
        userName: profile.name || '',
        avatar: profile.headUrl || '',
        level: profile.level || 0,
        fansCount: parseInt(profile.followed) || 0,
        followCount: parseInt(profile.following) || 0,
        signature: profile.signature || '',
        isLive: !!profile.liveId,
        liveRoomId: profile.liveId || '',
        avatarFrame: profile.avatarFrameMobileImg || '',
        contributeCount: parseInt(profile.contentCount) || 0,
        verifiedText: profile.verifiedText || '',
        isJoinUpCollege: profile.isContractUp || false,
        isFollowing: profile.isFollowing || false,
        isFollowed: profile.isFollowed || false,
        likeCount: profile.likeCount || 0
      };

      return {
        success: true,
        data: userInfo
      };
    } catch (error) {
      return {
        success: false,
        error: `获取用户信息失败: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }


  /**
   * 获取用户钱包信息
   */
  public async getWalletInfo(): Promise<ApiResponse<{
    balance: number;
    bananaCount: number;
    giftCount: number;
    rechargeHistory: Array<{
      amount: number;
      time: number;
      status: string;
    }>;
  }>> {
    try {
      // 从HTTP客户端的认证头中获取并验证token信息
      const { tokenInfo, error } = this.httpClient.getValidatedTokenInfo();
      if (error || !tokenInfo) {
        return {
          success: false,
          error: error || 'token信息不完整，缺少必要的字段'
        };
      }

      // 根据source目录中的逻辑构建请求URL
      // walletBalanceURL格式: https://api.kuaishouzt.com/rest/zt/live/web/pay/wallet/balance?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=%d&did=%s&%s=%s
      const url = `https://api.kuaishouzt.com/rest/zt/live/web/pay/wallet/balance?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=${tokenInfo.userID}&did=${tokenInfo.deviceID}&acfun.midground.api_st=${tokenInfo.serviceToken}`;
      
      // 根据source目录中的fetchKuaiShouAPI逻辑，需要传递form参数
      const formData = new URLSearchParams();
      formData.append('visitorId', tokenInfo.userID.toString());
      
      // 使用apiPost发送请求
      const response = await apiPost<any>(this.httpClient, url, formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }, '获取钱包信息');
      
      if (!response.success) {
        return response as ApiResponse<any>;
      }

      const data = response.data;

      // 根据source目录中的逻辑解析钱包信息
      // payWalletTypeToBalance对象中：1表示AC币，2表示香蕉
      const payWalletTypeToBalance = data.data?.payWalletTypeToBalance || {};
      
      const walletInfo = {
        balance: payWalletTypeToBalance['1'] || 0, // AC币余额
        bananaCount: payWalletTypeToBalance['2'] || 0, // 香蕉数量
        giftCount: 0, // 礼物数量需要其他API获取
        rechargeHistory: [] // 充值历史需要其他API获取
      };

      return {
        success: true,
        data: walletInfo
      };
    } catch (error) {
      return {
        success: false,
        error: `获取钱包信息失败: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

}