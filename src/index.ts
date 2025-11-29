import { AcFunLiveApi } from './AcFunLiveApi';
import { ApiConfig } from './types';

// 默认配置
const defaultApiConfig: ApiConfig = {
  baseUrl: 'https://api.kuaishouzt.com',
  timeout: 10000,
  retryCount: 3,
  headers: {
    'User-Agent': 'AcFunLive-HTTP-API/1.0.0',
    'Content-Type': 'application/json'
  }
};


// 导出主要类
export { AcFunLiveApi };

// 导出类型
export * from './types';

// 创建API实例的工厂函数
export function createApi(config?: Partial<ApiConfig>): AcFunLiveApi {
  const finalConfig = { ...defaultApiConfig, ...config };
  return new AcFunLiveApi(finalConfig);
}


// 默认导出
export default AcFunLiveApi;
