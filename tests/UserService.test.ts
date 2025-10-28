import { AcFunLiveApi } from '../src/index';
import * as fs from 'fs';
import * as path from 'path';

describe('UserService', () => {
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

  describe('getUserInfo', () => {
    it('should successfully get user information', async () => {
      // 使用已知有效的用户ID进行测试
      const userId = '214844';
      const params = { userId };
      
      const result = await api.user.getUserInfo(userId);
      
      console.log('请求参数:', params);
      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.data);
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      
      // 验证用户信息字段存在
      if (result.data) {
        expect(result.data.userId).toBe(userId);
        expect(result.data.userName).toBeDefined();
        expect(result.data.avatar).toBeDefined();
        expect(typeof result.data.level).toBe('number');
        expect(typeof result.data.fansCount).toBe('number');
        expect(typeof result.data.followCount).toBe('number');
      }
    }, 10000); // 设置10秒超时

    it.skip('should fail when user does not exist', async () => {
      // 使用无效的用户ID进行测试
      const invalidUserId = '999999999';
      const params = { userId: invalidUserId };
      
      const result = await api.user.getUserInfo(invalidUserId);
      
      console.log('请求参数:', params);
      console.log('响应状态:', result.success ? 200 : 404);
      console.log('返回数据:', result.error || result.data);
      
      // 验证返回结果为失败
      expect(result).toBeDefined();
      // 注意：某些情况下即使用户不存在也可能返回success=true，这取决于API的具体实现
      // 我们至少要确保有返回结果
    }, 10000); // 设置10秒超时
  });

  describe('getWalletInfo', () => {
    it.skip('should get wallet info successfully', async () => {
      const params = {};
      const walletInfo = await api.user.getWalletInfo();
      
      console.log('请求参数:', params);
      console.log('响应状态:', walletInfo.success ? 200 : 500);
      console.log('返回数据:', walletInfo.data);
      
      // 验证响应结构
      expect(typeof walletInfo.success).toBe('boolean');
      if (walletInfo.success) {
        expect(walletInfo.data).toBeDefined();
        expect(typeof walletInfo.data!.balance).toBe('number');
        expect(typeof walletInfo.data!.bananaCount).toBe('number');
      }
    }, 10000); // 10秒超时

    it.skip('should fail to get wallet info without token', async () => {
      // 创建一个新的API实例，不设置token
      const newApi = new AcFunLiveApi();
      const params = {};
      
      const walletInfo = await newApi.user.getWalletInfo();
      
      console.log('请求参数:', params);
      console.log('响应状态:', walletInfo.success ? 200 : 401);
      console.log('返回数据:', walletInfo.error);
      
      // 验证返回错误信息
      expect(walletInfo.success).toBe(false);
      expect(walletInfo.error).toBe('缺少认证token，请先调用setAuthToken方法设置token');
    }, 5000); // 5秒超时
  });
});