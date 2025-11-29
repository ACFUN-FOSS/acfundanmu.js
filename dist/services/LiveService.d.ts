import { HttpClient } from '../core/HttpClient';
import { ApiResponse, LiveRoomInfo, WatchingUser } from '../types';
export declare class LiveService {
    private httpClient;
    constructor(httpClient: HttpClient);
    private buildCoverUploadBody;
    /**
     * 获取直播推流地址
     */
    getStreamUrl(liveId: string): Promise<ApiResponse<{
        rtmpUrl: string;
        streamKey: string;
        expiresAt: number;
    }>>;
    /**
     * 获取热门直播列表
     */
    getHotLives(category?: string, page?: number, size?: number): Promise<ApiResponse<{
        lives: LiveRoomInfo[];
        total: number;
    }>>;
    /**
     * 获取直播分类列表
     */
    getLiveCategories(): Promise<ApiResponse<Array<{
        categoryID: number;
        categoryName: string;
        subCategoryID: number;
        subCategoryName: string;
    }>>>;
    /**
     * 获取直播统计数据
     */
    getLiveStatistics(userId: number): Promise<ApiResponse<{
        totalViewers: number;
        peakViewers: number;
        totalComments: number;
        totalGifts: number;
        totalLikes: number;
        revenue: number;
    }>>;
    /**
     * 获取直播列表
     */
    getLiveList(page?: number, pageSize?: number): Promise<ApiResponse<{
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
    }>>;
    /**
     * 获取指定用户的直播信息
     */
    getUserLiveInfo(userID: number): Promise<ApiResponse<{
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
    }>>;
    /**
     * 获取直播统计数据
     */
    getLiveStatisticsByDays(days: number): Promise<ApiResponse<{
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
    }>>;
    /**
     * 获取指定用户的详细信息
     */
    getUserDetailInfo(userID: number): Promise<ApiResponse<{
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
    }>>;
    /**
     * 检测开播权限
     */
    checkLivePermission(): Promise<ApiResponse<{
        liveAuth: boolean;
    }>>;
    /**
     * 获取推流设置
     */
    getStreamSettings(): Promise<ApiResponse<{
        streamName: string;
        streamPullAddress: string;
        streamPushAddress: string[];
        panoramic: boolean;
        intervalMillis: number;
    }>>;
    /**
     * 获取直播流状态
     */
    getLiveStreamStatus(): Promise<ApiResponse<{
        liveID: string;
        streamName: string;
        title: string;
        liveCover: string;
        liveStartTime: number;
        panoramic: boolean;
        bizUnit: string;
        bizCustomData: string;
        isLive: boolean;
    }>>;
    /**
     * 获取转码信息
     */
    getTranscodeInfo(streamName: string): Promise<ApiResponse<Array<{
        streamURL: {
            url: string;
            bitrate: number;
            qualityType: string;
            qualityName: string;
        };
        resolution: string;
        frameRate: number;
        template: string;
    }>>>;
    /**
     * 开始直播
     */
    startLiveStream(title: string, coverFile: string, streamName: string, portrait: boolean, panoramic: boolean, categoryID: number, subCategoryID: number): Promise<ApiResponse<{
        liveID: string;
    }>>;
    /**
     * 停止直播
     */
    stopLiveStream(liveId: string): Promise<ApiResponse<{
        duration: number;
        endReason: string;
    }>>;
    /**
     * 更改直播间标题和封面
     */
    updateLiveRoom(title: string, coverFile: string, liveId: string): Promise<ApiResponse<void>>;
    /**
     * 查询是否允许观众剪辑直播录像
     */
    checkLiveClipPermission(): Promise<ApiResponse<{
        canCut: boolean;
    }>>;
    /**
     * 设置是否允许观众剪辑直播录像
     */
    setLiveClipPermission(canCut: boolean): Promise<ApiResponse<void>>;
    /**
     * 获取直播剪辑信息
     */
    getLiveClipInfo(liverUID: number, liveID: string): Promise<ApiResponse<{
        status: boolean;
        url: string;
        redirectURL: string;
    }>>;
    /**
     * 获取直播总结信息
     * @param liveId 直播ID
     * @returns 直播总结数据，包含观看时长、点赞数、观看人数、礼物数、钻石数、香蕉数
     */
    getSummary(liveId: string): Promise<ApiResponse<{
        liveDurationMs: number;
        likeCount: number;
        watchCount: number;
        giftCount: number;
        diamondCount: number;
        bananaCount: number;
    }>>;
    getWatchingList(liveId: string): Promise<ApiResponse<WatchingUser[]>>;
}
