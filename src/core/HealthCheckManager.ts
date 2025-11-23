import { 
  ConnectionConfig, 
  HealthCheckData, 
  HealthCheckResult, 
  SessionStatistics,
  DanmuSessionState 
} from '../types';
import { HeartbeatManager } from './HeartbeatManager';

/**
 * 健康检查管理器
 * 负责监控弹幕会话的健康状态
 */
export class HealthCheckManager {
  private config: ConnectionConfig;
  private healthData: Map<string, HealthCheckData> = new Map();
  private checkTimers: Map<string, NodeJS.Timeout> = new Map();
  private heartbeatManager: HeartbeatManager;

  constructor(config: ConnectionConfig, heartbeatManager: HeartbeatManager) {
    this.config = config;
    this.heartbeatManager = heartbeatManager;
  }

  /**
   * 初始化健康检查数据
   */
  public initHealthData(sessionId: string): void {
    const healthData: HealthCheckData = {
      sessionId,
      wsState: 0,
      heartbeatSuccessRate: 0,
      avgResponseTime: 0,
      errorCount: 0,
      connectionDuration: 0,
      lastHeartbeatTime: Date.now(),
      healthScore: 0,
      status: 'healthy'
    };
    this.healthData.set(sessionId, healthData);
  }

  /**
   * 启动定期健康检查
   */
  public startPeriodicCheck(sessionId: string, interval: number = 30000): void {
    this.stopPeriodicCheck(sessionId);

    const timer = setInterval(() => {
      this.performHealthCheck(sessionId);
    }, interval);

    this.checkTimers.set(sessionId, timer);
  }

  /**
   * 停止定期健康检查
   */
  public stopPeriodicCheck(sessionId: string): void {
    const timer = this.checkTimers.get(sessionId);
    if (timer) {
      clearInterval(timer);
      this.checkTimers.delete(sessionId);
    }
  }

  /**
   * 执行健康检查
   */
  public performHealthCheck(sessionId: string, wsState?: number, stats?: SessionStatistics): HealthCheckResult {
    const healthData = this.healthData.get(sessionId);
    if (!healthData) {
      console.error('[HealthCheckManager] 未找到健康检查数据');
      return {
        sessionId,
        timestamp: Date.now(),
        healthData: this.createDefaultHealthData(sessionId),
        recommendations: ['未找到健康检查数据']
      };
    }

    // 更新基础数据
    if (wsState !== undefined) {
      healthData.wsState = wsState;
    }

    if (stats) {
      healthData.errorCount = stats.errorCount;
      healthData.connectionDuration = Date.now() - stats.lastMessageTime;
    }

    // 从心跳管理器获取数据
    const heartbeatStats = this.heartbeatManager.getStats(sessionId);
    if (heartbeatStats) {
      healthData.heartbeatSuccessRate = this.heartbeatManager.getSuccessRate(sessionId);
      healthData.avgResponseTime = this.heartbeatManager.getAvgLatency(sessionId);
      healthData.lastHeartbeatTime = heartbeatStats.lastResponseTime || heartbeatStats.lastSentTime;
    }

    // 计算健康得分
    healthData.healthScore = this.calculateHealthScore(healthData);
    healthData.status = this.determineHealthStatus(healthData.healthScore);

    const recommendations = this.generateRecommendations(healthData);


    return {
      sessionId,
      timestamp: Date.now(),
      healthData: { ...healthData },
      recommendations
    };
  }

  /**
   * 计算健康得分（0-100）
   */
  private calculateHealthScore(healthData: HealthCheckData): number {
    let score = 0;

    // WebSocket状态权重 30%
    if (healthData.wsState === 1) {  // OPEN
      score += 30;
    } else if (healthData.wsState === 0) {  // CONNECTING
      score += 15;
    }

    // 心跳成功率权重 40%
    score += healthData.heartbeatSuccessRate * 40;

    // 响应延迟权重 20%
    if (healthData.avgResponseTime === 0) {
      score += 20;  // 还没有响应数据，给满分
    } else if (healthData.avgResponseTime < 100) {
      score += 20;
    } else if (healthData.avgResponseTime < 300) {
      score += 15;
    } else if (healthData.avgResponseTime < 500) {
      score += 10;
    } else if (healthData.avgResponseTime < 1000) {
      score += 5;
    }

    // 错误频率权重 10%
    if (healthData.errorCount === 0) {
      score += 10;
    } else if (healthData.errorCount < 3) {
      score += 7;
    } else if (healthData.errorCount < 5) {
      score += 4;
    }

    return Math.round(Math.min(100, Math.max(0, score)));
  }

  /**
   * 判断健康状态
   */
  private determineHealthStatus(score: number): 'healthy' | 'warning' | 'unhealthy' {
    if (score >= 90) return 'healthy';
    if (score >= 60) return 'warning';
    return 'unhealthy';
  }

  /**
   * 生成优化建议
   */
  private generateRecommendations(healthData: HealthCheckData): string[] {
    const recommendations: string[] = [];

    // WebSocket状态检查
    if (healthData.wsState !== 1) {
      recommendations.push('WebSocket连接未处于OPEN状态，建议检查网络连接');
    }

    // 心跳成功率检查
    if (healthData.heartbeatSuccessRate < 0.8) {
      recommendations.push(`心跳成功率过低(${(healthData.heartbeatSuccessRate * 100).toFixed(1)}%)，建议检查网络稳定性或调整心跳间隔`);
    }

    // 响应延迟检查
    if (healthData.avgResponseTime > 500) {
      recommendations.push(`平均响应延迟较高(${healthData.avgResponseTime.toFixed(0)}ms)，建议优化网络环境或缩短心跳间隔`);
    }

    // 错误计数检查
    if (healthData.errorCount >= 5) {
      recommendations.push(`错误次数较多(${healthData.errorCount}次)，建议检查错误日志并排查问题`);
    }

    // 心跳超时检查
    const timeSinceLastHeartbeat = Date.now() - healthData.lastHeartbeatTime;
    if (timeSinceLastHeartbeat > this.config.heartbeatTimeout) {
      recommendations.push(`心跳超时(${timeSinceLastHeartbeat}ms)，建议立即重连`);
    }

    if (recommendations.length === 0) {
      recommendations.push('会话运行正常');
    }

    return recommendations;
  }

  /**
   * 更新WebSocket状态
   */
  public updateWsState(sessionId: string, wsState: number): void {
    const healthData = this.healthData.get(sessionId);
    if (healthData) {
      healthData.wsState = wsState;
    }
  }

  /**
   * 更新错误计数
   */
  public incrementErrorCount(sessionId: string): void {
    const healthData = this.healthData.get(sessionId);
    if (healthData) {
      healthData.errorCount++;
    }
  }

  /**
   * 重置错误计数
   */
  public resetErrorCount(sessionId: string): void {
    const healthData = this.healthData.get(sessionId);
    if (healthData) {
      healthData.errorCount = 0;
    }
  }

  /**
   * 获取健康数据
   */
  public getHealthData(sessionId: string): HealthCheckData | undefined {
    return this.healthData.get(sessionId);
  }

  /**
   * 获取健康得分
   */
  public getHealthScore(sessionId: string): number {
    const healthData = this.healthData.get(sessionId);
    return healthData?.healthScore || 0;
  }

  /**
   * 检查是否健康
   */
  public isHealthy(sessionId: string): boolean {
    const healthData = this.healthData.get(sessionId);
    return healthData?.status === 'healthy';
  }

  /**
   * 检查所有会话健康状态
   */
  public checkAllSessions(): Map<string, HealthCheckResult> {
    const results = new Map<string, HealthCheckResult>();
    
    for (const [sessionId] of this.healthData) {
      const result = this.performHealthCheck(sessionId);
      results.set(sessionId, result);
    }

    return results;
  }

  /**
   * 创建默认健康数据
   */
  private createDefaultHealthData(sessionId: string): HealthCheckData {
    return {
      sessionId,
      wsState: 0,
      heartbeatSuccessRate: 0,
      avgResponseTime: 0,
      errorCount: 0,
      connectionDuration: 0,
      lastHeartbeatTime: Date.now(),
      healthScore: 0,
      status: 'unhealthy'
    };
  }

  /**
   * 清理资源
   */
  public cleanup(sessionId: string): void {
    this.stopPeriodicCheck(sessionId);
    this.healthData.delete(sessionId);
  }

  /**
   * 获取所有健康数据
   */
  public getAllHealthData(): Map<string, HealthCheckData> {
    return new Map(this.healthData);
  }
}
