"use strict";
/**
 * Protobuf 消息编码解码工具类
 * 基于 Go 源码的完整 TypeScript 实现
 */
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.aesEncrypt = aesEncrypt;
exports.aesDecrypt = aesDecrypt;
exports.encode = encode;
exports.decode = decode;
exports.buildRegisterRequest = buildRegisterRequest;
exports.buildKeepAliveRequest = buildKeepAliveRequest;
exports.buildEnterRoomRequest = buildEnterRoomRequest;
exports.buildHeartbeatRequest = buildHeartbeatRequest;
exports.buildUserExitRequest = buildUserExitRequest;
exports.buildUnregisterRequest = buildUnregisterRequest;
exports.buildZtLiveCsCmd = buildZtLiveCsCmd;
exports.sendCommand = sendCommand;
const crypto = __importStar(require("crypto"));
const acfun_1 = require("../proto/acfun");
// Magic Number for message frame
const MAGIC_NUMBER = Buffer.from([0xAB, 0xCD, 0x00, 0x01]);
/**
 * AES-128-CBC 加密
 * @param data 原始数据
 * @param key 加密密钥（16字节）
 * @returns IV (16字节) + 密文
 */
function aesEncrypt(data, key) {
    // 生成随机 IV
    const iv = crypto.randomBytes(16);
    // 创建 cipher
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    cipher.setAutoPadding(true);
    // 加密
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
    // 返回 IV + 密文
    return Buffer.concat([iv, encrypted]);
}
/**
 * AES-128-CBC 解密
 * @param data IV + 密文
 * @param key 解密密钥(16字节)
 * @returns 原始数据
 */
function aesDecrypt(data, key) {
    // 提取 IV(前 16 字节)
    const iv = data.slice(0, 16);
    // 提取密文(剩余字节)
    const encrypted = data.slice(16);
    // 创建 decipher
    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    decipher.setAutoPadding(true);
    // 解密
    return Buffer.concat([decipher.update(encrypted), decipher.final()]);
}
/**
 * 编码消息帧
 * @param header PacketHeader
 * @param payload UpstreamPayload
 * @param encryptionKey 加密密钥(SecurityKey或sessionKey)
 * @returns 完整的二进制消息帧
 */
function encode(header, payload, encryptionKey) {
    // 1. 序列化 PacketHeader
    const headerBytes = acfun_1.AcFunDanmu.Im.Basic.PacketHeader.encode(header).finish();
    const headerLength = headerBytes.length;
    // 2. 序列化 UpstreamPayload
    const payloadBytes = acfun_1.AcFunDanmu.Im.Basic.UpstreamPayload.encode(payload).finish();
    // 3. 加密 Payload
    const encryptedPayload = aesEncrypt(Buffer.from(payloadBytes), encryptionKey);
    const payloadLength = encryptedPayload.length;
    // 4. 组装消息帧
    const frame = Buffer.allocUnsafe(4 + 4 + 4 + headerLength + payloadLength);
    let offset = 0;
    // Magic Number (4 bytes)
    MAGIC_NUMBER.copy(frame, offset);
    offset += 4;
    // Header Length (4 bytes, Big Endian)
    frame.writeUInt32BE(headerLength, offset);
    offset += 4;
    // Payload Length (4 bytes, Big Endian)
    frame.writeUInt32BE(payloadLength, offset);
    offset += 4;
    // Header Bytes
    Buffer.from(headerBytes).copy(frame, offset);
    offset += headerLength;
    // Encrypted Payload
    encryptedPayload.copy(frame, offset);
    return frame;
}
/**
 * 解码消息帧
 * @param data 接收到的二进制数据
 * @param securityKey 安全密钥(Base64解码后)
 * @param sessionKey 会话密钥
 * @returns 解析后的 DownstreamPayload
 */
function decode(data, securityKey, sessionKey) {
    try {
        let offset = 0;
        // 1. 验证 Magic Number
        const magicNumber = data.slice(offset, offset + 4);
        if (!magicNumber.equals(MAGIC_NUMBER)) {
            console.error('[ProtoUtils] Invalid magic number:', magicNumber.toString('hex'));
            return null;
        }
        offset += 4;
        // 2. 读取 Header Length
        const headerLength = data.readUInt32BE(offset);
        offset += 4;
        // 3. 读取 Payload Length
        const payloadLength = data.readUInt32BE(offset);
        offset += 4;
        // 4. 解析 PacketHeader
        const headerBytes = data.slice(offset, offset + headerLength);
        const header = acfun_1.AcFunDanmu.Im.Basic.PacketHeader.decode(headerBytes);
        offset += headerLength;
        // 5. 提取加密的 Payload
        const encryptedPayload = data.slice(offset, offset + payloadLength);
        // 6. 选择解密密钥
        let decryptionKey = null;
        if (header.encryptionMode === acfun_1.AcFunDanmu.Im.Basic.PacketHeader.EncryptionMode.kEncryptionNone) {
            decryptionKey = null;
        }
        else if (header.encryptionMode === acfun_1.AcFunDanmu.Im.Basic.PacketHeader.EncryptionMode.kEncryptionServiceToken) {
            decryptionKey = securityKey;
        }
        else if (header.encryptionMode === acfun_1.AcFunDanmu.Im.Basic.PacketHeader.EncryptionMode.kEncryptionSessionKey) {
            if (!sessionKey || sessionKey.length === 0) {
                decryptionKey = securityKey;
            }
            else {
                decryptionKey = sessionKey;
            }
        }
        else {
            console.error('[ProtoUtils] Unknown encryption mode:', header.encryptionMode);
            return null;
        }
        // 7. 解密 Payload（如果需要）
        let payloadBytes;
        if (decryptionKey === null) {
            payloadBytes = encryptedPayload;
        }
        else {
            payloadBytes = aesDecrypt(encryptedPayload, decryptionKey);
        }
        // 8. 反序列化 DownstreamPayload
        const payload = acfun_1.AcFunDanmu.Im.Basic.DownstreamPayload.decode(payloadBytes);
        return { header, payload };
    }
    catch (error) {
        console.error('[ProtoUtils] Decode error:', error);
        return null;
    }
}
/**
 * 构造 RegisterRequest 消息
 */
function buildRegisterRequest(tokenInfo) {
    return {
        appInfo: {
            sdkVersion: 'kwai-acfun-live-link',
            linkVersion: '2.0.0'
        },
        deviceInfo: {
            platformType: acfun_1.AcFunDanmu.Im.Basic.DeviceInfo.PlatformType.H5_WINDOWS,
            deviceModel: 'h5'
        },
        presenceStatus: acfun_1.AcFunDanmu.Im.Basic.RegisterRequest.PresenceStatus.kPresenceOnline,
        appActiveStatus: acfun_1.AcFunDanmu.Im.Basic.RegisterRequest.ActiveStatus.kAppInForeground,
        instanceId: 0,
        ztCommonInfo: {
            kpn: 'ACFUN_APP',
            kpf: 'PC_WEB',
            uid: Number(tokenInfo.userID)
        }
    };
}
/**
 * 构造 KeepAliveRequest 消息
 */
function buildKeepAliveRequest() {
    return {
        presenceStatus: acfun_1.AcFunDanmu.Im.Basic.RegisterRequest.PresenceStatus.kPresenceOnline,
        appActiveStatus: acfun_1.AcFunDanmu.Im.Basic.RegisterRequest.ActiveStatus.kAppInForeground
    };
}
/**
 * 构造 EnterRoomRequest 消息
 */
function buildEnterRoomRequest(enterRoomAttach) {
    return {
        enterRoomAttach,
        clientLiveSdkVersion: 'kwai-acfun-live-link'
    };
}
/**
 * 构造 HeartbeatRequest 消息
 */
function buildHeartbeatRequest(heartbeatSeqID) {
    return {
        clientTimestampMs: Date.now(),
        sequence: heartbeatSeqID
    };
}
/**
 * 构造 UserExit 消息
 */
function buildUserExitRequest() {
    return {};
}
/**
 * 构造 UnregisterRequest 消息
 */
function buildUnregisterRequest() {
    return {};
}
/**
 * 构造 ZtLiveCsCmd 封装
 */
function buildZtLiveCsCmd(cmdType, payload, ticket, liveId) {
    return {
        cmdType,
        payload,
        ticket,
        liveId
    };
}
/**
 * 辅助函数：发送任意命令消息
 * @param command 命令名称
 * @param payloadData 负载数据（已序列化的 Protobuf）
 * @param seqId 序列号
 * @param instanceId 实例 ID
 * @param uid 用户 ID
 * @param encryptionKey 加密密钥
 * @param encryptionMode 加密模式
 * @param appId 应用ID（可选，从服务器获取）
 * @returns 编码后的消息帧
 */
function sendCommand(command, payloadData, seqId, instanceId, // 支持Long类型，避免精度丢失
uid, encryptionKey, encryptionMode, appId = 0 // 默认为0，如果会话中有appID则使用那个值
) {
    // 构造 UpstreamPayload
    const upstreamPayload = {
        command,
        seqId: seqId,
        retryCount: 1, // 重试次数，Go代码中固定为1
        subBiz: 'mainApp', // 子业务标识
        payloadData
    };
    // 序列化 UpstreamPayload 以获取其长度
    const upstreamPayloadBytes = acfun_1.AcFunDanmu.Im.Basic.UpstreamPayload.encode(upstreamPayload).finish();
    const decodedPayloadLen = upstreamPayloadBytes.length;
    // 构造 PacketHeader  
    const packetHeader = {
        appId: appId, // 使用从服务器获取的appID（对照Go代码proto.go:73）
        uid: Number(uid),
        instanceId: instanceId,
        decodedPayloadLen: decodedPayloadLen, // 关键：加密前的payload长度
        encryptionMode,
        seqId: seqId,
        kpn: 'ACFUN_APP'
    };
    // 编码消息帧
    return encode(packetHeader, upstreamPayload, encryptionKey);
}
//# sourceMappingURL=ProtoUtils.js.map