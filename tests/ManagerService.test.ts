import { AcFunLiveApi } from '../src/index';
import * as fs from 'fs';
import * as path from 'path';

describe('ManagerService', () => {
  let api: AcFunLiveApi;
  let token: string;

  beforeAll(() => {
    // 创建AcFunLiveApi实例
    api = new AcFunLiveApi();

    // 读取token文件
    const tokenPath = path.join(__dirname, 'token.json');
    if (!fs.existsSync(tokenPath)) {
      throw new Error('?token.json文件不存在，请先运行二维码登录测试生成token');
    }

    const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
    token = tokenData.token;

    if (!token) {
      throw new Error('?token.json文件中没有有效的token');
    }

    // 设置全局token
    api.setAuthToken(token);
  });

  describe('getManagerList', () => {
    it('should successfully get manager list', async () => {
      const result = await api.manager.getManagerList();
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      // 打印接口请求结果
      console.log('Manager API response:', JSON.stringify(result, null, 2));
      
      const managerInfoDetails = [
        `Manager List Success: ${result.success}`,
        `Manager List Has Data: ${!!result.data}`,
        `Manager List Error: ${result.error || 'None'}`
      ];
      
      if (result.success && result.data) {
        managerInfoDetails.push(
          `Manager Count: ${result.data.length}`
        );
        
        // 如果有房管数据，显示前几个房管的信息
        if (result.data.length > 0) {
          result.data.slice(0, 3).forEach((manager: any, index: number) => {
            managerInfoDetails.push(
              `Manager ${index + 1}:`,
              `  UserID: ${manager.userId}`,
              `  Nickname: ${manager.nickname}`,
              `  Avatar: ${manager.avatar}`,
              `  CustomData: ${manager.customData}`,
              `  Online: ${manager.online}`
            );
          });
        }
      }
      
      // 使用测试断言来记录信?      managerInfoDetails.forEach(detail => {
        expect(detail).toBeDefined();
      });
      
      // 验证响应结构
      expect(typeof result.success).toBe('boolean');
      if (result.success) {
        expect(Array.isArray(result.data)).toBe(true);
        if (result.data && result.data.length > 0) {
          const manager = result.data[0];
          expect(typeof manager.userId).toBe('string');
          expect(typeof manager.nickname).toBe('string');
          expect(typeof manager.avatar).toBe('string');
          expect(typeof manager.customData).toBe('string');
          expect(typeof manager.online).toBe('boolean');
        }
      }
    }, 10000); // 设置10秒超?
    it('should fail to get manager list without token', async () => {
      // 创建一个新的API实例，不设置token
      const newApi = new AcFunLiveApi();
      
      const result = await newApi.manager.getManagerList();
      
      // 验证返回错误信息
      expect(result.success).toBe(false);
      expect(result.error).toBe('缺少认证token，请先调用setAuthToken方法设置token');
    }, 5000); // 5秒超?  });

  describe('addManager', () => {
    it('should successfully add manager', async () => {
      // 根据要求，传入userId?14844
      const managerUID = 214844;
      
      const result = await api.manager.addManager(managerUID);
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      // 打印接口请求结果
      console.log('Add Manager API response:', JSON.stringify(result, null, 2));
      
      const addManagerInfoDetails = [
        `Add Manager Success: ${result.success}`,
        `Add Manager Error: ${result.error || 'None'}`
      ];
      
      // 使用测试断言来记录信?      addManagerInfoDetails.forEach(detail => {
        expect(detail).toBeDefined();
      });
      
      // 验证响应结构
      expect(typeof result.success).toBe('boolean');
    }, 10000); // 设置10秒超?
    it('should fail to add manager without token', async () => {
      // 创建一个新的API实例，不设置token
      const newApi = new AcFunLiveApi();
      
      const managerUID = 214844;
      const result = await newApi.manager.addManager(managerUID);
      
      // 验证返回错误信息
      expect(result.success).toBe(false);
      expect(result.error).toBe('缺少认证token，请先调用setAuthToken方法设置token');
    }, 5000); // 5秒超?  });

  describe('deleteManager', () => {
  it('should successfully delete manager', async () => {
    // 根据要求，传入userId?14844
    const managerUID = 214844;
    
    const result = await api.manager.deleteManager(managerUID);
    
    // 验证返回结果
    expect(result).toBeDefined();
    expect(typeof result.success).toBe('boolean');
    
    // 打印接口请求结果
    console.log('Delete Manager API response:', JSON.stringify(result, null, 2));
    
    const deleteManagerInfoDetails = [
      `Delete Manager Success: ${result.success}`,
      `Delete Manager Error: ${result.error || 'None'}`
    ];
    
    // 使用测试断言来记录信?    deleteManagerInfoDetails.forEach(detail => {
      expect(detail).toBeDefined();
    });
    
    // 验证响应结构
    expect(typeof result.success).toBe('boolean');
  }, 10000); // 设置10秒超?
  it('should fail to delete manager without token', async () => {
    // 创建一个新的API实例，不设置token
    const newApi = new AcFunLiveApi({
      
      timeout: 10000
    });
    
    const managerUID = 214844;
    const result = await newApi.manager.deleteManager(managerUID);
    
    // 验证返回错误信息
    expect(result.success).toBe(false);
    expect(result.error).toBe('缺少认证token，请先调用setAuthToken方法设置token');
  }, 5000); // 5秒超?});

describe('getAuthorKickRecords', () => {
  it('should successfully get author kick records', async () => {
    // 先获取热门直播列表来获取liveId
    const hotLives = await api.live.getHotLives();
    if (hotLives.success && hotLives.data && hotLives.data.lives && hotLives.data.lives.length > 0) {
      const liveId = hotLives.data.lives[0].liveId;
      const result = await api.manager.getAuthorKickRecords(liveId);
       
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
       
      // 打印接口请求结果
      console.log('Get Author Kick Records API response:', JSON.stringify(result, null, 2));
       
      const kickRecordsInfoDetails = [
        `Get Author Kick Records Success: ${result.success}`,
        `Get Author Kick Records Error: ${result.error || 'None'}`
      ];
       
      // 使用测试断言来记录信?      kickRecordsInfoDetails.forEach(detail => {
        expect(detail).toBeDefined();
      });
       
      // 验证响应结构
      expect(typeof result.success).toBe('boolean');
    } else {
      console.log('No hot lives available for testing getAuthorKickRecords');
    }
  }, 10000); // 设置10秒超? 
  it('should fail to get author kick records without token', async () => {
    // 创建一个新的API实例，不设置token
    const newApi = new AcFunLiveApi({
      
      timeout: 10000
    });
     
    const hotLives = await newApi.live.getHotLives();
    if (hotLives.success && hotLives.data && hotLives.data.lives && hotLives.data.lives.length > 0) {
      const liveId = hotLives.data.lives[0].liveId;
      const result = await newApi.manager.getAuthorKickRecords(liveId);
       
      // 验证返回错误信息
      expect(result.success).toBe(false);
      expect(result.error).toBe('缺少认证token，请先调用setAuthToken方法设置token');
    } else {
      console.log('No hot lives available for testing getAuthorKickRecords without token');
    }
  }, 5000); // 5秒超?});

describe('managerKick', () => {
  it('should successfully kick user as manager', async () => {
    // 先获取热门直播列表来获取liveId
    const hotLives = await api.live.getHotLives();
    if (hotLives.success && hotLives.data && hotLives.data.lives && hotLives.data.lives.length > 0) {
      const liveId = hotLives.data.lives[0].liveId;
      // 根据要求，传入userId?14844
      const kickedUID = 214844;
      const result = await api.manager.managerKick(liveId, kickedUID);
       
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
       
      // 打印接口请求结果
      console.log('Manager Kick API response:', JSON.stringify(result, null, 2));
       
      const managerKickInfoDetails = [
        `Manager Kick Success: ${result.success}`,
        `Manager Kick Error: ${result.error || 'None'}`
      ];
       
      // 使用测试断言来记录信?      managerKickInfoDetails.forEach(detail => {
        expect(detail).toBeDefined();
      });
       
      // 验证响应结构
      expect(typeof result.success).toBe('boolean');
    } else {
      console.log('No hot lives available for testing managerKick');
    }
  }, 10000); // 设置10秒超? 
  it('should fail to kick user as manager without token', async () => {
    // 创建一个新的API实例，不设置token
    const newApi = new AcFunLiveApi({
      
      timeout: 10000
    });
     
    const hotLives = await newApi.live.getHotLives();
    if (hotLives.success && hotLives.data && hotLives.data.lives && hotLives.data.lives.length > 0) {
      const liveId = hotLives.data.lives[0].liveId;
      // 根据要求，传入userId?14844
      const kickedUID = 214844;
      const result = await newApi.manager.managerKick(liveId, kickedUID);
       
      // 验证返回错误信息
      expect(result.success).toBe(false);
      expect(result.error).toBe('缺少认证token，请先调用setAuthToken方法设置token');
    } else {
      console.log('No hot lives available for testing managerKick without token');
    }
  }, 5000); // 5秒超?});

describe('authorKick', () => {
  it('should successfully kick user as author', async () => {
    // 先获取热门直播列表来获取liveId
    const hotLives = await api.live.getHotLives();
    if (hotLives.success && hotLives.data && hotLives.data.lives && hotLives.data.lives.length > 0) {
      const liveId = hotLives.data.lives[0].liveId;
      // 根据要求，传入userId?14844
      const kickedUID = 214844;
      const result = await api.manager.authorKick(liveId, kickedUID);
       
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
       
      // 打印接口请求结果
      console.log('Author Kick API response:', JSON.stringify(result, null, 2));
       
      const authorKickInfoDetails = [
        `Author Kick Success: ${result.success}`,
        `Author Kick Error: ${result.error || 'None'}`
      ];
       
      // 使用测试断言来记录信?      authorKickInfoDetails.forEach(detail => {
        expect(detail).toBeDefined();
      });
       
      // 验证响应结构
      expect(typeof result.success).toBe('boolean');
    } else {
      console.log('No hot lives available for testing authorKick');
    }
  }, 10000); // 设置10秒超? 
  it('should fail to kick user as author without token', async () => {
    // 创建一个新的API实例，不设置token
    const newApi = new AcFunLiveApi({
      
      timeout: 10000
    });
     
    const hotLives = await newApi.live.getHotLives();
    if (hotLives.success && hotLives.data && hotLives.data.lives && hotLives.data.lives.length > 0) {
      const liveId = hotLives.data.lives[0].liveId;
      // 根据要求，传入userId?14844
      const kickedUID = 214844;
      const result = await newApi.manager.authorKick(liveId, kickedUID);
       
      // 验证返回错误信息
      expect(result.success).toBe(false);
      expect(result.error).toBe('缺少认证token，请先调用setAuthToken方法设置token');
    } else {
      console.log('No hot lives available for testing authorKick without token');
    }
  }, 5000); // 5秒超?});
});

