import { AcFunLiveApi } from '../src/index';
import * as fs from 'fs';
import * as path from 'path';

describe('LivePreviewService', () => {
  let api: AcFunLiveApi;
  let token: string;

  beforeAll(() => {
    // 创建AcFunLiveApi实例
    api = new AcFunLiveApi();

    // 读取token文件
    const tokenPath = path.join(__dirname, 'token.json');
    if (!fs.existsSync(tokenPath)) {
      throw new Error('token.json文件不存在，请先运行二维码登录测试生成token');
    }

    const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
    token = tokenData.token;

    if (!token) {
      throw new Error('token.json文件中没有有效的token');
    }

    // 设置全局token
    api.setAuthToken(token);
  });

  describe('getLivePreviewList', () => {
    it('should successfully get live preview list', async () => {
      const result = await api.livePreview.getLivePreviewList();
      
      console.log('请求参数:', {});
      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.data || result.error);
      
      // 验证返回结果
      expect(result).toBeDefined();
      
      // 如果失败，打印错误信息
      if (!result.success) {
        console.log('API调用失败，错误信息：', result.error);
      }
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      
      // 验证直播预告列表字段存在
      if (result.data) {
        expect(result.data.previewList).toBeDefined();
        expect(Array.isArray(result.data.previewList)).toBe(true);
        
        // 如果列表不为空，验证预告信息字段
        if (result.data.previewList.length > 0) {
          const preview = result.data.previewList[0];
          expect(preview.userId).toBeDefined();
          expect(preview.userName).toBeDefined();
          expect(preview.liveTitle).toBeDefined();
          expect(preview.liveCover).toBeDefined();
          expect(preview.scheduledTime).toBeDefined();
        }
        
        const previewDetails = [
          '✅获取直播预告列表成功！',
          `\n📊 直播预告列表详情：`,
          `预告数量: ${result.data.previewList.length}`
        ];
        
        // 如果列表不为空，添加第一个预告的详细信息
        if (result.data.previewList.length > 0) {
          const firstPreview = result.data.previewList[0];
          previewDetails.push(
            `\n📺 第一个直播预告信息：`,
            `用户ID: ${firstPreview.userId}`,
            `用户名: ${firstPreview.userName}`,
            `直播标题: ${firstPreview.liveTitle}`,
            `直播封面: ${firstPreview.liveCover}`,
            `预定时间: ${firstPreview.scheduledTime}`
          );
        }
        
        // 使用测试报告记录预告信息
        previewDetails.forEach(detail => {
          expect(detail).toBeDefined();
        });
      }
    }, 15000); // 设置15秒超时

    it.skip('should handle API error response', async () => {
      // 创建一个新的API实例，不设置token来模拟错误
      const newApi = new AcFunLiveApi();
      
      const result = await newApi.livePreview.getLivePreviewList();
      
      console.log('请求参数:', {});
      console.log('响应状态:', result.success ? 200 : 500);
      console.log('返回数据:', result.data || result.error);
      
      // 验证返回结果为失败
      expect(result).toBeDefined();
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    }, 10000); // 设置10秒超时
  });
});