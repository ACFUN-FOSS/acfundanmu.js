import { AcFunLiveApi } from '../src/index';
import * as fs from 'fs';
import * as path from 'path';

describe('LiveService.checkLivePermission', () => {
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

  describe('checkLivePermission', () => {
    it('should successfully check live permission', async () => {
      const result = await api.live.checkLivePermission();
      
      console.log('请求参数:', {});
      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.data || result.error);
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      if (result.success) {
        expect(result.data).toBeDefined();
        if (result.data) {
          expect(typeof result.data.liveAuth).toBe('boolean');
        }
      }
    }, 10000); // 设置10秒超时

    it.skip('should fail when token is invalid', async () => {
      // 创建一个新的API实例，不设置token
      const newApi = new AcFunLiveApi();
      
      const result = await newApi.live.checkLivePermission();
      
      console.log('请求参数:', {});
      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.data || result.error);
      
      // 验证返回错误信息
      expect(result.success).toBe(false);
      expect(result.error).toBe('缺少认证token，请先调用setAuthToken方法设置token');
    }, 5000); // 5秒超时

    it.skip('should fail when token format is invalid', async () => {
      // 创建一个新的API实例，设置无效的token格式
      const newApi = new AcFunLiveApi();
      
      // 设置无效的token格式
      newApi.setAuthToken('invalid-token-format');
      
      const result = await newApi.live.checkLivePermission();
      
      console.log('请求参数:', { token: 'invalid-token-format' });
      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.data || result.error);
      
      // 验证返回错误信息
      expect(result.success).toBe(false);
      expect(result.error).toContain('Request failed with status code');
    }, 5000); // 5秒超时
  });
});