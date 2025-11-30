import { HttpClient } from '../core/HttpClient';
import { ApiResponse, LiveRoomInfo, DanmuSessionState, DanmuMessage, ConnectionConfig, SessionSummary, SessionDetail, HealthCheckResult, GlobalStatistics, BatchOperationResult, CleanupResult } from '../types';
export declare class DanmuService {
    private httpClient;
    private sessions;
    private wsClients;
    private heartbeatTimers;
    private reconnectManager;
    private heartbeatManager;
    private healthCheckManager;
    private sessionManager;
    private giftRegistry;
    private readonly WS_HOST;
    private readonly TIMEOUT;
    private config;
    constructor(httpClient: HttpClient, config?: Partial<ConnectionConfig>);
    /**
     * 获取直播间信息
     */
    getLiveRoomInfo(liverUID: string): Promise<ApiResponse<LiveRoomInfo>>;
    /**
     * 开始获取弹幕
     */
    startDanmu(liverUID: string, callback: (event: DanmuMessage) => void, captureRaw?: boolean): Promise<ApiResponse<{
        sessionId: string;
        liverUID: number;
        StreamInfo?: any;
    }>>;
    /**
     * 停止获取弹幕
     */
    stopDanmu(sessionId: string): Promise<ApiResponse<void>>;
    /**
     * 获取直播 token
     */
    private getLiveToken;
    /**
     * 连接 WebSocket
     */
    private connectWebSocket;
    /**
     * 发送注册消息
     */
    private sendRegisterMessage;
    /**
     * 处理 WebSocket 消息
     */
    private handleWebSocketMessage;
    /**
     * 处理命令消息
     */
    private handleCommand;
    /**
     * 处理注册响应
     */
    private handleRegisterResponse;
    /**
     * 处理交互命令
     */
    private handleCsCmd;
    /**
     * 处理推送消息
     */
    private handlePushMessage;
    /**
     * 处理断开连接
     */
    private handleDisconnect;
    /**
     * 尝试重连
     */
    private attemptReconnect;
    /**
     * 销毁会话
     */
    private destroySession;
    /**
     * 生成会话 ID
     */
    private generateSessionId;
    /**
     * 发送 KeepAlive 消息
     */
    private sendKeepAlive;
    /**
     * 发送 EnterRoom 消息
     */
    private sendEnterRoom;
    /**
     * 发送推送消息响应
     */
    private sendPushMessageResponse;
    private saveRawOnce;
    /**
     * 启动心跳
     */
    private startHeartbeat;
    /**
     * 发送心跳
     */
    private sendHeartbeat;
    /**
     * 处理行为信号（弹幕、礼物等）
     */
    private handleActionSignal;
    /**
     * 处理状态信号
     */
    private handleStateSignal;
    /**
     * 处理通知信号
     */
    private handleNotifySignal;
    /**
     * 处理状态变更
     */
    private handleStatusChanged;
    /**
     * 发送弹幕
     * @param liveId 直播间ID
     * @param content 弹幕内容
     */
    sendDanmu(liveId: string, content: string): Promise<ApiResponse<any>>;
    /**
     * 获取所有会话列表
     */
    getAllSessions(): ApiResponse<SessionSummary[]>;
    /**
     * 获取会话详情
     */
    getSessionDetail(sessionId: string): ApiResponse<SessionDetail>;
    /**
     * 按主播UID查询会话
     */
    getSessionsByLiver(liverUID: string): ApiResponse<SessionSummary[]>;
    /**
     * 按状态筛选会话
     */
    getSessionsByState(state: DanmuSessionState): ApiResponse<SessionSummary[]>;
    /**
     * 获取会话健康状态
     */
    getSessionHealth(sessionId: string): ApiResponse<HealthCheckResult>;
    /**
     * 获取全局统计信息
     */
    getSessionStatistics(): ApiResponse<GlobalStatistics>;
    /**
     * 暂停会话
     */
    pauseSession(sessionId: string): ApiResponse<void>;
    /**
     * 恢复会话
     */
    resumeSession(sessionId: string): ApiResponse<void>;
    /**
     * 重启会话
     */
    restartSession(sessionId: string): Promise<ApiResponse<void>>;
    /**
     * 批量暂停会话
     */
    pauseSessions(sessionIds: string[]): ApiResponse<BatchOperationResult>;
    /**
     * 批量恢复会话
     */
    resumeSessions(sessionIds: string[]): ApiResponse<BatchOperationResult>;
    /**
     * 批量停止会话
     */
    stopSessions(sessionIds: string[]): Promise<ApiResponse<BatchOperationResult>>;
    /**
     * 批量重启会话
     */
    restartSessions(sessionIds: string[]): Promise<ApiResponse<BatchOperationResult>>;
    /**
     * 清理空闲会话
     */
    cleanupIdleSessions(idleTimeout: number): ApiResponse<CleanupResult>;
    /**
     * 清理失败会话
     */
    cleanupFailedSessions(): ApiResponse<CleanupResult>;
}
