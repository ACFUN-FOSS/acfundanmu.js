import { ConnectionConfig, HealthCheckData, HealthCheckResult, SessionStatistics } from '../types';
import { HeartbeatManager } from './HeartbeatManager';
/**
 * 健康检查管理器
 * 负责监控弹幕会话的健康状态
 */
export declare class HealthCheckManager {
    private config;
    private healthData;
    private checkTimers;
    private heartbeatManager;
    constructor(config: ConnectionConfig, heartbeatManager: HeartbeatManager);
    /**
     * 初始化健康检查数据
     */
    initHealthData(sessionId: string): void;
    /**
     * 启动定期健康检查
     */
    startPeriodicCheck(sessionId: string, interval?: number): void;
    /**
     * 停止定期健康检查
     */
    stopPeriodicCheck(sessionId: string): void;
    /**
     * 执行健康检查
     */
    performHealthCheck(sessionId: string, wsState?: number, stats?: SessionStatistics): HealthCheckResult;
    /**
     * 计算健康得分（0-100）
     */
    private calculateHealthScore;
    /**
     * 判断健康状态
     */
    private determineHealthStatus;
    /**
     * 生成优化建议
     */
    private generateRecommendations;
    /**
     * 更新WebSocket状态
     */
    updateWsState(sessionId: string, wsState: number): void;
    /**
     * 更新错误计数
     */
    incrementErrorCount(sessionId: string): void;
    /**
     * 重置错误计数
     */
    resetErrorCount(sessionId: string): void;
    /**
     * 获取健康数据
     */
    getHealthData(sessionId: string): HealthCheckData | undefined;
    /**
     * 获取健康得分
     */
    getHealthScore(sessionId: string): number;
    /**
     * 检查是否健康
     */
    isHealthy(sessionId: string): boolean;
    /**
     * 检查所有会话健康状态
     */
    checkAllSessions(): Map<string, HealthCheckResult>;
    /**
     * 创建默认健康数据
     */
    private createDefaultHealthData;
    /**
     * 清理资源
     */
    cleanup(sessionId: string): void;
    /**
     * 获取所有健康数据
     */
    getAllHealthData(): Map<string, HealthCheckData>;
}
