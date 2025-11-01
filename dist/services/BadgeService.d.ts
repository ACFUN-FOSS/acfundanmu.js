import { HttpClient } from '../core/HttpClient';
import { ApiResponse, Badge, BadgeDetail, BadgeRank } from '../types';
export declare class BadgeService {
    private httpClient;
    constructor(httpClient: HttpClient);
    /**
     * 获取登陆用户拥有的指定主播守护徽章详细信息
     */
    getBadgeDetail(uperID: number): Promise<ApiResponse<BadgeDetail>>;
    /**
     * 获取登陆用户拥有的守护徽章列表
     */
    getBadgeList(): Promise<ApiResponse<Badge[]>>;
    /**
     * 获取主播守护榜
     */
    getBadgeRank(uperID: number): Promise<ApiResponse<BadgeRank[]>>;
    /**
     * 获取指定用户正在佩戴的守护徽章信息
     */
    getWornBadge(userID: number): Promise<ApiResponse<Badge>>;
    /**
     * 佩戴守护徽章
     */
    wearBadge(uperID: number): Promise<ApiResponse<void>>;
    /**
     * 取消佩戴守护徽章
     */
    unwearBadge(): Promise<ApiResponse<void>>;
}
