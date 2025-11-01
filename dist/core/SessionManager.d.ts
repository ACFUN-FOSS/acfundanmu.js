import { DanmuSession, DanmuSessionState, SessionSummary, SessionDetail, SessionStatistics, PerformanceMetrics, ErrorRecord, GlobalStatistics, BatchOperationResult, CleanupResult } from '../types';
import { HealthCheckManager } from './HealthCheckManager';
/**
 * 扩展的会话数据（内部使用）
 */
interface ExtendedSessionData {
    session: DanmuSession;
    createdAt: number;
    connectedAt: number;
    lastActiveAt: number;
    isPaused: boolean;
    pausedAt?: number;
    statistics: SessionStatistics;
    performanceMetrics: PerformanceMetrics;
    errorHistory: ErrorRecord[];
}
/**
 * 会话管理器
 * 负责管理所有弹幕会话的生命周期和状态
 */
export declare class SessionManager {
    private sessions;
    private liverUIDIndex;
    private stateIndex;
    private healthCheckManager;
    constructor(healthCheckManager: HealthCheckManager);
    /**
     * 初始化状态索引
     */
    private initializeStateIndex;
    /**
     * 创建会话
     */
    createSession(session: DanmuSession): void;
    /**
     * 获取会话
     */
    getSession(sessionId: string): DanmuSession | undefined;
    /**
     * 获取扩展会话数据
     */
    getExtendedData(sessionId: string): ExtendedSessionData | undefined;
    /**
     * 更新会话状态
     */
    updateSessionState(sessionId: string, newState: DanmuSessionState): void;
    /**
     * 更新索引
     */
    private updateIndex;
    /**
     * 移除会话
     */
    removeSession(sessionId: string): boolean;
    /**
     * 获取所有会话摘要
     */
    getAllSessions(): SessionSummary[];
    /**
     * 获取会话详情
     */
    getSessionDetail(sessionId: string): SessionDetail | null;
    /**
     * 创建会话摘要
     */
    private createSessionSummary;
    /**
     * 按主播UID获取会话
     */
    getSessionsByLiver(liverUID: string): SessionSummary[];
    /**
     * 按状态获取会话
     */
    getSessionsByState(state: DanmuSessionState): SessionSummary[];
    /**
     * 更新统计信息
     */
    updateStatistics(sessionId: string, updates: Partial<SessionStatistics>): void;
    /**
     * 增加消息计数
     */
    incrementMessageCount(sessionId: string): void;
    /**
     * 增加错误计数
     */
    incrementErrorCount(sessionId: string): void;
    /**
     * 添加错误记录
     */
    addErrorRecord(sessionId: string, error: ErrorRecord): void;
    /**
     * 暂停会话
     */
    pauseSession(sessionId: string): boolean;
    /**
     * 恢复会话
     */
    resumeSession(sessionId: string): boolean;
    /**
     * 清理空闲会话
     */
    cleanupIdleSessions(idleTimeout: number): CleanupResult;
    /**
     * 清理失败会话
     */
    cleanupFailedSessions(): CleanupResult;
    /**
     * 获取全局统计
     */
    getGlobalStatistics(): GlobalStatistics;
    /**
     * 批量停止会话
     */
    batchStopSessions(sessionIds: string[]): BatchOperationResult;
    /**
     * 获取会话数量
     */
    getSessionCount(): number;
    /**
     * 会话是否存在
     */
    hasSession(sessionId: string): boolean;
}
export {};
