import AcFunLiveApi from '../src/AcFunLiveApi';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

describe('LiveService', () => {
  it.skip('should get watching list successfully', async () => {
    let token = process.env.ACFUN_TOKEN_INFO || process.env.AC_TOKEN_INFO || '';
    if (!token) {
      const p = path.resolve(process.cwd(), 'tests', 'token.json');
      const raw = fs.readFileSync(p, 'utf-8');
      const json = JSON.parse(raw);
      token = json.token || '';
    }
    if (!token) throw new Error('缺少生产环境 token 信息');

    // 尝试刷新 serviceToken（基于 cookies）
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

    const candidates: string[] = [];
    const listResp = await api.live.getLiveList(1, 20);
    if (listResp.success && Array.isArray(listResp.data?.lives)) {
      for (const it of listResp.data!.lives as any[]) {
        if (it?.liveId) candidates.push(it.liveId);
      }
    }
    const hotResp = await api.live.getHotLives('', 0, 20);
    if (hotResp.success && Array.isArray(hotResp.data?.lives)) {
      for (const it of hotResp.data!.lives as any[]) {
        if (it?.liveId) candidates.push(it.liveId);
      }
    }
    const unique = Array.from(new Set(candidates)).slice(0, 10);
    if (unique.length === 0) throw new Error('未获取到有效的 liveId');

    let resp: any = null;
    let chosen = '';
    for (const id of unique) {
      const r = await api.live.getWatchingList(id);
      if (r.success && Array.isArray(r.data)) {
        resp = r;
        chosen = id;
        break;
      }
    }
    if (!resp) {
      chosen = unique[0];
      resp = await api.live.getWatchingList(chosen);
    }

    const params = { liveId: chosen };

    const response = { status: resp.success ? 200 : 500, data: resp.data };
    console.log('请求参数:', params);
    console.log('响应状态:', response.status);
    console.log('返回数据:', response.data);
    if (!resp.success) {
      console.log('错误信息:', resp.error);
      console.log('错误码:', resp.code);
    }

    expect(resp.success).toBe(true);
    expect(Array.isArray(resp.data)).toBe(true);
  });

  it('should get stream url successfully', async () => {
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

    const hotResp = await api.live.getHotLives('', 0, 10);
    let liveId = '';
    if (hotResp.success && Array.isArray(hotResp.data?.lives) && hotResp.data.lives.length > 0) {
      liveId = hotResp.data.lives[0].liveId || '';
    }
    if (!liveId) {
      const listResp = await api.live.getLiveList(1, 20);
      if (listResp.success && Array.isArray(listResp.data?.lives) && listResp.data.lives.length > 0) {
        liveId = listResp.data.lives[0].liveId || '';
      }
    }
    if (!liveId) throw new Error('未获取到有效的 liveId');

    const params = { liveId };
    const resp = await api.live.getStreamUrl(liveId);
    const response = { status: resp.success ? 200 : 500, data: resp.data };

    console.log('请求参数:', params);
    console.log('响应状态:', response.status);
    console.log('返回数据:', response.data);
    if (!resp.success) {
      console.log('错误信息:', resp.error);
      console.log('错误码:', resp.code);
    }

    expect(resp.success).toBe(true);
    expect(typeof resp.data?.rtmpUrl).toBe('string');
    expect(typeof resp.data?.streamKey).toBe('string');
  });
});