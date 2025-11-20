// 基础类型定义
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  code?: number;
  headers?: Record<string, any>;
}

// 认证相关类型
export interface AuthRequest {
  account: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  expiresAt: number;
  securityKey?: string;
  serviceToken?: string;
  deviceId?: string;
  tokenInfo?: TokenInfo;
}

export interface TokenInfo {
  userID: string;
  securityKey: string;
  serviceToken: string;
  deviceID: string;
  cookies: string[];
}

export interface LoginResult {
  result: number;
  userId?: number;
  securityKey?: string;
  serviceToken?: string;
  error_msg?: string;
}

export interface QRCode {
  expireTime: number;
  imageData: string;
  qrLoginToken?: string;
  qrLoginSignature?: string;
}

export interface QRCodeStatus {
  result: number;
  status?: string;
  qrLoginSignature?: string;
  error_msg?: string;
}

export interface QRCodeLoginResponse {
  qrCode: string;
  expiresIn: number;
  qrLoginToken: string;
  qrLoginSignature: string;
}

export interface QRCodeScanResult {
  result: number;
  status: 'PENDING' | 'SCANNED' | 'ACCEPTED' | 'EXPIRED' | 'CANCELED';
  qrLoginSignature?: string;
  error_msg?: string;
}

export interface QRCodeLoginResult {
  result: number;
  status: 'ACCEPTED' | 'EXPIRED' | 'CANCELED';
  error_msg?: string;
  cookies?: any[];
}

// 直播间相关类型
export interface LiveRoomInfo {
  liverUID: string;
  liveId: string;
  title: string;
  coverUrl: string;
  onlineCount: number;
  status: 'live' | 'offline' | 'preparing';
  likeCount?: number;
  startTime?: number;
  streamer?: {
    userId: string;
    userName: string;
    avatar: string;
    level: number;
  };
  category?: string;
  subCategory?: string;
}

// 弹幕事件类型
export interface DanmuEvent {
  type: string;
  data: any;
  timestamp: number;
  userId: string;
  userName: string;
}

export interface CommentEvent extends DanmuEvent {
  type: 'comment';
  data: {
    content: string;
    color?: string;
    fontSize?: number;
  };
}

export interface GiftEvent extends DanmuEvent {
  type: 'gift';
  data: {
    giftId: string;
    giftName: string;
    count: number;
    price: number;
  };
}

export interface LikeEvent extends DanmuEvent {
  type: 'like';
  data: {
    count: number;
  };
}

// 命令请求类型
export interface CommandRequest {
  type: number;
  requestId: string;
  data?: any;
}

export interface CommandResponse {
  type: number;
  requestId: string;
  result: number;
  data?: any;
  error?: string;
}

// 配置类型
export interface ApiConfig {
  baseUrl?: string;
  timeout?: number;
  retryCount?: number;
  headers?: Record<string, string>;
}

export interface ServerConfig {
  port: number;
  host: string;
  corsOrigin: string[];
  rateLimit?: {
    windowMs: number;
    max: number;
  };
}

// 房管管理相关类型
export interface Manager {
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

export interface KickRecord {
  userID: number;
  nickname: string;
  kickTime: number;
}

// 守护徽章相关类型
export interface Badge {
  uperID: number;
  userID: number;
  clubName: string;
  level: number;
}

export interface BadgeDetail extends Badge {
  experience: number;
  nextLevelExperience: number;
  joinTime: number;
}

export interface BadgeRank {
  userID: number;
  nickname: string;
  avatar: string;
  level: number;
  experience: number;
  rank: number;
}

// 弹幕会话相关类型
export enum DanmuSessionState {
  Idle = 'IDLE',
  Connecting = 'CONNECTING',
  Authenticating = 'AUTHENTICATING',
  Registering = 'REGISTERING',
  EnteringRoom = 'ENTERING_ROOM',
  Active = 'ACTIVE',
  Disconnecting = 'DISCONNECTING',
  Error = 'ERROR'
}

export enum ManagerType {
  NotManager = 0,
  NormalManager = 1
}

export type DanmuEventType = 
  | 'comment'
  | 'like'
  | 'enter_room'
  | 'follow'
  | 'throw_banana'
  | 'gift'
  | 'rich_text'
  | 'join_club'
  | 'share_live';

// 弹幕会话
export interface DanmuSession {
  sessionId: string;
  liverUID: string;
  liveID: string;
  enterRoomAttach: string;  // 进入房间的附加数据，从startPlay API获取
  appID?: number;  // 应用ID，从服务器返回的PacketHeader中获取
  instanceID: number | Long;  // 实例ID，Long类型，不要转换为Number避免精度丢失
  sessionKey: Buffer;
  tickets: string[];
  seqID: number;
  headerSeqID: number;
  heartbeatSeqID: number;
  ticketIndex: number;
  state: DanmuSessionState;
  callback: (event: DanmuMessage) => void;
  signalCallback?: (event: SignalEvent) => void;
}

// 用户信息
export interface UserInfo {
  userID: number;
  nickname: string;
  avatar: string;
  medal: MedalInfo;
  managerType: ManagerType;
}

// 守护徽章信息
export interface MedalInfo {
  uperID: number;
  userID: number;
  clubName: string;
  level: number;
}

// 弹幕消息基类
export interface DanmuMessage {
  sendTime: number;
  userInfo: UserInfo;
}

// 评论弹幕
export interface Comment extends DanmuMessage {
  content: string;
}

// 点赞
export interface Like extends DanmuMessage {}

// 进入直播间
export interface EnterRoom extends DanmuMessage {}

// 关注主播
export interface FollowAuthor extends DanmuMessage {}

// 投蕉（已废弃，通常用 Gift 代替）
export interface ThrowBanana extends DanmuMessage {
  bananaCount: number;
}

// 礼物详情
export interface GiftDetail {
  giftID: number;
  giftName: string;
  arLiveName: string;
  payWalletType: number;
  price: number;
  webpPic: string;
  pngPic: string;
  smallPngPic: string;
  allowBatchSendSizeList: number[];
  canCombo: boolean;
  canDraw: boolean;
  magicFaceID: number;
  vupArID: number;
  description: string;
  redpackPrice: number;
  cornerMarkerText: string;
}

// 涂鸦点位置
export interface DrawPoint {
  marginLeft: number;
  marginTop: number;
  scaleRatio: number;
  handup: boolean;
  pointWidth: number;
  pointHeight: number;
}

// 涂鸦礼物信息
export interface DrawGiftInfo {
  screenWidth: number;
  screenHeight: number;
  drawPoint: DrawPoint[];
}

// 礼物
export interface Gift extends DanmuMessage {
  giftDetail: GiftDetail;
  count: number;
  combo: number;
  value: number;
  comboID: string;
  slotDisplayDuration: number;
  expireDuration: number;
  drawGiftInfo?: DrawGiftInfo;
}

// 富文本片段类型
export type RichTextSegment = RichTextUserInfo | RichTextPlain | RichTextImage;

// 富文本用户信息
export interface RichTextUserInfo {
  type: 'userInfo';
  userInfo: UserInfo;
  color: string;
}

// 富文本文字
export interface RichTextPlain {
  type: 'plain';
  text: string;
  color: string;
}

// 富文本图片
export interface RichTextImage {
  type: 'image';
  pictures: string[];
  alternativeText: string;
  alternativeColor: string;
}

// 富文本
export interface RichText extends DanmuMessage {
  segments: RichTextSegment[];
}

// 加入守护团
export interface JoinClub extends DanmuMessage {
  joinTime: number;
  fansInfo: UserInfo;
  uperInfo: UserInfo;
}

// 分享平台类型
export enum SharePlatformType {
  PlatformUnknown = 0,
  PlatformQQ = 1,
  PlatformQzone = 2,
  PlatformWeibo = 3,
  PlatformWeChat = 4,
  PlatformWeChatMoments = 5,
  PlatformAcFunMoment = 6
}

// 分享直播间
export interface ShareLive extends DanmuMessage {
  sharePlatform: SharePlatformType;
  sharePlatformIcon: string;
}

// 直播间显示信息
export interface DisplayInfo {
  watchingCount: string;
  likeCount: string;
  likeDelta: number;
}

// 在线用户
export interface WatchingUser {
  userInfo: UserInfo;
  anonymousUser: boolean;
  displaySendAmount: string;
  customData: string;
}

// 礼物榜前三
export type TopUser = WatchingUser;

export interface SignalEvent {
  type: string;
  data: any;
}

export enum RedpackDisplayStatus {
  Appear = 0,
  TokenAvailable = 1,
  CanGrab = 2
}

export interface Redpack {
  userInfo: UserInfo;
  displayStatus: RedpackDisplayStatus;
  grabBeginTime: number;
  getTokenLatestTime: number;
  redpackID: string;
  redpackBizUnit: string;
  redpackAmount: number;
  settleBeginTime: number;
}

export enum ChatMediaType {
  Unknown = 0,
  Audio = 1,
  Video = 2
}

export enum ChatEndType {
  Unknown = 0,
  Normal = 1
}

export interface ChatCall {
  chatID: string;
  liveID: string;
  callTime: number;
}

export interface ChatAccept {
  chatID: string;
  mediaType: ChatMediaType;
  signalInfo: string;
}

export interface ChatReady {
  chatID: string;
  guest: UserInfo;
  mediaType: ChatMediaType;
}

export interface ChatEnd {
  chatID: string;
  endType: ChatEndType;
}

// ========== 连接管理相关类型 ==========

// 连接配置
export interface ConnectionConfig {
  wsHost: string;
  connectTimeout: number;  // WebSocket连接超时(ms)
  registerTimeout: number;  // 注册超时(ms)
  heartbeatTimeout: number;  // 心跳超时(ms)
  maxReconnectAttempts: number;  // 最大重连次数
  reconnectBackoffBase: number;  // 重连退避基数(ms)
  reconnectBackoffMax: number;  // 最大退避时间(ms)
  heartbeatInterval: number;  // 默认心跳间隔(ms)
  heartbeatFailureThreshold: number;  // 心跳失败阈值
  enableAutoReconnect: boolean;  // 是否启用自动重连
  enableHealthCheck: boolean;  // 是否启用健康检查
  enableAdaptiveHeartbeat: boolean;  // 是否启用自适应心跳
}

// 健康检查数据
export interface HealthCheckData {
  sessionId: string;
  wsState: number;  // WebSocket状态码
  heartbeatSuccessRate: number;  // 心跳成功率(0-1)
  avgResponseTime: number;  // 平均响应时间(ms)
  errorCount: number;  // 最近错误次数
  connectionDuration: number;  // 连接存活时长(ms)
  lastHeartbeatTime: number;  // 最后心跳时间戳
  healthScore: number;  // 综合健康得分(0-100)
  status: 'healthy' | 'warning' | 'unhealthy';  // 健康状态
}

// 重连状态
export interface ReconnectState {
  sessionId: string;
  isReconnecting: boolean;  // 是否正在重连
  currentAttempt: number;  // 当前重连次数
  maxAttempts: number;  // 最大重连次数
  nextRetryTime: number;  // 下次重试时间戳
  backoffTime: number;  // 当前退避时间
  lastError: string;  // 最后错误信息
  disconnectReason: string;  // 断开原因
  savedState?: any;  // 保存的会话状态
}

// 会话统计信息
export interface SessionStatistics {
  messageCount: number;  // 接收消息总数
  errorCount: number;  // 错误发生次数
  reconnectCount: number;  // 重连次数
  heartbeatSent: number;  // 发送心跳次数
  heartbeatSuccess: number;  // 心跳成功次数
  heartbeatFailed: number;  // 心跳失败次数
  lastMessageTime: number;  // 最后消息时间
  lastErrorTime: number;  // 最后错误时间
}

// 性能指标
export interface PerformanceMetrics {
  avgLatency: number;  // 平均延迟(ms)
  p95Latency: number;  // 95分位延迟(ms)
  p99Latency: number;  // 99分位延迟(ms)
  messageRate: number;  // 消息速率(条/秒)
  errorRate: number;  // 错误率(0-1)
}

// 会话摘要信息
export interface SessionSummary {
  sessionId: string;
  liverUID: string;
  liveID: string;
  state: DanmuSessionState;
  createdAt: number;  // 创建时间戳
  connectedAt: number;  // 连接建立时间
  lastActiveAt: number;  // 最后活跃时间
  messageCount: number;
  errorCount: number;
  reconnectCount: number;
  healthScore: number;
  wsReadyState: number;
}

// 会话详细信息
export interface SessionDetail extends SessionSummary {
  enterRoomAttach: string;
  instanceID: number | Long;
  tickets: string[];
  ticketIndex: number;
  isPaused: boolean;
  pausedAt?: number;
  healthCheckData: HealthCheckData;
  statistics: SessionStatistics;
  performanceMetrics: PerformanceMetrics;
  errorHistory: ErrorRecord[];
}

// 错误记录
export interface ErrorRecord {
  timestamp: number;
  errorCode: number;
  errorType: string;
  errorMessage: string;
  stackTrace?: string;
  context?: any;
}

// 全局统计信息
export interface GlobalStatistics {
  totalSessions: number;  // 总会话数
  activeSessions: number;  // 活跃会话数
  failedSessions: number;  // 失败会话数
  totalMessages: number;  // 总消息数
  totalErrors: number;  // 总错误数
  avgConnectionTime: number;  // 平均连接时长
  avgReconnectCount: number;  // 平均重连次数
  messageRate: number;  // 消息速率(条/秒)
  healthRate: number;  // 健康会话占比
  avgLatency: number;  // 平均响应延迟
  p95Latency: number;  // 95分位延迟
  p99Latency: number;  // 99分位延迟
  errorRate: number;  // 错误率
}

// 批量操作结果
export interface BatchOperationResult {
  total: number;  // 总操作数
  success: number;  // 成功数
  failed: number;  // 失败数
  details: Array<{
    sessionId: string;
    success: boolean;
    error?: string;
  }>;
}

// 清理结果
export interface CleanupResult {
  cleanedCount: number;  // 清理的会话数
  sessionIds: string[];  // 被清理的会话ID列表
}

// 健康检查结果
export interface HealthCheckResult {
  sessionId: string;
  timestamp: number;
  healthData: HealthCheckData;
  recommendations: string[];  // 优化建议
}

// 错误类型定义
export enum ErrorType {
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  AUTH_ERROR = 'AUTH_ERROR',
  PROTOCOL_ERROR = 'PROTOCOL_ERROR',
  BUSINESS_ERROR = 'BUSINESS_ERROR',
  SYSTEM_ERROR = 'SYSTEM_ERROR'
}

// 错误码定义
export enum ErrorCode {
  // 连接错误 1000-1999
  CONNECTION_TIMEOUT = 1001,
  CONNECTION_REFUSED = 1002,
  CONNECTION_CLOSED = 1003,
  
  // 认证错误 2000-2999
  TOKEN_INVALID = 2001,
  TOKEN_EXPIRED = 2002,
  PERMISSION_DENIED = 2003,
  
  // 协议错误 3000-3999
  MESSAGE_FORMAT_ERROR = 3001,
  DECODE_ERROR = 3002,
  UNKNOWN_COMMAND = 3003,
  
  // 业务错误 4000-4999
  LIVE_ROOM_NOT_FOUND = 4001,
  SESSION_NOT_FOUND = 4002,
  DUPLICATE_SESSION = 4003,
  
  // 系统错误 5000-5999
  INTERNAL_ERROR = 5001,
  RESOURCE_EXHAUSTED = 5002,
  CONFIG_ERROR = 5003
}