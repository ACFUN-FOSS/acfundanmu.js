import { HttpClient } from '../core/HttpClient';
import { ApiResponse } from '../types';
export declare class LivePreviewService {
    private httpClient;
    constructor(httpClient: HttpClient);
    /**
     * 获取直播预告列表
     */
    getLivePreviewList(): Promise<ApiResponse<{
        previewList: Array<{
            userId: number;
            userName: string;
            liveTitle: string;
            liveCover: string;
            scheduledTime: string;
        }>;
    }>>;
}
