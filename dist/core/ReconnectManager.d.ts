import { ConnectionConfig, ReconnectState, DanmuSession, ErrorCode, ErrorType, ErrorRecord } from '../types';
/**
 * 重连管理器
 * 负责管理弹幕会话的自动重连逻辑
 */
export declare class ReconnectManager {
    private reconnectStates;
    private config;
    constructor(config: ConnectionConfig);
    /**
     * 初始化重连状态
     */
    initReconnectState(sessionId: string): void;
    /**
     * 记录断开原因
     */
    recordDisconnect(sessionId: string, reason: string, error?: string): void;
    /**
     * 判断是否应该重连
     */
    shouldReconnect(sessionId: string, closeCode?: number): boolean;
    /**
     * 计算退避时间（指数退避）
     */
    calculateBackoffTime(sessionId: string): number;
    /**
     * 开始重连
     */
    startReconnect(sessionId: string): void;
    /**
     * 重连成功
     */
    onReconnectSuccess(sessionId: string): void;
    /**
     * 重连失败
     */
    onReconnectFailed(sessionId: string, error: string): void;
    /**
     * 保存会话状态
     */
    saveSessionState(sessionId: string, session: Partial<DanmuSession>): void;
    /**
     * 恢复会话状态
     */
    restoreSessionState(sessionId: string): any;
    /**
     * 获取重连状态
     */
    getReconnectState(sessionId: string): ReconnectState | undefined;
    /**
     * 是否正在重连
     */
    isReconnecting(sessionId: string): boolean;
    /**
     * 清理重连状态
     */
    cleanup(sessionId: string): void;
    /**
     * 创建错误记录
     */
    createErrorRecord(errorType: ErrorType, errorCode: ErrorCode, message: string, context?: any): ErrorRecord;
    /**
     * 分析断开原因
     */
    analyzeDisconnectReason(closeCode?: number, error?: Error): {
        reason: string;
        shouldRetry: boolean;
    };
}
