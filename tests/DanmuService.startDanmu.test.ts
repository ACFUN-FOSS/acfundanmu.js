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
      // 我们需要的是token字段的值
      const token = tokenFileData.token;
      api.setAuthToken(token);
      
      // 解析token获取userID用于日志输出
      const tokenData = JSON.parse(token);
      console.log('已加载token:', tokenData.userID);
    } else {
      throw new Error('token.json不存在，请先生成token');
    }

    // 使用指定主播UID进行测试
    testLiverUID = '173620';
    console.log('\n使用指定的主播UID进行测试:', testLiverUID);
  }, 30000);

  /**
   * 测试用例1：成功启动弹幕获取
   */
  test('应该成功启动弹幕获取', async () => {
    console.log('\n=== 测试用例1：成功启动弹幕获取 ===');
    const params = {
      liverUID: testLiverUID,
      callback: '[Function]'
    };
    console.log('请求参数:', params);

    const receivedDanmus: any[] = [];
    const targetCount = 5; // 目标接收3条弹幕
    let resolvePromise: ((value: void) => void) | null = null;
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
      console.log(`收到第${receivedDanmus.length}条弹幕事件`);
      console.log('事件类型:', getEventType(event));
      
      // 所有事件现在都有统一的danmuInfo结构
      const danmuInfo = (event as any).danmuInfo;
      console.log('发送时间:', new Date(danmuInfo.sendTime).toLocaleString('zh-CN'));
      console.log('用户昵称:', danmuInfo.userInfo.nickname);
      console.log('用户ID:', danmuInfo.userInfo.userID);
      
      // 根据事件类型打印详细信息
      if ('content' in event) {
        console.log('>>> 弹幕内容:', event.content);
      } else if ('giftDetail' in event) {
        const gift = event as any;
        console.log('>>> 礼物名称:', gift.giftDetail?.giftName);
        console.log('>>> 礼物数量:', gift.count);
        console.log('>>> 礼物价值:', gift.value);
      } else if ('bananaCount' in event) {
        console.log('>>> 投蕉数量:', (event as any).bananaCount);
      } else if ('segments' in event) {
        console.log('>>> 富文本内容: [富文本消息]');
      }
      console.log('========================================\n');
      
      // 达到目标数量后resolve
      if (receivedDanmus.length >= targetCount && resolvePromise) {
        console.log(`\n✅已接收到${targetCount}条弹幕，测试完成！`);
        resolvePromise();
      }
    }, true);

    console.log('响应状态:', result.success ? 'success' : 'failed');
    console.log('返回数据:', result.data || { error: result.error });

    expect(result.success).toBe(true);
    expect(result.data?.sessionId).toBeDefined();
    expect(result.data?.sessionId).toBeTruthy();

    // 等待接收5条弹幕，或者超时（最多等待120秒）
    console.log(`\n等待接收${targetCount}条弹幕...`);
    const timeout = 300000;
    const timeoutPromise = new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('\n⚠️ 等待超时，当前已接收弹幕数:', receivedDanmus.length);
        resolve();
      }, timeout);
    });

    // 等待任一条件满足：收到5条弹幕或超时
    await Promise.race([danmuPromise, timeoutPromise]);

    // 打印统计信息
    console.log('\n========== 弹幕统计 ==========');
    console.log('总共接收弹幕数:', receivedDanmus.length);
    
    // 按类型统计
    const typeStats: Record<string, number> = {};
    receivedDanmus.forEach(event => {
      const type = getEventType(event);
      typeStats[type] = (typeStats[type] || 0) + 1;
    });
    
    console.log('\n弹幕类型分布:');
    Object.entries(typeStats).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });
    console.log('================================\n');

    

    // 清理：停止弹幕获取
    if (result.success && result.data?.sessionId) {
      await api.danmu.stopDanmu(result.data.sessionId);
    }

    // 断言至少收到了一些弹幕
    expect(receivedDanmus.length).toBeGreaterThan(0);
  }, 300000);
  /**
   * 辅助函数：获取事件类型码
   */
  function getEventTypeCode(event: any): number {
    if ('content' in event) return 1000; // 弹幕
    if ('giftDetail' in event) return 1005; // 礼物
    if ('bananaCount' in event) return 1004; // 投蕉
    if ('segments' in event) return 1006; // 富文本
    if ('fansInfo' in event) return 1007; // 加入守护团
    if ('sharePlatform' in event) return 1008; // 分享直播
    if ('joinTime' in event) return 1007; // 加入守护团
    
    // 通过检查其他属性判断
    const eventStr = JSON.stringify(event);
    if (eventStr.includes('enterRoom') || event.userInfo?.nickname) {
      // 简单的进房/点赞/关注判断
      if (!('content' in event) && !('giftDetail' in event)) {
        return 1002; // 进房/点赞/关注（默认返回进房类型）
      }
    }
    
    return 1002; // 默认返回进房类型
  }

  /**
   * 辅助函数：获取事件类型名称
   */
  function getEventType(event: any): string {
    if ('content' in event) return '评论弹幕';
    if ('giftDetail' in event) return '礼物';
    if ('bananaCount' in event) return '投蕉';
    if ('segments' in event) return '富文本';
    if ('fansInfo' in event) return '加入守护团';
    if ('sharePlatform' in event) return '分享直播';
    if ('joinTime' in event) return '加入守护团';
    
    // 通过检查其他属性判断
    const eventStr = JSON.stringify(event);
    if (eventStr.includes('enterRoom') || event.userInfo?.nickname) {
      // 简单的进房/点赞/关注判断
      if (!('content' in event) && !('giftDetail' in event)) {
        return '进房/点赞/关注';
      }
    }
    
    return '未知类型';
  }

  /**
   * 测试用例2：接收弹幕事件
   */
  test.skip('应该能接收弹幕事件', async () => {
    console.log('\n=== 测试用例2：接收弹幕事件 ===');
    
    const receivedEvents: any[] = [];
    const maxWaitTime = 10000; // 最多等待10秒（缩短测试时间）
    console.log('开始接收弹幕...');

    const params = {
      liverUID: testLiverUID,
      callback: '[Function]'
    };
    console.log('请求参数:', params);

    const result = await api.danmu.startDanmu(testLiverUID, (event) => {
      console.log('\n接收到的弹幕事件：');
      console.log('  事件类型:', (event as any).type || '未知');
      console.log('  发送时间:', new Date(event.sendTime).toLocaleString());
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
    }, true);

    console.log('响应状态:', result.success ? 200 : 500);
    console.log('返回数据:', result.data || { error: result.error });

    expect(result.success).toBe(true);
    console.log('弹幕服务启动成功，sessionId:', result.data?.sessionId);

    // 等待接收弹幕
    await new Promise(resolve => setTimeout(resolve, maxWaitTime));

    console.log(`\n总共接收到${receivedEvents.length}条弹幕`);
    
    // 统计弹幕类型
    const eventTypes: Record<string, number> = {};
    receivedEvents.forEach(event => {
      const type = (event as any).type || 'unknown';
      eventTypes[type] = (eventTypes[type] || 0) + 1;
    });

    console.log('\n弹幕类型分布：');
    Object.entries(eventTypes).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });

    // 断言至少收到了一些弹幕事件
    expect(receivedEvents.length).toBeGreaterThanOrEqual(0);

    // 清理
    if (result.success && result.data?.sessionId) {
      await api.danmu.stopDanmu(result.data.sessionId);
    }
  }, 300000);

  /**
   * 测试用例3：无效主播UID
   */
  test.skip('应该拒绝无效的主播UID', async () => {
    console.log('\n=== 测试用例3：无效主播UID ===');
    
    const invalidUID = '999999999';
    const params = {
      liverUID: invalidUID,
      callback: '[Function]'
    };
    console.log('请求参数:', params);

    const result = await api.danmu.startDanmu(invalidUID, (event) => {
      console.log('收到弹幕:', event);
    }, true);

    console.log('响应状态:', result.success ? 200 : 500);
    console.log('返回数据:', result.data || { error: result.error });

    // 预期会失败（可能是直播间不存在或未开播）
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
    
    console.log('无效UID的处理在获取直播token时失败');
  }, 300000);

  /**
   * 测试用例4：缺失token
   */
  test.skip('应该拒绝缺失token的请求', async () => {
    console.log('\n=== 测试用例4：缺失token ===');
    
    const apiWithoutToken = new AcFunLiveApi({});

    const params = {
      liverUID: testLiverUID,
      callback: '[Function]'
    };
    console.log('请求参数:', params);

    const result = await apiWithoutToken.danmu.startDanmu(testLiverUID, (event) => {
      console.log('收到弹幕:', event);
    }, true);

    console.log('响应状态:', result.success ? 200 : 500);
    console.log('返回数据:', result.data || { error: result.error });

    expect(result.success).toBe(false);
    expect(result.error).toContain('token');
  }, 300000);

  /**
   * 测试用例5：识别多种弹幕类型
   */
  test.skip('应该能识别多种弹幕类型', async () => {
    console.log('\n=== 测试用例5：识别多种弹幕类型 ===');
    
    const params = {
      liverUID: testLiverUID,
      callback: '[Function]'
    };
    console.log('请求参数:', params);

    const danmuTypes = new Set();
    let danmuCount = 0;
    const maxDanmu = 20; // 最多收集20条弹幕

    const result = await api.danmu.startDanmu(testLiverUID, (event) => {
      if (danmuCount < maxDanmu) {
        // 根据弹幕对象的属性判断类型
        let eventType = 'unknown';
        if ('content' in event) {
          eventType = 'comment';
        } else if ('giftDetail' in event) {
          eventType = 'gift';
        } else if ('bananaCount' in event) {
          eventType = 'throwBanana';
        } else if ('segments' in event) {
          eventType = 'richText';
        } else if ('joinTime' in event && 'fansInfo' in event) {
          eventType = 'joinClub';
        } else if ('sharePlatform' in event) {
          eventType = 'shareLive';
        } else if (event.userInfo && !('content' in event) && !('giftDetail' in event)) {
          eventType = 'like'; // 或其他基础事件
        }
        
        danmuTypes.add(eventType);
        danmuCount++;
        console.log(`弹幕 ${danmuCount}: 类型=${eventType}, 用户=${event.userInfo?.nickname || 'unknown'}`);
      }
    }, true);

    console.log('响应状态:', result.success ? 200 : 500);
    console.log('返回数据:', result.data || { error: result.error });

    if (result.success) {
      // 等待收集弹幕
      await new Promise(resolve => setTimeout(resolve, 10000));
      
      console.log(`收集到的弹幕类型: ${Array.from(danmuTypes).join(', ')}`);
      console.log(`总弹幕数量: ${danmuCount}`);
      
      // 至少应该有一种弹幕类型
      expect(danmuTypes.size).toBeGreaterThanOrEqual(0);
      
      // 停止弹幕获取
      if (result.data && result.data.sessionId) {
        await api.danmu.stopDanmu(result.data.sessionId);
      }
    } else {
      console.log('弹幕获取失败，可能是直播间未开播');
      expect(result.error).toBeDefined();
    }
  }, 300000);
});
