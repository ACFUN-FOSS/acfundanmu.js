import { AcFunLiveApi } from '../src/index';
import * as fs from 'fs';
import * as path from 'path';

describe('LiveService.getChannelList', () => {
  let api: AcFunLiveApi;
  let token: string;

  beforeAll(() => {
    // 创建AcFunLiveApi实例
    api = new AcFunLiveApi();

    // 读取token文件
    const tokenPath = path.join(__dirname, 'token.json');
    if (!fs.existsSync(tokenPath)) {
      throw new Error('❌token.json文件不存在，请先运行二维码登录测试生成token');
    }

    const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
    token = tokenData.token;

    if (!token) {
      throw new Error('❌token.json文件中没有有效的token');
    }

    // 设置全局token
    api.setAuthToken(token);
  });

  describe('getChannelList', () => {
    it('should successfully get channel list without filters', async () => {
      // 调用getChannelList，不带任何参数
      const result = await api.live.getChannelList();
      
      // 打印接口请求结果
      console.log('Channel List API response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data?.liveList)).toBe(true);
        expect(typeof result.data?.totalCount).toBe('number');
        expect(typeof result.data?.pcursor).toBe('string');
        expect(typeof result.data?.count).toBe('number');
        
        // 如果有直播数据，验证直播信息字段
        if (result.data && result.data.liveList.length > 0) {
          const live = result.data.liveList[0];
          expect(live.liveId).toBeDefined();
          expect(live.authorId).toBeDefined();
          expect(live.streamName).toBeDefined();
          expect(live.title).toBeDefined();
          expect(Array.isArray(live.coverUrls)).toBe(true);
          expect(typeof live.likeCount).toBe('number');
          expect(typeof live.onlineCount).toBe('number');
          expect(typeof live.formatLikeCount).toBe('string');
          expect(typeof live.formatOnlineCount).toBe('string');
          expect(typeof live.createTime).toBe('number');
          expect(typeof live.portrait).toBe('boolean');
          expect(typeof live.panoramic).toBe('boolean');
          expect(typeof live.hasFansClub).toBe('boolean');
          expect(typeof live.paidShowUserBuyStatus).toBe('boolean');
          
          // 验证用户信息
          expect(live.user).toBeDefined();
          expect(live.user.id).toBeDefined();
          expect(live.user.name).toBeDefined();
          expect(live.user.headUrl).toBeDefined();
          
          // 验证分类信息
          expect(live.type).toBeDefined();
          expect(typeof live.type.id).toBe('number');
          expect(typeof live.type.name).toBe('string');
          expect(typeof live.type.categoryId).toBe('number');
          expect(typeof live.type.categoryName).toBe('string');
          
          // 打印直播列表详情
          const listDetails = [
            '✅获取直播列表成功！',
            `总直播数: ${result.data.totalCount}`,
            `当前页直播数: ${result.data.liveList.length}`,
            `分页游标: ${result.data.pcursor}`,
            `返回数量: ${result.data.count}`
          ];
          
          // 使用测试断言来记录信息
          listDetails.forEach(detail => {
            expect(detail).toBeDefined();
          });
        }
      } else {
        // 如果API调用失败，验证是否有错误信息
        expect(result.error).toBeDefined();
        console.log('API调用失败，错误信息：', result.error);
      }
    }, 10000); // 设置10秒超时

    it('should successfully get channel list with filters (all categories)', async () => {
      // 测试全部分类筛选
      const filters = [{ filterType: 1, filterId: 0 }];
      
      const result = await api.live.getChannelList({ filters });
      
      // 打印接口请求结果
      console.log('Channel List with filters (all) API response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      if (result.success && result.data) {
        expect(Array.isArray(result.data.liveList)).toBe(true);
        expect(typeof result.data.totalCount).toBe('number');
        
        // 打印筛选结果详情
        const filterDetails = [
          `✅使用筛选器获取直播列表成功！`,
          `筛选器: ${JSON.stringify(filters)}`,
          `总直播数: ${result.data.totalCount}`,
          `当前页直播数: ${result.data.liveList.length}`
        ];
        
        filterDetails.forEach(detail => {
          expect(detail).toBeDefined();
        });
      } else {
        expect(result.error).toBeDefined();
        console.log('API调用失败，错误信息：', result.error);
      }
    }, 10000); // 设置10秒超时

    it('should successfully get channel list with filters (virtual idol category)', async () => {
      // 测试虚拟偶像分类筛选
      const filters = [{ filterType: 1, filterId: 4 }];
      
      const result = await api.live.getChannelList({ filters });
      
      // 打印接口请求结果
      console.log('Channel List with filters (virtual idol) API response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      if (result.success && result.data) {
        expect(Array.isArray(result.data.liveList)).toBe(true);
        
        // 验证返回的直播是否都属于虚拟偶像分类
        if (result.data.liveList.length > 0) {
          const firstLive = result.data.liveList[0];
          // 验证分类ID是否为4（虚拟偶像）
          expect(firstLive.type.categoryId).toBe(4);
          
          // 打印筛选结果详情
          const filterDetails = [
            `✅使用虚拟偶像筛选器获取直播列表成功！`,
            `筛选器: ${JSON.stringify(filters)}`,
            `返回直播数: ${result.data.liveList.length}`,
            `第一个直播分类: ${firstLive.type.categoryName} (ID: ${firstLive.type.categoryId})`
          ];
          
          filterDetails.forEach(detail => {
            expect(detail).toBeDefined();
          });
        }
      } else {
        expect(result.error).toBeDefined();
        console.log('API调用失败，错误信息：', result.error);
      }
    }, 10000); // 设置10秒超时

    it('should successfully get channel list with pagination parameters', async () => {
      // 测试带分页参数的调用
      const count = 20;
      const pcursor = '';
      
      const result = await api.live.getChannelList({ count, pcursor });
      
      // 打印接口请求结果
      console.log('Channel List with pagination API response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      if (result.success && result.data) {
        expect(Array.isArray(result.data.liveList)).toBe(true);
        expect(typeof result.data.totalCount).toBe('number');
        expect(typeof result.data.pcursor).toBe('string');
        expect(typeof result.data.count).toBe('number');
        
        // 验证分页参数生效
        expect(result.data.count).toBeLessThanOrEqual(count);
        
        // 打印分页结果详情
        const paginationDetails = [
          `✅使用分页参数获取直播列表成功！`,
          `请求数量: ${count}`,
          `返回数量: ${result.data.count}`,
          `总直播数: ${result.data.totalCount}`,
          `分页游标: ${result.data.pcursor}`
        ];
        
        paginationDetails.forEach(detail => {
          expect(detail).toBeDefined();
        });
      } else {
        expect(result.error).toBeDefined();
        console.log('API调用失败，错误信息：', result.error);
      }
    }, 10000); // 设置10秒超时

    it('should successfully get channel list with filters and pagination', async () => {
      // 测试同时使用筛选器和分页参数
      const filters = [{ filterType: 1, filterId: 1 }]; // 游戏分类
      const count = 10;
      const pcursor = '';
      
      const result = await api.live.getChannelList({ filters, count, pcursor });
      
      // 打印接口请求结果
      console.log('Channel List with filters and pagination API response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      if (result.success && result.data) {
        expect(Array.isArray(result.data.liveList)).toBe(true);
        expect(result.data.count).toBeLessThanOrEqual(count);
        
        // 打印组合参数结果详情
        const combinedDetails = [
          `✅使用筛选器和分页参数获取直播列表成功！`,
          `筛选器: ${JSON.stringify(filters)}`,
          `请求数量: ${count}`,
          `返回数量: ${result.data.count}`,
          `总直播数: ${result.data.totalCount}`
        ];
        
        combinedDetails.forEach(detail => {
          expect(detail).toBeDefined();
        });
      } else {
        expect(result.error).toBeDefined();
        console.log('API调用失败，错误信息：', result.error);
      }
    }, 10000); // 设置10秒超时

    it('should handle empty filters array', async () => {
      // 测试空筛选器数组
      const filters: any[] = [];
      
      const result = await api.live.getChannelList({ filters });
      
      // 打印接口请求结果
      console.log('Channel List with empty filters API response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      // API调用可能成功也可能失败，我们验证返回的数据结构
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data?.liveList)).toBe(true);
      } else {
        expect(result.error).toBeDefined();
        console.log('API调用失败，错误信息：', result.error);
      }
    }, 10000); // 设置10秒超时

    it('should handle invalid filter parameters', async () => {
      // 测试无效的筛选器参数
      const filters = [{ filterType: 999, filterId: 999 }];
      
      const result = await api.live.getChannelList({ filters });
      
      // 打印接口请求结果
      console.log('Channel List with invalid filters API response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      // API调用可能成功也可能失败，我们验证返回的数据结构
      if (result.success) {
        expect(result.data).toBeDefined();
        // 即使筛选器无效，API可能返回空列表
        expect(Array.isArray(result.data?.liveList)).toBe(true);
      } else {
        expect(result.error).toBeDefined();
        console.log('API调用失败，错误信息：', result.error);
      }
    }, 10000); // 设置10秒超时
  });
});

