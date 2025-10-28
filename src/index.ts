import { AcFunLiveApi } from './AcFunLiveApi';
import { ApiServer } from './server/ApiServer';
import { ApiConfig, ServerConfig } from './types';

// 默认配置
const defaultApiConfig: ApiConfig = {
  timeout: 10000,
  retryCount: 3,
  headers: {
    'User-Agent': 'AcFunLive-HTTP-API/1.0.0',
    'Content-Type': 'application/json'
  }
};

const defaultServerConfig: ServerConfig = {
  port: 3000,
  host: 'localhost',
  corsOrigin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15分钟
    max: 100 // 限制每个IP每15分钟最多100个请求
  }
};

// 导出主要类
export { AcFunLiveApi, ApiServer };

// 导出类型
export * from './types';

// 创建API实例的工厂函数
export function createApi(config?: Partial<ApiConfig>): AcFunLiveApi {
  const finalConfig = { ...defaultApiConfig, ...config };
  return new AcFunLiveApi();
}

// 创建服务器实例的工厂函数
export function createServer(apiConfig?: Partial<ApiConfig>, serverConfig?: Partial<ServerConfig>): ApiServer {
  const finalApiConfig = { ...defaultApiConfig, ...apiConfig };
  const finalServerConfig = { ...defaultServerConfig, ...serverConfig };
  
  const api = new AcFunLiveApi();
  return new ApiServer(finalServerConfig, api);
}

// 默认导出
export default AcFunLiveApi;