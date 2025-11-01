"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionManager = void 0;
const types_1 = require("../types");
/**
 * 会话管理器
 * 负责管理所有弹幕会话的生命周期和状态
 */
class SessionManager {
    constructor(healthCheckManager) {
        this.sessions = new Map();
        this.liverUIDIndex = new Map(); // liverUID -> sessionIds
        this.stateIndex = new Map(); // state -> sessionIds
        this.healthCheckManager = healthCheckManager;
        this.initializeStateIndex();
    }
    /**
     * 初始化状态索引
     */
    initializeStateIndex() {
        for (const state of Object.values(types_1.DanmuSessionState)) {
            this.stateIndex.set(state, new Set());
        }
    }
    /**
     * 创建会话
     */
    createSession(session) {
        const now = Date.now();
        const extendedData = {
            session,
            createdAt: now,
            connectedAt: 0,
            lastActiveAt: now,
            isPaused: false,
            statistics: {
                messageCount: 0,
                errorCount: 0,
                reconnectCount: 0,
                heartbeatSent: 0,
                heartbeatSuccess: 0,
                heartbeatFailed: 0,
                lastMessageTime: now,
                lastErrorTime: 0
            },
            performanceMetrics: {
                avgLatency: 0,
                p95Latency: 0,
                p99Latency: 0,
                messageRate: 0,
                errorRate: 0
            },
            errorHistory: []
        };
        this.sessions.set(session.sessionId, extendedData);
        this.updateIndex(session.sessionId, session.liverUID, session.state);
        console.log(`[SessionManager] 创建会话: ${session.sessionId}, 主播: ${session.liverUID}`);
    }
    /**
     * 获取会话
     */
    getSession(sessionId) {
        return this.sessions.get(sessionId)?.session;
    }
    /**
     * 获取扩展会话数据
     */
    getExtendedData(sessionId) {
        return this.sessions.get(sessionId);
    }
    /**
     * 更新会话状态
     */
    updateSessionState(sessionId, newState) {
        const data = this.sessions.get(sessionId);
        if (!data) {
            console.error(`[SessionManager] 会话不存在: ${sessionId}`);
            return;
        }
        const oldState = data.session.state;
        // 从旧状态索引中移除
        this.stateIndex.get(oldState)?.delete(sessionId);
        // 更新状态
        data.session.state = newState;
        data.lastActiveAt = Date.now();
        // 添加到新状态索引
        this.stateIndex.get(newState)?.add(sessionId);
        // 记录连接时间
        if (newState === types_1.DanmuSessionState.Active && oldState !== types_1.DanmuSessionState.Active) {
            data.connectedAt = Date.now();
        }
        console.log(`[SessionManager] 更新会话状态: ${sessionId}, ${oldState} -> ${newState}`);
    }
    /**
     * 更新索引
     */
    updateIndex(sessionId, liverUID, state) {
        // 更新主播UID索引
        if (!this.liverUIDIndex.has(liverUID)) {
            this.liverUIDIndex.set(liverUID, new Set());
        }
        this.liverUIDIndex.get(liverUID)?.add(sessionId);
        // 更新状态索引
        this.stateIndex.get(state)?.add(sessionId);
    }
    /**
     * 移除会话
     */
    removeSession(sessionId) {
        const data = this.sessions.get(sessionId);
        if (!data) {
            return false;
        }
        const { liverUID, state } = data.session;
        // 从索引中移除
        this.liverUIDIndex.get(liverUID)?.delete(sessionId);
        this.stateIndex.get(state)?.delete(sessionId);
        // 删除会话
        this.sessions.delete(sessionId);
        console.log(`[SessionManager] 移除会话: ${sessionId}`);
        return true;
    }
    /**
     * 获取所有会话摘要
     */
    getAllSessions() {
        const summaries = [];
        for (const [sessionId, data] of this.sessions) {
            summaries.push(this.createSessionSummary(sessionId, data));
        }
        return summaries;
    }
    /**
     * 获取会话详情
     */
    getSessionDetail(sessionId) {
        const data = this.sessions.get(sessionId);
        if (!data) {
            return null;
        }
        const summary = this.createSessionSummary(sessionId, data);
        const healthData = this.healthCheckManager.getHealthData(sessionId);
        return {
            ...summary,
            enterRoomAttach: data.session.enterRoomAttach,
            instanceID: data.session.instanceID,
            tickets: data.session.tickets,
            ticketIndex: data.session.ticketIndex,
            isPaused: data.isPaused,
            pausedAt: data.pausedAt,
            healthCheckData: healthData || {
                sessionId,
                wsState: 0,
                heartbeatSuccessRate: 0,
                avgResponseTime: 0,
                errorCount: 0,
                connectionDuration: 0,
                lastHeartbeatTime: 0,
                healthScore: 0,
                status: 'unhealthy'
            },
            statistics: { ...data.statistics },
            performanceMetrics: { ...data.performanceMetrics },
            errorHistory: [...data.errorHistory]
        };
    }
    /**
     * 创建会话摘要
     */
    createSessionSummary(sessionId, data) {
        const healthData = this.healthCheckManager.getHealthData(sessionId);
        return {
            sessionId,
            liverUID: data.session.liverUID,
            liveID: data.session.liveID,
            state: data.session.state,
            createdAt: data.createdAt,
            connectedAt: data.connectedAt,
            lastActiveAt: data.lastActiveAt,
            messageCount: data.statistics.messageCount,
            errorCount: data.statistics.errorCount,
            reconnectCount: data.statistics.reconnectCount,
            healthScore: healthData?.healthScore || 0,
            wsReadyState: healthData?.wsState || 0
        };
    }
    /**
     * 按主播UID获取会话
     */
    getSessionsByLiver(liverUID) {
        const sessionIds = this.liverUIDIndex.get(liverUID);
        if (!sessionIds) {
            return [];
        }
        const summaries = [];
        for (const sessionId of sessionIds) {
            const data = this.sessions.get(sessionId);
            if (data) {
                summaries.push(this.createSessionSummary(sessionId, data));
            }
        }
        return summaries;
    }
    /**
     * 按状态获取会话
     */
    getSessionsByState(state) {
        const sessionIds = this.stateIndex.get(state);
        if (!sessionIds) {
            return [];
        }
        const summaries = [];
        for (const sessionId of sessionIds) {
            const data = this.sessions.get(sessionId);
            if (data) {
                summaries.push(this.createSessionSummary(sessionId, data));
            }
        }
        return summaries;
    }
    /**
     * 更新统计信息
     */
    updateStatistics(sessionId, updates) {
        const data = this.sessions.get(sessionId);
        if (!data)
            return;
        Object.assign(data.statistics, updates);
        data.lastActiveAt = Date.now();
    }
    /**
     * 增加消息计数
     */
    incrementMessageCount(sessionId) {
        const data = this.sessions.get(sessionId);
        if (!data)
            return;
        data.statistics.messageCount++;
        data.statistics.lastMessageTime = Date.now();
        data.lastActiveAt = Date.now();
    }
    /**
     * 增加错误计数
     */
    incrementErrorCount(sessionId) {
        const data = this.sessions.get(sessionId);
        if (!data)
            return;
        data.statistics.errorCount++;
        data.statistics.lastErrorTime = Date.now();
    }
    /**
     * 添加错误记录
     */
    addErrorRecord(sessionId, error) {
        const data = this.sessions.get(sessionId);
        if (!data)
            return;
        data.errorHistory.push(error);
        // 只保留最近100条错误记录
        if (data.errorHistory.length > 100) {
            data.errorHistory = data.errorHistory.slice(-100);
        }
    }
    /**
     * 暂停会话
     */
    pauseSession(sessionId) {
        const data = this.sessions.get(sessionId);
        if (!data)
            return false;
        data.isPaused = true;
        data.pausedAt = Date.now();
        console.log(`[SessionManager] 暂停会话: ${sessionId}`);
        return true;
    }
    /**
     * 恢复会话
     */
    resumeSession(sessionId) {
        const data = this.sessions.get(sessionId);
        if (!data)
            return false;
        data.isPaused = false;
        data.pausedAt = undefined;
        data.lastActiveAt = Date.now();
        console.log(`[SessionManager] 恢复会话: ${sessionId}`);
        return true;
    }
    /**
     * 清理空闲会话
     */
    cleanupIdleSessions(idleTimeout) {
        const now = Date.now();
        const cleanedSessionIds = [];
        for (const [sessionId, data] of this.sessions) {
            const idleTime = now - data.lastActiveAt;
            if (idleTime > idleTimeout) {
                this.removeSession(sessionId);
                cleanedSessionIds.push(sessionId);
            }
        }
        console.log(`[SessionManager] 清理空闲会话: ${cleanedSessionIds.length}个`);
        return {
            cleanedCount: cleanedSessionIds.length,
            sessionIds: cleanedSessionIds
        };
    }
    /**
     * 清理失败会话
     */
    cleanupFailedSessions() {
        const cleanedSessionIds = [];
        for (const [sessionId, data] of this.sessions) {
            if (data.session.state === types_1.DanmuSessionState.Error) {
                this.removeSession(sessionId);
                cleanedSessionIds.push(sessionId);
            }
        }
        console.log(`[SessionManager] 清理失败会话: ${cleanedSessionIds.length}个`);
        return {
            cleanedCount: cleanedSessionIds.length,
            sessionIds: cleanedSessionIds
        };
    }
    /**
     * 获取全局统计
     */
    getGlobalStatistics() {
        let totalSessions = 0;
        let activeSessions = 0;
        let failedSessions = 0;
        let totalMessages = 0;
        let totalErrors = 0;
        let totalConnectionTime = 0;
        let totalReconnectCount = 0;
        let healthySessionCount = 0;
        const latencies = [];
        for (const [sessionId, data] of this.sessions) {
            totalSessions++;
            if (data.session.state === types_1.DanmuSessionState.Active) {
                activeSessions++;
            }
            if (data.session.state === types_1.DanmuSessionState.Error) {
                failedSessions++;
            }
            totalMessages += data.statistics.messageCount;
            totalErrors += data.statistics.errorCount;
            totalReconnectCount += data.statistics.reconnectCount;
            if (data.connectedAt > 0) {
                totalConnectionTime += Date.now() - data.connectedAt;
            }
            const healthScore = this.healthCheckManager.getHealthScore(sessionId);
            if (healthScore >= 90) {
                healthySessionCount++;
            }
            if (data.performanceMetrics.avgLatency > 0) {
                latencies.push(data.performanceMetrics.avgLatency);
            }
        }
        // 计算平均值
        const avgConnectionTime = totalSessions > 0 ? totalConnectionTime / totalSessions : 0;
        const avgReconnectCount = totalSessions > 0 ? totalReconnectCount / totalSessions : 0;
        const healthRate = totalSessions > 0 ? healthySessionCount / totalSessions : 0;
        // 计算延迟统计
        latencies.sort((a, b) => a - b);
        const avgLatency = latencies.length > 0 ? latencies.reduce((a, b) => a + b, 0) / latencies.length : 0;
        const p95Latency = latencies.length > 0 ? latencies[Math.floor(latencies.length * 0.95)] : 0;
        const p99Latency = latencies.length > 0 ? latencies[Math.floor(latencies.length * 0.99)] : 0;
        // 计算速率
        const messageRate = totalMessages > 0 && avgConnectionTime > 0 ? (totalMessages / (avgConnectionTime / 1000)) : 0;
        const errorRate = totalMessages > 0 ? totalErrors / totalMessages : 0;
        return {
            totalSessions,
            activeSessions,
            failedSessions,
            totalMessages,
            totalErrors,
            avgConnectionTime,
            avgReconnectCount,
            messageRate,
            healthRate,
            avgLatency,
            p95Latency,
            p99Latency,
            errorRate
        };
    }
    /**
     * 批量停止会话
     */
    batchStopSessions(sessionIds) {
        const result = {
            total: sessionIds.length,
            success: 0,
            failed: 0,
            details: []
        };
        for (const sessionId of sessionIds) {
            const data = this.sessions.get(sessionId);
            if (data) {
                // 标记为即将关闭状态
                this.updateSessionState(sessionId, types_1.DanmuSessionState.Disconnecting);
                result.success++;
                result.details.push({ sessionId, success: true });
            }
            else {
                result.failed++;
                result.details.push({
                    sessionId,
                    success: false,
                    error: '会话不存在'
                });
            }
        }
        return result;
    }
    /**
     * 获取会话数量
     */
    getSessionCount() {
        return this.sessions.size;
    }
    /**
     * 会话是否存在
     */
    hasSession(sessionId) {
        return this.sessions.has(sessionId);
    }
}
exports.SessionManager = SessionManager;
//# sourceMappingURL=SessionManager.js.map