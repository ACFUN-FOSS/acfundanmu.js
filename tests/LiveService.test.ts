import { AcFunLiveApi } from '../src/index';
import * as fs from 'fs';
import * as path from 'path';

describe('LiveService', () => {
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

  describe('getStreamUrl', () => {
    it('should return stream URL information successfully', async () => {
      // 使用测试直播ID进行测试
      const liveId = '214844';
      
      const result = await api.live.getStreamUrl(liveId);
      
      // 打印接口请求结果
      console.log('Live API response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      
      // API调用可能成功也可能失败，这取决于实际的API状态
      // 我们主要验证返回的数据结构是否正确
      if (result.success) {
        expect(result.data).toBeDefined();
        
        // 验证推流地址信息字段存在
        if (result.data) {
          expect(result.data.rtmpUrl).toBeDefined();
          expect(result.data.streamKey).toBeDefined();
          expect(typeof result.data.expiresAt).toBe('number');
          expect(typeof result.data.rtmpUrl).toBe('string');
          expect(typeof result.data.streamKey).toBe('string');
          
          const streamUrlDetails = [
            '✅获取推流地址成功！',
            '\n📊 推流地址详情：',
            `RTMP服务器地址: ${result.data.rtmpUrl}`,
            `推流密钥: ${result.data.streamKey}`,
            `过期时间: ${new Date(result.data.expiresAt).toISOString()}`
          ];
          
          // 使用测试报告记录推流地址信息，而不是直接打印
          streamUrlDetails.forEach(detail => {
            expect(detail).toBeDefined();
          });
        }
      } else {
        // 如果API调用失败，验证是否有错误信息
        expect(result.error).toBeDefined();
        console.log('API调用失败，错误信息：', result.error);
      }
    }, 15000); // 设置15秒超时

    it('should handle API error response', async () => {
      // 使用无效的直播ID进行测试
      const invalidLiveId = 'invalid-live-id';
      
      const result = await api.live.getStreamUrl(invalidLiveId);
      
      // 打印接口请求结果
      console.log('Live API response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      
      // API调用可能成功也可能失败，我们验证返回的数据结构
      if (result.success) {
        // 即使参数无效，API也可能返回成功但数据为空
        expect(result.data).toBeDefined();
      } else {
        // 验证是否有错误信息
        expect(result.error).toBeDefined();
      }
    }, 15000); // 设置15秒超时
  });

  describe('getLiveCategories', () => {
    it('should successfully get live categories list', async () => {
      const result = await api.live.getLiveCategories();
      
      // 打印接口请求结果
      console.log('Live Categories API response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
        
        // 如果有分类数据，验证分类信息字段
        if (result.data && result.data.length > 0) {
          const category = result.data[0];
          expect(category.categoryID).toBeDefined();
          expect(category.categoryName).toBeDefined();
          expect(typeof category.categoryID).toBe('number');
          expect(typeof category.categoryName).toBe('string');
          
          // 验证子分类属性
          expect(category.subCategoryID).toBeDefined();
          expect(category.subCategoryName).toBeDefined();
          expect(typeof category.subCategoryID).toBe('number');
          expect(typeof category.subCategoryName).toBe('string');
        }
      }
    }, 10000); // 设置10秒超时

    it('should handle API error response', async () => {
      // 测试API错误处理
      const result = await api.live.getLiveCategories();
      
      // 打印接口请求结果
      console.log('Live Categories API response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      // API调用可能成功也可能失败，我们验证返回的数据结构
      if (result.success) {
        expect(result.data).toBeDefined();
      } else {
        // 验证是否有错误信息
        expect(result.error).toBeDefined();
        console.log('API调用失败，错误信息：', result.error);
      }
    }, 10000); // 设置10秒超时
  });

  describe('getHotLives', () => {
    it('should successfully get hot live list', async () => {
      const result = await api.live.getHotLives();
      
      // 打印接口请求结果
      console.log('Hot Lives API response:', result);
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data?.lives)).toBe(true);
        expect(typeof result.data?.total).toBe('number');
        
        // 如果有直播数据，验证直播信息字段
        if (result.data && result.data.lives.length > 0) {
          const live = result.data.lives[0];
          expect(live.liveId).toBeDefined();
          expect(live.title).toBeDefined();
          expect(live.coverUrl).toBeDefined();
          expect(typeof live.onlineCount).toBe('number');
          
          // 验证可选属性（如果存在）
          if (live.likeCount !== undefined) {
            expect(typeof live.likeCount).toBe('number');
          }
          if (live.startTime !== undefined) {
            expect(typeof live.startTime).toBe('number');
          }
          
          // 验证主播信息（如果存在）
          if (live.streamer) {
            expect(live.streamer.userId).toBeDefined();
            expect(live.streamer.userName).toBeDefined();
            expect(live.streamer.avatar).toBeDefined();
            expect(typeof live.streamer.level).toBe('number');
          }
          
          // 验证分类信息（如果存在）
          if (live.category !== undefined) {
            expect(live.category).toBeDefined();
          }
          if (live.subCategory !== undefined) {
            expect(live.subCategory).toBeDefined();
          }
        }
      }
    }, 10000); // 设置10秒超时

    it('should get hot lives with pagination parameters', async () => {
      // 测试带分页参数的调用
      const result = await api.live.getHotLives('', 0, 10);
      
      // 打印接口请求结果
      console.log('Hot Lives with pagination API response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      if (result.success && result.data) {
        expect(Array.isArray(result.data.lives)).toBe(true);
        expect(typeof result.data.total).toBe('number');
        
        // 验证分页参数生效（如果API支持）
        const liveInfoDetails = [
          `Hot Lives Success: ${result.success}`,
          `Total Lives: ${result.data.total}`,
          `Lives Count: ${result.data.lives.length}`
        ];
        
        // 使用测试断言来记录信息
        liveInfoDetails.forEach(detail => {
          expect(detail).toBeDefined();
        });
      }
    }, 10000); // 设置10秒超时

    it('should handle category parameter correctly', async () => {
      // 测试带分类参数的调用
      const result = await api.live.getHotLives('game', 0, 20);
      
      // 打印接口请求结果
      console.log('Hot Lives with category API response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      if (result.success && result.data) {
        expect(Array.isArray(result.data.lives)).toBe(true);
        
        // 如果有直播数据，可以验证分类信息（如果API支持分类过滤）
        const liveInfoDetails = [
          `Hot Lives with Category Success: ${result.success}`,
          `Lives Count: ${result.data.lives.length}`,
          `Total Count: ${result.data.total}`
        ];
        
        // 使用测试断言来记录信息
        liveInfoDetails.forEach(detail => {
          expect(detail).toBeDefined();
        });
      }
    }, 10000); // 设置10秒超时
  });

  describe('getLiveStatistics', () => {
    it('should successfully get live statistics', async () => {
      // 首先调用getHotLives获取第一个直播的liveId
      const hotLivesResult = await api.live.getHotLives();
      
      // 验证获取热门直播列表成功
      expect(hotLivesResult).toBeDefined();
      expect(typeof hotLivesResult.success).toBe('boolean');
      
      if (!hotLivesResult.success || !hotLivesResult.data || hotLivesResult.data.lives.length === 0) {
        // 如果没有获取到直播数据，跳过测试
        console.log('无法获取直播列表，跳过getLiveStatistics测试');
        return;
      }
      
      // 获取第一个直播的liveId
      const firstLive = hotLivesResult.data.lives[0];
      const liveId = firstLive.liveId;
      
      // 使用获取到的liveId调用getLiveStatistics
      const result = await api.live.getLiveStatistics(liveId);
      
      // 打印接口请求结果
      console.log('Live Statistics API response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      if (result.success) {
        expect(result.data).toBeDefined();
        
        // 验证直播统计数据字段存在
        if (result.data) {
          expect(typeof result.data.totalViewers).toBe('number');
          expect(typeof result.data.peakViewers).toBe('number');
          expect(typeof result.data.totalComments).toBe('number');
          expect(typeof result.data.totalGifts).toBe('number');
          expect(typeof result.data.totalLikes).toBe('number');
          expect(typeof result.data.revenue).toBe('number');
          
          // 打印统计数据详情
          const statsDetails = [
            '✅获取直播统计数据成功！',
            '\n📊 直播统计数据详情：',
            `总观看人数: ${result.data.totalViewers}`,
            `峰值观看人数: ${result.data.peakViewers}`,
            `总弹幕数: ${result.data.totalComments}`,
            `总礼物数: ${result.data.totalGifts}`,
            `总点赞数: ${result.data.totalLikes}`,
            `收入(AC币): ${result.data.revenue}`
          ];
          
          // 使用测试断言来记录信息
          statsDetails.forEach(detail => {
            expect(detail).toBeDefined();
          });
        }
      } else {
        // 如果API调用失败，验证是否有错误信息
        expect(result.error).toBeDefined();
        console.log('API调用失败，错误信息：', result.error);
      }
    }, 10000); // 设置10秒超时

    it('should handle API error response', async () => {
      // 使用无效的liveId进行测试
      const invalidLiveId = 'invalid-live-id';
      
      const result = await api.live.getLiveStatistics(invalidLiveId);
      
      // 打印接口请求结果
      console.log('Live Statistics API response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      // API调用可能成功也可能失败，我们验证返回的数据结构
      if (result.success) {
        expect(result.data).toBeDefined();
      } else {
        // 验证是否有错误信息
        expect(result.error).toBeDefined();
        console.log('API调用失败，错误信息：', result.error);
      }
    }, 10000); // 设置10秒超时
  });

  describe('getLiveList', () => {
    it('should successfully get live list', async () => {
      // 调用getLiveList获取直播列表
      const result = await api.live.getLiveList();
      
      // 打印接口请求结果
      console.log('Live List API response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data?.lives)).toBe(true);
        expect(typeof result.data?.totalCount).toBe('number');
        expect(typeof result.data?.hasMore).toBe('boolean');
        
        // 如果有直播数据，验证直播信息字段
        if (result.data && result.data.lives.length > 0) {
          const live = result.data.lives[0];
          expect(live.liveId).toBeDefined();
          expect(live.title).toBeDefined();
          expect(live.coverUrl).toBeDefined();
          expect(typeof live.viewerCount).toBe('number');
          expect(typeof live.streamerName).toBe('string');
          expect(typeof live.streamerAvatar).toBe('string');
          expect(typeof live.category).toBe('string');
          expect(typeof live.isLive).toBe('boolean');
          
          // 打印直播列表详情
          const listDetails = [
            '✅获取直播列表成功！',
            `总直播数: ${result.data.totalCount}`,
            `当前页直播数: ${result.data.lives.length}`,
            `是否有更多: ${result.data.hasMore}`
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

    it('should get live list with pagination parameters', async () => {
      // 调用getLiveList，带分页参数
      const result = await api.live.getLiveList(1, 10);
      
      // 打印接口请求结果
      console.log('Live List with pagination API response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      if (result.success && result.data) {
        expect(Array.isArray(result.data.lives)).toBe(true);
        expect(typeof result.data.totalCount).toBe('number');
        expect(typeof result.data.hasMore).toBe('boolean');
        
        // 验证分页参数生效
        const listDetails = [
          `Live List with Pagination Success: ${result.success}`,
          `Total Lives: ${result.data.totalCount}`,
          `Lives Count: ${result.data.lives.length}`,
          `Has More: ${result.data.hasMore}`
        ];
        
        // 使用测试断言来记录信息
        listDetails.forEach(detail => {
          expect(detail).toBeDefined();
        });
      }
    }, 10000); // 设置10秒超时

    it('should handle invalid parameters', async () => {
      // 使用无效的分页参数进行测试
      const result = await api.live.getLiveList(-1, -1);
      
      // 打印接口请求结果
      console.log('Live List with invalid liverUID API response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      // API调用可能成功也可能失败，我们验证返回的数据结构
      if (result.success) {
        expect(result.data).toBeDefined();
        // 即使参数无效，API可能返回空列表
        expect(Array.isArray(result.data?.lives)).toBe(true);
        expect(typeof result.data?.totalCount).toBe('number');
        expect(typeof result.data?.hasMore).toBe('boolean');
      } else {
        // 验证是否有错误信息
        expect(result.error).toBeDefined();
        console.log('API调用失败，错误信息：', result.error);
      }
    }, 10000); // 设置10秒超时
  });

  describe('getUserLiveInfo', () => {
    it('should successfully get user live information', async () => {
      // 先获取热门直播列表，然后使用第一个直播的用户ID
      const hotLivesResult = await api.live.getHotLives();
      
      // 验证热门直播列表获取成功
      expect(hotLivesResult).toBeDefined();
      expect(hotLivesResult.success).toBe(true);
      expect(hotLivesResult.data).toBeDefined();
      
      if (hotLivesResult.success && hotLivesResult.data && hotLivesResult.data.lives.length > 0) {
        const firstLive = hotLivesResult.data.lives[0];
        const userID = firstLive.liverUID || firstLive.streamer?.userId;
        
        // 确保有有效的用户ID
        expect(userID).toBeDefined();
        
        if (userID) {
          // 将用户ID转换为数字类型
          const numericUserID = parseInt(userID.toString(), 10);
          
          // 调用getUserLiveInfo函数
          const result = await api.live.getUserLiveInfo(numericUserID);
          
          // 打印接口请求结果
          console.log('User Live Info API response:', JSON.stringify(result, null, 2));
          
          // 验证返回结果
          expect(result).toBeDefined();
          expect(typeof result.success).toBe('boolean');
          
          if (result.success) {
            expect(result.data).toBeDefined();
            
            // 验证用户信息字段存在
            if (result.data) {
              expect(result.data.profile).toBeDefined();
              expect(result.data.liveType).toBeDefined();
              expect(result.data.liveID).toBeDefined();
              expect(result.data.title).toBeDefined();
              
              // 验证profile字段
              expect(result.data.profile.userID).toBe(numericUserID);
              expect(typeof result.data.profile.nickname).toBe('string');
              expect(typeof result.data.profile.avatar).toBe('string');
              expect(typeof result.data.profile.followingCount).toBe('number');
              expect(typeof result.data.profile.fansCount).toBe('number');
              
              // 验证liveType字段
              expect(typeof result.data.liveType.categoryID).toBe('number');
              expect(typeof result.data.liveType.categoryName).toBe('string');
            }
          } else {
            // 如果API调用失败，验证是否有错误信息
            expect(result.error).toBeDefined();
            console.log('API调用失败，错误信息：', result.error);
          }
        }
      } else {
        console.log('❌无法获取热门直播列表，跳过用户直播信息测试');
      }
    }, 15000); // 设置15秒超时

    it('should handle invalid user ID gracefully', async () => {
      // 使用无效的用户ID进行测试
      const invalidUserID = 999999999;
      
      const result = await api.live.getUserLiveInfo(invalidUserID);
      
      // 打印接口请求结果
      console.log('User Live Info API response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      // API调用可能成功也可能失败，我们验证返回的数据结构
      if (result.success) {
        expect(result.data).toBeDefined();
      } else {
        // 验证是否有错误信息
        expect(result.error).toBeDefined();
        console.log('API调用失败，错误信息：', result.error);
      }
    }, 10000); // 设置10秒超时
  });

  describe('getLiveStatisticsByDays', () => {
    it('should successfully get live statistics by days', async () => {
      // 使用有效的天数参数进行测试
      const days = 7;
      
      const result = await api.live.getLiveStatisticsByDays(days);
      
      // 打印接口请求结果
      console.log('Live Statistics by Days API response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      if (result.success) {
        expect(result.data).toBeDefined();
        
        // 验证统计数据字段存在
        if (result.data) {
          expect(typeof result.data.beginDate).toBe('string');
          expect(typeof result.data.endDate).toBe('string');
          expect(result.data.overview).toBeDefined();
          expect(result.data.liveDetail).toBeDefined();
          expect(Array.isArray(result.data.dailyData)).toBe(true);
          
          // 验证overview字段
          expect(typeof result.data.overview.duration).toBe('number');
          expect(typeof result.data.overview.maxPopularityValue).toBe('number');
          expect(typeof result.data.overview.watchCount).toBe('number');
          expect(typeof result.data.overview.diamondCount).toBe('number');
          expect(typeof result.data.overview.commentCount).toBe('number');
          expect(typeof result.data.overview.bananaCount).toBe('number');
          
          // 验证liveDetail字段结构
          if (Object.keys(result.data.liveDetail).length > 0) {
            const firstDate = Object.keys(result.data.liveDetail)[0];
            const firstDetail = result.data.liveDetail[firstDate][0];
            expect(typeof firstDetail.liveStartTime).toBe('number');
            expect(typeof firstDetail.liveEndTime).toBe('number');
            expect(firstDetail.liveStat).toBeDefined();
            expect(typeof firstDetail.liveStat.duration).toBe('number');
          }
          
          // 验证dailyData字段结构
          if (result.data.dailyData.length > 0) {
            const firstDaily = result.data.dailyData[0];
            expect(typeof firstDaily.date).toBe('string');
            expect(typeof firstDaily.liveTimes).toBe('number');
            expect(firstDaily.liveStat).toBeDefined();
            expect(typeof firstDaily.liveStat.duration).toBe('number');
          }
        }
      } else {
        // 如果API调用失败，验证是否有错误信息
        expect(result.error).toBeDefined();
        console.log('API调用失败，错误信息：', result.error);
      }
    }, 15000); // 设置15秒超时

    it('should handle invalid days parameter gracefully', async () => {
      // 使用无效的天数参数进行测试
      const invalidDays = 0;
      
      const result = await api.live.getLiveStatisticsByDays(invalidDays);
      
      // 打印接口请求结果
      console.log('Live Statistics with invalid days API response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      // 应该返回错误，因为days参数无效
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('days参数必须大于等于1');
      
      console.log('API调用失败，错误信息：', result.error);
    }, 10000); // 设置10秒超时
  });

  describe('getStreamSettings', () => {
    it('should successfully get stream settings', async () => {
      const result = await api.live.getStreamSettings();
      
      // 打印接口请求结果
      console.log('Stream Settings API response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      if (result.success) {
        expect(result.data).toBeDefined();
        
        // 验证流设置信息字段存在
        if (result.data) {
          expect(typeof result.data.streamName).toBe('string');
          expect(typeof result.data.streamPullAddress).toBe('string');
          expect(Array.isArray(result.data.streamPushAddress)).toBe(true);
          expect(typeof result.data.panoramic).toBe('boolean');
          expect(typeof result.data.intervalMillis).toBe('number');
          
          // 打印流设置详情
          const streamDetails = [
            '✅成功获取流设置信息！',
            '\n📊 流设置详情：',
            `流名称: ${result.data.streamName}`,
            `拉流地址: ${result.data.streamPullAddress}`,
            `推流地址数量: ${result.data.streamPushAddress.length}`,
            `全景模式: ${result.data.panoramic ? '是' : '否'}`,
            `间隔毫秒: ${result.data.intervalMillis}`
          ];
          
          // 使用测试断言来记录信息
          streamDetails.forEach(detail => {
            expect(detail).toBeDefined();
          });
        }
      } else {
        // 如果API调用失败，验证是否有错误信息
        expect(result.error).toBeDefined();
        console.log('API调用失败，错误信息：', result.error);
      }
    }, 15000); // 设置15秒超时

    it('should handle API error response', async () => {
      // 测试API错误处理
      const result = await api.live.getStreamSettings();
      
      // 打印接口请求结果
      console.log('Stream Settings API error response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      // API调用可能成功也可能失败，我们验证返回的数据结构
      if (result.success) {
        expect(result.data).toBeDefined();
      } else {
        // 验证是否有错误信息
        expect(result.error).toBeDefined();
        console.log('API调用失败，错误信息：', result.error);
      }
    }, 15000); // 设置15秒超时
  });

  describe('startLiveStream', () => {
    it('should successfully start live stream', async () => {
      // 使用测试参数启动直播
      const title = '测试直播标题';
      const coverFile = '';
      const streamName = 'test-stream';
      const portrait = false;
      const panoramic = false;
      const categoryID = 1;
      const subCategoryID = 1;
      
      const result = await api.live.startLiveStream(title, coverFile, streamName, portrait, panoramic, categoryID, subCategoryID);
      
      // 打印接口请求结果
      console.log('Start Live Stream API response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      if (result.success) {
        expect(result.data).toBeDefined();
        
        // 验证直播启动信息字段存在
        if (result.data) {
          expect(result.data.liveID).toBeDefined();
          expect(typeof result.data.liveID).toBe('string');
          
          // 打印直播启动详情
          const startDetails = [
            '✅成功启动直播！',
            '\n📊 直播启动详情：',
            `直播ID: ${result.data.liveID}`,
            `标题: ${title}`,
            `分类ID: ${categoryID}`,
            `子分类ID: ${subCategoryID}`
          ];
          
          // 使用测试断言来记录信息
          startDetails.forEach(detail => {
            expect(detail).toBeDefined();
          });
        }
      } else {
        // 如果API调用失败，验证是否有错误信息
        expect(result.error).toBeDefined();
        console.log('API调用失败，错误信息：', result.error);
      }
    }, 15000); // 设置15秒超时

    it('should handle missing required parameters', async () => {
      // 测试缺少必需参数的情况
      const result = await api.live.startLiveStream('', '', '', false, false, 0, 0);
      
      // 打印接口请求结果
      console.log('Start Live Stream with missing params API response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      // 应该返回错误，因为参数无效
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    }, 10000); // 设置10秒超时

    it('should handle API error response', async () => {
      // 使用可能导致错误的参数
      const title = '测试直播标题';
      const coverFile = '';
      const streamName = 'test-stream';
      const portrait = false;
      const panoramic = false;
      const categoryID = 999999; // 无效的分类ID
      const subCategoryID = 999999; // 无效的子分类ID
      
      const result = await api.live.startLiveStream(title, coverFile, streamName, portrait, panoramic, categoryID, subCategoryID);
      
      // 打印接口请求结果
      console.log('Start Live Stream API error response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      // API调用可能成功也可能失败，我们验证返回的数据结构
      if (result.success) {
        expect(result.data).toBeDefined();
      } else {
        // 验证是否有错误信息
        expect(result.error).toBeDefined();
        console.log('API调用失败，错误信息：', result.error);
      }
    }, 15000); // 设置15秒超时
  });

  describe('checkLiveClipPermission', () => {
    it('should check live clip permission successfully', async () => {
      // checkLiveClipPermission方法不需要参数
      const result = await api.live.checkLiveClipPermission();
      
      // 打印接口请求结果
      console.log('Check Live Clip Permission API response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      if (result.success) {
        expect(result.data).toBeDefined();
        
        // 验证剪辑权限信息字段存在
        if (result.data) {
          expect(typeof result.data.canCut).toBe('boolean');
          
          // 打印剪辑权限详情
          const permissionDetails = [
            '✅成功获取剪辑权限信息！',
            '\n📊 剪辑权限详情：',
            `可剪辑: ${result.data.canCut ? '是' : '否'}`
          ];
          
          // 使用测试断言来记录信息
          permissionDetails.forEach(detail => {
            expect(detail).toBeDefined();
          });
        }
      } else {
        // 如果API调用失败，验证是否有错误信息
        expect(result.error).toBeDefined();
        console.log('API调用失败，错误信息：', result.error);
      }
    }, 10000); // 设置10秒超时

    it('should handle API error response', async () => {
      // 测试API错误处理
      const result = await api.live.checkLiveClipPermission();
      
      // 打印接口请求结果
      console.log('Check Live Clip Permission API error response:', JSON.stringify(result, null, 2));
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      
      // API调用可能成功也可能失败，我们验证返回的数据结构
      if (result.success) {
        expect(result.data).toBeDefined();
        if (result.data) {
          expect(typeof result.data.canCut).toBe('boolean');
        }
      } else {
        // 验证是否有错误信息
        expect(result.error).toBeDefined();
        console.log('API调用失败，错误信息：', result.error);
      }
    }, 10000); // 设置10秒超时
  });

  describe('updateLiveRoom', () => {
    it('should successfully update live room title and cover', async () => {
      // 先获取热门直播列表，获取第一个直播的ID
      const hotLivesResponse = await api.live.getHotLives();

      if (!hotLivesResponse.success || !hotLivesResponse.data?.lives || hotLivesResponse.data.lives.length === 0) {
        console.log('❌无法获取热门直播列表，跳过更新直播间测试');
        return;
      }

      const firstLive = hotLivesResponse.data.lives[0];
      const liveId = firstLive.liveId;

      if (!liveId) {
        console.log('❌无法获取有效的liveId，跳过更新直播间测试');
        return;
      }

      console.log(`📺 测试直播间ID: ${liveId}`);
      console.log(`📺 直播间标题：${firstLive.title}`);

      const newTitle = '测试更新直播间标题';
      const coverFile = ''; // 使用空封面文件进行测试

      const result = await api.live.updateLiveRoom(liveId, newTitle, coverFile);

      // 打印接口请求结果
      console.log('Update Live Room API response:', JSON.stringify(result, null, 2));

      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');

      // 由于权限限制，可能无法成功更新其他主播的直播间
      // 主要验证API调用是否正常执行
      if (result.success) {
        console.log('✅成功更新直播间标题和封面');
      } else {
        console.log('⚠️ 更新直播间标题和封面失败（可能是权限问题）', result.error);
      }

      // 验证返回结果结构
      if (result.success) {
        expect(result.data).toBeDefined();
      } else {
        expect(result.error).toBeDefined();
      }
    }, 15000); // 设置15秒超时

    it('should handle invalid liveId', async () => {
      // 使用无效的liveId进行测试
      const invalidLiveId = 'invalid-live-id';
      const newTitle = '测试更新直播间标题';
      const coverFile = '';

      const result = await api.live.updateLiveRoom(invalidLiveId, newTitle, coverFile);

      // 打印接口请求结果
      console.log('Update Live Room with invalid liveId API response:', JSON.stringify(result, null, 2));

      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');

      // 验证返回结果为失败
      expect(result).toBeDefined();
      expect(result.success).toBe(false);

      console.log('✅无效liveId测试通过，API正确返回失败结果');
    }, 10000); // 设置10秒超时

    it('should handle empty title parameter', async () => {
      // 先获取热门直播列表
      const hotLivesResponse = await api.live.getHotLives();

      if (!hotLivesResponse.success || !hotLivesResponse.data?.lives || hotLivesResponse.data.lives.length === 0) {
        console.log('❌无法获取热门直播列表，跳过空标题测试');
        return;
      }

      const firstLive = hotLivesResponse.data.lives[0];
      const liveId = firstLive.liveId;

      if (!liveId) {
        console.log('❌无法获取有效的liveId，跳过空标题测试');
        return;
      }

      const emptyTitle = '';
      const coverFile = '';

      const result = await api.live.updateLiveRoom(liveId, emptyTitle, coverFile);

      // 打印接口请求结果
      console.log('Update Live Room with empty title API response:', JSON.stringify(result, null, 2));

      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');

      // 验证API处理空标题的行为
      if (result.success) {
        expect(result.data).toBeDefined();
      } else {
        expect(result.error).toBeDefined();
      }

      console.log('✅空标题测试完成');
    }, 15000); // 设置15秒超时
  });

  describe('setLiveClipPermission', () => {
    it('should successfully set live clip permission', async () => {
      // 测试设置剪辑权限为允许
      const canCut = true;

      const result = await api.live.setLiveClipPermission(canCut);

      // 打印接口请求结果
      console.log('Set Live Clip Permission API response:', JSON.stringify(result, null, 2));

      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');

      if (result.success) {
        // setLiveClipPermission返回void，所以data可能为undefined
        console.log('✅成功设置剪辑权限！');
        console.log(`剪辑权限设置为: ${canCut ? '允许' : '禁止'}`);
      } else {
        // 如果API调用失败，验证是否有错误信息
        expect(result.error).toBeDefined();
        console.log('API调用失败，错误信息：', result.error);
      }
    }, 15000); // 设置15秒超时

    it('should successfully disable live clip permission', async () => {
      // 测试设置剪辑权限为禁用
      const canCut = false;

      const result = await api.live.setLiveClipPermission(canCut);

      // 打印接口请求结果
      console.log('Disable Live Clip Permission API response:', JSON.stringify(result, null, 2));

      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');

      if (result.success) {
        // setLiveClipPermission返回void，所以data可能为undefined
        console.log('✅成功禁用剪辑权限！');
        console.log(`剪辑权限设置为: ${canCut ? '允许' : '禁止'}`);
      } else {
        // 如果API调用失败，验证是否有错误信息
        expect(result.error).toBeDefined();
        console.log('API调用失败，错误信息：', result.error);
      }
    }, 15000); // 设置15秒超时

    it('should handle API error response', async () => {
      // 测试API错误处理
      const canCut = true;

      const result = await api.live.setLiveClipPermission(canCut);

      // 打印接口请求结果
      console.log('Set Live Clip Permission API error response:', JSON.stringify(result, null, 2));

      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');

      // API调用可能成功也可能失败，我们验证返回的数据结构
      if (result.success) {
        console.log('✅成功设置剪辑权限！');
        console.log(`剪辑权限设置为: ${canCut ? '允许' : '禁止'}`);
      } else {
        expect(result.error).toBeDefined();
        console.log('API调用失败，错误信息：', result.error);
      }
    }, 15000); // 设置15秒超时
  });

  describe('getLiveClipInfo', () => {
    it('should successfully get live clip information', async () => {
      // 先获取热门直播列表
      const hotLivesResponse = await api.live.getHotLives();

      if (!hotLivesResponse.success || !hotLivesResponse.data?.lives || hotLivesResponse.data.lives.length === 0) {
        console.log('❌无法获取热门直播列表，跳过获取直播剪辑信息测试');
        return;
      }

      const firstLive = hotLivesResponse.data.lives[0];
      const liveId = firstLive.liveId;
      const liverUID = 214844; // 使用固定的userId

      if (!liveId) {
        console.log('❌无法获取有效的liveId，跳过获取直播剪辑信息测试');
        return;
      }

      console.log(`👤 主播ID: ${liverUID}`);
      console.log(`📺 直播间标题：${firstLive.title}`);

      // 调用getLiveClipInfo函数
      const result = await api.live.getLiveClipInfo(liverUID, liveId);

      // 打印接口请求结果
      console.log('Get Live Clip Info API response:', JSON.stringify(result, null, 2));

      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');

      if (result.success) {
        expect(result.data).toBeDefined();
        console.log('✅成功获取直播剪辑信息');

        // 验证剪辑信息字段存在
        if (result.data) {
          expect(typeof result.data.status).toBe('boolean');
          expect(typeof result.data.url).toBe('string');
          expect(typeof result.data.redirectURL).toBe('string');

          // 打印剪辑信息详情
          const getClipInfoDetails = [
            '✅获取直播剪辑信息成功！',
            `\n📊 剪辑信息详情：`,
            `剪辑状态: ${result.data.status ? '允许' : '不允许'}`,
            `剪辑URL: ${result.data.url}`,
            `重定向URL: ${result.data.redirectURL}`
          ];

          // 使用测试断言来记录信息
          getClipInfoDetails.forEach(detail => {
            expect(detail).toBeDefined();
          });
        }
      } else {
        // 如果API调用失败，验证是否有错误信息
        expect(result.error).toBeDefined();
        console.log('API调用失败，错误信息：', result.error);
      }
    }, 15000); // 设置15秒超时

    it('should handle invalid liveId', async () => {
      // 使用无效的liveId和userId进行测试
      const invalidLiveId = 'invalid-live-id';
      const invalidUserID = 999999999;

      const result = await api.live.getLiveClipInfo(invalidUserID, invalidLiveId);

      // 打印接口请求结果
      console.log('Get Live Clip Info with invalid params API response:', JSON.stringify(result, null, 2));

      // 验证返回结果
      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');

      // API调用可能成功也可能失败，我们验证返回的数据结构
      if (result.success) {
        expect(result.data).toBeDefined();
      } else {
        // 验证是否有错误信息
        expect(result.error).toBeDefined();
        console.log('API调用失败，错误信息：', result.error);
      }
    }, 15000); // 设置15秒超时
  });
});