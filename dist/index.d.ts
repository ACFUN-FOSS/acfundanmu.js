import { AcFunLiveApi } from './AcFunLiveApi';
import { ApiServer } from './server/ApiServer';
import { ApiConfig, ServerConfig } from './types';
export { AcFunLiveApi, ApiServer };
export * from './types';
export declare function createApi(config?: Partial<ApiConfig>): AcFunLiveApi;
export declare function createServer(apiConfig?: Partial<ApiConfig>, serverConfig?: Partial<ServerConfig>): ApiServer;
export default AcFunLiveApi;
