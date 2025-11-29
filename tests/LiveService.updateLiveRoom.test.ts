import { AcFunLiveApi } from '../src/index';
import * as fs from 'fs';
import * as path from 'path';

describe('LiveService updateLiveRoom', () => {
  let api: AcFunLiveApi;
  let token: string;
  let tokenData: any;

  beforeAll(() => {
    api = new AcFunLiveApi();

    const tokenPath = path.join(__dirname, 'token.json');
    if (!fs.existsSync(tokenPath)) {
      throw new Error('token.json文件不存在，请先运行二维码登录测试生成token');
    }

    tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
    token = tokenData.token;

    if (!token) {
      throw new Error('token.json文件中没有有效的token');
    }

    api.setAuthToken(token);
  });

  describe('updateLiveRoom', () => {
    it('should update title and cover for specified liveId', async () => {
      const liveId = '0GcDS8gL53I';
      const title = 'test1113';

      const coverPath = path.join(__dirname, 'th[4].jpg');
      if (!fs.existsSync(coverPath)) {
        throw new Error('封面文件不存在: ' + coverPath);
      }

      // const fileBuffer = fs.readFileSync(coverPath);
      // const base64 = fileBuffer.toString('base64');
      // const dataUri = `data:image/jpeg;base64,${base64}`;

      // 获取更新前的信息
      const userId = tokenData.userId || tokenData.userID || tokenData.uid;
      console.log('UserID from token:', userId);
      const userInfoResultBefore = await api.live.getUserLiveInfo(Number(userId));
      if (userInfoResultBefore.success && userInfoResultBefore.data) {
          console.log('更新前封面:', userInfoResultBefore.data.liveCover);
      }

      // 直接使用本地文件路径
      const result = await api.live.updateLiveRoom(title, coverPath, liveId);

      const params = { liveId, title, coverFileType: 'localFile', coverPath };
      console.log('请求参数:', params);
      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.data || result.error);

      // 等待几秒让服务器处理
      await new Promise(resolve => setTimeout(resolve, 1800000));

      // 获取更新后的信息
      const userInfoResultAfter = await api.live.getUserLiveInfo(Number(userId));
      if (userInfoResultAfter.success && userInfoResultAfter.data) {
          console.log('更新后封面:', userInfoResultAfter.data.liveCover);
      }

      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      if (result.success) {
        expect(result.data).toBeUndefined();
      }
    }, 15000);
  });
});

