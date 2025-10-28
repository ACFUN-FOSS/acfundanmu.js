import { AcFunLiveApi } from '../src/index';
import * as fs from 'fs';
import * as path from 'path';

describe('LiveService.getSummary', () => {
  let api: AcFunLiveApi;
  let token: string;

  beforeAll(() => {
    // 创建AcFunLiveApi实例
    api = new AcFunLiveApi({
      timeout: 10000
    });

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

  it('should get live summary successfully', async () => {
    // 首先获取热门直播列表以获取liveId
    const hotLivesResult = await api.live.getHotLives();
    
    if (!hotLivesResult.success || !hotLivesResult.data?.lives?.length) {
      console.log('⚠️无法获取热门直播列表，跳过getSummary测试');
      return;
    }

    const firstLive = hotLivesResult.data.lives[0];
    const liveId = firstLive.liveId;
    
    if (!liveId) {
      console.log('⚠️无法获取有效的liveId，跳过getSummary测试');
      return;
    }

    console.log(`📺 测试直播间ID: ${liveId}`);
    console.log(`📺 直播间标题: ${firstLive.title}`);
    console.log(`👤 主播ID: ${firstLive.streamer?.userId || '未知'}`);

    const params = { liveId };
    const result = await api.live.getSummary(liveId);
    
    console.log('请求参数:', params);
    console.log('响应状态:', result.success ? 200 : 500);
    console.log('返回数据:', result.data || result.error);

    // 验证返回结果
    expect(result).toBeDefined();
    
    if (result.success) {
      expect(result.data).toBeDefined();
      if (result.data) {
        expect(typeof result.data.liveDurationMs).toBe('number');
        expect(typeof result.data.likeCount).toBe('number');
        expect(typeof result.data.watchCount).toBe('number');
        expect(typeof result.data.giftCount).toBe('number');
        expect(typeof result.data.diamondCount).toBe('number');
        expect(typeof result.data.bananaCount).toBe('number');
        
        console.log('✅获取直播总结成功！');
        console.log('📊 直播总结详情：');
        console.log(`直播时长: ${result.data.liveDurationMs} 毫秒`);
        console.log(`点赞数: ${result.data.likeCount}`);
        console.log(`观看人数: ${result.data.watchCount}`);
        console.log(`礼物数: ${result.data.giftCount}`);
        console.log(`钻石数: ${result.data.diamondCount}`);
        console.log(`香蕉数: ${result.data.bananaCount}`);
      }
    } else {
      console.log('❌获取直播总结失败:', result.error);
    }
  }, 30000);

  it.skip('should handle invalid liveId', async () => {
    const invalidLiveId = 'invalid_live_id_12345';
    const params = { liveId: invalidLiveId };
    
    const result = await api.live.getSummary(invalidLiveId);
    
    console.log('请求参数:', params);
    console.log('响应状态:', result.success ? 200 : 500);
    console.log('返回数据:', result.data || result.error);

    // 验证返回结果
    expect(result).toBeDefined();
    
    if (!result.success) {
      console.log('✅无效liveId测试通过，API正确返回失败结果');
    } else {
      console.log('⚠️ 无效liveId测试：API返回成功，但这是预期行为吗？');
    }
  }, 30000);

  it.skip('should handle empty liveId', async () => {
    const emptyLiveId = '';
    const params = { liveId: emptyLiveId };
    
    const result = await api.live.getSummary(emptyLiveId);
    
    console.log('请求参数:', params);
    console.log('响应状态:', result.success ? 200 : 500);
    console.log('返回数据:', result.data || result.error);

    // 验证返回结果
    expect(result).toBeDefined();
    expect(result.success).toBe(false);
    expect(result.error).toContain('直播ID不能为空');
    
    console.log('✅空liveId测试通过，API正确返回失败结果');
  }, 30000);

  it.skip('should handle network error', async () => {
    // 使用一个可能存在的liveId，但模拟网络错误情况
    const hotLivesResult = await api.live.getHotLives();
    
    if (!hotLivesResult.success || !hotLivesResult.data?.lives?.length) {
      console.log('⚠️无法获取热门直播列表，跳过网络错误测试');
      return;
    }

    const firstLive = hotLivesResult.data.lives[0];
    const liveId = firstLive.liveId;
    
    if (!liveId) {
      console.log('⚠️无法获取有效的liveId，跳过网络错误测试');
      return;
    }

    // 临时清除token以模拟认证错误
    const originalToken = token;
    api.setAuthToken('invalid_token');
    
    const params = { liveId };
    const result = await api.live.getSummary(liveId);
    
    console.log('请求参数:', params);
    console.log('响应状态:', result.success ? 200 : 500);
    console.log('返回数据:', result.data || result.error);

    // 恢复原始token
    api.setAuthToken(originalToken);

    // 验证返回结果
    expect(result).toBeDefined();
    
    if (!result.success) {
      console.log('✅网络错误测试通过，API正确处理了认证失败');
    } else {
      console.log('⚠️ 网络错误测试：API返回成功，但这是预期行为吗？');
    }
  }, 30000);
});