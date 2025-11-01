import { HttpClient } from '../core/HttpClient';
import { ApiResponse } from '../types';
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
export declare class UserService {
    private httpClient;
    constructor(httpClient: HttpClient);
    /**
     * 获取用户信息
     */
    getUserInfo(userId: string): Promise<ApiResponse<UserInfoResponse>>;
    /**
     * 获取用户钱包信息
     */
    getWalletInfo(): Promise<ApiResponse<{
        balance: number;
        bananaCount: number;
        giftCount: number;
        rechargeHistory: Array<{
            amount: number;
            time: number;
            status: string;
        }>;
    }>>;
}
