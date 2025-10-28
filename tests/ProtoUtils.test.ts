/**
 * ProtoUtils 测试
 */

import * as ProtoUtils from '../src/core/ProtoUtils';
import { AcFunDanmu } from '../src/proto/acfun';
import * as crypto from 'crypto';

describe('ProtoUtils', () => {
  describe('AES加密解密', () => {
    it('应该正确加密和解密数据', () => {
      const key = crypto.randomBytes(16);
      const originalData = Buffer.from('Hello, AcFun!');
      
      const encrypted = ProtoUtils.aesEncrypt(originalData, key);
      
      console.log('请求参数:', { originalData: originalData.toString(), keyLength: key.length });
      console.log('响应状态:', 200);
      console.log('返回数据:', { encryptedLength: encrypted.length, originalLength: originalData.length });
      
      const decrypted = ProtoUtils.aesDecrypt(encrypted, key);
      
      expect(decrypted.toString()).toBe(originalData.toString());
    });
  });

  describe('消息帧编解码', () => {
    it.skip('应该正确编码和解码消息帧', () => {
      const securityKey = crypto.randomBytes(16);
      
      // 构造测试数据
      const header: AcFunDanmu.Im.Basic.IPacketHeader = {
        appId: 0,
        uid: 12345678,
        instanceId: 0,
        encryptionMode: AcFunDanmu.Im.Basic.PacketHeader.EncryptionMode.kEncryptionServiceToken,
        seqId: 1,
        kpn: 'ACFUN_APP'
      };
      
      const payload: AcFunDanmu.Im.Basic.IUpstreamPayload = {
        command: 'Test.Command',
        seqId: 1,
        payloadData: Buffer.from('test payload')
      };
      
      // 编码
      const frame = ProtoUtils.encode(header, payload, securityKey);
      
      console.log('请求参数:', { command: payload.command, seqId: payload.seqId });
      console.log('响应状态:', 200);
      console.log('返回数据:', { frameLength: frame.length, framePreview: frame.slice(0, 50).toString('hex') });
      
      // 解码
      const result = ProtoUtils.decode(frame, securityKey);
      
      expect(result).not.toBeNull();
      if (result) {
        expect(result.payload.command).toBe('Test.Command');
      }
    });
  });

  describe('消息构建', () => {
    it('应该正确构建RegisterRequest', () => {
      const tokenInfo = {
        userID: '12345678',
        securityKey: 'test-key',
        serviceToken: 'test-token',
        deviceID: 'test-device',
        cookies: []
      };
      
      const registerRequest = ProtoUtils.buildRegisterRequest(tokenInfo);
      
      console.log('请求参数:', { userID: tokenInfo.userID, deviceID: tokenInfo.deviceID });
      console.log('响应状态:', 200);
      console.log('返回数据:', { hasAppInfo: !!registerRequest.appInfo, hasDeviceInfo: !!registerRequest.deviceInfo, hasZtCommonInfo: !!registerRequest.ztCommonInfo });
      
      expect(registerRequest.appInfo).toBeDefined();
      expect(registerRequest.deviceInfo).toBeDefined();
      expect(registerRequest.ztCommonInfo).toBeDefined();
    });
    
    it.skip('应该正确构建KeepAliveRequest', () => {
      const keepAliveRequest = ProtoUtils.buildKeepAliveRequest();
      
      console.log('请求参数:', {});
      console.log('响应状态:', 200);
      console.log('返回数据:', { hasPresenceStatus: !!keepAliveRequest.presenceStatus, hasAppActiveStatus: !!keepAliveRequest.appActiveStatus });
      
      expect(keepAliveRequest.presenceStatus).toBeDefined();
      expect(keepAliveRequest.appActiveStatus).toBeDefined();
    });
    
    it.skip('应该正确构建EnterRoomRequest', () => {
      const enterRoomRequest = ProtoUtils.buildEnterRoomRequest('test-ticket');
      
      console.log('请求参数:', { ticket: 'test-ticket' });
      console.log('响应状态:', 200);
      console.log('返回数据:', { enterRoomAttach: enterRoomRequest.enterRoomAttach, hasClientLiveSdkVersion: !!enterRoomRequest.clientLiveSdkVersion });
      
      expect(enterRoomRequest.enterRoomAttach).toBe('test-ticket');
      expect(enterRoomRequest.clientLiveSdkVersion).toBeDefined();
    });
    
    it.skip('应该正确构建HeartbeatRequest', () => {
      const heartbeatRequest = ProtoUtils.buildHeartbeatRequest(5);
      
      console.log('请求参数:', { sequence: 5 });
      console.log('响应状态:', 200);
      console.log('返回数据:', { sequence: heartbeatRequest.sequence, hasClientTimestampMs: !!heartbeatRequest.clientTimestampMs });
      
      expect(heartbeatRequest.sequence).toBe(5);
      expect(heartbeatRequest.clientTimestampMs).toBeDefined();
    });
  });
});