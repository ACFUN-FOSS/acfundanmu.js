"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcFunLiveApi = void 0;
exports.createApi = createApi;
const AcFunLiveApi_1 = require("./AcFunLiveApi");
Object.defineProperty(exports, "AcFunLiveApi", { enumerable: true, get: function () { return AcFunLiveApi_1.AcFunLiveApi; } });
// 默认配置
const defaultApiConfig = {
    baseUrl: 'https://api.kuaishouzt.com',
    timeout: 10000,
    retryCount: 3,
    headers: {
        'User-Agent': 'AcFunLive-HTTP-API/1.0.0',
        'Content-Type': 'application/json'
    }
};
// 导出类型
__exportStar(require("./types"), exports);
// 创建API实例的工厂函数
function createApi(config) {
    const finalConfig = { ...defaultApiConfig, ...config };
    return new AcFunLiveApi_1.AcFunLiveApi(finalConfig);
}
// 默认导出
exports.default = AcFunLiveApi_1.AcFunLiveApi;
//# sourceMappingURL=index.js.map