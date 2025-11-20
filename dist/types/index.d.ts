export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    code?: number;
    headers?: Record<string, any>;
}
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
export declare enum DanmuSessionState {
    Idle = "IDLE",
    Connecting = "CONNECTING",
    Authenticating = "AUTHENTICATING",
    Registering = "REGISTERING",
    EnteringRoom = "ENTERING_ROOM",
    Active = "ACTIVE",
    Disconnecting = "DISCONNECTING",
    Error = "ERROR"
}
export declare enum ManagerType {
    NotManager = 0,
    NormalManager = 1
}
export type DanmuEventType = 'comment' | 'like' | 'enter_room' | 'follow' | 'throw_banana' | 'gift' | 'rich_text' | 'join_club' | 'share_live';
export interface DanmuSession {
    sessionId: string;
    liverUID: string;
    liveID: string;
    enterRoomAttach: string;
    appID?: number;
    instanceID: number | Long;
    sessionKey: Buffer;
    tickets: string[];
    seqID: number;
    headerSeqID: number;
    heartbeatSeqID: number;
    ticketIndex: number;
    state: DanmuSessionState;
    callback: (event: DanmuMessage) => void;
}
export interface UserInfo {
    userID: number;
    nickname: string;
    avatar: string;
    medal: MedalInfo;
    managerType: ManagerType;
}
export interface MedalInfo {
    uperID: number;
    userID: number;
    clubName: string;
    level: number;
}
export interface DanmuMessage {
    sendTime: number;
    userInfo: UserInfo;
}
export interface Comment extends DanmuMessage {
    content: string;
}
export interface Like extends DanmuMessage {
}
export interface EnterRoom extends DanmuMessage {
}
export interface FollowAuthor extends DanmuMessage {
}
export interface ThrowBanana extends DanmuMessage {
    bananaCount: number;
}
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
export interface DrawPoint {
    marginLeft: number;
    marginTop: number;
    scaleRatio: number;
    handup: boolean;
    pointWidth: number;
    pointHeight: number;
}
export interface DrawGiftInfo {
    screenWidth: number;
    screenHeight: number;
    drawPoint: DrawPoint[];
}
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
export type RichTextSegment = RichTextUserInfo | RichTextPlain | RichTextImage;
export interface RichTextUserInfo {
    type: 'userInfo';
    userInfo: UserInfo;
    color: string;
}
export interface RichTextPlain {
    type: 'plain';
    text: string;
    color: string;
}
export interface RichTextImage {
    type: 'image';
    pictures: string[];
    alternativeText: string;
    alternativeColor: string;
}
export interface RichText extends DanmuMessage {
    segments: RichTextSegment[];
}
export interface JoinClub extends DanmuMessage {
    joinTime: number;
    fansInfo: UserInfo;
    uperInfo: UserInfo;
}
export declare enum SharePlatformType {
    PlatformUnknown = 0,
    PlatformQQ = 1,
    PlatformQzone = 2,
    PlatformWeibo = 3,
    PlatformWeChat = 4,
    PlatformWeChatMoments = 5,
    PlatformAcFunMoment = 6
}
export interface ShareLive extends DanmuMessage {
    sharePlatform: SharePlatformType;
    sharePlatformIcon: string;
}
export interface DisplayInfo {
    watchingCount: string;
    likeCount: string;
    likeDelta: number;
}
export interface WatchingUser {
    userInfo: UserInfo;
    anonymousUser: boolean;
    displaySendAmount: string;
    customData: string;
}
export type TopUser = WatchingUser;
export declare enum ChatMediaType {
    Unknown = 0,
    Audio = 1,
    Video = 2
}
export declare enum ChatEndType {
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
export interface ConnectionConfig {
    wsHost: string;
    connectTimeout: number;
    registerTimeout: number;
    heartbeatTimeout: number;
    maxReconnectAttempts: number;
    reconnectBackoffBase: number;
    reconnectBackoffMax: number;
    heartbeatInterval: number;
    heartbeatFailureThreshold: number;
    enableAutoReconnect: boolean;
    enableHealthCheck: boolean;
    enableAdaptiveHeartbeat: boolean;
}
export interface HealthCheckData {
    sessionId: string;
    wsState: number;
    heartbeatSuccessRate: number;
    avgResponseTime: number;
    errorCount: number;
    connectionDuration: number;
    lastHeartbeatTime: number;
    healthScore: number;
    status: 'healthy' | 'warning' | 'unhealthy';
}
export interface ReconnectState {
    sessionId: string;
    isReconnecting: boolean;
    currentAttempt: number;
    maxAttempts: number;
    nextRetryTime: number;
    backoffTime: number;
    lastError: string;
    disconnectReason: string;
    savedState?: any;
}
export interface SessionStatistics {
    messageCount: number;
    errorCount: number;
    reconnectCount: number;
    heartbeatSent: number;
    heartbeatSuccess: number;
    heartbeatFailed: number;
    lastMessageTime: number;
    lastErrorTime: number;
}
export interface PerformanceMetrics {
    avgLatency: number;
    p95Latency: number;
    p99Latency: number;
    messageRate: number;
    errorRate: number;
}
export interface SessionSummary {
    sessionId: string;
    liverUID: string;
    liveID: string;
    state: DanmuSessionState;
    createdAt: number;
    connectedAt: number;
    lastActiveAt: number;
    messageCount: number;
    errorCount: number;
    reconnectCount: number;
    healthScore: number;
    wsReadyState: number;
}
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
export interface ErrorRecord {
    timestamp: number;
    errorCode: number;
    errorType: string;
    errorMessage: string;
    stackTrace?: string;
    context?: any;
}
export interface GlobalStatistics {
    totalSessions: number;
    activeSessions: number;
    failedSessions: number;
    totalMessages: number;
    totalErrors: number;
    avgConnectionTime: number;
    avgReconnectCount: number;
    messageRate: number;
    healthRate: number;
    avgLatency: number;
    p95Latency: number;
    p99Latency: number;
    errorRate: number;
}
export interface BatchOperationResult {
    total: number;
    success: number;
    failed: number;
    details: Array<{
        sessionId: string;
        success: boolean;
        error?: string;
    }>;
}
export interface CleanupResult {
    cleanedCount: number;
    sessionIds: string[];
}
export interface HealthCheckResult {
    sessionId: string;
    timestamp: number;
    healthData: HealthCheckData;
    recommendations: string[];
}
export declare enum ErrorType {
    CONNECTION_ERROR = "CONNECTION_ERROR",
    AUTH_ERROR = "AUTH_ERROR",
    PROTOCOL_ERROR = "PROTOCOL_ERROR",
    BUSINESS_ERROR = "BUSINESS_ERROR",
    SYSTEM_ERROR = "SYSTEM_ERROR"
}
export declare enum ErrorCode {
    CONNECTION_TIMEOUT = 1001,
    CONNECTION_REFUSED = 1002,
    CONNECTION_CLOSED = 1003,
    TOKEN_INVALID = 2001,
    TOKEN_EXPIRED = 2002,
    PERMISSION_DENIED = 2003,
    MESSAGE_FORMAT_ERROR = 3001,
    DECODE_ERROR = 3002,
    UNKNOWN_COMMAND = 3003,
    LIVE_ROOM_NOT_FOUND = 4001,
    SESSION_NOT_FOUND = 4002,
    DUPLICATE_SESSION = 4003,
    INTERNAL_ERROR = 5001,
    RESOURCE_EXHAUSTED = 5002,
    CONFIG_ERROR = 5003
}
