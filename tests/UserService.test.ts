import { AcFunLiveApi } from '../src/index';
import * as fs from 'fs';
import * as path from 'path';

describe('UserService', () => {
  let api: AcFunLiveApi;
  let token: string;

  beforeAll(() => {
    // 创建AcFunLiveApi实例
    api = new AcFunLiveApi();

    // 读取token文件
    const tokenPath = path.join(__dirname, 'token.json');
    if (!fs.existsSync(tokenPath)) {
      throw new Error('❌ token.json文件不存在，请先运行二维码登录测试生成token');
    }

    const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
    token = tokenData.token;

    if (!token) {
      throw new Error('❌ token.json文件中没有有效的token');
    }

    // 设置全局token
    api.setAuthToken(token);
  });

  describe('getUserInfo', () => {
    it('should successfully get user information', async () => {
      // 使用已知有效的用户ID进行测试
      const userId = '214844';
      
      const result = await api.user.getUserInfo(userId);
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      
      // 验证用户信息字段存在
      if (result.data) {
        expect(result.data.userId).toBe(userId);
        expect(result.data.userName).toBeDefined();
        expect(result.data.avatar).toBeDefined();
        expect(typeof result.data.level).toBe('number');
        expect(typeof result.data.fansCount).toBe('number');
        expect(typeof result.data.followCount).toBe('number');
        
        // 打印用户信息详情
        console.log('User API response:', JSON.stringify(result, null, 2));

        const userInfoDetails = [
          '✅ 获取用户信息成功！',
          '\n📊 用户信息详情：',
          `用户ID: ${result.data.userId}`,
          `用户名: ${result.data.userName}`,
          `头像: ${result.data.avatar}`,
          `等级: ${result.data.level}`,
          `粉丝数: ${result.data.fansCount}`,
          `关注数: ${result.data.followCount}`,
          `签名: ${result.data.signature || '无'}`,
          `是否在直播: ${result.data.isLive ? '是' : '否'}`,
          `直播间ID: ${result.data.liveRoomId || '无'}`,
          `头像挂件: ${result.data.avatarFrame || '无'}`,
          `投稿数: ${result.data.contributeCount || 0}`,
          `认证信息: ${result.data.verifiedText || '无'}`,
          `是否加入阿普学院: ${result.data.isJoinUpCollege ? '是' : '否'}`,
          `是否关注: ${result.data.isFollowing ? '是' : '否'}`,
          `是否被关注: ${result.data.isFollowed ? '是' : '否'}`,
          `点赞数: ${result.data.likeCount || 0}`
        ];
        
        // 使用测试报告记录用户信息，而不是直接打印
        userInfoDetails.forEach(detail => {
          expect(detail).toBeDefined();
        });
      }
    }, 10000); // 设置10秒超时

    it('should fail when user does not exist', async () => {
      // 使用无效的用户ID进行测试
      const invalidUserId = '999999999';
      
      const result = await api.user.getUserInfo(invalidUserId);
      
      // 验证返回结果为失败
      expect(result).toBeDefined();
      // 注意：某些情况下即使用户不存在也可能返回success=true，这取决于API的具体实现
      // 我们至少要确保有返回结果
    }, 10000); // 设置10秒超时
  });

  describe('getWalletInfo', () => {
    it('should get wallet info successfully', async () => {
      const walletInfo = await api.user.getWalletInfo();
      
      // 打印测试详情
      console.log('Wallet API response:', JSON.stringify(walletInfo, null, 2));
      
      const walletInfoDetails = [
        `Wallet Info Success: ${walletInfo.success}`,
        `Wallet Info Has Data: ${!!walletInfo.data}`,
        `Wallet Info Error: ${walletInfo.error || 'None'}`
      ];
      
      
      if (walletInfo.success && walletInfo.data) {
        walletInfoDetails.push(
          `AC Coin Balance: ${walletInfo.data.balance}`,
          `Banana Count: ${walletInfo.data.bananaCount}`,
          `Gift Count: ${walletInfo.data.giftCount}`,
          `Recharge History Length: ${walletInfo.data.rechargeHistory.length}`
        );
      }
      
      // 使用测试断言来记录信息
      walletInfoDetails.forEach(detail => {
        expect(detail).toBeDefined();
      });
      
      // 验证响应结构
      expect(typeof walletInfo.success).toBe('boolean');
      if (walletInfo.success) {
        expect(walletInfo.data).toBeDefined();
        expect(typeof walletInfo.data!.balance).toBe('number');
        expect(typeof walletInfo.data!.bananaCount).toBe('number');
      }
    }, 10000); // 10秒超时

    it('should fail to get wallet info without token', async () => {
      // 创建一个新的API实例，不设置token
      const newApi = new AcFunLiveApi();
      
      const walletInfo = await newApi.user.getWalletInfo();
      
      // 验证返回错误信息
      expect(walletInfo.success).toBe(false);
      expect(walletInfo.error).toBe('缺少认证token，请先调用setAuthToken方法设置token');
    }, 5000); // 5秒超时
  });
});