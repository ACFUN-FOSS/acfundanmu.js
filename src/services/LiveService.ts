import { HttpClient } from '../core/HttpClient';
import { ApiResponse, LiveRoomInfo, WatchingUser, ManagerType } from '../types';
import { apiGet, apiPost, kuaiShouApiPost, buildCookieString, buildFormData, buildCommonHeaders } from '../core/ApiUtils';

export class LiveService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }
  /**
   * 获取直播推流地址
   */
  public async getStreamUrl(liveId: string): Promise<ApiResponse<{
    rtmpUrl: string;
    streamKey: string;
    expiresAt: number;
  }>> {
    // 使用核心组件进行快手API调用
    const response = await kuaiShouApiPost<any>(
      this.httpClient,
      'https://api.kuaishouzt.com/rest/zt/live/web/obs/config?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB',
      '获取推流地址',
      { liveId }
    );

    if (!response.success) {
      return response;
    }

    const pushConfig = response.data;
    
    // 解析推流地址信息
    if (!pushConfig || !pushConfig.streamPushAddress || pushConfig.streamPushAddress.length === 0) {
      return {
        success: false,
        error: '推流地址数据为空'
      };
    }

    let rtmpUrl = '';
    let streamKey = '';
    if (typeof pushConfig.rtmpServer === 'string' && typeof pushConfig.streamKey === 'string') {
      rtmpUrl = pushConfig.rtmpServer;
      streamKey = pushConfig.streamKey;
    } else {
      const streamPushAddress = pushConfig.streamPushAddress[0];
      if (typeof streamPushAddress !== 'string') {
        return {
          success: false,
          error: '推流地址不是字符串类型'
        };
      }
      const lastSlashIndex = streamPushAddress.lastIndexOf('/');
      rtmpUrl = streamPushAddress.substring(0, lastSlashIndex);
      streamKey = streamPushAddress.substring(lastSlashIndex + 1);
    }

    // 计算过期时间（假设24小时后过期）
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;

    const streamInfo = {
      rtmpUrl,
      streamKey,
      expiresAt
    };

    return {
      success: true,
      data: streamInfo
    };
  }




  /**
   * 获取热门直播列表
   */
  public async getHotLives(category?: string, page?: number, size?: number): Promise<ApiResponse<{
    lives: LiveRoomInfo[];
    total: number;
  }>> {
    try {
      // 设置默认参数
      const count = size || 20; // 默认每页20个直播间
      const pcursor = page || 0; // 默认从第0页开始
      
      // 根据source目录中的liveListURL格式构建API URL
      const url = `https://live.acfun.cn/api/channel/list?count=${count}&pcursor=${pcursor}`;
      
      // 设置请求头 - 使用核心组件构建通用请求头
      const headers = buildCommonHeaders();
      headers['Referer'] = 'https://live.acfun.cn/';
      
      // 使用apiGet发送请求
      const response = await apiGet<any>(this.httpClient, url, '获取热门直播列表');

      if (!response.success) {
        return response as ApiResponse<any>;
      }

      const data = response.data;

      // 检查API响应结果 - 根据实际返回结构处理
      let liveList = [];
      let totalCount = 0;
      
      // 根据实际API响应结构处理
      if (data && data.channelListData) {
        // 结构1: 包含channelListData对象
        const channelListData = data.channelListData;
        if (channelListData.result === 0) {
          // API调用成功
          liveList = channelListData.liveList || [];
          totalCount = channelListData.totalCount || liveList.length;
        } else {
          // API调用失败
          return {
            success: false,
            error: `API调用失败，响应为 ${JSON.stringify(data)}`
          };
        }
      } else if (data && data.liveList) {
        // 结构2: 直接包含liveList
        liveList = data.liveList || [];
        totalCount = data.totalCount || liveList.length;
      } else if (Array.isArray(data)) {
        // 结构3: 响应本身就是数组
        liveList = data;
        totalCount = data.length;
      } else {
        // 无法识别响应结构
        return {
          success: false,
          error: `API响应结构无法识别: ${JSON.stringify(data)}`
        };
      }
      const lives: LiveRoomInfo[] = liveList.map((live: any) => ({
        liveId: live.liveId || '',
        title: live.title || '',
        coverUrl: live.coverUrls && live.coverUrls.length > 0 ? live.coverUrls[0] : '',
        onlineCount: live.onlineCount || 0,
        likeCount: live.likeCount || 0,
        startTime: live.createTime || 0,
        streamer: {
          userId: live.authorId || 0,
          userName: live.user?.name || '',
          avatar: live.user?.headUrl || '',
          level: live.user?.contributeLevel || 0
        },
        category: live.categoryName || '',
        subCategory: live.subCategoryName || ''
      }));

      return {
        success: true,
        data: {
          lives,
          total: totalCount
        }
      };
    } catch (error) {
      return {
        success: false,
        error: `获取热门直播列表失败: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }


  /**
   * 获取直播分类列表
   */
  public async getLiveCategories(): Promise<ApiResponse<Array<{
    categoryID: number;
    categoryName: string;
    subCategoryID: number;
    subCategoryName: string;
  }>>> {
    try {
      // 构建请求URL
      const url = 'https://member.acfun.cn/common/api/getLiveTypeList';
      
      // 构建POST请求的表单数据
      const formData = new URLSearchParams();
      
      // 构建完整的Cookie头
      const { tokenInfo, error: tokenError } = this.httpClient.getValidatedTokenInfo();
      if (tokenError || !tokenInfo) {
        return {
          success: false,
          error: tokenError || 'token信息为空'
        };
      }
      
      const cookieHeader = buildCookieString(tokenInfo.cookies, tokenInfo.deviceID);

      // 使用apiPost发送请求
      const response = await apiPost<any>(this.httpClient, url, formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': cookieHeader
        }
      }, '获取直播分类列表');
      
      if (!response.success) {
        return response as ApiResponse<any>;
      }

      const data = response.data;
      
      // 添加调试信息，查看完整的API响应结构
      console.log('getLiveCategories API response:', JSON.stringify(data, null, 2));
      
      // 验证API响应结果
      if (data.result !== 0) {
        return {
          success: false,
          error: `获取直播分类列表失败: ${data.error || '未知错误'}`
        };
      }

      // 根据Go代码的实现，分类数据应该在typeList字段中
      if (data.typeList && Array.isArray(data.typeList)) {
        // 转换数据格式以匹配测试用例期望的结构
        const convertedData = data.typeList.map((item: any) => ({
          categoryID: item.categoryId,
          categoryName: item.categoryName,
          subCategoryID: item.id,
          subCategoryName: item.name
        }));
        return { success: true, data: convertedData };
      }
      
      // 如果typeList不存在，尝试data.data字段
      if (data.data && Array.isArray(data.data)) {
        return { success: true, data: data.data };
      }

      return { success: true, data: [] };
    } catch (error) {
      return { success: false, error: `获取直播分类失败: ${error instanceof Error ? error.message : String(error)}` };
    }
  }


  /**
   * 获取直播统计数据
   */
  public async getLiveStatistics(userId: number): Promise<ApiResponse<{
    totalViewers: number;
    peakViewers: number;
    totalComments: number;
    totalGifts: number;
    totalLikes: number;
    revenue: number;
  }>> {
    try {
      const url = `https://live.acfun.cn/api/live/info?authorId=${userId}`;
      const headers = buildCommonHeaders();
      headers['Referer'] = 'https://live.acfun.cn/';
      const response = await this.httpClient.get<any>(url, { headers });
      if (!response.success) {
        return { success: false, error: response.error || '获取直播统计数据失败' };
      }

      const data = response.data;
      if (!data || data.result !== 0) {
        return { success: false, error: `获取直播统计数据失败: ${data?.error || 'API响应异常'}` };
      }

      const liveInfo = data.data || {};
      const liveStatistics = {
        totalViewers: liveInfo.onlineCount || 0,
        peakViewers: liveInfo.onlineCount || 0,
        totalComments: 0,
        totalGifts: 0,
        totalLikes: liveInfo.likeCount || 0,
        revenue: 0
      };

      return { success: true, data: liveStatistics };
    } catch (error) {
      return { success: false, error: `获取直播统计数据失败: ${error instanceof Error ? error.message : String(error)}` };
    }
  }

  /**
   * 获取直播列表
   */
  public async getLiveList(page: number = 1, pageSize: number = 20): Promise<ApiResponse<{
    lives: Array<{
      liveId: string;
      title: string;
      coverUrl: string;
      streamerName: string;
      streamerAvatar: string;
      viewerCount: number;
      category: string;
      isLive: boolean;
    }>;
    totalCount: number;
    hasMore: boolean;
  }>> {
    try {
      // 设置默认参数 - 使用A站API格式
      const count = pageSize || 20; // 默认每页20个直播间
      const pcursor = (page - 1) * pageSize || 0; // 转换为A站API的pcursor参数
      
      // 使用正确的A站API端点
      const url = `https://live.acfun.cn/api/channel/list?count=${count}&pcursor=${pcursor}`;
      
      // 设置请求头 - 使用核心组件构建通用请求头
      const headers = buildCommonHeaders();
      headers['Referer'] = 'https://live.acfun.cn/';
      
      // 直接使用HttpClient.get发送请求，绕过apiGet的验证（因为A站API响应结构是嵌套的）
      const response = await this.httpClient.get<any>(url);
      
      if (!response.success) {
        return {
          success: false,
          error: response.error || '获取直播列表失败'
        };
      }

      const data = response.data;
      
      // 检查API响应结果 - 正确处理A站API的响应结构
      let liveList = [];
      let totalCount = 0;
      
      // A站API的正确响应结构：包含channelListData对象，其中result=0表示成功
      if (data.channelListData) {
        // 检查API调用是否成功（result=0表示成功）
        if (data.channelListData.result !== 0) {
          return {
            success: false,
            error: `API调用失败，响应为 ${JSON.stringify(data)}`
          };
        }
        
        // 提取直播列表数据
        liveList = data.channelListData.liveList || [];
        totalCount = data.channelListData.totalCount || liveList.length;
      } else if (data.liveList) {
        // 备用结构：直接包含liveList
        liveList = data.liveList || [];
        totalCount = data.totalCount || liveList.length;
      } else if (Array.isArray(data)) {
        // 结构3: 响应本身就是数组
        liveList = data;
        totalCount = data.length;
      } else {
        // 无法识别响应结构
        return {
          success: false,
          error: `API响应结构无法识别: ${JSON.stringify(data)}`
        };
      }
      
      // 转换数据格式以匹配函数签名
      const lives = liveList.map((live: any) => ({
        liveId: live.liveId || '',
        title: live.title || '',
        coverUrl: (live.coverUrls && live.coverUrls.length > 0) ? live.coverUrls[0] : '',
        streamerName: live.user?.name || '',
        streamerAvatar: live.user?.headUrl || '',
        viewerCount: live.onlineCount || 0,
        category: live.categoryName || '其他',
        isLive: live.liveStatus === 1 || live.onlineCount > 0
      }));

      return {
        success: true,
        data: {
          lives,
          totalCount: totalCount,
          hasMore: pcursor + count < totalCount
        }
      };
    } catch (error) {
      return {
        success: false,
        error: `获取直播列表失败: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }


  /**
   * 获取指定用户的直播信息
   */
  public async getUserLiveInfo(userID: number): Promise<ApiResponse<{
    profile: {
      userID: number;
      nickname: string;
      avatar: string;
      avatarFrame: string;
      followingCount: number;
      fansCount: number;
      contributeCount: number;
      signature: string;
      verifiedText: string;
      isJoinUpCollege: boolean;
      isFollowing: boolean;
      isFollowed: boolean;
    };
    liveType: {
      categoryID: number;
      categoryName: string;
      subCategoryID: number;
      subCategoryName: string;
    };
    liveID: string;
    streamName: string;
    title: string;
    liveStartTime: number;
    portrait: boolean;
    panoramic: boolean;
    liveCover: string;
    onlineCount: number;
    likeCount: number;
    hasFansClub: boolean;
    disableDanmakuShow: boolean;
    paidShowUserBuyStatus: boolean;
  }>> {
    try {
      // 构建请求URL - 根据source目录中的liveInfoURL格式
      const url = `https://live.acfun.cn/api/live/info?authorId=${userID}`;
      
      // 设置请求头 - 使用核心组件构建通用请求头
      const headers = buildCommonHeaders();
      headers['Referer'] = 'https://live.acfun.cn/';
      
      // 直接使用HttpClient.get发送请求，绕过apiGet的验证
      const response = await this.httpClient.get<any>(url, { headers });
      
      if (!response.success) {
        return {
          success: false,
          error: response.error || '获取指定用户的直播信息失败'
        };
      }

      const data = response.data;
      
      // 检查API响应结果 - 根据source目录中的逻辑，result应该为0
      if (!data || data.result !== 0) {
        return {
          success: false,
          error: `获取指定用户的直播信息失败: ${data ? data.result : '响应数据为空'}`
        };
      }

      // 根据source目录中的getUserLiveInfoJSON逻辑解析直播信息
      const userInfo = {
        profile: {
          userID: data.authorId || userID,
          nickname: data.user?.name || '',
          avatar: data.user?.headUrl || '',
          avatarFrame: data.user?.avatarFrameMobileImg || '',
          followingCount: parseInt(data.user?.following) || 0,
          fansCount: parseInt(data.user?.followed) || 0,
          contributeCount: parseInt(data.user?.contentCount) || 0,
          signature: data.user?.signature || '',
          verifiedText: data.user?.verifiedText || '',
          isJoinUpCollege: data.user?.isContractUp || false,
          isFollowing: data.user?.isFollowing || false,
          isFollowed: data.user?.isFollowed || false
        },
        liveType: {
          categoryID: data.type?.categoryId || 0,
          categoryName: data.type?.categoryName || '',
          subCategoryID: data.type?.id || 0,
          subCategoryName: data.type?.name || ''
        },
        liveID: data.liveId || '',
        streamName: data.streamName || '',
        title: data.title || '',
        liveStartTime: data.createTime || 0,
        portrait: data.portrait || false,
        panoramic: data.panoramic || false,
        liveCover: data.coverUrls?.[0] || '',
        onlineCount: data.onlineCount || 0,
        likeCount: data.likeCount || 0,
        hasFansClub: data.hasFansClub || false,
        disableDanmakuShow: data.disableDanmakuShow || false,
        paidShowUserBuyStatus: data.paidShowUserBuyStatus || false
      };

      return {
        success: true,
        data: userInfo
      };
    } catch (error) {
      return {
        success: false,
        error: `获取指定用户的直播信息失败: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  /**
   * 获取直播统计数据
   */
  public async getLiveStatisticsByDays(days: number): Promise<ApiResponse<{
    beginDate: string;
    endDate: string;
    overview: {
      duration: number;
      maxPopularityValue: number;
      watchCount: number;
      diamondCount: number;
      commentCount: number;
      bananaCount: number;
    };
    liveDetail: Record<string, Array<{
      liveStartTime: number;
      liveEndTime: number;
      liveStat: {
        duration: number;
        maxPopularityValue: number;
        watchCount: number;
        diamondCount: number;
        commentCount: number;
        bananaCount: number;
      };
    }>>;
    dailyData: Array<{
      date: string;
      liveTimes: number;
      liveStat: {
        duration: number;
        maxPopularityValue: number;
        watchCount: number;
        diamondCount: number;
        commentCount: number;
        bananaCount: number;
      };
    }>;
  }>> {
    try {
      // 验证days参数
      if (days < 1) {
        return {
          success: false,
          error: 'days参数必须大于等于1'
        };
      }

      // 从HTTP客户端的认证头中获取token信息
      const { tokenInfo, error: tokenError } = this.httpClient.getValidatedTokenInfo();
      if (tokenError || !tokenInfo) {
        return {
          success: false,
          error: tokenError || 'token信息为空。获取直播统计数据需要登陆主播的AcFun帐号'
        };
      }
      
      if (!tokenInfo.userID || !tokenInfo.serviceToken || !tokenInfo.deviceID) {
        return {
          success: false,
          error: 'token信息不完整，缺少必要的字段。获取直播统计数据需要登陆主播的AcFun帐号'
        };
      }

      // 构建请求URL
      const url = 'https://member.acfun.cn/dataCenter/api/liveData';
      
      // 构建POST请求的表单数据
      const formData = new URLSearchParams();
      formData.append('days', days.toString());

      // 构建完整的Cookie头
      const cookieHeader = buildCookieString(tokenInfo.cookies, tokenInfo.deviceID);

      // 使用HttpClient.post发送请求，绕过apiPost的验证逻辑
      // 因为A站直播API的响应结构可能与apiPost期望的结构不匹配
      const response = await this.httpClient.post<any>(url, formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': cookieHeader
        }
      });

      // 检查响应状态
      if (!response.success) {
        return response as ApiResponse<any>;
      }

      const data = response.data;

      // 验证响应结果 - 直接检查A站API的实际响应结构
      if (!data || typeof data !== 'object') {
        return {
          success: false,
          error: `获取直播统计数据失败，响应数据格式无效: ${JSON.stringify(data)}`
        };
      }

      // 解析统计数据
      const liveStatistics = {
        beginDate: data.beginDate || '',
        endDate: data.endDate || '',
        overview: {
          duration: data.overview?.totalLiveMillisecond || 0,
          maxPopularityValue: data.overview?.maxPopularityValue || 0,
          watchCount: data.overview?.totalViewCount || 0,
          diamondCount: data.overview?.totalDiamondCount || 0,
          commentCount: data.overview?.totalCommentCount || 0,
          bananaCount: data.overview?.totalBananaCount || 0
        },
        liveDetail: {} as Record<string, Array<{
          liveStartTime: number;
          liveEndTime: number;
          liveStat: {
            duration: number;
            maxPopularityValue: number;
            watchCount: number;
            diamondCount: number;
            commentCount: number;
            bananaCount: number;
          };
        }>>,
        dailyData: []
      };

      // 解析单场直播统计数据
      if (data.liveDetail && typeof data.liveDetail === 'object') {
        Object.keys(data.liveDetail).forEach(date => {
          const detailArray = data.liveDetail[date];
          if (Array.isArray(detailArray)) {
            liveStatistics.liveDetail[date] = detailArray.map((detail: any) => ({
              liveStartTime: detail.startTime || 0,
              liveEndTime: detail.endTime || 0,
              liveStat: {
                duration: detail.liveMillisecond || 0,
                maxPopularityValue: detail.maxPopularityValue || 0,
                watchCount: detail.viewCount || 0,
                diamondCount: detail.diamondCount || 0,
                commentCount: detail.commentCount || 0,
                bananaCount: detail.bananaCount || 0
              }
            }));
          }
        });
      }

      // 解析单日直播统计数据
      if (Array.isArray(data.dailyData)) {
        liveStatistics.dailyData = data.dailyData.map((daily: any) => ({
          date: daily.date || '',
          liveTimes: daily.totalLiveTimes || 0,
          liveStat: {
            duration: daily.totalLiveMillisecond || 0,
            maxPopularityValue: daily.maxPopularityValue || 0,
            watchCount: daily.totalViewCount || 0,
            diamondCount: daily.totalDiamondCount || 0,
            commentCount: daily.totalCommentCount || 0,
            bananaCount: daily.totalBananaCount || 0
          }
        }));
      }

      return {
        success: true,
        data: liveStatistics
      };
    } catch (error) {
      return {
        success: false,
        error: `获取直播统计数据失败: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  /**
   * 获取指定用户的详细信息
   */
  public async getUserDetailInfo(userID: number): Promise<ApiResponse<{
    userID: number;
    nickname: string;
    avatar: string;
    avatarFrame: string;
    followingCount: string;
    fansCount: string;
    contributeCount: string;
    signature: string;
    verifiedText: string;
    isJoinUpCollege: boolean;
    isFollowing: boolean;
    isFollowed: boolean;
    liveID?: string;
    likeCount: number;
  }>> {
    try {
      // 验证用户ID
      if (!userID || userID <= 0) {
        return {
          success: false,
          error: '用户ID必须大于0'
        };
      }

      // 构建请求URL - 根据source目录中的userInfoURL格式
      const url = `https://www.acfun.cn/rest/pc-direct/user/userInfo?userId=${userID}`;
      
      // 使用HttpClient.get发送请求，绕过apiGet的验证逻辑
      // 因为A站用户信息API的响应结构可能与apiGet期望的结构不匹配
      const response = await this.httpClient.get<any>(url);
      
      if (!response.success) {
        return response as ApiResponse<any>;
      }

      const data = response.data;
      
      // 验证API响应结果 - 直接检查A站API的实际响应结构
      if (!data || typeof data !== 'object') {
        return {
          success: false,
          error: `获取用户详细信息失败: 响应数据格式无效`
        };
      }

      // 解析用户信息
      const profile = data.profile;
      if (!profile) {
        return {
          success: false,
          error: '用户信息数据为空'
        };
      }

      // 根据source目录中的UserProfileInfo结构构建响应
      const userDetailInfo = {
        userID: profile.userId || userID,
        nickname: profile.name || '',
        avatar: profile.headUrl || '',
        avatarFrame: profile.avatarFrameMobileImg || '',
        followingCount: profile.following || '0',
        fansCount: profile.followed || '0',
        contributeCount: profile.contentCount || '0',
        signature: profile.signature || '',
        verifiedText: profile.verifiedText || '',
        isJoinUpCollege: profile.isContractUp || false,
        isFollowing: profile.isFollowing || false,
        isFollowed: profile.isFollowed || false,
        liveID: profile.liveId || '',
        likeCount: profile.likeCount || 0
      };

      return {
        success: true,
        data: userDetailInfo
      };
    } catch (error) {
      return {
        success: false,
        error: `获取用户详细信息失败: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  /**
   * 检测开播权限
   */
  public async checkLivePermission(): Promise<ApiResponse<{
    liveAuth: boolean;
  }>> {
    try {
      // 从HTTP客户端的认证头中获取token信息
      const { tokenInfo, error } = this.httpClient.getValidatedTokenInfo();
      if (error || !tokenInfo) {
        return {
          success: false,
          error: error || 'token信息为空'
        };
      }
      
      if (!tokenInfo.cookies || tokenInfo.cookies.length === 0) {
        return {
          success: false,
          error: 'token信息不完整，缺少cookies字段'
        };
      }

      // 构建请求URL - 根据source目录中的checkLiveAuthURL
      const url = 'https://member.acfun.cn/common/api/checkLiveAuth';
      
      // 构建POST请求的表单数据 - 根据source目录中的实现，不需要额外参数
      const formData = new URLSearchParams();
      
      // 构建完整的Cookie头
      const cookieHeader = buildCookieString(tokenInfo.cookies, tokenInfo.deviceID);

      // 使用HttpClient.post发送请求 - 绕过apiPost的验证，直接处理A站API响应
      const response = await this.httpClient.post<any>(url, formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': cookieHeader
        }
      });
      
      // 检查HTTP响应状态
      if (!response.success) {
        return response as ApiResponse<any>;
      }

      const data = response.data;
      
      // 验证响应数据是否为有效对象
      if (!data || typeof data !== 'object') {
        return {
          success: false,
          error: '检测开播权限失败: API返回无效的响应数据'
        };
      }
      
      // 验证响应结果 - 根据source目录中的逻辑：result为0表示成功
      if (data.result !== 0) {
        return {
          success: false,
          error: `检测开播权限失败: ${data.error || '未知错误'}`
        };
      }

      // 检查开播权限 - 根据source目录中的逻辑：authority.status为3表示有开播权限
      const liveAuth = data.authority?.status === 3;

      return {
        success: true,
        data: { liveAuth }
      };
    } catch (error) {
      return {
        success: false,
        error: `检测开播权限失败: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }


  /**
   * 获取推流设置
   */
  public async getStreamSettings(): Promise<ApiResponse<{
    streamName: string;
    streamPullAddress: string;
    streamPushAddress: string[];
    panoramic: boolean;
    intervalMillis: number;
  }>> {
    try {
      // 从HTTP客户端的认证头中获取token信息
      const { tokenInfo, error } = this.httpClient.getValidatedTokenInfo();
      if (error || !tokenInfo) {
        return {
          success: false,
          error: error || 'token信息为空'
        };
      }
      
      if (!tokenInfo.cookies || tokenInfo.cookies.length === 0) {
        return {
          success: false,
          error: 'token信息不完整，缺少cookies字段'
        };
      }

      // 构建请求URL - 根据source目录中的obsConfigURL
      // 格式: https://api.kuaishouzt.com/rest/zt/live/web/obs/config?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=%d&did=%s&%s=%s
      const url = `https://api.kuaishouzt.com/rest/zt/live/web/obs/config?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=${tokenInfo.userID}&did=${tokenInfo.deviceID}&acfun.midground.api_st=${tokenInfo.serviceToken}`;
      
      // 构建POST请求的表单数据 - 根据source目录中的实现，不需要额外参数
      const formData = new URLSearchParams();
      
      // 构建完整的Cookie头
      const cookieHeader = buildCookieString(tokenInfo.cookies, tokenInfo.deviceID);

      // 使用HttpClient.post发送请求 - 绕过apiPost的验证，直接处理A站API响应
      const response = await this.httpClient.post(url, formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': cookieHeader
        }
      });
      
      // 检查API响应是否成功
      if (!response.success) {
        return {
          success: false,
          error: response.error || '获取推流设置失败'
        };
      }

      const responseData = response.data;
      
      // 验证响应数据是否为有效对象
      if (!responseData || typeof responseData !== 'object') {
        return {
          success: false,
          error: '获取推流设置失败: 无效的API响应格式'
        };
      }

      // 验证响应结果 - 根据source目录中的逻辑：result为1表示成功
      if (responseData.result !== 1) {
        return {
          success: false,
          error: `获取推流设置失败: ${responseData.error || '未知错误'}`
        };
      }

      // 解析推流设置 - 直接返回API响应的原始字段
      const streamSettings = responseData.data;
      
      // 直接返回API响应的原始字段
      return {
        success: true,
        data: {
          streamName: streamSettings.streamName || '',
          streamPullAddress: streamSettings.streamPullAddress || '',
          streamPushAddress: Array.isArray(streamSettings.streamPushAddress) 
            ? streamSettings.streamPushAddress 
            : [],
          panoramic: streamSettings.panoramic || false,
          intervalMillis: streamSettings.intervalMillis || 5000
        }
      };
    } catch (error) {
      return {
        success: false,
        error: `获取推流设置失败: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  /**
   * 获取直播流状态
   */
  public async getLiveStreamStatus(): Promise<ApiResponse<{
    liveID: string;        // 直播 ID
    streamName: string;    // 直播源名字
    title: string;         // 直播间标题
    liveCover: string;     // 直播间封面
    liveStartTime: number; // 直播开始的时间，是以毫秒为单位的 Unix 时间
    panoramic: boolean;     // 是否全景直播
    bizUnit: string;       // 通常是"acfun"
    bizCustomData: string; // 直播分类，格式是 json
    isLive: boolean;       // 是否正在开播
  }>> {
    try {
      // 从HTTP客户端的认证头中获取token信息
      const { tokenInfo, error } = this.httpClient.getValidatedTokenInfo();
      if (error || !tokenInfo) {
        return {
          success: false,
          error: error || 'token信息为空'
        };
      }
      
      if (!tokenInfo.cookies || tokenInfo.cookies.length === 0) {
        return {
          success: false,
          error: 'token信息不完整，缺少cookies字段'
        };
      }

      // 构建请求URL - 根据source目录中的obsStatusURL
      // 格式: https://api.kuaishouzt.com/rest/zt/live/web/obs/status?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=%d&did=%s&%s=%s
      // 根据是否有cookies决定serviceTokenType：登录用户用'acfun.midground.api_st'，游客用'acfun.api.visitor_st'
      const serviceTokenType = tokenInfo.cookies && tokenInfo.cookies.length > 0 ? 'acfun.midground.api_st' : 'acfun.api.visitor_st';
      const url = `https://api.kuaishouzt.com/rest/zt/live/web/obs/status?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=${tokenInfo.userID}&did=${tokenInfo.deviceID}&${serviceTokenType}=${tokenInfo.serviceToken}`;
      
      // 构建POST请求的表单数据 - 根据source目录中的实现，不需要额外参数
      const formData = new URLSearchParams();
      
      // 构建完整的Cookie头
      const cookieHeader = buildCookieString(tokenInfo.cookies, tokenInfo.deviceID);

      const response = await this.httpClient.post<any>(url, formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': cookieHeader
        }
      });
      
      if (!response.success) {
        return response as ApiResponse<any>;
      }

      const data = response.data;
      
      // 验证响应结果
      if (data.result !== 1) {
        const msg = String(data.error_msg || data.error || '');
        const code = Number(data.result);
        const notLive = msg.includes('未开播') || code === 380023;
        if (notLive) {
          return {
            success: true,
            data: {
              liveID: '',
              streamName: '',
              title: '',
              liveCover: '',
              liveStartTime: 0,
              panoramic: false,
              bizUnit: '',
              bizCustomData: '',
              isLive: false
            }
          };
        }
        return {
          success: false,
          error: `获取直播流状态失败: ${msg || '未知错误'}`
        };
      }

      // 解析直播流状态 - 根据source目录中的逻辑进行字段映射
      const streamData = data.data;
      const streamStatus = {
        liveID: streamData.liveId || '',           // 映射 liveId -> liveID
        streamName: streamData.streamName || '',   // streamName 保持不变
        title: streamData.caption || '',           // 映射 caption -> title
        liveCover: streamData.cover ? (streamData.cover[0]?.url || '') : '', // 映射 cover[0].url -> liveCover
        liveStartTime: streamData.createTime || 0, // 映射 createTime -> liveStartTime
        panoramic: streamData.panoramic || false,   // panoramic 保持不变
        bizUnit: streamData.bizUnit || '',         // bizUnit 保持不变
        bizCustomData: streamData.bizCustomData || '', // bizCustomData 保持不变
        isLive: true
      };

      return {
        success: true,
        data: streamStatus
      };
    } catch (error) {
      return {
        success: false,
        error: `获取直播流状态失败: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  /**
   * 获取转码信息
   */
  public async getTranscodeInfo(streamName: string): Promise<ApiResponse<Array<{
    streamURL: {
      url: string;
      bitrate: number;
      qualityType: string;
      qualityName: string;
    };
    resolution: string;
    frameRate: number;
    template: string;
  }>>> {
    try {
      // 从HTTP客户端的认证头中获取并验证token信息
      const { tokenInfo, error: tokenError } = this.httpClient.getValidatedTokenInfo();
      if (tokenError || !tokenInfo) {
        return {
          success: false,
          error: tokenError || 'token信息为空'
        };
      }
      
      // 检查token信息是否完整
      if (!tokenInfo.userID || !tokenInfo.serviceToken || !tokenInfo.deviceID) {
        return {
          success: false,
          error: 'token信息不完整，缺少必要的字段。获取转码信息需要登陆主播的AcFun帐号'
        };
      }
      
      // 检查cookies是否存在
      if (!tokenInfo.cookies || tokenInfo.cookies.length === 0) {
        return {
          success: false,
          error: 'token信息不完整，缺少cookies字段。获取转码信息需要登陆主播的AcFun帐号'
        };
      }

      // 构建请求URL - 根据source目录中的transcodeInfoURL格式
      // 格式: https://api.kuaishouzt.com/rest/zt/live/web/obs/transcodeInfo?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=%d&did=%s&%s=%s
      const serviceTokenType = 'acfun.midground.api_st';
      const url = `https://api.kuaishouzt.com/rest/zt/live/web/obs/transcodeInfo?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=${tokenInfo.userID}&did=${tokenInfo.deviceID}&${serviceTokenType}=${tokenInfo.serviceToken}`;
      
      // 构建POST请求的表单数据 - 根据source目录中的实现，需要streamName参数
      const formData = new URLSearchParams();
      formData.append('streamName', streamName);

      // 构建完整的Cookie头
      const cookieHeader = buildCookieString(tokenInfo.cookies, tokenInfo.deviceID);

      // 使用HttpClient.post发送请求 - 绕过apiPost的验证，直接处理快手API响应
      const response = await this.httpClient.post<any>(url, formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': cookieHeader,
          'Referer': 'https://live.acfun.cn/'
        }
      });
      
      if (!response.success) {
        return response as ApiResponse<any>;
      }

      const data = response.data;
      
      // 验证响应结果 - 根据source目录中的逻辑：result为1表示成功
      if (data.result !== 1) {
        return {
          success: false,
          error: `获取转码信息失败: ${data.error || '未知错误'}`
        };
      }

      // 解析转码信息列表 - 根据source目录中的transcodeInfoList字段
      const transcodeInfoList = data.data?.transcodeInfoList;
      if (!Array.isArray(transcodeInfoList)) {
        return {
          success: false,
          error: '获取转码信息失败: 响应中未包含有效的转码信息列表'
        };
      }

      // 转换数据格式以匹配函数签名
      const transcodeInfos = transcodeInfoList.map((info: any) => ({
        streamURL: {
          url: info.pullUrl || '',
          bitrate: info.bitRate || 0,
          qualityType: info.qualityType || '',
          qualityName: info.qualityTypeName || ''
        },
        resolution: info.resolution || '',
        frameRate: info.frameRate || 0,
        template: info.template || ''
      }));

      return {
        success: true,
        data: transcodeInfos
      };
    } catch (error) {
      return {
        success: false,
        error: `获取转码信息失败: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  /**
   * 开始直播
   */
  public async startLiveStream(title: string, coverFile: string, streamName: string, portrait: boolean, panoramic: boolean, categoryID: number, subCategoryID: number): Promise<ApiResponse<{
    liveID: string;
  }>> {
    try {
      // 从HTTP客户端的认证头中获取并验证token信息
      const { tokenInfo, error: tokenError } = this.httpClient.getValidatedTokenInfo();
      if (tokenError || !tokenInfo) {
        return {
          success: false,
          error: tokenError || 'token信息为空'
        };
      }
      
      // 检查token信息是否完整
      if (!tokenInfo.userID || !tokenInfo.serviceToken || !tokenInfo.deviceID) {
        return {
          success: false,
          error: 'token信息不完整，缺少必要的字段。开始直播需要登陆主播的AcFun帐号'
        };
      }
      
      // 检查cookies是否存在
      if (!tokenInfo.cookies || tokenInfo.cookies.length === 0) {
        return {
          success: false,
          error: 'token信息不完整，缺少cookies字段。开始直播需要登陆主播的AcFun帐号'
        };
      }

      // 构建快手API的URL - 根据source目录中的startPushURL格式
      const url = `https://api.kuaishouzt.com/rest/zt/live/web/obs/startPush?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=${tokenInfo.userID}&did=${tokenInfo.deviceID}&acfun.midground.api_st=${tokenInfo.serviceToken}&videoPushReq=&streamName=${streamName}&portrait=${portrait}&isPanoramic=${panoramic}`;
      
      // 构建查询参数 - 根据source目录中的pushQuery函数逻辑
      const queryParams = new URLSearchParams();
      queryParams.append('caption', title);
      
      // 添加直播分类信息
      if (categoryID && subCategoryID) {
        queryParams.append('bizCustomData', `{\"typeId\":${subCategoryID},\"type\":[${categoryID},${subCategoryID}]}`);
      }
      
      const queryString = queryParams.toString();
      const fullUrl = queryString ? `${url}&${queryString}` : url;
      
      let requestBody: any = '';
      let contentType = 'application/x-www-form-urlencoded';

      if (coverFile) {
        const urlMatch = /^https?:\/\//i.test(coverFile);
        const dataUriMatch = /^data:image\/(png|jpe?g|gif|webp);base64,/i.test(coverFile);
        const pureBase64Match = !dataUriMatch && /^[A-Za-z0-9+/=]+$/i.test(coverFile);

        let filename = 'cover.bin';
        let bytes: Buffer | null = null;
        if (urlMatch) {
          try {
            const u = new URL(coverFile);
            const name = u.pathname.split('/').filter(Boolean).pop();
            if (name) filename = name;
          } catch {}
          const resp = await this.httpClient.get<any>(coverFile, { responseType: 'arraybuffer' } as any);
          if (!resp.success || !resp.data) {
            return { success: false, error: '封面下载失败' };
          }
          bytes = Buffer.from(resp.data);
        } else if (dataUriMatch) {
          const comma = coverFile.indexOf(',');
          const meta = coverFile.substring(0, comma);
          const body = coverFile.substring(comma + 1);
          if (/image\/png/i.test(meta)) filename = 'cover.png';
          else if (/image\/jpe?g/i.test(meta)) filename = 'cover.jpg';
          else if (/image\/gif/i.test(meta)) filename = 'cover.gif';
          else if (/image\/webp/i.test(meta)) filename = 'cover.webp';
          bytes = Buffer.from(body, 'base64');
        } else if (pureBase64Match) {
          bytes = Buffer.from(coverFile, 'base64');
        } else {
          return { success: false, error: '封面仅支持互联网图片URL或Base64' };
        }

        if (!bytes) {
          return { success: false, error: '封面处理失败' };
        }

        const boundary = `----acfunlive_${Date.now()}`;
        const head = Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="cover"; filename="${filename}"\r\nContent-Type: application/octet-stream\r\n\r\n`);
        const tail = Buffer.from(`\r\n--${boundary}--\r\n`);
        requestBody = Buffer.concat([head, bytes, tail]);
        contentType = `multipart/form-data; boundary=${boundary}`;
      }

      // 构建完整的Cookie头
      const cookieHeader = buildCookieString(tokenInfo.cookies, tokenInfo.deviceID);

      let response: ApiResponse<any>;
      if (contentType.startsWith('multipart/form-data')) {
        response = await this.httpClient.post<any>(fullUrl, requestBody, {
          headers: {
            'Content-Type': contentType,
            'Cookie': cookieHeader,
            'Referer': 'https://live.acfun.cn/'
          }
        });
      } else {
        response = await apiPost<any>(
          this.httpClient,
          fullUrl,
          '开始直播',
          requestBody,
          {
            headers: {
              'Content-Type': contentType,
              'Cookie': cookieHeader,
              'Referer': 'https://live.acfun.cn/'
            }
          },
          1
        );
      }
      
      if (!response.success) {
        return response as ApiResponse<any>;
      }

      const data = response.data;
      
      // 验证响应结果 - 根据source目录中的逻辑：result为1表示成功
      if (data.result !== 1) {
        return {
          success: false,
          error: `开始直播失败: ${data.error || '未知错误'}`
        };
      }

      // 解析直播ID
      const liveID = data.data?.liveId || '';
      if (!liveID) {
        return {
          success: false,
          error: '开始直播失败: 响应中未包含直播ID'
        };
      }

      return {
        success: true,
        data: { liveID }
      };
    } catch (error) {
      return {
        success: false,
        error: `开始直播失败: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  /**
   * 停止直播
   */
  public async stopLiveStream(liveId: string): Promise<ApiResponse<{
    duration: number;
    endReason: string;
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

      // 根据source目录中的stopPushURL格式构建请求URL
      // stopPushURL格式: https://api.kuaishouzt.com/rest/zt/live/web/stopPush?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=%d&did=%s&%s=%s
      const url = `https://api.kuaishouzt.com/rest/zt/live/web/stopPush?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=${tokenInfo.userID}&did=${tokenInfo.deviceID}&acfun.midground.api_st=${tokenInfo.serviceToken}`;
      
      // 根据source目录中的逻辑，需要传递form参数
      const formData = new URLSearchParams();
      formData.append('liveId', liveId);
      
      const response = await apiPost<any>(
        this.httpClient,
        url,
        '停止直播',
        formData.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        },
        1
      );
      
      if (!response.success) {
        return response as ApiResponse<any>;
      }

      const data = response.data;

      // 验证响应结果
      if (data.result !== 1) {
        return {
          success: false,
          error: `停止直播失败，响应为 ${JSON.stringify(data)}`
        };
      }

      // 解析停止直播返回的信息
      const stopInfo = data.data;
      const stopPushInfo = {
        duration: stopInfo.durationMs || 0, // 直播时长，单位为毫秒
        endReason: stopInfo.endReason || 'author stopped' // 停止直播的原因
      };

      return {
        success: true,
        data: stopPushInfo
      };
    } catch (error) {
      return {
        success: false,
        error: `停止直播失败: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  /**
   * 更改直播间标题和封面
   */
  public async updateLiveRoom(title: string, coverFile: string, liveId: string): Promise<ApiResponse<void>> {
    try {
      // 从HTTP客户端的认证头中获取并验证token信息
      const { tokenInfo, error } = this.httpClient.getValidatedTokenInfo();
      if (error || !tokenInfo) {
        return {
          success: false,
          error: error || 'token信息不完整，缺少必要的字段'
        };
      }

      // 根据source目录中的changeCoverURL格式构建请求URL
      // changeCoverURL格式: https://api.kuaishouzt.com/rest/zt/live/web/changeCover?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=%d&did=%s&acfun.midground.api_st=%s&videoPushReq=&liveId=%s
      const url = `https://api.kuaishouzt.com/rest/zt/live/web/changeCover?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=${tokenInfo.userID}&did=${tokenInfo.deviceID}&acfun.midground.api_st=${tokenInfo.serviceToken}&videoPushReq=&liveId=${liveId}`;
      
      // 根据source目录中的pushQuery逻辑构建标题参数
      const queryParams = new URLSearchParams();
      queryParams.append('caption', title);
      const query = queryParams.toString();
      const fullUrl = query ? `${url}&${query}` : url;
      
      // 处理封面文件
      let requestBody: any = '';
      let contentType = 'application/x-www-form-urlencoded';
      
      if (coverFile) {
        const urlMatch = /^https?:\/\//i.test(coverFile);
        const dataUriMatch = /^data:image\/(png|jpe?g|gif|webp);base64,/i.test(coverFile);
        const pureBase64Match = !dataUriMatch && /^[A-Za-z0-9+/=]+$/i.test(coverFile);

        let filename = 'cover.bin';
        let bytes: Buffer | null = null;
        if (urlMatch) {
          try {
            const u = new URL(coverFile);
            const name = u.pathname.split('/').filter(Boolean).pop();
            if (name) filename = name;
          } catch {}
          const resp = await this.httpClient.get<any>(coverFile, { responseType: 'arraybuffer' } as any);
          if (!resp.success || !resp.data) {
            return { success: false, error: '封面下载失败' };
          }
          bytes = Buffer.from(resp.data);
        } else if (dataUriMatch) {
          const comma = coverFile.indexOf(',');
          const meta = coverFile.substring(0, comma);
          const body = coverFile.substring(comma + 1);
          if (/image\/png/i.test(meta)) filename = 'cover.png';
          else if (/image\/jpe?g/i.test(meta)) filename = 'cover.jpg';
          else if (/image\/gif/i.test(meta)) filename = 'cover.gif';
          else if (/image\/webp/i.test(meta)) filename = 'cover.webp';
          bytes = Buffer.from(body, 'base64');
        } else if (pureBase64Match) {
          bytes = Buffer.from(coverFile, 'base64');
        } else {
          return { success: false, error: '封面仅支持互联网图片URL或Base64' };
        }

        if (!bytes) {
          return { success: false, error: '封面处理失败' };
        }

        const boundary = `----acfunlive_${Date.now()}`;
        const head = Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="cover"; filename="${filename}"\r\nContent-Type: application/octet-stream\r\n\r\n`);
        const tail = Buffer.from(`\r\n--${boundary}--\r\n`);
        requestBody = Buffer.concat([head, bytes, tail]);
        contentType = `multipart/form-data; boundary=${boundary}`;
      }
      
      const response = await this.httpClient.post<any>(fullUrl, requestBody, {
        headers: {
          'Content-Type': contentType
        }
      });
      
      if (!response.success) {
        return response as ApiResponse<any>;
      }

      const data = response.data;

      // 验证响应结果 - 根据source目录中的逻辑：result为1表示成功
      if (data.result !== 1) {
        return {
          success: false,
          error: `更改直播间标题和封面失败，响应为 ${JSON.stringify(data)}`
        };
      }

      return {
        success: true,
        data: undefined
      };
    } catch (error) {
      return {
        success: false,
        error: `更改直播间标题和封面失败: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  /**
   * 查询是否允许观众剪辑直播录像
   */
  public async checkLiveClipPermission(): Promise<ApiResponse<{
    canCut: boolean;
  }>> {
    try {
      // 从HTTP客户端的认证头中获取并验证token信息
      const { tokenInfo, error: tokenError } = this.httpClient.getValidatedTokenInfo();
      if (tokenError || !tokenInfo) {
        return {
          success: false,
          error: tokenError || 'token信息为空'
        };
      }
      
      // 检查token信息是否完整
      if (!tokenInfo.userID || !tokenInfo.serviceToken || !tokenInfo.deviceID) {
        return {
          success: false,
          error: 'token信息不完整，缺少必要的字段。查询剪辑权限需要登陆主播的AcFun帐号'
        };
      }
      
      // 检查cookies是否存在
      if (!tokenInfo.cookies || tokenInfo.cookies.length === 0) {
        return {
          success: false,
          error: 'token信息不完整，缺少cookies字段。查询剪辑权限需要登陆主播的AcFun帐号'
        };
      }

      // 构建请求URL - 根据source目录中的liveCutStatusURL
      const url = 'https://member.acfun.cn/liveToll/api/getUserLiveCut';
      
      // 构建完整的Cookie头
      const cookieHeader = buildCookieString(tokenInfo.cookies, tokenInfo.deviceID);

      // 使用HttpClient.post直接发送请求 - 绕过apiPost的认证检查
      const response = await this.httpClient.post<any>(url, '', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': cookieHeader,
          'Referer': 'https://live.acfun.cn/'
        }
      });
      
      if (!response.success) {
        return response as ApiResponse<any>;
      }

      const data = response.data;
      
      // 验证响应结果 - 根据source目录中的逻辑：result为0表示成功
      if (!data.result && data.result !== 0) {
        return {
          success: false,
          error: `查询剪辑权限失败: ${data.error || '未知错误'}`
        };
      }

      // 解析剪辑权限状态 - 根据source目录中的逻辑：1表示允许，2表示不允许
      const liveCutStatus = data.liveCutStatus;
      if (liveCutStatus === undefined) {
        return {
          success: false,
          error: '查询剪辑权限失败: 响应中未包含liveCutStatus字段'
        };
      }

      const canCut = liveCutStatus === 1;
      
      return {
        success: true,
        data: { canCut }
      };
    } catch (error) {
      return {
        success: false,
        error: `查询剪辑权限失败: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  /**
   * 设置是否允许观众剪辑直播录像
   */
  public async setLiveClipPermission(canCut: boolean): Promise<ApiResponse<void>> {
    try {
      // 从HTTP客户端的认证头中获取并验证token信息
      const { tokenInfo, error: tokenError } = this.httpClient.getValidatedTokenInfo();
      if (tokenError || !tokenInfo) {
        return {
          success: false,
          error: tokenError || 'token信息为空'
        };
      }
      
      // 检查token信息是否完整
      if (!tokenInfo.userID || !tokenInfo.serviceToken || !tokenInfo.deviceID) {
        return {
          success: false,
          error: 'token信息不完整，缺少必要的字段。设置剪辑权限需要登陆主播的AcFun帐号'
        };
      }
      
      // 检查cookies是否存在
      if (!tokenInfo.cookies || tokenInfo.cookies.length === 0) {
        return {
          success: false,
          error: 'token信息不完整，缺少cookies字段。设置剪辑权限需要登陆主播的AcFun帐号'
        };
      }

      // 构建请求URL - 根据source目录中的updateLiveCutURL
      const url = 'https://member.acfun.cn/liveTool/api/updateLiveCut';
      
      // 构建请求体 - 根据source目录中的liveCutStatus格式
      const status = canCut ? 1 : 2;
      const requestBody = JSON.stringify({ status });
      
      // 构建完整的Cookie头
      const cookieHeader = buildCookieString(tokenInfo.cookies, tokenInfo.deviceID);

      // 使用HttpClient.post直接发送请求 - 遵循UserService.ts的格式规范
      const response = await this.httpClient.post<any>(url, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Cookie': cookieHeader,
          'Referer': 'https://live.acfun.cn/'
        }
      });
      
      if (!response.success) {
        return response as ApiResponse<any>;
      }

      const data = response.data;
      
      // 验证响应结果 - 根据source目录中的逻辑：result为0表示成功
      if (!data.result && data.result !== 0) {
        return {
          success: false,
          error: `设置剪辑权限失败: ${data.error || '未知错误'}`
        };
      }

      // 验证返回的状态是否与设置的一致
      const returnStatus = data.liveCutStatus;
      if (returnStatus === undefined) {
        return {
          success: false,
          error: '设置剪辑权限失败: 响应中未包含liveCutStatus字段'
        };
      }

      if (status !== returnStatus) {
        return {
          success: false,
          error: `设置剪辑权限失败: 期望状态${status}，实际返回${returnStatus}`
        };
      }
      
      return {
        success: true,
        data: undefined
      };
    } catch (error) {
      return {
        success: false,
        error: `设置剪辑权限失败: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  /**
   * 获取直播剪辑信息
   */
  public async getLiveClipInfo(liverUID: number, liveID: string): Promise<ApiResponse<{
    status: boolean;
    url: string;
    redirectURL: string;
  }>> {
    try {
      // 从HTTP客户端的认证头中获取并验证token信息
      const { tokenInfo, error: tokenError } = this.httpClient.getValidatedTokenInfo();
      if (tokenError || !tokenInfo) {
        return {
          success: false,
          error: tokenError || 'token信息为空'
        };
      }
      
      // 检查token信息是否完整
      if (!tokenInfo.userID || !tokenInfo.serviceToken || !tokenInfo.deviceID) {
        return {
          success: false,
          error: 'token信息不完整，缺少必要的字段。获取直播剪辑信息需要登录AcFun账号'
        };
      }
      
      // 检查cookies是否存在
      if (!tokenInfo.cookies || tokenInfo.cookies.length === 0) {
        return {
          success: false,
          error: 'token信息不完整，缺少cookies字段。获取直播剪辑信息需要登录AcFun账号'
        };
      }

      // 获取AcFun token
      const cookieHeader = buildCookieString(tokenInfo.cookies, tokenInfo.deviceID);
      
      const tokenResponse = await this.httpClient.post('https://id.app.acfun.cn/rest/web/token/get', {
        sid: 'acfun.midground.api',
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': cookieHeader,
          'Referer': 'https://live.acfun.cn/',
        },
      });

      if (!tokenResponse.data || tokenResponse.data.result !== 0) {
        return {
          success: false,
          error: '获取AcFun token失败',
        };
      }

      const authToken = tokenResponse.data['acfun.midground.api'];

      // 获取直播剪辑信息
      const response = await this.httpClient.get(`https://live.acfun.cn/rest/pc-direct/live/getLiveCutInfo?authorId=${liverUID}&liveId=${liveID}`, {
        headers: {
          'Cookie': cookieHeader,
        },
      });

      const result = response.data;
      console.log(result)
      if (!result || result.result !== 0) {
        return {
          success: false,
          error: '获取直播剪辑信息失败',
        };
      }

      // 处理liveCutStatus
      let status = false;
      const statusNum = result.liveCutStatus;
      if (statusNum === 1) {
        status = true;
      } else if (statusNum === 2) {
        status = false;
      } else {
        return {
          success: false,
          error: '获取直播剪辑信息失败，状态码异常',
        };
      }

      const url = result.liveCutUrl || '';
      const redirectURL = `https://onvideoapi.kuaishou.com/rest/infra/sts?authToken=${authToken}&sid=acfun.midground.api&followUrl=${encodeURIComponent(url)}`;

      return {
        success: true,
        data: {
          status,
          url,
          redirectURL,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: `获取直播剪辑信息失败: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }

  /**
   * 获取直播总结信息
   * @param liveId 直播ID
   * @returns 直播总结数据，包含观看时长、点赞数、观看人数、礼物数、钻石数、香蕉数
   */
  public async getSummary(liveId: string): Promise<ApiResponse<{
    liveDurationMs: number;
    likeCount: number;
    watchCount: number;
    giftCount: number;
    diamondCount: number;
    bananaCount: number;
  }>> {
    try {
      // 参数验证
      if (!liveId || typeof liveId !== 'string') {
        return {
          success: false,
          error: '直播ID不能为空且必须为字符串',
        };
      }

      // 使用kuaiShouApiPost发送请求
      const response = await kuaiShouApiPost(
        this.httpClient,
        'https://api.kuaishouzt.com/rest/zt/live/web/endSummary?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB',
        '获取直播总结',
        { liveId }
      );

      if (!response.success) {
        return {
          success: false,
          error: response.error || '获取直播总结失败',
        };
      }

      const data = response.data as any;

      // 验证响应数据结构
      if (!data || typeof data !== 'object') {
        return {
          success: false,
          error: '响应数据格式错误',
        };
      }

      // 解析响应数据
      const liveDurationMs = parseInt(data.liveDurationMs) || 0;
      const likeCount = parseInt(data.likeCount) || 0;
      const watchCount = parseInt(data.watchCount) || 0;
      const giftCount = parseInt(data.giftCount) || 0;
      const diamondCount = parseInt(data.diamondCount) || 0;
      const bananaCount = parseInt(data.bananaCount) || 0;

      return {
        success: true,
        data: {
          liveDurationMs,
          likeCount,
          watchCount,
          giftCount,
          diamondCount,
          bananaCount,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: `获取直播总结失败: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }

  public async getWatchingList(liveId: string): Promise<ApiResponse<WatchingUser[]>> {
    if (!liveId || typeof liveId !== 'string') {
      return { success: false, error: '直播ID不能为空且必须为字符串' };
    }

    const response = await kuaiShouApiPost<any>(
      this.httpClient,
      'https://api.kuaishouzt.com/rest/zt/live/web/watchingList?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB',
      '获取直播间观众列表',
      { liveId }
    );

    if (!response.success) {
      return response as ApiResponse<WatchingUser[]>;
    }

    const data = response.data;
    const list = Array.isArray(data?.list) ? data.list : [];

    const users: WatchingUser[] = list.map((item: any) => ({
      userInfo: {
        userID: Number(item?.userId) || 0,
        nickname: String(item?.nickname || ''),
        avatar: (Array.isArray(item?.avatar) && item.avatar[0]?.url) ? String(item.avatar[0].url) : '',
        medal: { uperID: 0, userID: 0, clubName: '', level: 0 },
        managerType: (item?.managerType ?? 0) as ManagerType,
      },
      anonymousUser: item?.anonymousUser === true,
      displaySendAmount: String(item?.displaySendAmount ?? ''),
      customData: String(item?.customWatchingListData ?? ''),
    }));

    return { success: true, data: users };
  }
}