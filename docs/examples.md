# 使用示例文档

本文档提供常见业务场景的完整示例代码。

## 场景1：监控直播间弹幕

```typescript
import { AcFunLiveApi } from 'acfunlive-http-api';

async function monitorDanmu() {
  const api = new AcFunLiveApi({
    baseUrl: 'https://api.kuaishouzt.com'
  });

  // 登录（假设已有token）
  api.setAuthToken(savedToken);

  // 启动弹幕监控
  const result = await api.danmu.startDanmu('主播UID', (event) => {
    if ('content' in event) {
      console.log(`💬 ${event.danmuInfo.userInfo.nickname}: ${event.content}`);
    } else if ('giftDetail' in event) {
      console.log(`🎁 ${event.danmuInfo.userInfo.nickname} 送出 ${event.giftDetail.giftName}`);
    }
  });

  console.log('弹幕监控已启动:', result.data.sessionId);
}
```

## 场景2：同时监控多个直播间

```typescript
async function monitorMultipleLives() {
  const api = new AcFunLiveApi({
    baseUrl: 'https://api.kuaishouzt.com'
  });

  api.setAuthToken(token);

  const liverUIDs = ['123456', '789012', '345678'];
  const sessions = [];

  // 为每个主播启动监控
  for (const uid of liverUIDs) {
    const result = await api.danmu.startDanmu(uid, (event) => {
      if ('content' in event) {
        console.log(`[主播${uid}] ${event.danmuInfo.userInfo.nickname}: ${event.content}`);
      }
    });
    sessions.push(result.data.sessionId);
  }

  // 查看所有会话状态
  const stats = await api.danmu.getSessionStatistics();
  console.log('活跃会话数:', stats.data.activeSessions);

  // 定期清理空闲会话
  setInterval(async () => {
    await api.danmu.cleanupIdleSessions(1800000); // 30分钟
  }, 300000); // 每5分钟
}
```

## 场景3：完整的开播流程

```typescript
async function startLive() {
  const api = new AcFunLiveApi({
    baseUrl: 'https://api.kuaishouzt.com'
  });

  // 1. 检查开播权限
  const permission = await api.live.checkLivePermission();
  if (!permission.data.liveAuth) {
    console.error('没有开播权限');
    return;
  }

  // 2. 获取推流地址
  const streamUrl = await api.live.getStreamUrl('214844');
  console.log('RTMP:', streamUrl.data.rtmpUrl);
  console.log('密钥:', streamUrl.data.streamKey);

  // 3. 配置OBS并开始推流
  console.log('请配置OBS并开始推流...');

  // 4. 检测推流状态
  while (true) {
    const status = await api.live.getLiveStreamStatus();
    if (status.success && status.data) {
      console.log('检测到推流！');
      break;
    }
    await new Promise(r => setTimeout(r, 5000));
  }

  // 5. 正式开播
  const liveResult = await api.live.startLiveStream(
    '我的直播间',
    'cover.jpg',
    streamName,
    false, false, 1, 101
  );
  
  console.log('直播已开启:', liveResult.data.liveId);
}
```

## 场景4：获取直播统计数据

```typescript
async function getLiveStats() {
  const api = new AcFunLiveApi({
    baseUrl: 'https://api.kuaishouzt.com'
  });

  api.setAuthToken(token);

  // 获取热门直播
  const hotLives = await api.live.getHotLives('', 0, 10);
  
  for (const live of hotLives.data.lives) {
    // 获取每个直播的统计
    const stats = await api.live.getLiveStatistics(live.liveId);
    
    console.log('直播间:', live.title);
    console.log('观看人数:', stats.data.totalViewers);
    console.log('弹幕数:', stats.data.totalComments);
    console.log('礼物数:', stats.data.totalGifts);
  }
}
```

## 场景5：会话健康监控

```typescript
async function healthMonitoring() {
  const api = new AcFunLiveApi({
    baseUrl: 'https://api.kuaishouzt.com'
  });

  api.setAuthToken(token);

  const result = await api.danmu.startDanmu(liverUID, callback);
  const sessionId = result.data.sessionId;

  // 定期检查健康状态
  setInterval(async () => {
    const health = await api.danmu.getSessionHealth(sessionId);
    
    if (!health.data.isHealthy) {
      console.warn('会话不健康:', health.data.errorMessages);
      
      // 可以选择重启会话
      await api.danmu.stopDanmu(sessionId);
      await api.danmu.startDanmu(liverUID, callback);
    }
  }, 60000); // 每分钟检查
}
```

## 场景6：房管功能管理

```typescript
async function manageRoom() {
  const api = new AcFunLiveApi({
    baseUrl: 'https://api.kuaishouzt.com'
  });

  api.setAuthToken(token);

  // 获取当前房管列表
  const managers = await api.manager.getManagerList();
  console.log('当前房管数量:', managers.data.length);

  // 添加新房管
  const addResult = await api.manager.addManager(214844);
  if (addResult.success) {
    console.log('房管添加成功');
  }

  // 在直播间踢人
  const liveId = '123456';
  const kickResult = await api.manager.managerKick(liveId, 789012);
  if (kickResult.success) {
    console.log('踢人成功');
  }

  // 查看踢人记录
  const records = await api.manager.getAuthorKickRecords(liveId);
  console.log('踢人记录数:', records.data.length);
}
```

## 场景7：直播预告和回放

```typescript
async function previewAndReplay() {
  const api = new AcFunLiveApi({
    baseUrl: 'https://api.kuaishouzt.com'
  });

  api.setAuthToken(token);

  // 获取直播预告
  const previews = await api.livePreview.getLivePreviewList();
  console.log('即将开播的直播:');
  previews.data.previewList.forEach(preview => {
    console.log(`${preview.userName}: ${preview.liveTitle}`);
    console.log(`预定时间: ${preview.scheduledTime}`);
  });

  // 获取直播回放
  const replayResult = await api.replay.getLiveReplay('liveId123');
  if (replayResult.success) {
    console.log('回放信息:');
    console.log('时长:', replayResult.data.duration);
    console.log('播放地址:', replayResult.data.url);
    console.log('分辨率:', `${replayResult.data.width}x${replayResult.data.height}`);
  }
}
```

## 场景8：综合监控面板

```typescript
async function monitoringDashboard() {
  const api = new AcFunLiveApi({
    baseUrl: 'https://api.kuaishouzt.com'
  });

  api.setAuthToken(token);

  // 启动多个直播间监控
  const liverUIDs = ['123456', '789012'];
  const sessions = [];

  for (const uid of liverUIDs) {
    const result = await api.danmu.startDanmu(uid, (event) => {
      // 处理弹幕事件
      if ('content' in event) {
        console.log(`[${uid}] ${event.danmuInfo.userInfo.nickname}: ${event.content}`);
      }
    });
    sessions.push({ uid, sessionId: result.data.sessionId });
  }

  // 定期输出监控报告
  setInterval(async () => {
    console.log('\n=== 监控报告 ===');
    
    // 全局统计
    const globalStats = await api.danmu.getSessionStatistics();
    console.log('活跃会话:', globalStats.data.activeSessions);
    console.log('总消息数:', globalStats.data.totalMessages);

    // 各会话详情
    for (const session of sessions) {
      const detail = await api.danmu.getSessionDetail(session.sessionId);
      if (detail.success) {
        console.log(`会话 ${session.uid}:`, detail.data.state);
        console.log(`消息数: ${detail.data.messageCount}`);
      }
    }

    // 健康检查
    const healthResults = await Promise.all(
      sessions.map(s => api.danmu.getSessionHealth(s.sessionId))
    );
    
    const unhealthySessions = healthResults.filter(h => !h.data.isHealthy);
    if (unhealthySessions.length > 0) {
      console.warn('不健康会话数:', unhealthySessions.length);
    }

    console.log('==================\n');
  }, 30000); // 每30秒输出一次报告
}
```

更多示例请参阅 [API参考文档](./api-reference.md)。
