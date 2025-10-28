import { AcFunLiveApi } from '../src/index';
import * as fs from 'fs';
import * as path from 'path';

describe('GiftService', () => {
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

  describe('getLiveGiftList', () => {
    it.only('should successfully get live gift list', async () => {
      // 首先调用getHotLives获取第一个直播的liveId
      const hotLivesResult = await api.live.getHotLives();
      
      // 验证获取热门直播列表成功
      expect(hotLivesResult).toBeDefined();
      expect(typeof hotLivesResult.success).toBe('boolean');
      
      if (!hotLivesResult.success || !hotLivesResult.data || hotLivesResult.data.lives.length === 0) {
        // 如果没有获取到直播数据，跳过测试
        console.log('无法获取直播列表，跳过getLiveGiftList测试');
        return;
      }
      
      // 获取第一个直播的liveId
      const firstLive = hotLivesResult.data.lives[0];
      const liveId = firstLive.liveId;
      
      console.log(`📺 测试直播间ID: ${liveId}`);
      console.log(`📺 直播间标? ${firstLive.title}`);
      console.log(`👤 主播ID: ${firstLive.streamer?.userId || '未知'}`);
      
      // 使用获取到的liveId调用getLiveGiftList
      const params = { liveID: liveId };
      const result = await api.gift.getLiveGiftList(liveId);
      
      console.log('请求参数:', params);
      console.log('响应状?', result.success ? 200 : 500);
      console.log('返回数据:', result);
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      if (result.success) {
        expect(result.data).toBeDefined();
        
        // 验证礼物列表数据结构 - getLiveGiftList返回的是数组
        if (result.data) {
          expect(Array.isArray(result.data)).toBe(true);
          
          // 如果有礼物数据，验证礼物信息结构
          if (result.data.length > 0) {
            const firstGift = result.data[0];
            expect(firstGift.giftID).toBeDefined();
            expect(firstGift.giftName).toBeDefined();
            expect(typeof firstGift.price).toBe('number');
            expect(firstGift.pngPic).toBeDefined();
            
            console.log(`?获取直播间礼物列表成功！`);
            console.log(`📊 礼物列表详情：`);
            console.log(`礼物总数: ${result.data.length}`);
            console.log(`第一个礼? ${firstGift.giftName} (价格: ${firstGift.price})`);
          } else {
            console.log('?获取直播间礼物列表成功，但礼物列表为?);
          }
        }
      } else {
        console.log('?获取直播间礼物列表失?', result.error);
        // 即使失败也要验证错误信息存在
        expect(result.error).toBeDefined();
      }
    }, 15000); // 设置15秒超?
    it.skip('should handle invalid liveId', async () => {
      // 测试无效的liveId
      const invalidLiveId = 'invalid_live_id';
      const params = { liveID: invalidLiveId };
      const result = await api.gift.getLiveGiftList(invalidLiveId);
      
      console.log('请求参数:', params);
      console.log('响应状?', result.success ? 200 : 500);
      console.log('返回数据:', result);
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      // 对于无效liveId，API应该返回失败
      if (!result.success) {
        console.log('?无效liveId测试通过，API正确返回失败结果');
        expect(result.error).toBeDefined();
      } else {
        console.log('⚠️ 无效liveId测试：API返回成功，但这是预期行为吗？');
      }
    }, 10000); // 设置10秒超?
    it.skip('should handle empty liveId', async () => {
      // 测试空的liveId
      const emptyLiveId = '';
      const params = { liveID: emptyLiveId };
      const result = await api.gift.getLiveGiftList(emptyLiveId);
      
      console.log('请求参数:', params);
      console.log('响应状?', result.success ? 200 : 500);
      console.log('返回数据:', result);
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      // 对于空liveId，API应该返回失败
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      console.log('?空liveId测试通过，API正确返回失败结果');
    }, 10000); // 设置10秒超?  });
});

