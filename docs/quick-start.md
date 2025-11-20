# 快速开始指南

本指南将帮助您在5分钟内完成 AcFun 直播 API 的基础配置和使用。

## 📋 前置要求

- Node.js >= 16.0.0
- npm 或 yarn 包管理器
- TypeScript 基础知识（可选）

## 🚀 安装

### 使用 npm

```bash
npm install acfunlive-http-api
```

### 使用 yarn

```bash
yarn add acfunlive-http-api
```

## 🔧 基础配置

### 1. 创建API实例

```typescript
import { AcFunLiveApi } from 'acfunlive-http-api';

const api = new AcFunLiveApi({
  baseUrl: 'https://api.kuaishouzt.com',
  timeout: 10000  // 请求超时时间(毫秒)
});
```

### 2. 用户登录

AcFun API 使用二维码登录方式，完整流程如下：

```typescript
// 获取登录二维码
const qrResult = await api.auth.qrLogin();

if (qrResult.success) {
  // qrResult.data.qrCode 是 Base64 编码的图片数据
  console.log('二维码数据:', qrResult.data.qrCode);
  console.log('二维码过期时间:', qrResult.data.expiresIn, '毫秒');
  
  // 在应用中显示二维码，让用户使用 AcFun App 扫码
  // 例如：在网页中显示、保存为图片文件等
}
```

### 3. 检查登录状态

用户扫码后，需要轮询检查登录状态：

```typescript
// 轮询检查登录状态（建议间隔 1-2 秒）
const checkLogin = async () => {
  while (true) {
    const statusResult = await api.auth.checkQrLoginStatus();
    
    if (statusResult.success) {
      // 登录成功，保存 Token
      const token = statusResult.data.token;
      api.setAuthToken(token);
      
      console.log('登录成功!');
      console.log('用户ID:', statusResult.data.userId);
      console.log('用户名:', statusResult.data.userName);
      break;
    } else if (statusResult.error?.includes('过期')) {
      console.log('二维码已过期，请重新获取');
      break;
    }
    
    // 等待 2 秒后继续检查
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
};

await checkLogin();
```

## 💬 获取弹幕

登录成功后，就可以开始监控直播间弹幕了：

### 启动弹幕监控

```typescript
const liverUID = '123456';  // 主播的 UID

const result = await api.danmu.startDanmu(liverUID, (event) => {
  if ('danmuInfo' in event) {
    if (event.actionType === 'comment' || 'content' in event) {
      console.log(`[弹幕] ${event.danmuInfo.userInfo.nickname}: ${event.content}`);
    } else if (event.actionType === 'gift' || 'giftDetail' in event) {
      const gift = event.giftDetail;
      console.log(`[礼物] ${event.danmuInfo.userInfo.nickname} 送出 ${gift.giftName} x${event.count}`);
    } else if (event.actionType === 'enterRoom') {
      console.log(`[进房] ${event.danmuInfo.userInfo.nickname} 进入直播间`);
    }
  } else if (event && event.type) {
    switch (event.type) {
      case 'displayInfo':
        console.log('在线/点赞:', event.data.watchingCount, event.data.likeCount, '+', event.data.likeDelta);
        break;
      case 'topUsers':
        console.log('礼物榜前三:', event.data.map((u: any) => u.userInfo.nickname).join(', '));
        break;
      case 'end':
        console.log('直播结束，自动关闭会话');
        break;
      default:
        break;
    }
  }
});

if (result.success) {
  console.log('弹幕监控已启动');
  console.log('会话ID:', result.data.sessionId);
} else {
  console.error('启动失败:', result.error);
}
```

### 停止弹幕监控

```typescript
const sessionId = result.data.sessionId;

const stopResult = await api.danmu.stopDanmu(sessionId);

if (stopResult.success) {
  console.log('弹幕监控已停止');
}
```

## 📺 直播管理

### 检查开播权限

```typescript
const permissionResult = await api.live.checkLivePermission();

if (permissionResult.data.liveAuth) {
  console.log('有开播权限');
} else {
  console.log('没有开播权限');
}
```

### 获取推流地址

```typescript
const streamResult = await api.live.getStreamUrl('214844');

if (streamResult.success) {
  console.log('RTMP服务器:', streamResult.data.rtmpUrl);
  console.log('推流密钥:', streamResult.data.streamKey);
  
  // 配置到 OBS 或其他推流软件
}
```

### 获取热门直播

```typescript
const hotLivesResult = await api.live.getHotLives('', 0, 10);

if (hotLivesResult.success) {
  hotLivesResult.data.lives.forEach(live => {
    console.log('直播:', live.title);
    console.log('主播:', live.streamer.userName);
    console.log('观看:', live.onlineCount);
  });
}

### 获取直播间观众列表

```typescript
const hotLivesResult = await api.live.getHotLives('', 0, 10);
const liveId = hotLivesResult.success && hotLivesResult.data.lives[0]?.liveId ? hotLivesResult.data.lives[0].liveId : '';
if (liveId) {
  const watchingResult = await api.live.getWatchingList(liveId);
  if (watchingResult.success) {
    console.log('观众数量:', watchingResult.data.length);
  }
}
```

```

## 👤 用户信息

### 获取用户资料

```typescript
const userResult = await api.user.getUserInfo('214844');

if (userResult.success) {
  const user = userResult.data;
  console.log('用户名:', user.userName);
  console.log('等级:', user.level);
  console.log('粉丝数:', user.fansCount);
  console.log('关注数:', user.followCount);
  console.log('是否在播:', user.isLive);
}
```

### 获取钱包信息

```typescript
const walletResult = await api.user.getWalletInfo();

if (walletResult.success) {
  console.log('AC币余额:', walletResult.data.balance);
  console.log('香蕉数量:', walletResult.data.bananaCount);
}
```

## 🎁 礼物信息

### 获取所有礼物列表

```typescript
const giftResult = await api.gift.getAllGiftList();

if (giftResult.success) {
  giftResult.data.forEach(gift => {
    console.log('礼物:', gift.giftName);
    console.log('价格:', gift.price, 'AC币');
  });
}
```

## 📺 直播预告

### 获取直播预告列表

```typescript
const previewResult = await api.livePreview.getLivePreviewList();

if (previewResult.success) {
  previewResult.data.previewList.forEach(preview => {
    console.log('主播:', preview.userName);
    console.log('标题:', preview.liveTitle);
    console.log('预定时间:', preview.scheduledTime);
  });
}
```

## 👮 房管功能

### 获取房管列表

```typescript
const managerResult = await api.manager.getManagerList();

if (managerResult.success) {
  managerResult.data.forEach(manager => {
    console.log('房管:', manager.nickname);
    console.log('在线状态:', manager.online ? '在线' : '离线');
  });
}
```

### 添加/删除房管

```typescript
// 添加房管
const addResult = await api.manager.addManager(214844);
if (addResult.success) {
  console.log('房管添加成功');
}

// 删除房管
const deleteResult = await api.manager.deleteManager(214844);
if (deleteResult.success) {
  console.log('房管删除成功');
}
```

### 踢人功能

```typescript
const liveId = '123456';
const kickedUserId = 789;

// 房管踢人
const managerKickResult = await api.manager.managerKick(liveId, kickedUserId);
if (managerKickResult.success) {
  console.log('房管踢人成功');
}

// 主播踢人
const authorKickResult = await api.manager.authorKick(liveId, kickedUserId);
if (authorKickResult.success) {
  console.log('主播踢人成功');
}
```

## 🎬 直播回放

### 获取直播回放信息

```typescript
const replayResult = await api.replay.getLiveReplay('liveId123');

if (replayResult.success) {
  console.log('回放时长:', replayResult.data.duration);
  console.log('回放地址:', replayResult.data.url);
  console.log('分辨率:', `${replayResult.data.width}x${replayResult.data.height}`);
}
```

## 🔄 完整示例

以下是一个完整的弹幕监控示例：

```typescript
import { AcFunLiveApi } from 'acfunlive-http-api';

async function main() {
  // 1. 创建 API 实例
  const api = new AcFunLiveApi({
    baseUrl: 'https://api.kuaishouzt.com',
    timeout: 10000
  });

  // 2. 登录
  console.log('开始登录流程...');
  const qrResult = await api.auth.qrLogin();
  console.log('请使用 AcFun App 扫描二维码登录');
  console.log('二维码数据:', qrResult.data.qrCode);

  // 3. 轮询检查登录状态
  while (true) {
    const statusResult = await api.auth.checkQrLoginStatus();
    if (statusResult.success) {
      api.setAuthToken(statusResult.data.token);
      console.log('登录成功! 用户:', statusResult.data.userName);
      break;
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // 4. 启动弹幕监控
  const liverUID = '123456';
  const danmuResult = await api.danmu.startDanmu(liverUID, (event) => {
    if ('content' in event) {
      console.log(`💬 ${event.danmuInfo.userInfo.nickname}: ${event.content}`);
    } else if ('giftDetail' in event) {
      console.log(`🎁 ${event.danmuInfo.userInfo.nickname} 送出 ${event.giftDetail.giftName} x${event.count}`);
    }
  });

  if (danmuResult.success) {
    console.log('弹幕监控已启动，会话ID:', danmuResult.data.sessionId);
    console.log('按 Ctrl+C 停止监控');
  }

  // 5. 优雅退出
  process.on('SIGINT', async () => {
    console.log('\n正在停止弹幕监控...');
    await api.danmu.stopDanmu(danmuResult.data.sessionId);
    console.log('已停止');
    process.exit(0);
  });
}

main().catch(console.error);
```

## ⚠️ 注意事项

### Token 安全
- Token 包含敏感信息，切勿硬编码在代码中
- 建议使用环境变量存储 Token
- 不要将 Token 提交到版本控制系统

### 弹幕监控
- 主播必须正在直播才能成功连接
- 可以同时监控多个直播间，但注意资源消耗
- 不再使用时务必调用 `stopDanmu()` 释放资源

### 推流开播
- 必须先使用推流软件推流，服务器检测到推流后才能正式开播
- 推流地址有效期通常为 24 小时，过期需重新获取
- 新注册账号可能没有开播权限

### 错误处理
- 所有 API 调用都可能失败，务必检查 `success` 字段
- 网络不稳定时实现重试机制
- 及时清理不再使用的会话和连接

## 🔗 下一步

- 查看 [API参考文档](./api-reference.md) 了解所有可用接口
- 阅读 [架构设计文档](./architecture.md) 深入了解系统设计
- 参考 [使用示例文档](./examples.md) 学习更多业务场景

## 💡 获取帮助

如果遇到问题：

1. 查看 [API参考文档](./api-reference.md)
2. 检查常见错误处理
3. 提交 [GitHub Issue](https://github.com/acfunlive/acfunlive-http-api/issues)

---

祝您使用愉快！🎉
### 开播封面输入

```typescript
// URL
await api.live.startLiveStream('title', 'https://example.com/c.jpg', 'kszt_xxx', false, false, 1, 101);

// 数据URI
await api.live.startLiveStream('title', 'data:image/png;base64,iVBORw0...', 'kszt_xxx', false, false, 1, 101);

// 纯Base64
await api.live.startLiveStream('title', 'iVBORw0...', 'kszt_xxx', false, false, 1, 101);
```
