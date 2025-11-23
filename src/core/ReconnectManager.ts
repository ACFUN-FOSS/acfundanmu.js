import { ConnectionConfig, ReconnectState, DanmuSession, DanmuSessionState, ErrorCode, ErrorType, ErrorRecord } from '../types';

/**
 * 重连管理器
 * 负责管理弹幕会话的自动重连逻辑
 */
export class ReconnectManager {
  private reconnectStates: Map<string, ReconnectState> = new Map();
  private config: ConnectionConfig;

  constructor(config: ConnectionConfig) {
    this.config = config;
  }

  /**
   * 初始化重连状态
   */
  public initReconnectState(sessionId: string): void {
    const state: ReconnectState = {
      sessionId,
      isReconnecting: false,
      currentAttempt: 0,
      maxAttempts: this.config.maxReconnectAttempts,
      nextRetryTime: 0,
      backoffTime: this.config.reconnectBackoffBase,
      lastError: '',
      disconnectReason: ''
    };
    this.reconnectStates.set(sessionId, state);
  }

  /**
   * 记录断开原因
   */
  public recordDisconnect(sessionId: string, reason: string, error?: string): void {
    const state = this.reconnectStates.get(sessionId);
    if (state) {
      state.disconnectReason = reason;
      state.lastError = error || '';
    }
  }

  /**
   * 判断是否应该重连
   */
  public shouldReconnect(sessionId: string, closeCode?: number): boolean {
    if (!this.config.enableAutoReconnect) {
      return false;
    }

    const state = this.reconnectStates.get(sessionId);
    if (!state) {
      return false;
    }

    // 检查关闭码，正常关闭不重连
    if (closeCode === 1000 || closeCode === 1001) {
      return false;
    }

    // 检查是否超过最大重试次数
    if (state.currentAttempt >= state.maxAttempts) {
      return false;
    }

    return true;
  }

  /**
   * 计算退避时间（指数退避）
   */
  public calculateBackoffTime(sessionId: string): number {
    const state = this.reconnectStates.get(sessionId);
    if (!state) {
      return this.config.reconnectBackoffBase;
    }

    // 指数退避: base * 2^attempt
    const backoffTime = Math.min(
      this.config.reconnectBackoffBase * Math.pow(2, state.currentAttempt),
      this.config.reconnectBackoffMax
    );

    state.backoffTime = backoffTime;
    state.nextRetryTime = Date.now() + backoffTime;

    
    return backoffTime;
  }

  /**
   * 开始重连
   */
  public startReconnect(sessionId: string): void {
    const state = this.reconnectStates.get(sessionId);
    if (!state) {
      console.error('[ReconnectManager] 未找到重连状态');
      return;
    }

    state.isReconnecting = true;
    state.currentAttempt++;
    
  }

  /**
   * 重连成功
   */
  public onReconnectSuccess(sessionId: string): void {
    const state = this.reconnectStates.get(sessionId);
    if (!state) return;

    
    // 重置重连状态
    state.isReconnecting = false;
    state.currentAttempt = 0;
    state.backoffTime = this.config.reconnectBackoffBase;
    state.lastError = '';
    state.disconnectReason = '';
  }

  /**
   * 重连失败
   */
  public onReconnectFailed(sessionId: string, error: string): void {
    const state = this.reconnectStates.get(sessionId);
    if (!state) return;

    state.lastError = error;
    console.error(`[ReconnectManager] 第 ${state.currentAttempt} 次重连失败: ${error}`);
  }

  /**
   * 保存会话状态
   */
  public saveSessionState(sessionId: string, session: Partial<DanmuSession>): void {
    const state = this.reconnectStates.get(sessionId);
    if (!state) return;

    state.savedState = {
      liverUID: session.liverUID,
      liveID: session.liveID,
      enterRoomAttach: session.enterRoomAttach,
      tickets: session.tickets,
      ticketIndex: session.ticketIndex,
      callback: session.callback
    };

  }

  /**
   * 恢复会话状态
   */
  public restoreSessionState(sessionId: string): any {
    const state = this.reconnectStates.get(sessionId);
    if (!state || !state.savedState) {
      console.warn('[ReconnectManager] 未找到保存的会话状态');
      return null;
    }

    return state.savedState;
  }

  /**
   * 获取重连状态
   */
  public getReconnectState(sessionId: string): ReconnectState | undefined {
    return this.reconnectStates.get(sessionId);
  }

  /**
   * 是否正在重连
   */
  public isReconnecting(sessionId: string): boolean {
    const state = this.reconnectStates.get(sessionId);
    return state?.isReconnecting || false;
  }

  /**
   * 清理重连状态
   */
  public cleanup(sessionId: string): void {
    this.reconnectStates.delete(sessionId);
  }

  /**
   * 创建错误记录
   */
  public createErrorRecord(errorType: ErrorType, errorCode: ErrorCode, message: string, context?: any): ErrorRecord {
    return {
      timestamp: Date.now(),
      errorCode,
      errorType,
      errorMessage: message,
      context
    };
  }

  /**
   * 分析断开原因
   */
  public analyzeDisconnectReason(closeCode?: number, error?: Error): { reason: string; shouldRetry: boolean } {
    if (closeCode) {
      switch (closeCode) {
        case 1000:
        case 1001:
          return { reason: '正常关闭', shouldRetry: false };
        case 1002:
          return { reason: '协议错误', shouldRetry: true };
        case 1003:
          return { reason: '不支持的数据', shouldRetry: false };
        case 1006:
          return { reason: '连接异常断开', shouldRetry: true };
        case 1008:
          return { reason: '违反策略', shouldRetry: false };
        case 1011:
          return { reason: '服务器错误', shouldRetry: true };
        default:
          return { reason: `未知关闭码: ${closeCode}`, shouldRetry: true };
      }
    }

    if (error) {
      if (error.message.includes('timeout')) {
        return { reason: '连接超时', shouldRetry: true };
      }
      if (error.message.includes('ECONNREFUSED')) {
        return { reason: '连接被拒绝', shouldRetry: true };
      }
      if (error.message.includes('ENOTFOUND')) {
        return { reason: 'DNS解析失败', shouldRetry: true };
      }
      return { reason: error.message, shouldRetry: true };
    }

    return { reason: '未知原因', shouldRetry: true };
  }
}
