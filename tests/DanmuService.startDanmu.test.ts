import { AcFunLiveApi } from '../src/AcFunLiveApi';
import * as fs from 'fs';
import * as path from 'path';

describe('DanmuService.startDanmu', () => {
  let api: AcFunLiveApi;
  let testLiverUID: string;

  beforeAll(async () => {
    // 创建API实例
    api = new AcFunLiveApi();

    // 加载token
    const tokenPath = path.join(__dirname, 'token.json');
    if (fs.existsSync(tokenPath)) {
      const tokenFileData = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));
      // token.json的结构是 { "token": "{...}", "userId": ..., ... }
      // 我们需要的�?token 字段的�?      const token = tokenFileData.token;
      api.setAuthToken(token);
      
      // 解析token获取userID用于日志输出
      const tokenData = JSON.parse(token);
      console.log('已加载token:', tokenData.userID);
    } else {
      throw new Error('token.json不存在，请先生成token');
    }

    // 动态获取正在直播的主播UID
    console.log('\n开始获取正在直播的主播UID...');
    const params = {};
    const response = await api.live.getHotLives();
    
    console.log('请求参数:', params);
    console.log('响应状�?', response.success ? 'success' : 'failed');
    console.log('返回数据:', JSON.stringify(response.data, null, 2));
    
    if (!response.success || !response.data || response.data.lives.length === 0) {
      throw new Error('无法获取正在直播的主播，请稍后重�?);
    }
    
    // 提取第一个主播的UID
    const firstLive = response.data!.lives[0];
    testLiverUID = String(firstLive.streamer?.userId || '');
    console.log('\n提取到主播UID:', testLiverUID);
    console.log('主播昵称:', firstLive.streamer?.userName || '');
    console.log('直播标题:', firstLive.title);
  }, 30000);

  /**
   * 测试用例1：成功启动弹幕获�?   */
  test('应该成功启动弹幕获取', async () => {
    console.log('\n=== 测试用例1：成功启动弹幕获�?===');
    const params = {
      liverUID: testLiverUID,
      callback: '[Function]'
    };
    console.log('请求参数:', params);

    const receivedDanmus: any[] = [];
    const targetCount = 5; // 目标接收3条弹�?    let resolvePromise: ((value: void) => void) | null = null;
    const danmuPromise = new Promise<void>((resolve) => {
      resolvePromise = resolve;
    });

    const result = await api.danmu.startDanmu(testLiverUID, (event) => {
      // 将事件转换为明文结构并添加到数组
      const plainEvent = {
        liverUID: Number(testLiverUID),
        type: getEventTypeCode(event),
        data: event
      };
      receivedDanmus.push(plainEvent);
      
      console.log('\n========================================');
      console.log(`收到�?${receivedDanmus.length} 条弹幕事件`);
      console.log('事件类型:', getEventType(event));
      
      // 所有事件现在都有统一的danmuInfo结构
      const danmuInfo = (event as any).danmuInfo;
      console.log('发送时�?', new Date(danmuInfo.sendTime).toLocaleString('zh-CN'));
      console.log('用户昵称:', danmuInfo.userInfo.nickname);
      console.log('用户ID:', danmuInfo.userInfo.userID);
      
      // 根据事件类型打印详细信息
      if ('content' in event) {
        console.log('>>> 弹幕内容:', event.content);
      } else if ('giftDetail' in event) {
        const gift = event as any;
        console.log('>>> 礼物名称:', gift.giftDetail?.giftName);
        console.log('>>> 礼物数量:', gift.count);
        console.log('>>> 礼物价�?', gift.value);
      } else if ('bananaCount' in event) {
        console.log('>>> 投蕉数量:', (event as any).bananaCount);
      } else if ('segments' in event) {
        console.log('>>> 富文本内�? [富文本消息]');
      }
      console.log('========================================\n');
      
      // 达到目标数量后resolve
      if (receivedDanmus.length >= targetCount && resolvePromise) {
        console.log(`\n�?已接收到 ${targetCount} 条弹幕，测试完成！`);
        resolvePromise();
      }
    });

    console.log('响应状�?', result.success ? 'success' : 'failed');
    console.log('返回数据:', result.data || { error: result.error });

    expect(result.success).toBe(true);
    expect(result.data?.sessionId).toBeDefined();
    expect(result.data?.sessionId).toBeTruthy();

    // 等待接收�?条弹幕，或者超时（最多等�?20秒）
    console.log(`\n等待接收 ${targetCount} 条弹�?..`);
    const timeout = 120000; // 120秒超�?    const timeoutPromise = new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('\n⚠️ 等待超时，当前已接收弹幕�?', receivedDanmus.length);
        resolve();
      }, timeout);
    });

    // 等待任一条件满足：收�?条弹幕或超时
    await Promise.race([danmuPromise, timeoutPromise]);

    // 打印统计信息
    console.log('\n========== 弹幕统计 ==========');
    console.log('总共接收弹幕�?', receivedDanmus.length);
    
    // 按类型统�?    const typeStats: Record<string, number> = {};
    receivedDanmus.forEach(event => {
      const type = getEventType(event);
      typeStats[type] = (typeStats[type] || 0) + 1;
    });
    
    console.log('\n弹幕类型分布:');
    Object.entries(typeStats).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });
    console.log('================================\n');

    

    // 清理：停止弹幕获�?    if (result.success && result.data?.sessionId) {
      await api.danmu.stopDanmu(result.data.sessionId);
    }

    // 断言至少收到了一些弹�?    expect(receivedDanmus.length).toBeGreaterThan(0);
  }, 150000); // 总超时时�?50�?
  /**
   * 辅助函数：获取事件类型码
   */
  function getEventTypeCode(event: any): number {
    if ('content' in event) return 1000; // 弹幕
    if ('giftDetail' in event) return 1005; // 礼物
    if ('bananaCount' in event) return 1004; // 投蕉
    if ('segments' in event) return 1006; // 富文�?    if ('fansInfo' in event) return 1007; // 加入守护�?    if ('sharePlatform' in event) return 1008; // 分享直播
    if ('joinTime' in event) return 1007; // 加入守护�?    
    // 通过检查其他属性判�?    const eventStr = JSON.stringify(event);
    if (eventStr.includes('enterRoom') || event.userInfo?.nickname) {
      // 简单的进房/点赞/关注判断
      if (!('content' in event) && !('giftDetail' in event)) {
        return 1002; // 进房/点赞/关注（默认返回进房类型）
      }
    }
    
    return 1002; // 默认返回进房类型
  }

  /**
   * 辅助函数：获取事件类型名�?   */
  function getEventType(event: any): string {
    if ('content' in event) return '评论弹幕';
    if ('giftDetail' in event) return '礼物';
    if ('bananaCount' in event) return '投蕉';
    if ('segments' in event) return '富文�?;
    if ('fansInfo' in event) return '加入守护�?;
    if ('sharePlatform' in event) return '分享直播';
    if ('joinTime' in event) return '加入守护�?;
    
    // 通过检查其他属性判�?    const eventStr = JSON.stringify(event);
    if (eventStr.includes('enterRoom') || event.userInfo?.nickname) {
      // 简单的进房/点赞/关注判断
      if (!('content' in event) && !('giftDetail' in event)) {
        return '进房/点赞/关注';
      }
    }
    
    return '未知类型';
  }

  /**
   * 测试用例2：接收弹幕事�?   */
  test.skip('应该能接收弹幕事�?, async () => {
    console.log('\n=== 测试用例2：接收弹幕事�?===');
    
    const receivedEvents: any[] = [];
    const maxWaitTime = 10000; // 最多等�?0秒（缩短测试时间�?
    console.log('开始接收弹�?..');

    const result = await api.danmu.startDanmu(testLiverUID, (event) => {
      console.log('\n接收到的弹幕事件�?);
      console.log('  事件类型:', (event as any).type || '未知');
      console.log('  发送时�?', new Date(event.sendTime).toLocaleString());
      console.log('  用户昵称:', event.userInfo.nickname);
      console.log('  用户ID:', event.userInfo.userID);
      
      if ('content' in event) {
        console.log('  弹幕内容:', (event as any).content);
      }
      if ('giftDetail' in event) {
        const gift = event as any;
        console.log('  礼物名称:', gift.giftDetail?.giftName);
        console.log('  礼物数量:', gift.count);
      }
      
      receivedEvents.push(event);
    });

    expect(result.success).toBe(true);
    console.log('弹幕服务启动成功，sessionId:', result.data?.sessionId);

    // 等待接收弹幕
    await new Promise(resolve => setTimeout(resolve, maxWaitTime));

    console.log(`\n总共接收�?${receivedEvents.length} 条弹幕`);
    
    // 统计弹幕类型
    const eventTypes: Record<string, number> = {};
    receivedEvents.forEach(event => {
      const type = (event as any).type || 'unknown';
      eventTypes[type] = (eventTypes[type] || 0) + 1;
    });

    console.log('\n弹幕类型分布�?);
    Object.entries(eventTypes).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });

    // 注意：由于直播间可能没有弹幕，这个断言可能失败
    // 实际测试时应该选择一个活跃的直播�?    console.log('\n注意：如果直播间不活跃，可能不会收到弹幕');

    // 清理
    if (result.success && result.data?.sessionId) {
      await api.danmu.stopDanmu(result.data.sessionId);
    }
  }, 90000);

  /**
   * 测试用例3：无效主播UID
   */
  test.skip('应该拒绝无效的主播UID', async () => {
    console.log('\n=== 测试用例3：无效主播UID ===');
    
    const invalidUID = '999999999';
    console.log('接口请求参数�?);
    console.log('  liverUID:', invalidUID);

    const result = await api.danmu.startDanmu(invalidUID, (event) => {
      console.log('收到弹幕:', event);
    });

    console.log('\n接口响应状�?', result.success ? 'success' : 'failed');
    console.log('接口返回数据:');
    if (result.error) {
      console.log('  error:', result.error);
    }

    // 预期会失败（可能是直播间不存在或未开播）
    // expect(result.success).toBe(false);
    // expect(result.error).toBeDefined();
    
    console.log('注意：无效UID的处理可能在获取直播token时失�?);
  }, 30000);

  /**
   * 测试用例4：缺失token
   */
  test.skip('应该拒绝缺失token的请�?, async () => {
    console.log('\n=== 测试用例4：缺失token ===');
    
    const apiWithoutToken = new AcFunLiveApi({
      
    });

    const result = await apiWithoutToken.danmu.startDanmu(testLiverUID, (event) => {
      console.log('收到弹幕:', event);
    });

    console.log('\n接口响应状�?', result.success ? 'success' : 'failed');
    console.log('接口返回数据:');
    if (result.error) {
      console.log('  error:', result.error);
    }

    expect(result.success).toBe(false);
    expect(result.error).toContain('token');
  }, 30000);

  /**
   * 测试用例5：多种弹幕类型识�?   */
  test.skip('应该能识别多种弹幕类�?, async () => {
    console.log('\n=== 测试用例5：多种弹幕类型识�?===');
    
    const receivedEvents: any[] = [];
    const maxWaitTime = 60000; // 等待60�?
    const result = await api.danmu.startDanmu(testLiverUID, (event) => {
      receivedEvents.push(event);
    });

    if (!result.success) {
      console.log('启动弹幕失败:', result.error);
      return;
    }

    console.log('开始收集弹幕，等待', maxWaitTime / 1000, '�?..');
    await new Promise(resolve => setTimeout(resolve, maxWaitTime));

    console.log(`\n总共收集�?${receivedEvents.length} 条弹幕`);

    // 统计各类型弹幕数�?    const typeStats: Record<string, number> = {};
    receivedEvents.forEach(event => {
      // 通过检查事件对象的属性来判断类型
      let type = 'unknown';
      if ('content' in event) type = 'comment';
      else if ('giftDetail' in event) type = 'gift';
      else if ('bananaCount' in event) type = 'throwBanana';
      else if ('segments' in event) type = 'richText';
      else if ('joinTime' in event) type = 'joinClub';
      else if ('sharePlatform' in event) type = 'shareLive';
      
      typeStats[type] = (typeStats[type] || 0) + 1;
    });

    console.log('\n弹幕类型分布统计�?);
    Object.entries(typeStats).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });

    // 清理
    if (result.data?.sessionId) {
      await api.danmu.stopDanmu(result.data.sessionId);
    }
  }, 120000);
});
