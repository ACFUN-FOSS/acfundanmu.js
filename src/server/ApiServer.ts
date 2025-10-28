import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { AcFunLiveApi } from '../AcFunLiveApi';
import { ServerConfig } from '../types';

export class ApiServer {
  private app: express.Application;
  private api: AcFunLiveApi;
  private config: ServerConfig;

  constructor(config: ServerConfig, api: AcFunLiveApi) {
    this.config = config;
    this.api = api;
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    // 安全中间件
    this.app.use(helmet());
    
    // CORS配置
    this.app.use(cors({
      origin: this.config.corsOrigin,
      credentials: true,
    }));
    
    // 压缩中间件
    this.app.use(compression());
    
    // 日志中间件
    this.app.use(morgan('combined'));
    
    // JSON解析
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true }));
    
    // 认证中间件
    this.app.use(this.authMiddleware.bind(this));
  }

  private authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction): void {
    // TODO: 实现认证中间件
    // 检查请求头中的认证令牌
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token) {
      this.api.setAuthToken(token);
    }
    next();
  }

  private setupRoutes(): void {
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

  private setupAuthRoutes(): void {
    const router = express.Router();

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

  private setupDanmuRoutes(): void {
    const router = express.Router();

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

  private setupLiveRoutes(): void {
    const router = express.Router();

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

    this.app.use('/api', router);
  }

  private setupUserRoutes(): void {
    const router = express.Router();

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
      } catch (error) {
        res.status(500).json({
          success: false,
          error: `服务器内部错误: ${error instanceof Error ? error.message : String(error)}`
        });
      }
    });

    this.app.use('/api', router);
  }

  private errorHandler(err: any, req: express.Request, res: express.Response, next: express.NextFunction): void {
    console.error('API Error:', err);
    res.status(500).json({
      success: false,
      error: '服务器内部错误',
      code: 500
    });
  }

  public start(): void {
    this.app.listen(this.config.port, this.config.host, () => {
      console.log(`AcFunLive API Server 运行在 http://${this.config.host}:${this.config.port}`);
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}