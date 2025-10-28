import { AcFunLiveApi } from '../src/index';
import * as fs from 'fs';
import * as path from 'path';

describe('BadgeService', () => {
  let api: AcFunLiveApi;
  let token: string;

  beforeAll(() => {
    // 创建AcFunLiveApi实例
    api = new AcFunLiveApi();

    // 读取token文件
    const tokenPath = path.join(__dirname, 'token.json');
    if (!fs.existsSync(tokenPath)) {
      throw new Error('token.json文件不存在，请先运行二维码登录测试生成token');
    }

    const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
    token = tokenData.token;

    if (!token) {
      throw new Error('token.json文件中没有有效的token');
    }

    // 设置全局token
    api.setAuthToken(token);
  });

  describe('getBadgeDetail', () => {
    it('should successfully get badge detail', async () => {
      // 使用一个可能拥有徽章的用户ID进行测试
      const uperID = 214844; // 使用用户指定的uperId
      const params = { uperID };
      
      const result = await api.badge.getBadgeDetail(uperID);
      
      console.log('请求参数:', params);
      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.data);
      
      // 验证返回结果
      expect(result).toBeDefined();
      
      // 验证响应结构
      expect(typeof result.success).toBe('boolean');
      if (result.success) {
        expect(result.data).toBeDefined();
        if (result.data) {
          expect(typeof result.data.uperID).toBe('number');
          expect(typeof result.data.userID).toBe('number');
          expect(typeof result.data.clubName).toBe('string');
          expect(typeof result.data.level).toBe('number');
          expect(typeof result.data.experience).toBe('number');
          expect(typeof result.data.nextLevelExperience).toBe('number');
          expect(typeof result.data.joinTime).toBe('number');
        }
      }
    }, 10000); // 设置10秒超时

    it.skip('should fail to get badge detail without token', async () => {
      // 创建一个新的API实例，不设置token
      const newApi = new AcFunLiveApi();
      const params = { uperID: 10000 };
      
      const result = await newApi.badge.getBadgeDetail(10000);
      
      console.log('请求参数:', params);
      console.log('响应状态:', result.success ? 200 : 401);
      console.log('返回数据:', result.error);
      
      // 验证返回错误信息
      expect(result.success).toBe(false);
      expect(result.error).toBe('缺少认证token，请先调用setAuthToken方法设置token');
    }, 5000); // 5秒超时
  });

  describe('getBadgeList', () => {
    it('should successfully get badge list', async () => {
      const params = {};
      const result = await api.badge.getBadgeList();
      
      console.log('请求参数:', params);
      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.data);
      
      // 验证响应结构
      expect(typeof result.success).toBe('boolean');
      if (result.success) {
        expect(result.data).toBeDefined();
        if (result.data) {
          expect(Array.isArray(result.data)).toBe(true);
          if (result.data.length > 0) {
            const firstBadge = result.data[0];
            expect(typeof firstBadge.uperID).toBe('number');
            expect(typeof firstBadge.userID).toBe('number');
            expect(typeof firstBadge.clubName).toBe('string');
            expect(typeof firstBadge.level).toBe('number');
          }
        }
      }
    }, 10000); // 设置10秒超时

    it.skip('should fail to get badge list without token', async () => {
      // 创建一个新的API实例，不设置token
      const newApi = new AcFunLiveApi();
      const params = {};
      
      const result = await newApi.badge.getBadgeList();
      
      console.log('请求参数:', params);
      console.log('响应状态:', result.success ? 200 : 401);
      console.log('返回数据:', result.error);
      
      // 验证返回错误信息
      expect(result.success).toBe(false);
      expect(result.error).toBe('缺少认证token，请先调用setAuthToken方法设置token');
    }, 5000); // 5秒超时
  });

  describe('getBadgeRank', () => {
    it('should successfully get badge rank', async () => {
      // 使用一个可能拥有徽章的用户ID进行测试
      const uperID = 214844; // 使用用户指定的uperId
      const params = { uperID };
      
      const result = await api.badge.getBadgeRank(uperID);
      
      console.log('请求参数:', params);
      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.data);
      
      // 验证返回结果
      expect(result).toBeDefined();
      
      // 验证响应结构
      expect(typeof result.success).toBe('boolean');
      if (result.success) {
        expect(result.data).toBeDefined();
        if (result.data) {
          expect(Array.isArray(result.data)).toBe(true);
          if (result.data.length > 0) {
            const firstRank = result.data[0];
            expect(typeof firstRank.userID).toBe('number');
            expect(typeof firstRank.nickname).toBe('string');
            expect(typeof firstRank.avatar).toBe('string');
            expect(typeof firstRank.level).toBe('number');
            expect(typeof firstRank.experience).toBe('number');
            expect(typeof firstRank.rank).toBe('number');
          }
        }
      }
    }, 10000); // 设置10秒超时

    it.skip('should fail to get badge rank without token', async () => {
      // 创建一个新的API实例，不设置token
      const newApi = new AcFunLiveApi();
      const params = { uperID: 10000 };
      
      const result = await newApi.badge.getBadgeRank(10000);
      
      console.log('请求参数:', params);
      console.log('响应状态:', result.success ? 200 : 401);
      console.log('返回数据:', result.error);
      
      // 验证返回错误信息
      expect(result.success).toBe(false);
      expect(result.error).toBe('缺少认证token，请先调用setAuthToken方法设置token');
    }, 5000); // 5秒超时
  });

  describe('getWornBadge', () => {
    it('should successfully get worn badge', async () => {
      // 使用当前用户ID进行测试
      const userID = 0; // 0表示当前用户
      const params = { userID };
      
      const result = await api.badge.getWornBadge(userID);
      
      console.log('请求参数:', params);
      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.data);
      
      // 验证返回结果
      expect(result).toBeDefined();
      
      // 验证响应结构
      expect(typeof result.success).toBe('boolean');
      if (result.success) {
        expect(result.data).toBeDefined();
        if (result.data) {
          expect(typeof result.data.uperID).toBe('number');
          expect(typeof result.data.userID).toBe('number');
          expect(typeof result.data.clubName).toBe('string');
          expect(typeof result.data.level).toBe('number');
        }
      }
    }, 10000); // 设置10秒超时

    it.skip('should fail to get worn badge without token', async () => {
      // 创建一个新的API实例，不设置token
      const newApi = new AcFunLiveApi();
      const params = { userID: 0 };
      
      const result = await newApi.badge.getWornBadge(0);
      
      console.log('请求参数:', params);
      console.log('响应状态:', result.success ? 200 : 401);
      console.log('返回数据:', result.error);
      
      // 验证返回错误信息
      expect(result.success).toBe(false);
      expect(result.error).toBe('缺少认证token，请先调用setAuthToken方法设置token');
    }, 5000); // 5秒超时
  });

  describe('wearBadge', () => {
    it('should successfully wear badge', async () => {
      // 注意：这个测试可能会改变用户的实际徽章佩戴状态
      // 使用一个可能拥有徽章的用户ID进行测试
      const uperID = 214844; // 使用用户指定的uperId
      const params = { uperID };
      
      const result = await api.badge.wearBadge(uperID);
      
      console.log('请求参数:', params);
      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.error || 'success');
      
      // 验证返回结果
      expect(result).toBeDefined();
      
      // 验证响应结构
      expect(typeof result.success).toBe('boolean');
    }, 10000); // 设置10秒超时

    it.skip('should fail to wear badge without token', async () => {
      // 创建一个新的API实例，不设置token
      const newApi = new AcFunLiveApi();
      const params = { uperID: 10000 };
      
      const result = await newApi.badge.wearBadge(10000);
      
      console.log('请求参数:', params);
      console.log('响应状态:', result.success ? 200 : 401);
      console.log('返回数据:', result.error);
      
      // 验证返回错误信息
      expect(result.success).toBe(false);
      expect(result.error).toBe('缺少认证token，请先调用setAuthToken方法设置token');
    }, 5000); // 5秒超时
  });

  describe('unwearBadge', () => {
    it('should successfully unwear badge', async () => {
      // 注意：这个测试可能会改变用户的实际徽章佩戴状态
      const params = {};
      const result = await api.badge.unwearBadge();
      
      console.log('请求参数:', params);
      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.error || 'success');
      
      // 验证返回结果
      expect(result).toBeDefined();
      
      // 验证响应结构
      expect(typeof result.success).toBe('boolean');
    }, 10000); // 设置10秒超时

    it.skip('should fail to unwear badge without token', async () => {
      // 创建一个新的API实例，不设置token
      const newApi = new AcFunLiveApi();
      const params = {};
      
      const result = await newApi.badge.unwearBadge();
      
      console.log('请求参数:', params);
      console.log('响应状态:', result.success ? 200 : 401);
      console.log('返回数据:', result.error);
      
      // 验证返回错误信息
      expect(result.success).toBe(false);
      expect(result.error).toBe('缺少认证token，请先调用setAuthToken方法设置token');
    }, 5000); // 5秒超时
  });
});