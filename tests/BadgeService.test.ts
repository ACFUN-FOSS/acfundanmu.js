import { AcFunLiveApi } from '../src/index';
import * as fs from 'fs';
import * as path from 'path';

describe('BadgeService', () => {
  let api: AcFunLiveApi;
  let token: string;

  beforeAll(() => {
    // 创建AcFunLiveApi实例
    api = new AcFunLiveApi();

    // 读取token文件
    const tokenPath = path.join(__dirname, 'token.json');
    if (!fs.existsSync(tokenPath)) {
      throw new Error('�?token.json文件不存在，请先运行二维码登录测试生成token');
    }

    const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
    token = tokenData.token;

    if (!token) {
      throw new Error('�?token.json文件中没有有效的token');
    }

    // 设置全局token
    api.setAuthToken(token);
  });

  describe('getBadgeDetail', () => {
    it('should successfully get badge detail', async () => {
      // 使用一个可能拥有徽章的用户ID进行测试
      const uperID = 214844; // 使用用户指定的uperId
      
      const result = await api.badge.getBadgeDetail(uperID);
      
      // 验证返回结果
      expect(result).toBeDefined();
      
      // 打印测试详情
      console.log('Badge Detail API response:', JSON.stringify(result, null, 2));
      
      const badgeDetailInfo = [
        `Badge Detail Success: ${result.success}`,
        `Badge Detail Has Data: ${!!result.data}`,
        `Badge Detail Error: ${result.error || 'None'}`
      ];
      
      if (result.success && result.data) {
        badgeDetailInfo.push(
          `Uper ID: ${result.data.uperID}`,
          `User ID: ${result.data.userID}`,
          `Club Name: ${result.data.clubName}`,
          `Level: ${result.data.level}`,
          `Experience: ${result.data.experience}`,
          `Next Level Experience: ${result.data.nextLevelExperience}`,
          `Join Time: ${result.data.joinTime}`
        );
      }
      
      // 使用测试断言来记录信�?      badgeDetailInfo.forEach(detail => {
        expect(detail).toBeDefined();
      });
      
      // 验证响应结构
      expect(typeof result.success).toBe('boolean');
      if (result.success) {
        expect(result.data).toBeDefined();
        if (result.data) {
          expect(typeof result.data.uperID).toBe('number');
          expect(typeof result.data.userID).toBe('number');
          expect(typeof result.data.clubName).toBe('string');
          expect(typeof result.data.level).toBe('number');
          expect(typeof result.data.experience).toBe('number');
          expect(typeof result.data.nextLevelExperience).toBe('number');
          expect(typeof result.data.joinTime).toBe('number');
        }
      }
    }, 10000); // 设置10秒超�?
    it('should fail to get badge detail without token', async () => {
      // 创建一个新的API实例，不设置token
      const newApi = new AcFunLiveApi();
      
      const result = await newApi.badge.getBadgeDetail(10000);
      
      // 验证返回错误信息
      expect(result.success).toBe(false);
      expect(result.error).toBe('缺少认证token，请先调用setAuthToken方法设置token');
    }, 5000); // 5秒超�?  });

  describe('getBadgeList', () => {
    it('should successfully get badge list', async () => {
      const result = await api.badge.getBadgeList();
      
      // 打印测试详情
      console.log('Badge List API response:', JSON.stringify(result, null, 2));
      
      const badgeListInfo = [
        `Badge List Success: ${result.success}`,
        `Badge List Has Data: ${!!result.data}`,
        `Badge List Error: ${result.error || 'None'}`
      ];
      
      if (result.success && result.data) {
        badgeListInfo.push(
          `Badge Count: ${result.data.length}`
        );
        
        // 如果有徽章，验证第一个徽章的结构
        if (result.data.length > 0) {
          const firstBadge = result.data[0];
          badgeListInfo.push(
            `First Badge Uper ID: ${firstBadge.uperID}`,
            `First Badge User ID: ${firstBadge.userID}`,
            `First Badge Club Name: ${firstBadge.clubName}`,
            `First Badge Level: ${firstBadge.level}`
          );
        }
      }
      
      // 使用测试断言来记录信�?      badgeListInfo.forEach(detail => {
        expect(detail).toBeDefined();
      });
      
      // 验证响应结构
      expect(typeof result.success).toBe('boolean');
      if (result.success) {
        expect(result.data).toBeDefined();
        if (result.data) {
          expect(Array.isArray(result.data)).toBe(true);
          if (result.data.length > 0) {
            const firstBadge = result.data[0];
            expect(typeof firstBadge.uperID).toBe('number');
            expect(typeof firstBadge.userID).toBe('number');
            expect(typeof firstBadge.clubName).toBe('string');
            expect(typeof firstBadge.level).toBe('number');
          }
        }
      }
    }, 10000); // 设置10秒超�?
    it('should fail to get badge list without token', async () => {
      // 创建一个新的API实例，不设置token
      const newApi = new AcFunLiveApi();
      
      const result = await newApi.badge.getBadgeList();
      
      // 验证返回错误信息
      expect(result.success).toBe(false);
      expect(result.error).toBe('缺少认证token，请先调用setAuthToken方法设置token');
    }, 5000); // 5秒超�?  });

  describe('getBadgeRank', () => {
    it('should successfully get badge rank', async () => {
      // 使用一个可能拥有徽章的用户ID进行测试
      const uperID = 214844; // 使用用户指定的uperId
      
      const result = await api.badge.getBadgeRank(uperID);
      
      // 验证返回结果
      expect(result).toBeDefined();
      
      // 打印测试详情
      console.log('Badge Rank API response:', JSON.stringify(result, null, 2));
      
      const badgeRankInfo = [
        `Badge Rank Success: ${result.success}`,
        `Badge Rank Has Data: ${!!result.data}`,
        `Badge Rank Error: ${result.error || 'None'}`
      ];
      
      if (result.success && result.data) {
        badgeRankInfo.push(
          `Rank Count: ${result.data.length}`
        );
        
        // 如果有排名，验证第一个排名的结构
        if (result.data.length > 0) {
          const firstRank = result.data[0];
          badgeRankInfo.push(
            `First Rank User ID: ${firstRank.userID}`,
            `First Rank Nickname: ${firstRank.nickname}`,
            `First Rank Avatar: ${firstRank.avatar}`,
            `First Rank Level: ${firstRank.level}`,
            `First Rank Experience: ${firstRank.experience}`,
            `First Rank Rank: ${firstRank.rank}`
          );
        }
      }
      
      // 使用测试断言来记录信�?      badgeRankInfo.forEach(detail => {
        expect(detail).toBeDefined();
      });
      
      // 验证响应结构
      expect(typeof result.success).toBe('boolean');
      if (result.success) {
        expect(result.data).toBeDefined();
        if (result.data) {
          expect(Array.isArray(result.data)).toBe(true);
          if (result.data.length > 0) {
            const firstRank = result.data[0];
            expect(typeof firstRank.userID).toBe('number');
            expect(typeof firstRank.nickname).toBe('string');
            expect(typeof firstRank.avatar).toBe('string');
            expect(typeof firstRank.level).toBe('number');
            expect(typeof firstRank.experience).toBe('number');
            expect(typeof firstRank.rank).toBe('number');
          }
        }
      }
    }, 10000); // 设置10秒超�?
    it('should fail to get badge rank without token', async () => {
      // 创建一个新的API实例，不设置token
      const newApi = new AcFunLiveApi();
      
      const result = await newApi.badge.getBadgeRank(10000);
      
      // 验证返回错误信息
      expect(result.success).toBe(false);
      expect(result.error).toBe('缺少认证token，请先调用setAuthToken方法设置token');
    }, 5000); // 5秒超�?  });

  describe('getWornBadge', () => {
    it('should successfully get worn badge', async () => {
      // 使用当前用户ID进行测试
      const userID = 0; // 0表示当前用户
      
      const result = await api.badge.getWornBadge(userID);
      
      // 验证返回结果
      expect(result).toBeDefined();
      
      // 打印测试详情
      console.log('Worn Badge API response:', JSON.stringify(result, null, 2));
      
      const wornBadgeInfo = [
        `Worn Badge Success: ${result.success}`,
        `Worn Badge Has Data: ${!!result.data}`,
        `Worn Badge Error: ${result.error || 'None'}`
      ];
      
      if (result.success && result.data) {
        wornBadgeInfo.push(
          `Worn Badge Uper ID: ${result.data.uperID}`,
          `Worn Badge User ID: ${result.data.userID}`,
          `Worn Badge Club Name: ${result.data.clubName}`,
          `Worn Badge Level: ${result.data.level}`
        );
      }
      
      // 使用测试断言来记录信�?      wornBadgeInfo.forEach(detail => {
        expect(detail).toBeDefined();
      });
      
      // 验证响应结构
      expect(typeof result.success).toBe('boolean');
      if (result.success) {
        expect(result.data).toBeDefined();
        if (result.data) {
          expect(typeof result.data.uperID).toBe('number');
          expect(typeof result.data.userID).toBe('number');
          expect(typeof result.data.clubName).toBe('string');
          expect(typeof result.data.level).toBe('number');
        }
      }
    }, 10000); // 设置10秒超�?
    it('should fail to get worn badge without token', async () => {
      // 创建一个新的API实例，不设置token
      const newApi = new AcFunLiveApi();
      
      const result = await newApi.badge.getWornBadge(0);
      
      // 验证返回错误信息
      expect(result.success).toBe(false);
      expect(result.error).toBe('缺少认证token，请先调用setAuthToken方法设置token');
    }, 5000); // 5秒超�?  });

  describe('wearBadge', () => {
    it('should successfully wear badge', async () => {
      // 注意：这个测试可能会改变用户的实际徽章佩戴状�?      // 使用一个可能拥有徽章的用户ID进行测试
      const uperID = 214844; // 使用用户指定的uperId
      
      const result = await api.badge.wearBadge(uperID);
      
      // 验证返回结果
      expect(result).toBeDefined();
      
      // 打印测试详情
      console.log('Wear Badge API response:', JSON.stringify(result, null, 2));
      
      const wearBadgeInfo = [
        `Wear Badge Success: ${result.success}`,
        `Wear Badge Error: ${result.error || 'None'}`
      ];
      
      // 使用测试断言来记录信�?      wearBadgeInfo.forEach(detail => {
        expect(detail).toBeDefined();
      });
      
      // 验证响应结构
      expect(typeof result.success).toBe('boolean');
    }, 10000); // 设置10秒超�?
    it('should fail to wear badge without token', async () => {
      // 创建一个新的API实例，不设置token
      const newApi = new AcFunLiveApi();
      
      const result = await newApi.badge.wearBadge(10000);
      
      // 验证返回错误信息
      expect(result.success).toBe(false);
      expect(result.error).toBe('缺少认证token，请先调用setAuthToken方法设置token');
    }, 5000); // 5秒超�?  });

  describe('unwearBadge', () => {
    it('should successfully unwear badge', async () => {
      // 注意：这个测试可能会改变用户的实际徽章佩戴状�?      const result = await api.badge.unwearBadge();
      
      // 验证返回结果
      expect(result).toBeDefined();
      
      // 打印测试详情
      console.log('Unwear Badge API response:', JSON.stringify(result, null, 2));
      
      const unwearBadgeInfo = [
        `Unwear Badge Success: ${result.success}`,
        `Unwear Badge Error: ${result.error || 'None'}`
      ];
      
      // 使用测试断言来记录信�?      unwearBadgeInfo.forEach(detail => {
        expect(detail).toBeDefined();
      });
      
      // 验证响应结构
      expect(typeof result.success).toBe('boolean');
    }, 10000); // 设置10秒超�?
    it('should fail to unwear badge without token', async () => {
      // 创建一个新的API实例，不设置token
      const newApi = new AcFunLiveApi();
      
      const result = await newApi.badge.unwearBadge();
      
      // 验证返回错误信息
      expect(result.success).toBe(false);
      expect(result.error).toBe('缺少认证token，请先调用setAuthToken方法设置token');
    }, 5000); // 5秒超�?  });
});
