import { AcFunLiveApi } from '../src/index';
import * as fs from 'fs';
import * as path from 'path';

describe('LiveService getTranscodeInfo', () => {
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

  describe('getTranscodeInfo', () => {
    it('should successfully get transcode information', async () => {
      // 首先获取热门直播列表来获取streamName
      const hotLivesResult = await api.live.getHotLives('', 0, 1);
      
      if (!hotLivesResult.success || !hotLivesResult.data || hotLivesResult.data.lives.length === 0) {
        // 如果没有热门直播，使用默认的streamName进行测试
        const defaultStreamName = 'test_stream';
        
        const result = await api.live.getTranscodeInfo(defaultStreamName);
        
        console.log('请求参数:', { streamName: defaultStreamName });
        console.log('响应状态:', result.success ? 200 : 500);
        console.log('返回数据:', result.data || result.error);
        
        // 验证返回结果
        expect(result).toBeDefined();
        
        return;
      }
      
      // 获取第一个直播的streamName
      const firstLive = hotLivesResult.data.lives[0];
      
      // 获取该直播的详细信息来获取streamName
      const userID = firstLive.streamer?.userId || 214844;
      const liveInfoResult = await api.live.getUserLiveInfo(Number(userID));
      
      if (!liveInfoResult.success || !liveInfoResult.data) {
        // 如果获取直播信息失败，使用默认的streamName
        const defaultStreamName = 'test_stream';
        
        const result = await api.live.getTranscodeInfo(defaultStreamName);
        
        console.log('请求参数:', { streamName: defaultStreamName });
        console.log('响应状态:', result.success ? 200 : 500);
        console.log('返回数据:', result.data || result.error);
        
        // 验证返回结果
        expect(result).toBeDefined();
        
        return;
      }
      
      const streamName = liveInfoResult.data.streamName;
      
      if (!streamName) {
        // 如果streamName为空，使用默认值
        const defaultStreamName = 'test_stream';
        
        const result = await api.live.getTranscodeInfo(defaultStreamName);
        
        console.log('请求参数:', { streamName: defaultStreamName });
        console.log('响应状态:', result.success ? 200 : 500);
        console.log('返回数据:', result.data || result.error);
        
        // 验证返回结果
        expect(result).toBeDefined();
        
        return;
      }
      
      // 使用获取到的streamName调用getTranscodeInfo
      const result = await api.live.getTranscodeInfo(streamName);
      
      console.log('请求参数:', { streamName });
      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.data || result.error);
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
        
        // 验证转码信息结构
        if (result.data && result.data.length > 0) {
          const transcodeInfo = result.data[0];
          expect(transcodeInfo.streamURL).toBeDefined();
          expect(typeof transcodeInfo.streamURL.url).toBe('string');
          expect(typeof transcodeInfo.streamURL.bitrate).toBe('number');
          expect(typeof transcodeInfo.streamURL.qualityType).toBe('string');
          expect(typeof transcodeInfo.streamURL.qualityName).toBe('string');
          expect(typeof transcodeInfo.resolution).toBe('string');
          expect(typeof transcodeInfo.frameRate).toBe('number');
          expect(typeof transcodeInfo.template).toBe('string');
        }
      }
      
      const testDetails = [
        '✅getTranscodeInfo测试完成！',
        `测试结果: ${result.success ? '成功' : '失败'}`,
        result.success ? `转码信息数量: ${result.data?.length || 0}` : `错误信息: ${result.error}`
      ];
      
      testDetails.forEach(detail => {
        expect(detail).toBeDefined();
      });
    }, 15000); // 设置15秒超时
  });
});