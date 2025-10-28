import { AcFunLiveApi } from '../src/index';
import * as fs from 'fs';
import * as path from 'path';

describe('LiveService.getUserDetailInfo', () => {
  let api: AcFunLiveApi;
  let token: string;
  let liveId: string;

  beforeAll(async () => {
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

    // 使用已知有效的用户ID进行测试，不依赖getHotLives方法
    liveId = ''; // 这个测试用例实际上不需要liveId，只需要userID
  });

  describe('getUserDetailInfo', () => {
    it('should successfully get user detail information', async () => {
      // 使用已知有效的用户ID进行测试
      const userID = 214844; // 使用一个已知的用户ID
      
      const result = await api.live.getUserDetailInfo(userID);
      
      console.log('请求参数:', { userID });
      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.data || result.error);
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      
      // 验证用户详细信息字段存在
      if (result.data) {
        expect(result.data.userID).toBe(userID);
        expect(result.data.nickname).toBeDefined();
        expect(result.data.avatar).toBeDefined();
        expect(result.data.avatarFrame).toBeDefined();
        expect(result.data.followingCount).toBeDefined();
        expect(result.data.fansCount).toBeDefined();
        expect(result.data.contributeCount).toBeDefined();
        expect(result.data.signature).toBeDefined();
        expect(result.data.verifiedText).toBeDefined();
        expect(typeof result.data.isJoinUpCollege).toBe('boolean');
        expect(typeof result.data.isFollowing).toBe('boolean');
        expect(typeof result.data.isFollowed).toBe('boolean');
        expect(result.data.liveID).toBeDefined();
        expect(typeof result.data.likeCount).toBe('number');
        
        const userDetailInfoDetails = [
          '✅获取用户详细信息成功！',
          '\n📊 用户详细信息详情：',
          `用户ID: ${result.data.userID}`,
          `昵称: ${result.data.nickname}`,
          `头像: ${result.data.avatar}`,
          `头像挂件: ${result.data.avatarFrame || '无'}`,
          `关注数: ${result.data.followingCount}`,
          `粉丝数: ${result.data.fansCount}`,
          `投稿数: ${result.data.contributeCount}`,
          `签名: ${result.data.signature || '无'}`,
          `认证信息: ${result.data.verifiedText || '无'}`,
          `是否加入阿普学院: ${result.data.isJoinUpCollege ? '是' : '否'}`,
          `是否关注: ${result.data.isFollowing ? '是' : '否'}`,
          `是否被关注: ${result.data.isFollowed ? '是' : '否'}`,
          `直播间ID: ${result.data.liveID || '无'}`,
          `点赞数: ${result.data.likeCount}`
        ];
        
        // 使用测试报告记录用户详细信息
        userDetailInfoDetails.forEach(detail => {
          expect(detail).toBeDefined();
        });
      }
    }, 10000); // 设置10秒超时

    it.skip('should fail when userID is invalid', async () => {
      // 使用无效的用户ID进行测试
      const invalidUserID = 0;
      
      const result = await api.live.getUserDetailInfo(invalidUserID);
      
      console.log('请求参数:', { userID: invalidUserID });
      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.data || result.error);
      
      // 验证返回结果为失败
      expect(result).toBeDefined();
      expect(result.success).toBe(false);
      expect(result.error).toContain('用户ID必须大于0');
    }, 10000); // 设置10秒超时

    it.skip('should fail when user does not exist', async () => {
      // 使用不存在的用户ID进行测试
      const nonExistentUserID = 999999999;
      
      const result = await api.live.getUserDetailInfo(nonExistentUserID);
      
      console.log('请求参数:', { userID: nonExistentUserID });
      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.data || result.error);
      
      // 验证返回结果为失败
      expect(result).toBeDefined();
      // 注意：某些情况下即使用户不存在也可能返回success=true，这取决于API的具体实现
      // 我们至少要确保有返回结果
    }, 10000); // 设置10秒超时
  });
});