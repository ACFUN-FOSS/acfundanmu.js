/**
 * ProtoUtils 测试
 */

import * as ProtoUtils from '../src/core/ProtoUtils';
import { AcFunDanmu } from '../src/proto/acfun';
import * as crypto from 'crypto';

describe('ProtoUtils', () => {
  describe('AES加密解密', () => {
    it('应该正确加密和解密数?, () => {
      const key = crypto.randomBytes(16);
      const originalData = Buffer.from('Hello, AcFun!');
      
      const encrypted = ProtoUtils.aesEncrypt(originalData, key);
      console.log('加密后长?', encrypted.length);
      console.log('原始数据长度:', originalData.length);
      
      const decrypted = ProtoUtils.aesDecrypt(encrypted, key);
      console.log('解密后数?', decrypted.toString());
      
      expect(decrypted.toString()).toBe(originalData.toString());
    });
  });

  describe('消息帧编解码', () => {
    it.skip('应该正确编码和解码消息帧', () => {
      const securityKey = crypto.randomBytes(16);
      
      // 构造测试数?      const header: AcFunDanmu.Im.Basic.IPacketHeader = {
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
      console.log('消息帧长?', frame.length);
      console.log('消息帧前50字节:', frame.slice(0, 50).toString('hex'));
      
      // 解码
      const result = ProtoUtils.decode(frame, securityKey);
      
      expect(result).not.toBeNull();
      if (result) {
        console.log('解码成功');
        console.log('命令:', result.payload.command);
        expect(result.payload.command).toBe('Test.Command');
      }
    });
  });

  describe('消息构?, () => {
    it('应该正确构?RegisterRequest', () => {
      const tokenInfo = {
        userID: '12345678',
        securityKey: 'test-key',
        serviceToken: 'test-token',
        deviceID: 'test-device',
        cookies: []
      };
      
      const registerRequest = ProtoUtils.buildRegisterRequest(tokenInfo);
      console.log('RegisterRequest:', JSON.stringify(registerRequest, null, 2));
      
      expect(registerRequest.appInfo).toBeDefined();
      expect(registerRequest.deviceInfo).toBeDefined();
      expect(registerRequest.ztCommonInfo).toBeDefined();
    });
    
    it('应该正确构?KeepAliveRequest', () => {
      const keepAliveRequest = ProtoUtils.buildKeepAliveRequest();
      console.log('KeepAliveRequest:', JSON.stringify(keepAliveRequest, null, 2));
      
      expect(keepAliveRequest.presenceStatus).toBeDefined();
      expect(keepAliveRequest.appActiveStatus).toBeDefined();
    });
    
    it('应该正确构?EnterRoomRequest', () => {
      const enterRoomRequest = ProtoUtils.buildEnterRoomRequest('test-ticket');
      console.log('EnterRoomRequest:', JSON.stringify(enterRoomRequest, null, 2));
      
      expect(enterRoomRequest.enterRoomAttach).toBe('test-ticket');
      expect(enterRoomRequest.clientLiveSdkVersion).toBeDefined();
    });
    
    it('应该正确构?HeartbeatRequest', () => {
      const heartbeatRequest = ProtoUtils.buildHeartbeatRequest(5);
      console.log('HeartbeatRequest:', JSON.stringify(heartbeatRequest, null, 2));
      
      expect(heartbeatRequest.sequence).toBe(5);
      expect(heartbeatRequest.clientTimestampMs).toBeDefined();
    });
  });
});

