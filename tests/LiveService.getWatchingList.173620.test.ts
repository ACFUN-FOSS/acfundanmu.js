import AcFunLiveApi from '../src/AcFunLiveApi';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

describe('LiveService 173620 watchingList', () => {
  it('should fetch watchingList for author 173620 and print medals', async () => {
    let token = process.env.ACFUN_TOKEN_INFO || process.env.AC_TOKEN_INFO || '';
    if (!token) {
      const p = path.resolve(process.cwd(), 'tests', 'token.json');
      const raw = fs.readFileSync(p, 'utf-8');
      const json = JSON.parse(raw);
      token = json.token || '';
    }
    if (!token) throw new Error('缺少生产环境 token 信息');

    try {
      const parsed = JSON.parse(token);
      const cookies: string[] = parsed.cookies || [];
      const deviceID: string = parsed.deviceID;
      const cookieHeader = (cookies && cookies.length > 0) ? cookies.map((c: string) => c.split(';')[0]).join('; ') : `_did=${deviceID}`;
      const respToken = await axios.post('https://id.app.acfun.cn/rest/web/token/get', new URLSearchParams({ sid: 'acfun.midground.api' }).toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': cookieHeader }
      });
      if (respToken?.data?.result === 0 && respToken.data['acfun.midground.api']) {
        parsed.serviceToken = respToken.data['acfun.midground.api'];
        token = JSON.stringify(parsed);
      }
    } catch {}

    const api = new AcFunLiveApi();
    api.setAuthToken(token);

    const authorId = '173620';
    let liveId = '';

    const hotResp = await api.live.getHotLives('', 0, 50);
    if (hotResp.success && Array.isArray(hotResp.data?.lives)) {
      for (const it of hotResp.data!.lives as any[]) {
        if (String(it?.streamer?.userId || '') === authorId && it?.liveId) {
          liveId = it.liveId;
          break;
        }
      }
    }
    if (!liveId) {
      const listResp = await api.live.getLiveList(1, 50);
      if (listResp.success && Array.isArray(listResp.data?.lives)) {
        for (const it of listResp.data!.lives as any[]) {
          if (String(it?.streamer?.userId || '') === authorId && it?.liveId) {
            liveId = it.liveId;
            break;
          }
        }
      }
    }
    if (!liveId) throw new Error('未获取到主播 173620 的 liveId');

    const resp = await api.live.getWatchingList(liveId);
    const params = { liveId, authorId };
    const response = { status: resp.success ? 200 : 500, data: resp.data };

    console.log('请求参数:', params);
    console.log('响应状态:', response.status);
    console.log('返回数据:', response.data);

    if (resp.success && Array.isArray(resp.data)) {
      const preview = resp.data.slice(0, Math.min(5, resp.data.length)).map(u => ({
        userID: u.userInfo.userID,
        nickname: u.userInfo.nickname,
        medal: u.userInfo.medal
      }));
      console.log('Medal预览:', preview);
    } else {
      console.log('错误信息:', resp.error);
      console.log('错误码:', resp.code);
    }

    expect(resp.success).toBe(true);
    expect(Array.isArray(resp.data)).toBe(true);
  });
});

