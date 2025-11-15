# 数据模型文档

本文档详细描述了 AcFun 直播 API 中使用的所有数据模型和类型定义。

## 认证相关

### TokenInfo - 认证令牌

```typescript
interface TokenInfo {
  userID: string;       // 用户ID
  securityKey: string;  // 安全密钥（WebSocket加密用）
  serviceToken: string; // 服务令牌
  deviceID: string;     // 设备ID
  cookies: string[];    // 认证Cookie数组
}
```

### QRCodeLoginResponse - 二维码登录响应

```typescript
interface QRCodeLoginResponse {
  qrCode: string;           // Base64编码的二维码图片
  expiresIn: number;        // 过期时间（毫秒）
  qrLoginToken: string;     // 登录令牌
  qrLoginSignature: string; // 登录签名
}
```

### AuthResponse - 认证响应

```typescript
interface AuthResponse {
  userId: string;   // 用户ID
  userName: string; // 用户名
  token: string;    // 完整Token（JSON字符串）
}
```

## 弹幕相关

### DanmuSession - 弹幕会话

```typescript
interface DanmuSession {
  sessionId: string;         // 会话唯一标识
  liverUID: string;          // 主播UID
  liveID: string;            // 直播ID
  enterRoomAttach: string;   // 进房附加数据
  instanceID: number|Long;   // 实例ID
  sessionKey: Buffer;        // 会话密钥
  tickets: string[];         // 认证票据数组
  seqID: number;             // 序列号
  headerSeqID: number;       // 头部序列号
  heartbeatSeqID: number;    // 心跳序列号
  ticketIndex: number;       // 当前ticket索引
  state: DanmuSessionState;  // 会话状态
  callback: (event: DanmuMessage) => void; // 回调函数
}
```

### DanmuSessionState - 会话状态枚举

```typescript
enum DanmuSessionState {
  Idle = 'IDLE',                   // 空闲
  Connecting = 'CONNECTING',       // 连接中
  Registering = 'REGISTERING',     // 注册中
  EnteringRoom = 'ENTERING_ROOM',  // 进房中
  Active = 'ACTIVE',               // 活跃
  Disconnecting = 'DISCONNECTING', // 断开中
  Error = 'ERROR'                  // 错误
}
```

### 弹幕消息类型

#### Comment - 评论弹幕

```typescript
interface Comment {
  content: string;      // 弹幕内容
  sendTime: number;     // 发送时间戳
  userInfo: UserInfo;   // 用户信息
}
```

#### Gift - 礼物

```typescript
interface Gift {
  giftDetail: GiftDetail;    // 礼物详情
  count: number;             // 数量
  combo: number;             // 连击数
  value: number;             // 价值（AC币）
  comboID: string;           // 连击ID
  slotDisplayDuration: number; // 展示时长
  expireDuration: number;    // 过期时长
  sendTime: number;          // 发送时间
  userInfo: UserInfo;        // 用户信息
}
```

#### Like - 点赞

```typescript
interface Like {
  sendTime: number;
  userInfo: UserInfo;
}
```

#### EnterRoom - 进房

```typescript
interface EnterRoom {
  sendTime: number;
  userInfo: UserInfo;
}
```

#### FollowAuthor - 关注

```typescript
interface FollowAuthor {
  sendTime: number;
  userInfo: UserInfo;
}
```

#### RichText - 富文本

```typescript
interface RichText {
  segments: RichTextSegment[]; // 富文本片段数组
  sendTime: number;
  userInfo: UserInfo;
}

type RichTextSegment = RichTextUserInfo | RichTextPlain | RichTextImage;
```

## 用户相关

### UserInfo - 用户信息

```typescript
interface UserInfo {
  userID: number;         // 用户ID
  nickname: string;       // 昵称
  avatar: string;         // 头像URL
  medal: MedalInfo;       // 粉丝牌信息
  managerType: ManagerType; // 房管类型
}
```

### MedalInfo - 粉丝牌信息

```typescript
interface MedalInfo {
  uperID: number;    // 主播ID
  userID: number;    // 用户ID
  clubName: string;  // 粉丝团名称
  level: number;     // 等级
}
```

### ManagerType - 房管类型枚举

```typescript
enum ManagerType {
  NotManager = 0,      // 非房管
  NormalManager = 1    // 普通房管
}
```

### UserProfile - 用户资料

```typescript
interface UserProfile {
  userId: string;          // 用户ID
  userName: string;        // 用户名
  avatar: string;          // 头像
  level: number;           // 等级
  fansCount: number;       // 粉丝数
  followCount: number;     // 关注数
  signature: string;       // 个性签名
  isLive: boolean;         // 是否在播
  liveRoomId: string;      // 直播间ID
}
```

## 直播相关

### LiveInfo - 直播信息

```typescript
interface LiveInfo {
  liveId: string;       // 直播ID
  title: string;        // 标题
  coverUrl: string;     // 封面
  liverUID: string;     // 主播UID
  onlineCount: number;  // 在线人数
  likeCount: number;    // 点赞数
  startTime: number;    // 开播时间
  category: string;     // 分类
}
```

### StreamUrl - 推流地址

```typescript
interface StreamUrl {
  rtmpUrl: string;    // RTMP服务器
  streamKey: string;  // 推流密钥
  expiresAt: number;  // 过期时间
}
```

## 会话管理

### SessionSummary - 会话摘要

```typescript
interface SessionSummary {
  sessionId: string;
  liverUID: string;
  state: DanmuSessionState;
  createdAt: number;
  messageCount: number;
}
```

### GlobalStatistics - 全局统计

```typescript
interface GlobalStatistics {
  totalSessions: number;    // 总会话数
  activeSessions: number;   // 活跃会话数
  errorSessions: number;    // 错误会话数
  totalMessagesReceived: number; // 总消息数
}
```

### HealthCheckData - 健康检查数据

```typescript
interface HealthCheckData {
  sessionId: string;
  wsState: number;                // WebSocket状态
  heartbeatSuccessRate: number;   // 心跳成功率
  avgResponseTime: number;        // 平均响应时间
  errorCount: number;             // 错误次数
  healthScore: number;            // 健康得分(0-100)
  status: 'healthy' | 'warning' | 'unhealthy';
}
```

更多类型定义请参阅源码 `src/types/index.ts`。

## 房管管理相关

### Manager - 房管信息

```typescript
interface Manager {
  userInfo: {
    userID: number;
    nickname: string;
    avatar: string;
    medal: {
      uperID: number;
      userID: number;
      clubName: string;
      level: number;
    };
    managerType: number;
  };
  customData: string;
  online: boolean;
}
```

### KickRecord - 踢人记录

```typescript
interface KickRecord {
  userID: number;    // 被踢用户ID
  nickname: string;  // 被踢用户昵称
  kickTime: number;  // 踢人时间戳
}
```

## 守护徽章相关

### Badge - 守护徽章

```typescript
interface Badge {
  uperID: number;    // 主播ID
  userID: number;    // 用户ID
  clubName: string;  // 粉丝团名称
  level: number;     // 等级
}
```

### BadgeDetail - 守护徽章详情

```typescript
interface BadgeDetail extends Badge {
  experience: number;         // 当前经验值
  nextLevelExperience: number; // 下一级所需经验值
  joinTime: number;           // 加入时间戳
}
```

### BadgeRank - 守护徽章排行

```typescript
interface BadgeRank {
  userID: number;    // 用户ID
  nickname: string;  // 昵称
  avatar: string;    // 头像
  level: number;     // 等级
  experience: number; // 经验值
  rank: number;      // 排名
}
```

## 直播预告相关

### LivePreview - 直播预告

```typescript
interface LivePreview {
  userId: number;        // 主播用户ID
  userName: string;      // 主播用户名
  liveTitle: string;     // 直播标题
  liveCover: string;     // 直播封面
  scheduledTime: string; // 预定时间(ISO 8601格式)
}
```

## 直播回放相关

### LiveReplay - 直播回放

```typescript
interface LiveReplay {
  duration: number;    // 回放时长(毫秒)
  url: string;         // 回放播放地址
  backupUrl?: string;  // 备份播放地址
  m3u8Slice: string;   // M3U8切片信息
  width: number;       // 视频宽度
  height: number;      // 视频高度
}
```
### WatchingUser - 在线观众

```typescript
interface WatchingUser {
  userInfo: UserInfo;           // 用户信息
  anonymousUser: boolean;       // 是否匿名用户
  displaySendAmount: string;    // 赠送礼物总价值（AC币，字符串）
  customData: string;           // 额外信息（JSON字符串）
}
```
