import { AcFunLiveApi } from '../src/index';
import * as fs from 'fs';
import * as path from 'path';

describe('LiveService.getLiveStreamStatus', () => {
  let api: AcFunLiveApi;
  let token: string;

  beforeAll(() => {
    api = new AcFunLiveApi();
    const tokenPath = path.join(__dirname, 'token.json');
    if (!fs.existsSync(tokenPath)) {
      throw new Error('token.json文件不存在');
    }
    const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
    token = tokenData.token;
    if (!token) {
      throw new Error('token.json文件中没有有效的token');
    }
    api.setAuthToken(token);
  });

  it('should get live stream status successfully', async () => {
    const result = await api.live.getLiveStreamStatus();
    console.log('请求参数:', {});
    console.log('响应状态:', result.success ? 200 : 500);
    console.log('返回数据:', result.data || result.error);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(typeof (result.data as any).isLive).toBe('boolean');
    const d = result.data as any;
    if (d.isLive) {
      expect(typeof d.liveID).toBe('string');
      expect(typeof d.streamName).toBe('string');
      expect(typeof d.title).toBe('string');
      expect(typeof d.liveStartTime).toBe('number');
      expect(typeof d.panoramic).toBe('boolean');
      expect(typeof d.bizUnit).toBe('string');
      expect(typeof d.bizCustomData).toBe('string');
    }
  }, 15000);
});