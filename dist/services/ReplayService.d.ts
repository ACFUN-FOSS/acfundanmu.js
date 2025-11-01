import { HttpClient } from '../core/HttpClient';
import { ApiResponse } from '../types';
export declare class ReplayService {
    private httpClient;
    constructor(httpClient: HttpClient);
    /**
     * 获取直播回放信息
     * @param liveId 直播ID
     */
    getLiveReplay(liveId: string): Promise<ApiResponse<any>>;
}
