"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
class ApiServer {
    constructor(config, api) {
        this.config = config;
        this.api = api;
        this.app = (0, express_1.default)();
        this.setupMiddleware();
        this.setupRoutes();
    }
    setupMiddleware() {
        // 安全中间件
        this.app.use((0, helmet_1.default)());
        // CORS配置
        this.app.use((0, cors_1.default)({
            origin: this.config.corsOrigin,
            credentials: true,
        }));
        // 压缩中间件
        this.app.use((0, compression_1.default)());
        // 日志中间件
        this.app.use((0, morgan_1.default)('combined'));
        // JSON解析
        this.app.use(express_1.default.json({ limit: '10mb' }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        // 认证中间件
        this.app.use(this.authMiddleware.bind(this));
    }
    authMiddleware(req, res, next) {
        // TODO: 实现认证中间件
        // 检查请求头中的认证令牌
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (token) {
            this.api.setAuthToken(token);
        }
        next();
    }
    setupRoutes() {
        // 健康检查
        this.app.get('/health', (req, res) => {
            res.json({ status: 'ok', timestamp: Date.now() });
        });
        // 认证相关路由
        this.setupAuthRoutes();
        // 弹幕相关路由
        this.setupDanmuRoutes();
        // 直播相关路由
        this.setupLiveRoutes();
        // 用户相关路由
        this.setupUserRoutes();
        // 404处理
        this.app.use('*', (req, res) => {
            res.status(404).json({ error: '接口不存在' });
        });
        // 错误处理中间件
        this.app.use(this.errorHandler.bind(this));
    }
    setupAuthRoutes() {
        const router = express_1.default.Router();
        // 用户登录
        router.post('/auth/login', async (req, res) => {
            // TODO: 实现登录接口
            res.json({ success: false, error: '未实现' });
        });
        // 二维码登录
        router.get('/auth/qr-login', async (req, res) => {
            // TODO: 实现二维码登录接口
            res.json({ success: false, error: '未实现' });
        });
        // 登出
        router.post('/auth/logout', async (req, res) => {
            // TODO: 实现登出接口
            res.json({ success: false, error: '未实现' });
        });
        this.app.use('/api', router);
    }
    setupDanmuRoutes() {
        const router = express_1.default.Router();
        // 获取直播间信息
        router.get('/danmu/room/:liverUID', async (req, res) => {
            // TODO: 实现获取直播间信息接口
            res.json({ success: false, error: '未实现' });
        });
        // 开始获取弹幕
        router.post('/danmu/start/:liverUID', async (req, res) => {
            // TODO: 实现开始弹幕接口
            res.json({ success: false, error: '未实现' });
        });
        // 停止获取弹幕
        router.post('/danmu/stop/:sessionId', async (req, res) => {
            // TODO: 实现停止弹幕接口
            res.json({ success: false, error: '未实现' });
        });
        // 获取弹幕事件
        router.get('/danmu/events/:sessionId', async (req, res) => {
            // TODO: 实现获取弹幕事件接口
            res.json({ success: false, error: '未实现' });
        });
        this.app.use('/api', router);
    }
    setupLiveRoutes() {
        const router = express_1.default.Router();
        // 开始直播
        router.post('/live/start', async (req, res) => {
            // TODO: 实现开始直播接口
            res.json({ success: false, error: '未实现' });
        });
        // 停止直播
        router.post('/live/stop/:liveId', async (req, res) => {
            // TODO: 实现停止直播接口
            res.json({ success: false, error: '未实现' });
        });
        // 获取直播状态
        router.get('/live/status/:liveId', async (req, res) => {
            // TODO: 实现获取直播状态接口
            res.json({ success: false, error: '未实现' });
        });
        // 获取热门直播
        router.get('/live/hot', async (req, res) => {
            // TODO: 实现获取热门直播接口
            res.json({ success: false, error: '未实现' });
        });
        router.get('/live/watching-list/:liveId', async (req, res) => {
            const { liveId } = req.params;
            try {
                const result = await this.api.live.getWatchingList(liveId);
                res.json(result);
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: `服务器内部错误: ${error instanceof Error ? error.message : String(error)}`
                });
            }
        });
        this.app.use('/api', router);
    }
    setupUserRoutes() {
        const router = express_1.default.Router();
        // 获取用户信息
        router.get('/user/info/:userId', async (req, res) => {
            // TODO: 实现获取用户信息接口
            res.json({ success: false, error: '未实现' });
        });
        // 获取粉丝列表
        router.get('/user/fans/:userId', async (req, res) => {
            // TODO: 实现获取粉丝列表接口
            res.json({ success: false, error: '未实现' });
        });
        // 获取关注列表
        router.get('/user/follows/:userId', async (req, res) => {
            // TODO: 实现获取关注列表接口
            res.json({ success: false, error: '未实现' });
        });
        // 获取用户钱包信息
        router.get('/user/wallet', async (req, res) => {
            try {
                const result = await this.api.user.getWalletInfo();
                res.json(result);
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: `服务器内部错误: ${error instanceof Error ? error.message : String(error)}`
                });
            }
        });
        this.app.use('/api', router);
    }
    errorHandler(err, req, res, next) {
        console.error('API Error:', err);
        res.status(500).json({
            success: false,
            error: '服务器内部错误',
            code: 500
        });
    }
    start() {
        this.app.listen(this.config.port, this.config.host, () => {
            console.log(`AcFunLive API Server 运行在 http://${this.config.host}:${this.config.port}`);
        });
    }
    getApp() {
        return this.app;
    }
}
exports.ApiServer = ApiServer;
//# sourceMappingURL=ApiServer.js.map