# API 参考文档

完整的 AcFun 直播 API 接口参考文档。

## 通用响应格式

所有 API 接口返回统一的响应格式：

```typescript
interface ApiResponse<T> {
  success: boolean;    // 请求是否成功
  data?: T;           // 成功时返回的数据
  error?: string;     // 失败时的错误消息
  code?: number;      // 错误码(可选)
  headers?: Record<string, any>; // 响应头信息(可选)
}
```

## API 配置

### ApiConfig 配置选项

```typescript
interface ApiConfig {
  baseUrl?: string;           // API基础URL，默认: 'https://api.kuaishouzt.com'
  timeout?: number;           // 请求超时时间(毫秒)，默认: 10000
  retryCount?: number;        // 重试次数，默认: 3
  headers?: Record<string, string>; // 自定义请求头
}
```

### 创建API实例

```typescript
import { AcFunLiveApi } from 'acfunlive-http-api';

// 使用默认配置
const api = new AcFunLiveApi();

// 使用自定义配置
const api = new AcFunLiveApi({
  timeout: 15000,
  retryCount: 5,
  headers: {
    'User-Agent': 'MyApp/1.0.0'
  }
});
```

## 认证 API

### qrLogin - 获取登录二维码

获取用于扫码登录的二维码。

**请求参数：** 无

**响应数据：**
```typescript
interface QRCodeLoginResponse {
  qrCode: string;           // Base64编码的二维码图片
  expiresIn: number;        // 过期时间(毫秒)
  qrLoginToken: string;     // 登录令牌
  qrLoginSignature: string; // 登录签名
}
```

**示例：**
```typescript
const result = await api.auth.qrLogin();
console.log('二维码:', result.data.qrCode);
```

### checkQrLoginStatus - 检查登录状态

轮询检查用户是否已扫码确认登录。

**请求参数：** 无（使用内部保存的令牌）

**响应数据：**
```typescript
interface AuthResponse {
  userId: string;
  userName: string;
  token: string;  // JSON字符串格式的TokenInfo
}
```

### setAuthToken - 设置认证令牌

设置用于后续 API 调用的认证 Token。

**参数：**
- `token: string` - 认证Token

**返回：** 无

## 弹幕 API

### startDanmu - 启动弹幕

连接直播间并开始接收弹幕、状态与通知信号。统一使用一个回调函数。

**参数：**
- `liverUID: string` - 主播UID
- `callback: (event: any) => void` - 统一回调函数

**响应：**
```typescript
{ sessionId: string }
```

**回调事件说明：**
- 行为事件（包含 `danmuInfo`）：`Comment`、`Like`、`EnterRoom`、`FollowAuthor`、`ThrowBanana`、`Gift`、`RichText`、`JoinClub`、`ShareLive`
- 状态事件（形如 `{ type, data }`）：
  - `{ type: 'bananaCount', data: number }`
  - `{ type: 'displayInfo', data: { watchingCount: string; likeCount: string; likeDelta: number } }`
  - `{ type: 'topUsers', data: TopUser[] }`
  - `{ type: 'recentComment', data: Comment[] }`（逐条派发）
  - `{ type: 'chatCall' | 'chatAccept' | 'chatReady' | 'chatEnd', data: ... }`
- 通知事件（形如 `{ type, data }`）：
  - `{ type: 'kickedOut', data: string }`
  - `{ type: 'violationAlert', data: string }`
  - `{ type: 'managerState', data: number }`
- 结束事件：`{ type: 'end' }`（当直播关闭或被封禁时派发，并自动关闭会话）

#### 行为事件结构
```typescript
interface DanmuInfo { sendTime: number; userInfo: UserInfo }
type ActionType = 'comment' | 'like' | 'enterRoom' | 'followAuthor' | 'throwBanana' | 'gift' | 'richText' | 'joinClub' | 'shareLive'
interface Comment { actionType: ActionType; content: string; sendTime: number; userInfo: UserInfo }
interface Gift { actionType: ActionType; giftDetail: GiftDetail; count: number; combo: number; value: number; sendTime: number; userInfo: UserInfo }
```

#### 状态/通知事件结构
```typescript
interface DisplayInfo { watchingCount: string; likeCount: string; likeDelta: number }
type TopUser = WatchingUser
interface ChatCall { chatID: string; liveID: string; callTime: number }
interface ChatAccept { chatID: string; mediaType: number; signalInfo: string }
interface ChatReady { chatID: string; guest: UserInfo; mediaType: number }
interface ChatEnd { chatID: string; endType: number }
```

### stopDanmu - 停止弹幕

停止指定会话的弹幕接收。

**参数：**
- `sessionId: string`

### 会话管理接口

#### getAllSessions - 获取所有会话

**响应：**
```typescript
SessionSummary[] {
  sessionId, liverUID, state, createdAt, messageCount
}
```

#### getSessionDetail - 获取会话详情

**参数：** `sessionId: string`

#### getSessionsByState - 按状态筛选

**参数：** `state: DanmuSessionState`

#### getSessionStatistics - 全局统计

**响应：**
```typescript
GlobalStatistics {
  totalSessions, activeSessions, 
  errorSessions, totalMessagesReceived
}
```

#### pauseSessions - 批量暂停

**参数：** `sessionIds: string[]`

#### resumeSessions - 批量恢复

**参数：** `sessionIds: string[]`

#### cleanupIdleSessions - 清理空闲

**参数：** `idleTimeout: number`（毫秒）

## 直播 API

### checkLivePermission - 检查权限

检查账号是否有开播权限。

**响应：** `{ liveAuth: boolean }`

### getStreamUrl - 获取推流地址

**参数：** `liveId?: string`

**响应：**
```typescript
StreamUrl {
  rtmpUrl, streamKey, expiresAt
}
```

### startLiveStream - 开始直播

**参数：**
- `title: string` - 直播标题
- `coverFile: string` - 封面（支持互联网图片URL或Base64数据URI/纯Base64）
- `streamName: string` - 流名称
- `portrait: boolean` - 是否竖屏
- `panoramic: boolean` - 是否全景
- `categoryID: number` - 分类ID
- `subCategoryID: number` - 子分类ID

### stopLiveStream - 停止直播

**参数：** `liveId: string`

### getHotLives - 获取热门直播

**参数：**
- `category?: string` - 分类
- `page?: number` - 页码(默认0)
 - `size?: number` - 每页数量(默认20)

### getWatchingList - 获取直播间观众列表

返回指定直播间的在线观众列表（最多 50）。

**参数：**
- `liveId: string` - 直播间 ID

**响应：** `WatchingUser[]`

**HTTP 路由：** `GET /api/live/watching-list/:liveId`


## 用户 API

### getUserInfo - 获取用户信息

**参数：** `userId: string`

**响应：** `UserProfile`

### getWalletInfo - 获取钱包信息

**响应：** `WalletInfo`

## 礼物 API

### getAllGiftList - 获取礼物列表

**响应：** `GiftInfo[]`

## 直播预告 API

### getLivePreviewList - 获取直播预告列表

获取即将开始的直播预告信息。

**响应：**
```typescript
{
  previewList: Array<{
    userId: number;
    userName: string;
    liveTitle: string;
    liveCover: string;
    scheduledTime: string; // ISO 8601 格式
  }>;
}
```

## 房管 API

### getManagerList - 获取房管列表

获取当前用户的房管列表。

**响应：**
```typescript
Array<{
  userId: string;
  nickname: string;
  avatar: string;
  customData: string;
  online: boolean;
}>
```

### addManager - 添加房管

**参数：** `managerUID: number`

### deleteManager - 删除房管

**参数：** `managerUID: number`

### getAuthorKickRecords - 获取踢人记录

**参数：** `liveID: string`

**响应：** `KickRecord[]`

### managerKick - 房管踢人

**参数：**
- `liveID: string` - 直播间ID
- `kickedUID: number` - 被踢用户ID

### authorKick - 主播踢人

**参数：**
- `liveID: string` - 直播间ID
- `kickedUID: number` - 被踢用户ID

## 直播回放 API

### getLiveReplay - 获取直播回放

**参数：** `liveId: string`

**响应：**
```typescript
{
  duration: number;
  url: string;
  backupUrl?: string;
  m3u8Slice: string;
  width: number;
  height: number;
}
```

详细数据结构请参阅 [数据模型文档](./data-models.md)。
#### 封面上传输入详解
```text
支持：
- URL：例如 https://example.com/cover.jpg
- 数据URI：data:image/png;base64,<base64>
- 纯Base64：<base64>

上传方式：multipart/form-data 二进制；字段名：cover
错误：
- 封面仅支持互联网图片URL或Base64
- 封面下载失败 / 封面处理失败
```
