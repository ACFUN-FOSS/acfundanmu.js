import { ConnectionConfig } from '../types';
/**
 * 心跳统计数据
 */
interface HeartbeatStats {
    sessionId: string;
    sentCount: number;
    successCount: number;
    failedCount: number;
    consecutiveFailed: number;
    lastSentTime: number;
    lastResponseTime: number;
    avgLatency: number;
    latencyHistory: number[];
}
/**
 * 心跳管理器
 * 负责管理弹幕会话的心跳机制，支持自适应心跳间隔
 */
export declare class HeartbeatManager {
    private config;
    private timers;
    private stats;
    private intervals;
    constructor(config: ConnectionConfig);
    /**
     * 初始化心跳统计
     */
    initStats(sessionId: string): void;
    /**
     * 启动心跳
     */
    start(sessionId: string, callback: () => Promise<void>, intervalOverride?: number): void;
    /**
     * 停止心跳
     */
    stop(sessionId: string): void;
    /**
     * 发送心跳
     */
    private sendHeartbeat;
    /**
     * 心跳成功回调
     */
    onHeartbeatSuccess(sessionId: string): void;
    /**
     * 心跳失败回调
     */
    onHeartbeatFailed(sessionId: string, error: string): void;
    /**
     * 调整心跳间隔（自适应策略）
     */
    private adjustHeartbeatInterval;
    /**
     * 检查心跳健康状态
     */
    checkHealth(sessionId: string): {
        isHealthy: boolean;
        reason?: string;
    };
    /**
     * 获取心跳统计
     */
    getStats(sessionId: string): HeartbeatStats | undefined;
    /**
     * 获取心跳成功率
     */
    getSuccessRate(sessionId: string): number;
    /**
     * 获取平均延迟
     */
    getAvgLatency(sessionId: string): number;
    /**
     * 获取当前心跳间隔
     */
    getCurrentInterval(sessionId: string): number;
    /**
     * 重置统计数据
     */
    resetStats(sessionId: string): void;
    /**
     * 清理资源
     */
    cleanup(sessionId: string): void;
    /**
     * 获取所有会话的心跳统计
     */
    getAllStats(): Map<string, HeartbeatStats>;
}
export {};
