import { AcFunLiveApi } from '../src/index';
import * as fs from 'fs';
import * as path from 'path';

describe('GiftService', () => {
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

  describe('getAllGiftList', () => {
    // 使用only方法限定只执行当前测试用?    it.only('should successfully get all gift list', async () => {
      // 调用getAllGiftList接口
      const result = await api.gift.getAllGiftList();
      
      // 打印请求参数和响应结?      console.log('请求参数:', {});
      console.log('响应状?', result.success ? 'success' : 'failed');
      console.log('返回数据:', result.data);
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      
      // 验证礼物列表字段
      if (result.data) {
        expect(Array.isArray(result.data)).toBe(true);
        
        // 如果有礼物数据，验证第一个礼物的字段
        if (result.data.length > 0) {
          const firstGift = result.data[0];
          expect(typeof firstGift.giftID).toBe('number');
          expect(typeof firstGift.giftName).toBe('string');
          expect(typeof firstGift.price).toBe('number');
          expect(Array.isArray(firstGift.allowBatchSendSizeList)).toBe(true);
        }
      }
    });

    // 异常情况测试：未登录状?    it('should fail when not authenticated', async () => {
      // 创建一个新的API实例，不设置token
      const unauthApi = new AcFunLiveApi();
      
      const result = await unauthApi.gift.getAllGiftList();
      
      // 打印请求参数和响应结?      console.log('请求参数:', {});
      console.log('响应状?', result.success ? 'success' : 'failed');
      console.log('返回数据:', result.error);
      
      // 验证返回结果
      expect(result).toBeDefined();
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });
});

