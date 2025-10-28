import { AcFunLiveApi } from '../src/index';
import * as fs from 'fs';
import * as path from 'path';

describe('ReplayService', () => {
  let api: AcFunLiveApi;
  let token: string;

  beforeAll(() => {
    // 创建AcFunLiveApi实例
    api = new AcFunLiveApi();

    // 读取token文件
    const tokenPath = path.join(__dirname, 'token.json');
    if (!fs.existsSync(tokenPath)) {
      throw new Error('?token.json文件不存在，请先运行二维码登录测试生成token');
    }

    const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
    token = tokenData.token;

    if (!token) {
      throw new Error('?token.json文件中没有有效的token');
    }

    // 设置全局token
    api.setAuthToken(token);
  });

  describe('getLiveReplay', () => {
    it('should successfully get live replay information', async () => {
      // 获取热门直播列表，获取第一个直播的liveId
      const hotLives = await api.live.getHotLives();
      
      if (!hotLives.success || !hotLives.data || hotLives.data.lives.length === 0) {
        throw new Error('?没有可用的热门直播用于测试获取直播回?);
      }

      const liveId = hotLives.data.lives[0].liveId;
      
      const result = await api.replay.getLiveReplay(liveId);
      
      // 验证返回结果
      expect(result).toBeDefined();
      
      // 打印接口请求结果
      console.log('Get Live Replay API response:', JSON.stringify(result, null, 2));

      const replayInfoDetails = [
        '?获取直播回放信息测试详情?,
        `测试状? ${result.success ? '成功' : '失败'}`,
        `直播ID: ${liveId}`,
        `错误信息: ${result.error || '?}`
      ];

      if (result.success && result.data) {
        replayInfoDetails.push(
          `回放时长: ${result.data.duration} 毫秒`,
          `回放URL: ${result.data.url}`,
          `备份URL: ${result.data.backupUrl || '?}`,
          `M3U8切片: ${result.data.m3u8Slice || '?}`,
          `视频宽度: ${result.data.width}`,
          `视频高度: ${result.data.height}`
        );
      }

      // 使用测试断言来记录信?      replayInfoDetails.forEach(detail => {
        expect(detail).toBeDefined();
      });

      // 验证响应结构
      expect(typeof result.success).toBe('boolean');
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(typeof result.data!.duration).toBe('number');
        expect(typeof result.data!.url).toBe('string');
        expect(typeof result.data!.width).toBe('number');
        expect(typeof result.data!.height).toBe('number');
      }
    }, 10000); // 设置10秒超?  });
});

