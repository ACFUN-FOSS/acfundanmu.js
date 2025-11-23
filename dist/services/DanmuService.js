"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DanmuService = void 0;
const types_1 = require("../types");
const ws_1 = __importDefault(require("ws"));
const zlib = __importStar(require("zlib"));
const ProtoUtils = __importStar(require("../core/ProtoUtils"));
const EventParser = __importStar(require("../core/EventParser"));
const acfun_1 = require("../proto/acfun");
const ReconnectManager_1 = require("../core/ReconnectManager");
const HeartbeatManager_1 = require("../core/HeartbeatManager");
const HealthCheckManager_1 = require("../core/HealthCheckManager");
const SessionManager_1 = require("../core/SessionManager");
class DanmuService {
    constructor(httpClient, config) {
        this.sessions = new Map();
        this.wsClients = new Map();
        this.heartbeatTimers = new Map();
        // 常量定义
        this.WS_HOST = 'wss://klink-newproduct-ws3.kwaizt.com/';
        this.TIMEOUT = 10000;
        this.httpClient = httpClient;
        // 初始化配置
        this.config = {
            wsHost: this.WS_HOST,
            connectTimeout: 10000,
            registerTimeout: 5000,
            heartbeatTimeout: 30000,
            maxReconnectAttempts: 10,
            reconnectBackoffBase: 1000,
            reconnectBackoffMax: 60000,
            heartbeatInterval: 10000,
            heartbeatFailureThreshold: 3,
            enableAutoReconnect: true,
            enableHealthCheck: true,
            enableAdaptiveHeartbeat: true,
            ...config
        };
        // 初始化管理器
        this.reconnectManager = new ReconnectManager_1.ReconnectManager(this.config);
        this.heartbeatManager = new HeartbeatManager_1.HeartbeatManager(this.config);
        this.healthCheckManager = new HealthCheckManager_1.HealthCheckManager(this.config, this.heartbeatManager);
        this.sessionManager = new SessionManager_1.SessionManager(this.healthCheckManager);
    }
    /**
     * 获取直播间信息
     */
    async getLiveRoomInfo(liverUID) {
        // TODO: 实现获取直播间信息逻辑
        return {
            success: false,
            error: '未实现'
        };
    }
    /**
     * 开始获取弹幕
     */
    async startDanmu(liverUID, callback) {
        try {
            // 阶段一：初始化与验证
            if (!liverUID || typeof liverUID !== 'string') {
                return {
                    success: false,
                    error: '主播 UID 不能为空'
                };
            }
            // 检查是否已存在会话
            for (const [sessionId, session] of this.sessions.entries()) {
                if (session.liverUID === liverUID) {
                    return {
                        success: false,
                        error: `已存在主播 ${liverUID} 的活动会话: ${sessionId}`
                    };
                }
            }
            // 获取 Token
            const { tokenInfo, error } = this.httpClient.getValidatedTokenInfo();
            if (error || !tokenInfo) {
                return {
                    success: false,
                    error: error || '获取 token 失败'
                };
            }
            // 获取直播信息（包含 liveID 和 tickets）
            const liveInfoResult = await this.getLiveToken(liverUID, tokenInfo);
            if (!liveInfoResult.success || !liveInfoResult.data) {
                return {
                    success: false,
                    error: liveInfoResult.error || '获取直播 token 失败'
                };
            }
            const { liveID, enterRoomAttach, tickets } = liveInfoResult.data;
            // 生成会话 ID
            const sessionId = this.generateSessionId();
            // 创建会话
            const session = {
                sessionId,
                liverUID,
                liveID,
                enterRoomAttach, // 进入房间的附加数据，从startPlay API获取
                instanceID: 0,
                sessionKey: Buffer.alloc(0),
                tickets,
                seqID: 0,
                headerSeqID: 0,
                heartbeatSeqID: 0,
                ticketIndex: 0,
                state: types_1.DanmuSessionState.Idle,
                callback
            };
            this.sessions.set(sessionId, session);
            // 初始化管理器
            this.reconnectManager.initReconnectState(sessionId);
            this.heartbeatManager.initStats(sessionId);
            this.healthCheckManager.initHealthData(sessionId);
            this.sessionManager.createSession(session);
            // 阶段二：建立WebSocket连接
            const wsResult = await this.connectWebSocket(session, tokenInfo);
            if (!wsResult.success) {
                this.destroySession(sessionId);
                return {
                    success: false,
                    error: wsResult.error || 'WebSocket 连接失败'
                };
            }
            return {
                success: true,
                data: { sessionId }
            };
        }
        catch (error) {
            return {
                success: false,
                error: `开始获取弹幕失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 停止获取弹幕
     */
    async stopDanmu(sessionId) {
        try {
            const session = this.sessions.get(sessionId);
            if (!session) {
                return {
                    success: false,
                    error: `会话 ${sessionId} 不存在`
                };
            }
            // 发送退出消息
            const ws = this.wsClients.get(sessionId);
            if (ws && ws.readyState === ws_1.default.OPEN) {
                try {
                    const { tokenInfo } = this.httpClient.getValidatedTokenInfo();
                    if (tokenInfo) {
                        // 发送 UserExit
                        const userExitRequest = ProtoUtils.buildUserExitRequest();
                        const userExitBytes = acfun_1.AcFunDanmu.ZtLiveCsUserExit.encode(userExitRequest).finish();
                        const userExitCmd = ProtoUtils.buildZtLiveCsCmd('ZtLiveCsUserExit', userExitBytes, session.tickets[session.ticketIndex] || '', session.liveID);
                        const userExitCmdBytes = acfun_1.AcFunDanmu.ZtLiveCsCmd.encode(userExitCmd).finish();
                        session.seqID++;
                        const userExitFrame = ProtoUtils.sendCommand('Global.ZtLiveInteractive.CsCmd', userExitCmdBytes, session.seqID, session.instanceID, tokenInfo.userID, session.sessionKey, acfun_1.AcFunDanmu.Im.Basic.PacketHeader.EncryptionMode.kEncryptionSessionKey);
                        ws.send(userExitFrame);
                        // 发送 Unregister
                        const unregisterRequest = ProtoUtils.buildUnregisterRequest();
                        const unregisterBytes = acfun_1.AcFunDanmu.Im.Basic.UnregisterRequest.encode(unregisterRequest).finish();
                        session.seqID++;
                        const unregisterFrame = ProtoUtils.sendCommand('Basic.Unregister', unregisterBytes, session.seqID, session.instanceID, tokenInfo.userID, session.sessionKey, acfun_1.AcFunDanmu.Im.Basic.PacketHeader.EncryptionMode.kEncryptionSessionKey);
                        ws.send(unregisterFrame);
                    }
                    // 等待消息发送
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
                catch (error) {
                    console.error('发送退出消息失败:', error);
                }
            }
            // 清理资源
            this.destroySession(sessionId);
            return {
                success: true
            };
        }
        catch (error) {
            return {
                success: false,
                error: `停止获取弹幕失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 获取直播 token
     */
    async getLiveToken(liverUID, tokenInfo) {
        try {
            // 根据Go代码，需要在URL中包含userId、did和服务token
            const midgroundSt = 'acfun.midground.api_st';
            const visitorSt = 'acfun.api.visitor_st';
            // 根据是否有cookies选择不同的参数
            const stKey = (tokenInfo.cookies && tokenInfo.cookies.length > 0) ? midgroundSt : visitorSt;
            const url = `https://api.kuaishouzt.com/rest/zt/live/web/startPlay?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=${tokenInfo.userID}&did=${tokenInfo.deviceID}&${stKey}=${encodeURIComponent(tokenInfo.serviceToken)}`;
            // 构建表单数据
            const params = new URLSearchParams();
            params.append('authorId', liverUID);
            params.append('pullStreamType', 'FLV');
            const headers = this.httpClient.buildHeaders(tokenInfo);
            headers['Content-Type'] = 'application/x-www-form-urlencoded';
            headers['Referer'] = `https://live.acfun.cn/live/${liverUID}`; // 会验证Referer
            const response = await this.httpClient.post(url, params.toString(), { headers });
            if (!response.success || !response.data) {
                return {
                    success: false,
                    error: `获取直播 token 失败: ${response.error}`
                };
            }
            const data = response.data;
            if (data.result !== 1) {
                return {
                    success: false,
                    error: `获取直播 token 失败: ${data.error_msg || '未知错误'}`
                };
            }
            // 关键字段（对照Go代码init.go:266-274）
            const liveID = data.data?.liveId;
            const enterRoomAttach = data.data?.enterRoomAttach || ''; // 进入房间的附加数据，必需字段
            const availableTickets = data.data?.availableTickets || [];
            if (!liveID) {
                return {
                    success: false,
                    error: '未能获取 liveID'
                };
            }
            return {
                success: true,
                data: {
                    liveID,
                    enterRoomAttach,
                    tickets: availableTickets
                }
            };
        }
        catch (error) {
            return {
                success: false,
                error: `获取直播 token 异常: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 连接 WebSocket
     */
    async connectWebSocket(session, tokenInfo) {
        return new Promise((resolve) => {
            try {
                session.state = types_1.DanmuSessionState.Connecting;
                const ws = new ws_1.default(this.WS_HOST);
                this.wsClients.set(session.sessionId, ws);
                const connectionTimeout = setTimeout(() => {
                    if (ws.readyState !== ws_1.default.OPEN) {
                        ws.close();
                        resolve({
                            success: false,
                            error: 'WebSocket 连接超时'
                        });
                    }
                }, this.TIMEOUT);
                ws.on('open', async () => {
                    clearTimeout(connectionTimeout);
                    // 发送注册消息
                    const registerResult = await this.sendRegisterMessage(ws, session, tokenInfo);
                    if (!registerResult.success) {
                        ws.close();
                        resolve(registerResult);
                    }
                });
                ws.on('message', (data) => {
                    try {
                        this.handleWebSocketMessage(session, data);
                    }
                    catch (error) {
                        console.error('处理 WebSocket 消息异常:', error);
                    }
                });
                ws.on('error', (error) => {
                    console.error(`WebSocket 错误: ${session.sessionId}`, error);
                    clearTimeout(connectionTimeout);
                    // 只有在还未 resolve 的情况下才 resolve
                    if (session.state !== types_1.DanmuSessionState.Active) {
                        resolve({
                            success: false,
                            error: `WebSocket 错误: ${error.message}`
                        });
                    }
                });
                ws.on('close', (code, reason) => {
                    clearTimeout(connectionTimeout);
                    // 处理重连
                    this.handleDisconnect(session.sessionId, code, reason.toString());
                });
                // 等待注册成功
                const maxWaitTime = 5000;
                const checkInterval = setInterval(() => {
                    if (session.state === types_1.DanmuSessionState.Active) {
                        clearInterval(checkInterval);
                        clearTimeout(connectionTimeout);
                        resolve({ success: true });
                    }
                }, 100);
                setTimeout(() => {
                    clearInterval(checkInterval);
                    if (session.state !== types_1.DanmuSessionState.Active) {
                        ws.close();
                        resolve({
                            success: false,
                            error: '等待注册成功超时'
                        });
                    }
                }, maxWaitTime);
            }
            catch (error) {
                resolve({
                    success: false,
                    error: `连接 WebSocket 异常: ${error instanceof Error ? error.message : String(error)}`
                });
            }
        });
    }
    /**
     * 发送注册消息
     */
    async sendRegisterMessage(ws, session, tokenInfo) {
        try {
            session.state = types_1.DanmuSessionState.Registering;
            // 1. 构造 RegisterRequest
            const registerRequest = ProtoUtils.buildRegisterRequest(tokenInfo);
            // 2. 序列化 RegisterRequest
            const registerBytes = acfun_1.AcFunDanmu.Im.Basic.RegisterRequest.encode(registerRequest).finish();
            // 3. 构造 UpstreamPayload
            session.seqID++;
            const upstreamPayload = {
                command: 'Basic.Register',
                seqId: session.seqID,
                retryCount: 1, // 重试次数，Go代码中固定为1
                subBiz: 'mainApp', // 子业务标识，Go代码中固定为mainApp
                payloadData: registerBytes
            };
            // 序列化 UpstreamPayload 以获取其长度
            const upstreamPayloadBytes = acfun_1.AcFunDanmu.Im.Basic.UpstreamPayload.encode(upstreamPayload).finish();
            const decodedPayloadLen = upstreamPayloadBytes.length;
            // 4. 构造 PacketHeader - 包含TokenInfo和decodedPayloadLen
            const tokenBytes = new Uint8Array(Buffer.from(tokenInfo.serviceToken, 'utf-8'));
            const packetHeader = {
                appId: 0,
                uid: Number(tokenInfo.userID),
                instanceId: 0,
                decodedPayloadLen: decodedPayloadLen, // 关键：加密前的payload长度
                encryptionMode: acfun_1.AcFunDanmu.Im.Basic.PacketHeader.EncryptionMode.kEncryptionServiceToken,
                seqId: session.seqID,
                kpn: 'ACFUN_APP',
                tokenInfo: {
                    tokenType: acfun_1.AcFunDanmu.Im.Basic.TokenInfo.TokenType.kServiceToken,
                    token: tokenBytes
                }
            };
            // 调试：检查序列化后的PacketHeader
            const headerBytes = acfun_1.AcFunDanmu.Im.Basic.PacketHeader.encode(packetHeader).finish();
            // 5. 解码 SecurityKey (Base64 -> Buffer)
            const securityKeyBuffer = Buffer.from(tokenInfo.securityKey, 'base64');
            // 6. 编码消息帧
            const frame = ProtoUtils.encode(packetHeader, upstreamPayload, securityKeyBuffer);
            // 7. 发送
            ws.send(frame);
            return { success: true };
        }
        catch (error) {
            console.error('[Register] 发送注册消息失败:', error);
            return {
                success: false,
                error: `发送注册消息失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 处理 WebSocket 消息
     */
    handleWebSocketMessage(session, data) {
        try {
            const { tokenInfo } = this.httpClient.getValidatedTokenInfo();
            if (!tokenInfo) {
                console.error('[WebSocket] 无法获取 tokenInfo');
                return;
            }
            // 解码 SecurityKey
            const securityKeyBuffer = Buffer.from(tokenInfo.securityKey, 'base64');
            // 解析消息
            const result = ProtoUtils.decode(data, securityKeyBuffer, session.sessionKey);
            if (!result) {
                console.error('[WebSocket] 解析消息失败');
                return;
            }
            // 关键：从服务器返回的PacketHeader中获取AppId（对照Go代码proto.go:343）
            if (session.appID === undefined || session.appID === 0) {
                if (result.header.appId && result.header.appId !== 0) {
                    session.appID = Number(result.header.appId);
                }
            }
            // 根据命令类型处理
            this.handleCommand(session, result.header, result.payload);
        }
        catch (error) {
            console.error('[WebSocket] 处理 WebSocket 消息失败:', error);
        }
    }
    /**
     * 处理命令消息
     */
    async handleCommand(session, header, payload) {
        const command = payload.command;
        switch (command) {
            case 'Basic.Register':
                await this.handleRegisterResponse(session, payload);
                break;
            case 'Basic.KeepAlive':
                // 心跳响应，无需处理
                break;
            case 'Global.ZtLiveInteractive.CsCmd':
                await this.handleCsCmd(session, payload);
                break;
            case 'Push.ZtLiveInteractive.Message':
                await this.handlePushMessage(session, payload);
                break;
            case 'Basic.Unregister':
                this.destroySession(session.sessionId);
                break;
            default:
                if (payload.errorCode && payload.errorCode > 0) {
                    console.error('[Command] 收到错误消息:', payload.errorCode, payload.errorMsg);
                }
                else {
                }
        }
    }
    /**
     * 处理注册响应
     */
    async handleRegisterResponse(session, payload) {
        try {
            if (!payload.payloadData) {
                console.error('[RegisterResponse] payloadData 为空');
                return;
            }
            // 使用 Protobuf 解析注册响应
            const response = acfun_1.AcFunDanmu.Im.Basic.RegisterResponse.decode(payload.payloadData);
            // 关键：instanceID是Long类型，直接赋值，不要转换为Number（对照Go代码proto.go:73）
            // JavaScript的Number最大安全整数是2^53-1，转换Long可能丢失精度
            session.instanceID = response.instanceId || 0;
            // sessKey 是 Uint8Array
            if (response.sessKey && response.sessKey.length > 0) {
                session.sessionKey = Buffer.from(response.sessKey);
            }
            // 发送 KeepAlive
            await this.sendKeepAlive(session);
            // 发送 EnterRoom
            await this.sendEnterRoom(session);
        }
        catch (error) {
            console.error('[RegisterResponse] 处理注册响应失败:', error);
        }
    }
    /**
     * 处理交互命令
     */
    async handleCsCmd(session, payload) {
        try {
            if (!payload.payloadData) {
                console.error('[CsCmd] payloadData 为空');
                return;
            }
            // 使用 Protobuf 解析 ZtLiveCsCmdAck
            const cmdAck = acfun_1.AcFunDanmu.ZtLiveCsCmdAck.decode(payload.payloadData);
            const cmdType = cmdAck.cmdAckType;
            switch (cmdType) {
                case 'ZtLiveCsEnterRoomAck':
                    if (!cmdAck.payload) {
                        console.error('[CsCmd] EnterRoomAck payload 为空');
                        return;
                    }
                    // 解析 EnterRoomAck
                    const enterRoomAck = acfun_1.AcFunDanmu.ZtLiveCsEnterRoomAck.decode(cmdAck.payload);
                    const heartbeatInterval = Number(enterRoomAck.heartbeatIntervalMs || 10000);
                    session.state = types_1.DanmuSessionState.Active;
                    // 启动心跳
                    this.startHeartbeat(session, heartbeatInterval);
                    break;
                case 'ZtLiveCsHeartbeatAck':
                    // 心跳响应，无需处理
                    break;
                default:
            }
        }
        catch (error) {
            console.error('[CsCmd] 处理交互命令失败:', error);
        }
    }
    /**
     * 处理推送消息
     */
    async handlePushMessage(session, payload) {
        try {
            // 发送推送消息响应
            await this.sendPushMessageResponse(session);
            if (!payload.payloadData) {
                console.error('[PushMessage] payloadData 为空');
                return;
            }
            // 使用 Protobuf 解析 ZtLiveScMessage
            const pushMsg = acfun_1.AcFunDanmu.ZtLiveScMessage.decode(payload.payloadData);
            let messagePayload = pushMsg.payload;
            // 处理 GZIP 压缩
            if (pushMsg.compressionType === acfun_1.AcFunDanmu.ZtLiveScMessage.CompressionType.GZIP && messagePayload) {
                messagePayload = zlib.gunzipSync(Buffer.from(messagePayload));
            }
            const messageType = pushMsg.messageType;
            switch (messageType) {
                case 'ZtLiveScActionSignal':
                    if (messagePayload) {
                        this.handleActionSignal(session, Buffer.from(messagePayload));
                    }
                    break;
                case 'ZtLiveScStateSignal':
                    if (messagePayload) {
                        this.handleStateSignal(session, Buffer.from(messagePayload));
                    }
                    break;
                case 'ZtLiveScNotifySignal':
                    if (messagePayload) {
                        this.handleNotifySignal(session, Buffer.from(messagePayload));
                    }
                    break;
                case 'ZtLiveScStatusChanged':
                    if (messagePayload) {
                        this.handleStatusChanged(session, Buffer.from(messagePayload));
                    }
                    break;
                default:
            }
        }
        catch (error) {
            console.error('[PushMessage] 处理推送消息失败:', error);
        }
    }
    /**
     * 处理断开连接
     */
    async handleDisconnect(sessionId, closeCode, reason) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return;
        // 记录断开原因
        const analysis = this.reconnectManager.analyzeDisconnectReason(closeCode);
        this.reconnectManager.recordDisconnect(sessionId, analysis.reason, reason);
        // 判断是否应该重连
        if (!this.reconnectManager.shouldReconnect(sessionId, closeCode)) {
            this.destroySession(sessionId);
            return;
        }
        // 保存会话状态
        this.reconnectManager.saveSessionState(sessionId, session);
        // 计算退避时间
        const backoffTime = this.reconnectManager.calculateBackoffTime(sessionId);
        // 延迟重连
        setTimeout(() => {
            this.attemptReconnect(sessionId);
        }, backoffTime);
    }
    /**
     * 尝试重连
     */
    async attemptReconnect(sessionId) {
        const session = this.sessions.get(sessionId);
        if (!session) {
            console.error('[Reconnect] 会话已不存在');
            return;
        }
        // 恢复保存的状态
        const savedState = this.reconnectManager.restoreSessionState(sessionId);
        if (!savedState) {
            console.error('[Reconnect] 未找到保存的状态');
            this.destroySession(sessionId);
            return;
        }
        this.reconnectManager.startReconnect(sessionId);
        this.sessionManager.updateStatistics(sessionId, {
            reconnectCount: (this.sessionManager.getExtendedData(sessionId)?.statistics.reconnectCount || 0) + 1
        });
        this.sessionManager.updateSessionState(sessionId, types_1.DanmuSessionState.Connecting);
        // 清理旧的WebSocket连接
        const oldWs = this.wsClients.get(sessionId);
        if (oldWs) {
            try {
                oldWs.removeAllListeners();
                if (oldWs.readyState === ws_1.default.OPEN || oldWs.readyState === ws_1.default.CONNECTING) {
                    oldWs.close();
                }
            }
            catch (error) {
                console.error('[Reconnect] 关闭旧连接失败:', error);
            }
            this.wsClients.delete(sessionId);
        }
        // 获取Token
        const { tokenInfo, error } = this.httpClient.getValidatedTokenInfo();
        if (error || !tokenInfo) {
            console.error('[Reconnect] 获取token失败:', error);
            this.reconnectManager.onReconnectFailed(sessionId, error || 'Token无效');
            this.destroySession(sessionId);
            return;
        }
        // 重新建立WebSocket连接
        try {
            const wsResult = await this.connectWebSocket(session, tokenInfo);
            if (wsResult.success) {
                this.reconnectManager.onReconnectSuccess(sessionId);
                this.healthCheckManager.resetErrorCount(sessionId);
            }
            else {
                console.error('[Reconnect] 重连失败:', wsResult.error);
                this.reconnectManager.onReconnectFailed(sessionId, wsResult.error || '未知错误');
                // 将继续尝试重连，直到达到最大次数
                this.handleDisconnect(sessionId);
            }
        }
        catch (error) {
            console.error('[Reconnect] 重连异常:', error);
            this.reconnectManager.onReconnectFailed(sessionId, error instanceof Error ? error.message : String(error));
            this.handleDisconnect(sessionId);
        }
    }
    /**
     * 销毁会话
     */
    destroySession(sessionId) {
        // 停止心跳
        this.heartbeatManager.cleanup(sessionId);
        const timer = this.heartbeatTimers.get(sessionId);
        if (timer) {
            clearInterval(timer);
            this.heartbeatTimers.delete(sessionId);
        }
        // 关闭 WebSocket
        const ws = this.wsClients.get(sessionId);
        if (ws) {
            try {
                ws.removeAllListeners();
                if (ws.readyState === ws_1.default.OPEN || ws.readyState === ws_1.default.CONNECTING) {
                    ws.close(1000, '正常关闭');
                }
            }
            catch (error) {
                console.error('关闭 WebSocket 失败:', error);
            }
            this.wsClients.delete(sessionId);
        }
        // 清理管理器资源
        this.reconnectManager.cleanup(sessionId);
        this.healthCheckManager.cleanup(sessionId);
        this.sessionManager.removeSession(sessionId);
        // 删除会话
        const session = this.sessions.get(sessionId);
        if (session) {
            this.sessions.delete(sessionId);
        }
    }
    /**
     * 生成会话 ID
     */
    generateSessionId() {
        return `danmu_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    }
    /**
     * 发送 KeepAlive 消息
     */
    async sendKeepAlive(session) {
        const ws = this.wsClients.get(session.sessionId);
        if (!ws)
            return;
        const { tokenInfo } = this.httpClient.getValidatedTokenInfo();
        if (!tokenInfo) {
            console.error('[KeepAlive] 无法获取 tokenInfo');
            return;
        }
        // 1. 构造 KeepAliveRequest
        const keepAliveRequest = ProtoUtils.buildKeepAliveRequest();
        // 2. 序列化
        const keepAliveBytes = acfun_1.AcFunDanmu.Im.Basic.KeepAliveRequest.encode(keepAliveRequest).finish();
        // 3. 选择加密密钥：优先使用sessionKey，否则使用securityKey
        const encryptionKey = session.sessionKey || Buffer.from(tokenInfo.securityKey, 'base64');
        // 4. 构造并发送消息帧
        session.seqID++;
        const frame = ProtoUtils.sendCommand('Basic.KeepAlive', keepAliveBytes, session.seqID, session.instanceID, tokenInfo.userID, encryptionKey, acfun_1.AcFunDanmu.Im.Basic.PacketHeader.EncryptionMode.kEncryptionSessionKey, session.appID || 0 // 使用从服务器获取的appID
        );
        ws.send(frame);
    }
    /**
     * 发送 EnterRoom 消息
     */
    async sendEnterRoom(session) {
        const ws = this.wsClients.get(session.sessionId);
        if (!ws)
            return;
        const { tokenInfo } = this.httpClient.getValidatedTokenInfo();
        if (!tokenInfo) {
            console.error('[EnterRoom] 无法获取 tokenInfo');
            return;
        }
        // 使用当前 ticket
        const ticket = session.tickets[session.ticketIndex] || '';
        // 1. 构造 ZtLiveCsEnterRoom（对照Go代码proto.go:164-172）
        // 关键：enterRoomAttach是从startPlay API获取的必需字段
        const enterRoomRequest = ProtoUtils.buildEnterRoomRequest(session.enterRoomAttach);
        // 2. 序列化 ZtLiveCsEnterRoom
        const enterRoomBytes = acfun_1.AcFunDanmu.ZtLiveCsEnterRoom.encode(enterRoomRequest).finish();
        // 3. 构造 ZtLiveCsCmd
        const csCmd = ProtoUtils.buildZtLiveCsCmd('ZtLiveCsEnterRoom', enterRoomBytes, ticket, session.liveID);
        // 4. 序列化 ZtLiveCsCmd
        const csCmdBytes = acfun_1.AcFunDanmu.ZtLiveCsCmd.encode(csCmd).finish();
        // 5. 选择加密密钥：优先使用sessionKey，否则使用securityKey
        const encryptionKey = session.sessionKey || Buffer.from(tokenInfo.securityKey, 'base64');
        // 6. 构造并发送消息帧
        session.seqID++;
        const frame = ProtoUtils.sendCommand('Global.ZtLiveInteractive.CsCmd', csCmdBytes, session.seqID, session.instanceID, tokenInfo.userID, encryptionKey, acfun_1.AcFunDanmu.Im.Basic.PacketHeader.EncryptionMode.kEncryptionSessionKey, session.appID || 0 // 使用从服务器获取的appID
        );
        ws.send(frame);
    }
    /**
     * 发送推送消息响应
     */
    async sendPushMessageResponse(session) {
        const ws = this.wsClients.get(session.sessionId);
        if (!ws)
            return;
        const { tokenInfo } = this.httpClient.getValidatedTokenInfo();
        if (!tokenInfo) {
            console.error('[MessageACK] 无法获取 tokenInfo');
            return;
        }
        // MessageACK 没有 payload
        const encryptionKey = session.sessionKey || Buffer.from(tokenInfo.securityKey, 'base64');
        session.seqID++;
        const frame = ProtoUtils.sendCommand('Push.ZtLiveInteractive.MessageACK', new Uint8Array(0), session.seqID, session.instanceID, tokenInfo.userID, encryptionKey, acfun_1.AcFunDanmu.Im.Basic.PacketHeader.EncryptionMode.kEncryptionSessionKey);
        ws.send(frame);
    }
    /**
     * 启动心跳
     */
    startHeartbeat(session, interval) {
        // 清除旧的心跳定时器
        const oldTimer = this.heartbeatTimers.get(session.sessionId);
        if (oldTimer) {
            clearInterval(oldTimer);
        }
        // 启动新的心跳定时器
        const timer = setInterval(() => {
            this.sendHeartbeat(session);
        }, interval);
        this.heartbeatTimers.set(session.sessionId, timer);
    }
    /**
     * 发送心跳
     */
    async sendHeartbeat(session) {
        const ws = this.wsClients.get(session.sessionId);
        if (!ws)
            return;
        const { tokenInfo } = this.httpClient.getValidatedTokenInfo();
        if (!tokenInfo) {
            console.error('[Heartbeat] 无法获取 tokenInfo');
            return;
        }
        // 1. 构造 ZtLiveCsHeartbeat
        const heartbeatRequest = ProtoUtils.buildHeartbeatRequest(session.heartbeatSeqID);
        session.heartbeatSeqID++;
        // 2. 序列化 ZtLiveCsHeartbeat
        const heartbeatBytes = acfun_1.AcFunDanmu.ZtLiveCsHeartbeat.encode(heartbeatRequest).finish();
        // 3. 构造 ZtLiveCsCmd
        const csCmd = ProtoUtils.buildZtLiveCsCmd('ZtLiveCsHeartbeat', heartbeatBytes, session.tickets[session.ticketIndex] || '', session.liveID);
        // 4. 序列化 ZtLiveCsCmd
        const csCmdBytes = acfun_1.AcFunDanmu.ZtLiveCsCmd.encode(csCmd).finish();
        // 5. 选择加密密钥：优先使用sessionKey，否则使用securityKey
        const encryptionKey = session.sessionKey || Buffer.from(tokenInfo.securityKey, 'base64');
        // 6. 构造并发送消息帧
        session.seqID++;
        const frame = ProtoUtils.sendCommand('Global.ZtLiveInteractive.CsCmd', csCmdBytes, session.seqID, session.instanceID, tokenInfo.userID, encryptionKey, acfun_1.AcFunDanmu.Im.Basic.PacketHeader.EncryptionMode.kEncryptionSessionKey);
        ws.send(frame);
        // 每 5 个心跳发送一次 KeepAlive
        if (session.heartbeatSeqID % 5 === 0) {
            await this.sendKeepAlive(session);
        }
    }
    /**
     * 处理行为信号（弹幕、礼物等）
     */
    handleActionSignal(session, payload) {
        try {
            // payload是Protobuf格式的ZtLiveScActionSignal，不是JSON
            const events = EventParser.parseActionSignal(payload);
            // 更新消息计数
            this.sessionManager.updateStatistics(session.sessionId, {
                messageCount: (this.sessionManager.getExtendedData(session.sessionId)?.statistics.messageCount || 0) + events.length
            });
            // 触发所有事件的回调
            for (const event of events) {
                try {
                    session.callback(event);
                }
                catch (error) {
                    console.error('回调执行失败:', error);
                    this.sessionManager.incrementErrorCount(session.sessionId);
                }
            }
        }
        catch (error) {
            console.error('处理行为信号失败:', error);
            this.healthCheckManager.incrementErrorCount(session.sessionId);
            this.sessionManager.incrementErrorCount(session.sessionId);
            this.sessionManager.addErrorRecord(session.sessionId, this.reconnectManager.createErrorRecord(types_1.ErrorType.PROTOCOL_ERROR, types_1.ErrorCode.DECODE_ERROR, `处理行为信号失败: ${error instanceof Error ? error.message : String(error)}`, { payload: payload.toString('hex').substring(0, 100) }));
        }
    }
    /**
     * 处理状态信号
     */
    handleStateSignal(session, payload) {
        try {
            const events = EventParser.parseStateSignal(payload);
            if (events.length > 0) {
                this.sessionManager.updateStatistics(session.sessionId, {
                    messageCount: (this.sessionManager.getExtendedData(session.sessionId)?.statistics.messageCount || 0) + events.length,
                    lastMessageTime: Date.now()
                });
                for (const ev of events) {
                    if (ev.type === 'recentComment') {
                        for (const c of ev.data) {
                            try {
                                session.callback(c);
                            }
                            catch {
                                this.sessionManager.incrementErrorCount(session.sessionId);
                            }
                        }
                    }
                    try {
                        session.callback(ev);
                    }
                    catch {
                        this.sessionManager.incrementErrorCount(session.sessionId);
                    }
                }
            }
        }
        catch (error) {
            console.error('处理状态信号失败:', error);
            this.sessionManager.incrementErrorCount(session.sessionId);
        }
    }
    /**
     * 处理通知信号
     */
    handleNotifySignal(session, payload) {
        try {
            const events = EventParser.parseNotifySignal(payload);
            if (events.length > 0) {
                this.sessionManager.updateStatistics(session.sessionId, {
                    messageCount: (this.sessionManager.getExtendedData(session.sessionId)?.statistics.messageCount || 0) + events.length,
                    lastMessageTime: Date.now()
                });
                for (const ev of events) {
                    try {
                        session.callback(ev);
                    }
                    catch {
                        this.sessionManager.incrementErrorCount(session.sessionId);
                    }
                }
            }
        }
        catch (error) {
            console.error('处理通知信号失败:', error);
            this.sessionManager.incrementErrorCount(session.sessionId);
        }
    }
    /**
     * 处理状态变更
     */
    handleStatusChanged(session, payload) {
        try {
            const status = acfun_1.AcFunDanmu.ZtLiveScStatusChanged.decode(payload);
            const t = status.type;
            if (t === acfun_1.AcFunDanmu.ZtLiveScStatusChanged.Type.LIVE_CLOSED ||
                t === acfun_1.AcFunDanmu.ZtLiveScStatusChanged.Type.LIVE_BANNED) {
                try {
                    session.callback({ type: 'end' });
                }
                catch {
                    this.sessionManager.incrementErrorCount(session.sessionId);
                }
                this.destroySession(session.sessionId);
            }
        }
        catch (error) {
            console.error('处理状态变更失败:', error);
        }
    }
    async sendComment(liverUID, content) {
        // TODO: 实现发送弹幕逻辑
        return {
            success: false,
            error: '未实现'
        };
    }
    // ==================== 会话管理接口 ====================
    /**
     * 获取所有会话列表
     */
    getAllSessions() {
        try {
            const sessions = this.sessionManager.getAllSessions();
            return {
                success: true,
                data: sessions
            };
        }
        catch (error) {
            return {
                success: false,
                error: `获取会话列表失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 获取会话详情
     */
    getSessionDetail(sessionId) {
        try {
            const detail = this.sessionManager.getSessionDetail(sessionId);
            if (!detail) {
                return {
                    success: false,
                    error: `会话不存在: ${sessionId}`
                };
            }
            return {
                success: true,
                data: detail
            };
        }
        catch (error) {
            return {
                success: false,
                error: `获取会话详情失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 按主播UID查询会话
     */
    getSessionsByLiver(liverUID) {
        try {
            const sessions = this.sessionManager.getSessionsByLiver(liverUID);
            return {
                success: true,
                data: sessions
            };
        }
        catch (error) {
            return {
                success: false,
                error: `查询会话失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 按状态筛选会话
     */
    getSessionsByState(state) {
        try {
            const sessions = this.sessionManager.getSessionsByState(state);
            return {
                success: true,
                data: sessions
            };
        }
        catch (error) {
            return {
                success: false,
                error: `筛选会话失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 获取会话健康状态
     */
    getSessionHealth(sessionId) {
        try {
            if (!this.sessionManager.hasSession(sessionId)) {
                return {
                    success: false,
                    error: `会话不存在: ${sessionId}`
                };
            }
            const ws = this.wsClients.get(sessionId);
            const wsState = ws?.readyState || 0;
            const extendedData = this.sessionManager.getExtendedData(sessionId);
            const result = this.healthCheckManager.performHealthCheck(sessionId, wsState, extendedData?.statistics);
            return {
                success: true,
                data: result
            };
        }
        catch (error) {
            return {
                success: false,
                error: `获取健康状态失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 获取全局统计信息
     */
    getSessionStatistics() {
        try {
            const stats = this.sessionManager.getGlobalStatistics();
            return {
                success: true,
                data: stats
            };
        }
        catch (error) {
            return {
                success: false,
                error: `获取统计信息失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    // ==================== 批量管理接口 ====================
    /**
     * 暂停会话
     */
    pauseSession(sessionId) {
        try {
            if (!this.sessionManager.hasSession(sessionId)) {
                return {
                    success: false,
                    error: `会话不存在: ${sessionId}`
                };
            }
            const success = this.sessionManager.pauseSession(sessionId);
            if (success) {
                return { success: true };
            }
            else {
                return {
                    success: false,
                    error: '暂停会话失败'
                };
            }
        }
        catch (error) {
            return {
                success: false,
                error: `暂停会话失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 恢复会话
     */
    resumeSession(sessionId) {
        try {
            if (!this.sessionManager.hasSession(sessionId)) {
                return {
                    success: false,
                    error: `会话不存在: ${sessionId}`
                };
            }
            const success = this.sessionManager.resumeSession(sessionId);
            if (success) {
                return { success: true };
            }
            else {
                return {
                    success: false,
                    error: '恢复会话失败'
                };
            }
        }
        catch (error) {
            return {
                success: false,
                error: `恢复会话失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 重启会话
     */
    async restartSession(sessionId) {
        try {
            const session = this.sessions.get(sessionId);
            if (!session) {
                return {
                    success: false,
                    error: `会话不存在: ${sessionId}`
                };
            }
            // 保存回调和liferUID
            const { callback, liverUID } = session;
            // 停止旧会话
            await this.stopDanmu(sessionId);
            // 稍微延迟后重启
            await new Promise(resolve => setTimeout(resolve, 1000));
            // 启动新会话
            const result = await this.startDanmu(liverUID, callback);
            return result.success ? { success: true } : {
                success: false,
                error: result.error || '重启失败'
            };
        }
        catch (error) {
            return {
                success: false,
                error: `重启会话失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 批量暂停会话
     */
    pauseSessions(sessionIds) {
        try {
            const result = {
                total: sessionIds.length,
                success: 0,
                failed: 0,
                details: []
            };
            for (const sessionId of sessionIds) {
                const pauseResult = this.pauseSession(sessionId);
                if (pauseResult.success) {
                    result.success++;
                    result.details.push({ sessionId, success: true });
                }
                else {
                    result.failed++;
                    result.details.push({
                        sessionId,
                        success: false,
                        error: pauseResult.error
                    });
                }
            }
            return {
                success: true,
                data: result
            };
        }
        catch (error) {
            return {
                success: false,
                error: `批量暂停失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 批量恢复会话
     */
    resumeSessions(sessionIds) {
        try {
            const result = {
                total: sessionIds.length,
                success: 0,
                failed: 0,
                details: []
            };
            for (const sessionId of sessionIds) {
                const resumeResult = this.resumeSession(sessionId);
                if (resumeResult.success) {
                    result.success++;
                    result.details.push({ sessionId, success: true });
                }
                else {
                    result.failed++;
                    result.details.push({
                        sessionId,
                        success: false,
                        error: resumeResult.error
                    });
                }
            }
            return {
                success: true,
                data: result
            };
        }
        catch (error) {
            return {
                success: false,
                error: `批量恢复失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 批量停止会话
     */
    async stopSessions(sessionIds) {
        try {
            const result = {
                total: sessionIds.length,
                success: 0,
                failed: 0,
                details: []
            };
            for (const sessionId of sessionIds) {
                const stopResult = await this.stopDanmu(sessionId);
                if (stopResult.success) {
                    result.success++;
                    result.details.push({ sessionId, success: true });
                }
                else {
                    result.failed++;
                    result.details.push({
                        sessionId,
                        success: false,
                        error: stopResult.error
                    });
                }
            }
            return {
                success: true,
                data: result
            };
        }
        catch (error) {
            return {
                success: false,
                error: `批量停止失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 批量重启会话
     */
    async restartSessions(sessionIds) {
        try {
            const result = {
                total: sessionIds.length,
                success: 0,
                failed: 0,
                details: []
            };
            for (const sessionId of sessionIds) {
                const restartResult = await this.restartSession(sessionId);
                if (restartResult.success) {
                    result.success++;
                    result.details.push({ sessionId, success: true });
                }
                else {
                    result.failed++;
                    result.details.push({
                        sessionId,
                        success: false,
                        error: restartResult.error
                    });
                }
            }
            return {
                success: true,
                data: result
            };
        }
        catch (error) {
            return {
                success: false,
                error: `批量重启失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 清理空闲会话
     */
    cleanupIdleSessions(idleTimeout) {
        try {
            const result = this.sessionManager.cleanupIdleSessions(idleTimeout);
            // 清理相关资源
            for (const sessionId of result.sessionIds) {
                this.destroySession(sessionId);
            }
            return {
                success: true,
                data: result
            };
        }
        catch (error) {
            return {
                success: false,
                error: `清理空闲会话失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 清理失败会话
     */
    cleanupFailedSessions() {
        try {
            const result = this.sessionManager.cleanupFailedSessions();
            // 清理相关资源
            for (const sessionId of result.sessionIds) {
                this.destroySession(sessionId);
            }
            return {
                success: true,
                data: result
            };
        }
        catch (error) {
            return {
                success: false,
                error: `清理失败会话失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
}
exports.DanmuService = DanmuService;
//# sourceMappingURL=DanmuService.js.map