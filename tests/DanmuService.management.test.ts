import { DanmuService } from '../src/services/DanmuService';
import { HttpClient } from '../src/core/HttpClient';
import { DanmuSessionState, ConnectionConfig } from '../src/types';

describe('DanmuService - 重连机制测试', () => {
  let httpClient: HttpClient;
  let danmuService: DanmuService;

  beforeEach(() => {
    httpClient = new HttpClient({});

    // 配置支持重连的DanmuService
    const config: Partial<ConnectionConfig> = {
      enableAutoReconnect: true,
      maxReconnectAttempts: 3,
      reconnectBackoffBase: 500, // 测试用较短的退避时间
      reconnectBackoffMax: 5000,
      heartbeatFailureThreshold: 2
    };

    danmuService = new DanmuService(httpClient, config);
  });

  describe('重连状态管理', () => {
    it('should get all sessions successfully', async () => {
      console.log('测试: 获取所有会话列表（重连状态管理）');
      
      const result = danmuService.getAllSessions();
      
      console.log('请求参数:', {});
      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.data);
      
      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
    });

    it('should get session statistics successfully', async () => {
      console.log('测试: 获取全局统计信息');
      
      const result = danmuService.getSessionStatistics();
      
      console.log('请求参数:', {});
      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.data);
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      if (result.data) {
        expect(result.data.totalSessions).toBeGreaterThanOrEqual(0);
        expect(result.data.activeSessions).toBeGreaterThanOrEqual(0);
      }
    });

    test('会话健康检查', async () => {
      console.log('\n=== 测试用例：会话健康检查 ===');
      
      // 先获取所有会话，使用真实的会话ID进行测试
      const allSessions = danmuService.getAllSessions();
      let sessionId = 'test-session-id';
      
      if (allSessions.success && allSessions.data && allSessions.data.length > 0) {
        sessionId = allSessions.data[0].sessionId;
      }
      
      const params = { sessionId };
      console.log('请求参数:', params);

      const result = danmuService.getSessionHealth(sessionId);

      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.data || { error: result.error });

      // 如果有真实会话，应该返回成功；否则返回失败
      if (allSessions.success && allSessions.data && allSessions.data.length > 0) {
        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        if (result.data) {
          expect(result.data.healthData).toBeDefined();
          expect(result.data.healthData.sessionId).toBe(sessionId);
        }
      } else {
        expect(result.success).toBe(false);
        expect(result.error).toContain('不存在');
      }
    });
  });

  describe('会话管理测试', () => {
    let httpClient: HttpClient;
    let danmuService: DanmuService;

    beforeEach(() => {
      httpClient = new HttpClient({});

      // 配置支持重连的DanmuService
      const config: Partial<ConnectionConfig> = {
        enableAutoReconnect: true,
        maxReconnectAttempts: 3,
        reconnectBackoffBase: 500, // 测试用较短的退避时间
        reconnectBackoffMax: 5000,
        heartbeatFailureThreshold: 2
      };

      danmuService = new DanmuService(httpClient, config);
    });
    it('should get all sessions successfully', () => {
      console.log('测试: 获取所有会话列表');
      
      const result = danmuService.getAllSessions();
      
      console.log('请求参数:', {});
      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.data);
      
      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
    });

    it('should get global statistics successfully', () => {
      console.log('测试: 获取全局统计');
      
      const result = danmuService.getSessionStatistics();
      
      console.log('请求参数:', {});
      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.data);
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      if (result.data) {
        expect(result.data.totalSessions).toBeGreaterThanOrEqual(0);
        expect(result.data.activeSessions).toBeGreaterThanOrEqual(0);
      }
    });

    it('should get session detail when session exists', () => {
      console.log('测试: 获取会话详情');
      
      // 先获取所有会话，使用第一个会话ID进行测试
      const allSessions = danmuService.getAllSessions();
      let sessionId = 'test-session-id';
      
      if (allSessions.success && allSessions.data && allSessions.data.length > 0) {
        sessionId = allSessions.data[0].sessionId;
      }
      
      const result = danmuService.getSessionDetail(sessionId);
      
      console.log('请求参数:', { sessionId });
      console.log('响应状态:', result.success ? 200 : 404);
      console.log('返回数据:', result.data);
      
      // 如果有真实会话，应该返回成功；否则返回失败
      if (allSessions.success && allSessions.data && allSessions.data.length > 0) {
        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
      } else {
        expect(result.success).toBe(false);
        expect(result.error).toContain('不存在');
      }
    });

    it('should get sessions by state', () => {
      console.log('测试: 按状态筛选会话');
      
      const result = danmuService.getSessionsByState(DanmuSessionState.Active);
      
      console.log('请求参数:', { state: DanmuSessionState.Active });
      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.data);
      
      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
    });
  });

  describe('批量操作测试', () => {
    let httpClient: HttpClient;
    let danmuService: DanmuService;

    beforeEach(() => {
      httpClient = new HttpClient({});

      // 配置支持重连的DanmuService
      const config: Partial<ConnectionConfig> = {
        enableAutoReconnect: true,
        maxReconnectAttempts: 3,
        reconnectBackoffBase: 500, // 测试用较短的退避时间
        reconnectBackoffMax: 5000,
        heartbeatFailureThreshold: 2
      };

      danmuService = new DanmuService(httpClient, config);
    });
    it('should pause sessions in batch', () => {
      console.log('测试: 批量暂停会话');
      
      // 先获取所有会话，使用真实的会话ID进行测试
      const allSessions = danmuService.getAllSessions();
      let sessionIds = ['session-1', 'session-2'];
      
      if (allSessions.success && allSessions.data && allSessions.data.length > 0) {
        sessionIds = allSessions.data.slice(0, 2).map(session => session.sessionId);
      }
      
      const result = danmuService.pauseSessions(sessionIds);
      
      console.log('请求参数:', { sessionIds });
      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.data);
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      if (result.data) {
        expect(result.data.total).toBe(sessionIds.length);
      }
    });

    it('should resume sessions in batch', () => {
      console.log('测试: 批量恢复会话');
      
      // 先获取所有会话，使用真实的会话ID进行测试
      const allSessions = danmuService.getAllSessions();
      let sessionIds = ['session-1', 'session-2'];
      
      if (allSessions.success && allSessions.data && allSessions.data.length > 0) {
        sessionIds = allSessions.data.slice(0, 2).map(session => session.sessionId);
      }
      
      const result = danmuService.resumeSessions(sessionIds);
      
      console.log('请求参数:', { sessionIds });
      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.data);
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should cleanup idle sessions', () => {
      console.log('测试: 清理空闲会话');
      
      const idleTimeout = 60000; // 1分钟
      const result = danmuService.cleanupIdleSessions(idleTimeout);
      
      console.log('请求参数:', { idleTimeout });
      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.data);
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should cleanup failed sessions', () => {
      console.log('测试: 清理失败会话');
      
      const result = danmuService.cleanupFailedSessions();
      
      console.log('请求参数:', {});
      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.data);
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });
  });

  describe('健康检查测试', () => {
    let httpClient: HttpClient;
    let danmuService: DanmuService;

    beforeEach(() => {
      httpClient = new HttpClient({});

      // 配置支持重连的DanmuService
      const config: Partial<ConnectionConfig> = {
        enableAutoReconnect: true,
        maxReconnectAttempts: 3,
        reconnectBackoffBase: 500, // 测试用较短的退避时间
        reconnectBackoffMax: 5000,
        heartbeatFailureThreshold: 2
      };

      danmuService = new DanmuService(httpClient, config);
    });
    it('should get session health when session exists', () => {
      console.log('测试: 获取会话健康状态');
      
      // 先获取所有会话，使用第一个会话ID进行测试
      const allSessions = danmuService.getAllSessions();
      let sessionId = 'test-session-id';
      
      if (allSessions.success && allSessions.data && allSessions.data.length > 0) {
        sessionId = allSessions.data[0].sessionId;
      }
      
      const result = danmuService.getSessionHealth(sessionId);
      
      console.log('请求参数:', { sessionId });
      console.log('响应状态:', result.success ? 200 : 404);
      console.log('返回数据:', result.data);
      
      // 如果有真实会话，应该返回成功；否则返回失败
      if (allSessions.success && allSessions.data && allSessions.data.length > 0) {
        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        if (result.data) {
          expect(result.data.healthData).toBeDefined();
          expect(result.data.healthData.sessionId).toBe(sessionId);
        }
      } else {
        expect(result.success).toBe(false);
        expect(result.error).toContain('不存在');
      }
    });
  });
});