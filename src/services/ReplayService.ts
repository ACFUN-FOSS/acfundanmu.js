import { HttpClient } from '../core/HttpClient';
import { ApiResponse } from '../types';

export class ReplayService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * 获取直播回放信息
   * @param liveId 直播ID
   */
  async getLiveReplay(liveId: string): Promise<ApiResponse<any>> {
    try {
      // 验证token
      const { tokenInfo, error } = this.httpClient.getValidatedTokenInfo();
      if (error || !tokenInfo) {
        return { success: false, error: error || 'token信息无效' };
      }

      // 根据是否有cookies选择token类型
      const hasCookies = tokenInfo.cookies && tokenInfo.cookies.length > 0;
      const tokenType = hasCookies ? 'acfun.midground.api_st' : 'acfun.api.visitor_st';

      // 构建请求URL - 参照Go源码格式
      const playbackURL = `https://api.kuaishouzt.com/rest/zt/live/playBack/startPlay?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=${tokenInfo.userID}&did=${tokenInfo.deviceID}&${tokenType}=${tokenInfo.serviceToken}`;

      // 构建请求参数
      const formData = new URLSearchParams();
      formData.append('liveId', liveId);

      // 发送POST请求 - 需要签名
      const response = await this.httpClient.post(playbackURL, formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        sign: true, // 需要签名
      });

      if (!response.success) {
        return { success: false, error: response.error };
      }

      const data = response.data;
      
      // 验证响应结果
      if (data.result !== 1) {
        return { success: false, error: '获取直播回放信息失败' };
      }

      // 解析回放信息
      const adaptiveManifest = data.data?.adaptiveManifest;
      if (!adaptiveManifest) {
        return { success: false, error: '获取直播回放信息失败，缺少adaptiveManifest' };
      }

      // 解析adaptiveManifest获取回放详情
      const manifestData = JSON.parse(adaptiveManifest);
      const adaptationSet = manifestData.adaptationSet?.[0];
      if (!adaptationSet) {
        return { success: false, error: '解析直播回放信息失败，缺少adaptationSet' };
      }

      const representation = adaptationSet.representation?.[0];
      if (!representation) {
        return { success: false, error: '解析直播回放信息失败，缺少representation' };
      }

      const playbackInfo = {
        duration: adaptationSet.duration,
        url: representation.url,
        backupUrl: representation.backupUrl?.[0],
        m3u8Slice: representation.m3u8Slice,
        width: representation.width,
        height: representation.height,
      };

      return { success: true, data: playbackInfo };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : String(error) 
      };
    }
  }
}