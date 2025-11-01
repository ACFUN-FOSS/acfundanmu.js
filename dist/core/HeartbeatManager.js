"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeartbeatManager = void 0;
/**
 * 心跳管理器
 * 负责管理弹幕会话的心跳机制，支持自适应心跳间隔
 */
class HeartbeatManager {
    constructor(config) {
        this.timers = new Map();
        this.stats = new Map();
        this.intervals = new Map();
        this.config = config;
    }
    /**
     * 初始化心跳统计
     */
    initStats(sessionId) {
        const stats = {
            sessionId,
            sentCount: 0,
            successCount: 0,
            failedCount: 0,
            consecutiveFailed: 0,
            lastSentTime: 0,
            lastResponseTime: 0,
            avgLatency: 0,
            latencyHistory: []
        };
        this.stats.set(sessionId, stats);
        // 设置默认心跳间隔
        this.intervals.set(sessionId, this.config.heartbeatInterval);
        console.log(`[HeartbeatManager] 初始化心跳统计: ${sessionId}, 默认间隔: ${this.config.heartbeatInterval}ms`);
    }
    /**
     * 启动心跳
     */
    start(sessionId, callback, intervalOverride) {
        // 停止旧的心跳
        this.stop(sessionId);
        const interval = intervalOverride || this.intervals.get(sessionId) || this.config.heartbeatInterval;
        console.log(`[HeartbeatManager] 启动心跳: ${sessionId}, 间隔: ${interval}ms`);
        const timer = setInterval(async () => {
            await this.sendHeartbeat(sessionId, callback);
        }, interval);
        this.timers.set(sessionId, timer);
        this.intervals.set(sessionId, interval);
    }
    /**
     * 停止心跳
     */
    stop(sessionId) {
        const timer = this.timers.get(sessionId);
        if (timer) {
            clearInterval(timer);
            this.timers.delete(sessionId);
            console.log(`[HeartbeatManager] 停止心跳: ${sessionId}`);
        }
    }
    /**
     * 发送心跳
     */
    async sendHeartbeat(sessionId, callback) {
        const stats = this.stats.get(sessionId);
        if (!stats) {
            console.error('[HeartbeatManager] 未找到心跳统计');
            return;
        }
        stats.sentCount++;
        stats.lastSentTime = Date.now();
        try {
            await callback();
            this.onHeartbeatSuccess(sessionId);
        }
        catch (error) {
            this.onHeartbeatFailed(sessionId, error instanceof Error ? error.message : String(error));
        }
    }
    /**
     * 心跳成功回调
     */
    onHeartbeatSuccess(sessionId) {
        const stats = this.stats.get(sessionId);
        if (!stats)
            return;
        const latency = Date.now() - stats.lastSentTime;
        stats.successCount++;
        stats.consecutiveFailed = 0; // 重置连续失败计数
        stats.lastResponseTime = Date.now();
        // 更新延迟历史
        stats.latencyHistory.push(latency);
        if (stats.latencyHistory.length > 20) {
            stats.latencyHistory.shift(); // 只保留最近20条
        }
        // 计算平均延迟
        stats.avgLatency = stats.latencyHistory.reduce((a, b) => a + b, 0) / stats.latencyHistory.length;
        // 自适应心跳间隔调整
        if (this.config.enableAdaptiveHeartbeat) {
            this.adjustHeartbeatInterval(sessionId);
        }
        console.log(`[HeartbeatManager] 心跳成功: ${sessionId}, 延迟: ${latency}ms, 平均延迟: ${stats.avgLatency.toFixed(2)}ms`);
    }
    /**
     * 心跳失败回调
     */
    onHeartbeatFailed(sessionId, error) {
        const stats = this.stats.get(sessionId);
        if (!stats)
            return;
        stats.failedCount++;
        stats.consecutiveFailed++;
        console.error(`[HeartbeatManager] 心跳失败: ${sessionId}, 连续失败: ${stats.consecutiveFailed}次, 错误: ${error}`);
        // 检查是否达到失败阈值
        if (stats.consecutiveFailed >= this.config.heartbeatFailureThreshold) {
            console.error(`[HeartbeatManager] 心跳连续失败${stats.consecutiveFailed}次，达到阈值`);
        }
    }
    /**
     * 调整心跳间隔（自适应策略）
     */
    adjustHeartbeatInterval(sessionId) {
        const stats = this.stats.get(sessionId);
        if (!stats)
            return;
        const currentInterval = this.intervals.get(sessionId) || this.config.heartbeatInterval;
        const avgLatency = stats.avgLatency;
        const errorRate = stats.failedCount / (stats.sentCount || 1);
        let newInterval = currentInterval;
        // 根据网络延迟调整
        if (avgLatency < 50) {
            // 低延迟网络，可以延长心跳间隔
            newInterval = Math.min(20000, currentInterval * 1.2);
        }
        else if (avgLatency > 200) {
            // 高延迟网络，缩短心跳间隔
            newInterval = Math.max(5000, currentInterval * 0.8);
        }
        else {
            // 正常网络，保持默认
            newInterval = this.config.heartbeatInterval;
        }
        // 根据错误率调整
        if (errorRate > 0.05) {
            // 错误率超过5%，使用最小间隔
            newInterval = 5000;
        }
        else if (errorRate > 0.01) {
            // 错误率1-5%，缩短间隔
            newInterval = Math.max(8000, newInterval);
        }
        // 只有间隔变化超过20%才重启心跳
        if (Math.abs(newInterval - currentInterval) / currentInterval > 0.2) {
            console.log(`[HeartbeatManager] 调整心跳间隔: ${sessionId}, ${currentInterval}ms -> ${newInterval}ms`);
            // 不直接重启，而是等待下次心跳周期应用新间隔
            this.intervals.set(sessionId, newInterval);
        }
    }
    /**
     * 检查心跳健康状态
     */
    checkHealth(sessionId) {
        const stats = this.stats.get(sessionId);
        if (!stats) {
            return { isHealthy: false, reason: '未找到心跳统计' };
        }
        // 检查连续失败次数
        if (stats.consecutiveFailed >= this.config.heartbeatFailureThreshold) {
            return {
                isHealthy: false,
                reason: `心跳连续失败${stats.consecutiveFailed}次`
            };
        }
        // 检查心跳超时
        const timeSinceLastResponse = Date.now() - stats.lastResponseTime;
        if (stats.lastResponseTime > 0 && timeSinceLastResponse > this.config.heartbeatTimeout) {
            return {
                isHealthy: false,
                reason: `心跳超时${timeSinceLastResponse}ms`
            };
        }
        // 检查成功率
        const successRate = stats.successCount / (stats.sentCount || 1);
        if (stats.sentCount >= 10 && successRate < 0.8) {
            return {
                isHealthy: false,
                reason: `心跳成功率过低${(successRate * 100).toFixed(1)}%`
            };
        }
        return { isHealthy: true };
    }
    /**
     * 获取心跳统计
     */
    getStats(sessionId) {
        return this.stats.get(sessionId);
    }
    /**
     * 获取心跳成功率
     */
    getSuccessRate(sessionId) {
        const stats = this.stats.get(sessionId);
        if (!stats || stats.sentCount === 0)
            return 0;
        return stats.successCount / stats.sentCount;
    }
    /**
     * 获取平均延迟
     */
    getAvgLatency(sessionId) {
        const stats = this.stats.get(sessionId);
        return stats?.avgLatency || 0;
    }
    /**
     * 获取当前心跳间隔
     */
    getCurrentInterval(sessionId) {
        return this.intervals.get(sessionId) || this.config.heartbeatInterval;
    }
    /**
     * 重置统计数据
     */
    resetStats(sessionId) {
        const stats = this.stats.get(sessionId);
        if (stats) {
            stats.sentCount = 0;
            stats.successCount = 0;
            stats.failedCount = 0;
            stats.consecutiveFailed = 0;
            stats.latencyHistory = [];
            stats.avgLatency = 0;
            console.log(`[HeartbeatManager] 重置心跳统计: ${sessionId}`);
        }
    }
    /**
     * 清理资源
     */
    cleanup(sessionId) {
        this.stop(sessionId);
        this.stats.delete(sessionId);
        this.intervals.delete(sessionId);
        console.log(`[HeartbeatManager] 清理心跳资源: ${sessionId}`);
    }
    /**
     * 获取所有会话的心跳统计
     */
    getAllStats() {
        return new Map(this.stats);
    }
}
exports.HeartbeatManager = HeartbeatManager;
//# sourceMappingURL=HeartbeatManager.js.map