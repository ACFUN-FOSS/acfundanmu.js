import { HttpClient } from '../core/HttpClient';
import { ApiResponse, KickRecord } from '../types';
export declare class ManagerService {
    private httpClient;
    constructor(httpClient: HttpClient);
    /**
     * 获取房管列表
     */
    getManagerList(): Promise<ApiResponse<any>>;
    /**
     * 添加房管
     */
    addManager(managerUID: number): Promise<ApiResponse<void>>;
    /**
     * 删除房管
     * @param managerUID 房管的用户ID
     */
    deleteManager(managerUID: number): Promise<ApiResponse<void>>;
    /**
     * 获取主播踢人记录
     */
    getAuthorKickRecords(liveId: string, count?: number, page?: number): Promise<ApiResponse<KickRecord[]>>;
    /**
     * 房管踢人
     */
    managerKick(liveID: string, kickedUID: number): Promise<ApiResponse<void>>;
    /**
     * 主播踢人
     */
    authorKick(liveID: string, kickedUID: number): Promise<ApiResponse<void>>;
}
