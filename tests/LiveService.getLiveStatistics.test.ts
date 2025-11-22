import AcFunLiveApi from '../src/AcFunLiveApi';
import * as fs from 'fs';
import * as path from 'path';

describe('LiveService.getLiveStatistics', () => {
  it('should get live statistics by liveId of UID 214844', async () => {
    let token = process.env.ACFUN_TOKEN_INFO || process.env.AC_TOKEN_INFO || '';
    if (!token) {
      const p = path.resolve(process.cwd(), 'tests', 'token.json');
      const raw = fs.readFileSync(p, 'utf-8');
      const json = JSON.parse(raw);
      token = json.token || '';
    }
    if (!token) throw new Error('缺少生产环境 token 信息');

    const api = new AcFunLiveApi();
    api.setAuthToken(token);

    const uid = 214844;
    const resp = await api.live.getLiveStatistics(uid);

    const params = { uid };
    const response = { status: resp.success ? 200 : 500, data: resp.data || resp.error };
    console.log('请求参数:', params);
    console.log('响应状态:', response.status);
    console.log('返回数据:', response.data);

    expect(resp).toBeDefined();
    expect(typeof resp.success).toBe('boolean');
    if (resp.success && resp.data) {
      expect(typeof resp.data.totalViewers).toBe('number');
      expect(typeof resp.data.peakViewers).toBe('number');
      expect(typeof resp.data.totalComments).toBe('number');
      expect(typeof resp.data.totalGifts).toBe('number');
      expect(typeof resp.data.totalLikes).toBe('number');
      expect(typeof resp.data.revenue).toBe('number');
    } else {
      expect(resp.error).toBeDefined();
    }
  }, 20000);
});