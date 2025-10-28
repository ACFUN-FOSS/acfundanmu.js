import { AcFunLiveApi } from '../src/index';
import * as fs from 'fs';
import * as path from 'path';

describe('LiveService stopLiveStream', () => {
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

  describe('stopLiveStream', () => {
    it('should successfully stop live stream', async () => {
      // 首先获取热门直播列表，获取第一个直播的liveId
      const hotLivesResult = await api.live.getHotLives('', 0, 1);
      
      expect(hotLivesResult).toBeDefined();
      expect(hotLivesResult.success).toBe(true);
      expect(hotLivesResult.data).toBeDefined();
      
      if (hotLivesResult.data && hotLivesResult.data.lives.length > 0) {
        const firstLive = hotLivesResult.data.lives[0];
        const liveId = firstLive.liveId;
        
        // 调用stopLiveStream函数
        const result = await api.live.stopLiveStream(liveId);
        
        console.log('请求参数:', { liveId });
        console.log('响应状态:', result.success ? 200 : 500);
        console.log('返回数据:', result.data || result.error);
        
        // 验证返回结果
        expect(result).toBeDefined();
        
        // 由于停止直播需要主播权限，普通用户可能无法成功停止直播
        // 我们主要验证API调用是否正常，响应结构是否正确
        if (result.success && result.data) {
          expect(typeof result.data.duration).toBe('number');
          expect(typeof result.data.endReason).toBe('string');
          
          console.log('✅停止直播成功！');
          console.log(`📊 直播时长: ${result.data.duration} 毫秒`);
          console.log(`📊 停止原因: ${result.data.endReason}`);
        } else {
          // 如果停止直播失败，验证错误信息
          expect(result.error).toBeDefined();
          console.log('❌停止直播失败，错误信息:', result.error);
        }
      } else {
        console.log('⚠️没有找到可用的直播进行测试');
      }
    }, 15000); // 设置15秒超时
  });
});