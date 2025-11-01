/**
 * Protobuf 消息编码解码工具类
 * 基于 Go 源码的完整 TypeScript 实现
 */
import { TokenInfo } from '../types';
import { AcFunDanmu } from '../proto/acfun';
import Long from 'long';
/**
 * AES-128-CBC 加密
 * @param data 原始数据
 * @param key 加密密钥（16字节）
 * @returns IV (16字节) + 密文
 */
export declare function aesEncrypt(data: Buffer, key: Buffer): Buffer;
/**
 * AES-128-CBC 解密
 * @param data IV + 密文
 * @param key 解密密钥(16字节)
 * @returns 原始数据
 */
export declare function aesDecrypt(data: Buffer, key: Buffer): Buffer;
/**
 * 编码消息帧
 * @param header PacketHeader
 * @param payload UpstreamPayload
 * @param encryptionKey 加密密钥(SecurityKey或sessionKey)
 * @returns 完整的二进制消息帧
 */
export declare function encode(header: AcFunDanmu.Im.Basic.IPacketHeader, payload: AcFunDanmu.Im.Basic.IUpstreamPayload, encryptionKey: Buffer): Buffer;
/**
 * 解码消息帧
 * @param data 接收到的二进制数据
 * @param securityKey 安全密钥(Base64解码后)
 * @param sessionKey 会话密钥
 * @returns 解析后的 DownstreamPayload
 */
export declare function decode(data: Buffer, securityKey: Buffer, sessionKey?: Buffer): {
    header: AcFunDanmu.Im.Basic.IPacketHeader;
    payload: AcFunDanmu.Im.Basic.IDownstreamPayload;
} | null;
/**
 * 构造 RegisterRequest 消息
 */
export declare function buildRegisterRequest(tokenInfo: TokenInfo): AcFunDanmu.Im.Basic.IRegisterRequest;
/**
 * 构造 KeepAliveRequest 消息
 */
export declare function buildKeepAliveRequest(): AcFunDanmu.Im.Basic.IKeepAliveRequest;
/**
 * 构造 EnterRoomRequest 消息
 */
export declare function buildEnterRoomRequest(enterRoomAttach: string): AcFunDanmu.IZtLiveCsEnterRoom;
/**
 * 构造 HeartbeatRequest 消息
 */
export declare function buildHeartbeatRequest(heartbeatSeqID: number): AcFunDanmu.IZtLiveCsHeartbeat;
/**
 * 构造 UserExit 消息
 */
export declare function buildUserExitRequest(): AcFunDanmu.IZtLiveCsUserExit;
/**
 * 构造 UnregisterRequest 消息
 */
export declare function buildUnregisterRequest(): AcFunDanmu.Im.Basic.IUnregisterRequest;
/**
 * 构造 ZtLiveCsCmd 封装
 */
export declare function buildZtLiveCsCmd(cmdType: string, payload: Uint8Array, ticket: string, liveId: string): AcFunDanmu.IZtLiveCsCmd;
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
export declare function sendCommand(command: string, payloadData: Uint8Array, seqId: number, instanceId: number | Long, // 支持Long类型，避免精度丢失
uid: string, encryptionKey: Buffer, encryptionMode: AcFunDanmu.Im.Basic.PacketHeader.EncryptionMode, appId?: number): Buffer;
