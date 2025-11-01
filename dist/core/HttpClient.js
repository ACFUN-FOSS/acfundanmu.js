"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const axios_1 = __importDefault(require("axios"));
const SignUtils_1 = require("./SignUtils");
class HttpClient {
    constructor(config) {
        this.config = config || {};
        this.client = axios_1.default.create({
            baseURL: this.config.baseUrl,
            timeout: this.config.timeout || 10000,
            headers: this.config.headers || {},
        });
        this.setupInterceptors();
    }
    setupInterceptors() {
        // 请求拦截器
        this.client.interceptors.request.use((config) => {
            // 自动添加认证token
            const authHeader = this.getAuthHeader();
            if (authHeader) {
                config.headers.Authorization = authHeader;
            }
            // 添加默认请求头
            if (!config.headers.Referer) {
                config.headers.Referer = 'https://www.acfun.cn/';
            }
            if (!config.headers['User-Agent']) {
                config.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
        // 响应拦截器
        this.client.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            // TODO: 错误处理和重试逻辑
            return Promise.reject(error);
        });
    }
    getFullUrl(url) {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        return `${this.config.baseUrl || ''}${url}`;
    }
    async get(url, config) {
        try {
            const fullUrl = this.getFullUrl(url);
            const response = await this.client.get(fullUrl, config);
            return {
                success: true,
                data: response.data,
                headers: response.headers,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async post(url, data, config) {
        try {
            const fullUrl = this.getFullUrl(url);
            // 如果需要签名，生成签名并获取更新后的配置
            let finalConfig = config || {};
            let requestData = data;
            if (config?.sign) {
                finalConfig = await this.addSignatureToRequest(fullUrl, data, config);
                // 使用finalConfig中的data（包含签名）
                requestData = finalConfig.data;
            }
            const response = await this.client.post(fullUrl, requestData, finalConfig);
            return {
                success: true,
                data: response.data,
                headers: response.headers,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async put(url, data, config) {
        try {
            const fullUrl = this.getFullUrl(url);
            const response = await this.client.put(fullUrl, data, config);
            return {
                success: true,
                data: response.data,
                headers: response.headers,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async delete(url, config) {
        try {
            const fullUrl = this.getFullUrl(url);
            const response = await this.client.delete(fullUrl, config);
            return {
                success: true,
                data: response.data,
                headers: response.headers,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    handleError(error) {
        // TODO: 实现详细的错误处理逻辑
        return {
            success: false,
            error: error.message || '请求失败',
            code: error.response?.status || 500,
        };
    }
    setHeader(key, value) {
        this.client.defaults.headers.common[key] = value;
    }
    removeHeader(key) {
        delete this.client.defaults.headers.common[key];
    }
    /**
     * 获取认证头
     */
    getAuthHeader() {
        const headers = this.client.defaults.headers.common;
        const authHeader = headers.Authorization;
        // 确保返回的是字符串类型
        if (typeof authHeader === 'string') {
            return authHeader;
        }
        else if (authHeader === null || authHeader === undefined) {
            return null;
        }
        else {
            // 如果是其他类型，转换为字符串
            return String(authHeader);
        }
    }
    /**
     * 解析token字符串
     */
    parseToken(token) {
        try {
            return JSON.parse(token);
        }
        catch (error) {
            throw new Error('token格式无效，无法解析');
        }
    }
    /**
     * 构建请求头
     */
    buildHeaders(tokenInfo) {
        const headers = {
            'Referer': 'https://www.acfun.cn/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        };
        // 添加Cookie
        if (tokenInfo.cookies && tokenInfo.cookies.length > 0) {
            headers['Cookie'] = tokenInfo.cookies.join('; ');
        }
        else {
            // 游客用户需要设置_did cookie
            headers['Cookie'] = `_did=${tokenInfo.deviceID}`;
        }
        return headers;
    }
    /**
     * 从认证头中解析token信息
     */
    parseTokenFromAuthHeader() {
        const authHeader = this.getAuthHeader();
        if (!authHeader) {
            return null;
        }
        // 现在Authorization头直接是JSON字符串，不需要Bearer前缀验证
        const token = authHeader;
        return this.parseToken(token);
    }
    /**
     * 验证token信息是否完整
     */
    validateTokenInfo(tokenInfo) {
        if (!tokenInfo || !tokenInfo.userID || !tokenInfo.serviceToken || !tokenInfo.deviceID) {
            return 'token信息不完整，缺少必要的字段';
        }
        return null;
    }
    /**
     * 获取并验证token信息
     */
    getValidatedTokenInfo() {
        const tokenInfo = this.parseTokenFromAuthHeader();
        if (!tokenInfo) {
            return { tokenInfo: null, error: '缺少认证token，请先调用setAuthToken方法设置token' };
        }
        const validationError = this.validateTokenInfo(tokenInfo);
        if (validationError) {
            return { tokenInfo: null, error: validationError };
        }
        return { tokenInfo, error: null };
    }
    /**
     * 为请求添加签名
     */
    async addSignatureToRequest(url, data, config) {
        try {
            // 获取token信息
            const { tokenInfo, error } = this.getValidatedTokenInfo();
            if (error || !tokenInfo) {
                throw new Error(`无法获取token信息: ${error}`);
            }
            // 检查是否有securityKey
            if (!tokenInfo.securityKey) {
                throw new Error('token信息中缺少securityKey，无法生成签名');
            }
            // 将data转换为URLSearchParams格式，用于生成签名
            let formDataForSign = new URLSearchParams();
            if (typeof data === 'string') {
                formDataForSign = new URLSearchParams(data);
            }
            else if (data instanceof URLSearchParams) {
                formDataForSign = new URLSearchParams(data); // 创建副本，避免修改原数据
            }
            else if (data && typeof data === 'object') {
                Object.entries(data).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && key !== '__clientSign') {
                        formDataForSign.append(key, String(value));
                    }
                });
            }
            // 生成签名 - 使用不包含__clientSign的formData
            const clientSign = SignUtils_1.SignUtils.generateClientSign({
                url,
                formData: formDataForSign,
                securityKey: tokenInfo.securityKey
            });
            // 创建包含签名的最终数据
            let finalData;
            if (typeof data === 'string') {
                // 如果是字符串，解析后添加签名
                const params = new URLSearchParams(data);
                params.append('__clientSign', clientSign);
                finalData = params.toString();
            }
            else if (data instanceof URLSearchParams) {
                // 如果是URLSearchParams，创建副本后添加签名
                finalData = new URLSearchParams(data);
                finalData.append('__clientSign', clientSign);
            }
            else if (data && typeof data === 'object') {
                // 如果是对象，创建新对象并添加签名
                finalData = { ...data, __clientSign: clientSign };
            }
            else {
                // 如果没有数据，创建只包含签名的对象
                finalData = { __clientSign: clientSign };
            }
            // 返回更新后的配置
            return {
                ...config,
                data: finalData
            };
        }
        catch (error) {
            throw new Error(`添加签名失败: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}
exports.HttpClient = HttpClient;
//# sourceMappingURL=HttpClient.js.map