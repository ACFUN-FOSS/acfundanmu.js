const http = require('http');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const winston = require('winston');
const fastJsonStringify = require('fast-json-stringify');
const express = require('express');
const cors = require('cors');

// 加载环境变量
dotenv.config();

// 导入全局常量和变量
const {
  heartbeatType,
  loginType,
  setClientIDType,
  requestForwardDataType,
  forwardDataType,
  setTokenType,
  QRCodeLoginType,
  QRCodeScannedType,
  QRCodeLoginCancelType,
  QRCodeLoginSuccessType,
  getDanmuType,
  stopDanmuType,
  jsonParseErr,
  invalidReqType,
  invalidReqData,
  reqHandleErr,
  needLogin,
  timeout,
  idleTimeout
} = require('./global');

// 导入弹幕处理模块
const { getDanmu, stopDanmu } = require('./danmu');

// 导入命令处理模块
const {
  handleCommand,
  handleLogin,
  handleLoginWithQRCode,
  handleSetToken
} = require('./cmd');

// 导入AcFun弹幕客户端
const { AcFunLive, TCPDanmuClient, WebSocketDanmuClient } = require('./acfundanmu');

// 配置日志
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'acfunlive-backend' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({
      filename: path.join(__dirname, 'logs', 'error.log'),
      level: 'error'
    }),
    new winston.transports.File({
      filename: path.join(__dirname, 'logs', 'combined.log')
    })
  ]
});

// 创建Express应用
const app = express();
app.use(cors());
app.use(express.json());

// 命令行参数处理
const args = process.argv.slice(2);
let port = process.env.PORT || 15368;
let isDebug = process.env.DEBUG === 'true' || false;
let isTCP = process.env.CONNECTION_MODE === 'tcp' || false;
let isLogAll = false;

for (const arg of args) {
  if (arg.startsWith('--port=')) {
    const parsedPort = parseInt(arg.split('=')[1]);
    if (parsedPort > 1023 && parsedPort < 65536) {
      port = parsedPort;
    }
  } else if (arg === '--debug') {
    isDebug = true;
  } else if (arg === '--tcp') {
    isTCP = true;
  } else if (arg === '--logall') {
    isLogAll = true;
    isDebug = true;
  }
}

// 服务器间通讯的channel
const serverCh = {
  subscribers: new Set(),
  subscribe: function(callback) {
    this.subscribers.add(callback);
    return () => this.unsubscribe(callback);
  },
  unsubscribe: function(callback) {
    this.subscribers.delete(callback);
  },
  broadcast: function(message) {
    for (const subscriber of this.subscribers) {
      try {
        subscriber(message);
      } catch (error) {
        logger.error('Error broadcasting message:', error);
      }
    }
  }
};

// 连接管理器
const connectionManager = {
  connections: new Map(),
  createConnection: function(clientID) {
    const conn = {
      clientID: clientID || '',
      acMap: new Map(), // Map<number, acLive>
      debug: function(format, ...args) {
        if (isDebug) {
          logger.info(`[${this.clientID}] ${format}`, ...args);
        }
      },
      debugAll: function(format, ...args) {
        if (isDebug && isLogAll) {
          logger.info(`[${this.clientID}] ${format}`, ...args);
        }
      },
      eventSources: new Map() // Map<number, EventSource>
    };
    this.connections.set(clientID, conn);
    return conn;
  },
  getConnection: function(clientID) {
    if (!this.connections.has(clientID)) {
      return this.createConnection(clientID);
    }
    return this.connections.get(clientID);
  },
  removeConnection: function(clientID) {
    const conn = this.connections.get(clientID);
    if (conn) {
      // 清理资源
      for (const [uid, ac] of conn.acMap.entries()) {
        if (ac.cancel) {
          ac.cancel();
        }
      }
      conn.acMap.clear();
      conn.eventSources.clear();
      this.connections.delete(clientID);
    }
  }
};

// 登录路由
app.post('/api/login', async (req, res) => {
  try {
    const { account, password } = req.body;
    const clientID = req.headers['x-client-id'] || 'anonymous';
    const conn = connectionManager.getConnection(clientID);
    const reqID = req.headers['x-request-id'] || '';

    await handleLogin(conn, account, password, reqID);

    // 构建响应
    const tokenInfo = conn.acMap.get(0)?.ac.getTokenInfo() || {};
    res.json({
      type: loginType,
      requestID: reqID,
      result: 1,
      data: { tokenInfo }
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({
      type: loginType,
      requestID: req.headers['x-request-id'] || '',
      result: reqHandleErr,
      error: error.message
    });
  }
});

// 扫码登录路由
app.post('/api/login/qrcode', async (req, res) => {
  try {
    const clientID = req.headers['x-client-id'] || 'anonymous';
    const conn = connectionManager.getConnection(clientID);
    const reqID = req.headers['x-request-id'] || '';

    // 创建一个二维码登录会话
    const qrCodePromise = new Promise((resolve, reject) => {
      // 显示二维码
      const showQRCode = (qrCode) => {
        res.json({
          type: QRCodeLoginType,
          requestID: reqID,
          result: 1,
          data: qrCode
        });
      };

      // 二维码已扫描
      const onScanned = () => {
        // 通过另一个请求通知客户端
      };

      // 执行扫码登录
      handleLoginWithQRCode(conn, reqID)
        .then(() => resolve())
        .catch(reject);
    });

    await qrCodePromise;
  } catch (error) {
    logger.error('QR Code login error:', error);
    res.status(500).json({
      type: QRCodeLoginType,
      requestID: req.headers['x-request-id'] || '',
      result: reqHandleErr,
      error: error.message
    });
  }
});

// 设置Token路由
app.post('/api/token', async (req, res) => {
  try {
    const token = req.body;
    const clientID = req.headers['x-client-id'] || 'anonymous';
    const conn = connectionManager.getConnection(clientID);
    const reqID = req.headers['x-request-id'] || '';

    await handleSetToken(conn, token, reqID);

    res.json({
      type: setTokenType,
      requestID: reqID,
      result: 1
    });
  } catch (error) {
    logger.error('Set token error:', error);
    res.status(500).json({
      type: setTokenType,
      requestID: req.headers['x-request-id'] || '',
      result: reqHandleErr,
      error: error.message
    });
  }
});

// 获取弹幕路由 - 建立EventSource连接
app.get('/api/danmu/:uid', (req, res) => {
  try {
    const uid = parseInt(req.params.uid);
    if (isNaN(uid) || uid <= 0) {
      res.status(400).json({
        type: getDanmuType,
        requestID: req.headers['x-request-id'] || '',
        result: invalidReqData,
        error: 'liverUID not exist or less than 1'
      });
      return;
    }

    const clientID = req.headers['x-client-id'] || 'anonymous';
    const conn = connectionManager.getConnection(clientID);
    const reqID = req.headers['x-request-id'] || '';

    // 设置响应头，建立EventSource连接
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    // 存储EventSource连接
    conn.eventSources.set(uid, res);

    // 处理连接关闭
    req.on('close', () => {
      conn.eventSources.delete(uid);
      stopDanmu(conn, uid, reqID);
    });

    // 启动弹幕
    getDanmu(conn, uid, reqID);
  } catch (error) {
    logger.error('Get danmu error:', error);
    res.status(500).json({
      type: getDanmuType,
      requestID: req.headers['x-request-id'] || '',
      result: reqHandleErr,
      error: error.message
    });
  }
});

// 停止弹幕路由
app.delete('/api/danmu/:uid', async (req, res) => {
  try {
    const uid = parseInt(req.params.uid);
    if (isNaN(uid) || uid <= 0) {
      res.status(400).json({
        type: stopDanmuType,
        requestID: req.headers['x-request-id'] || '',
        result: invalidReqData,
        error: 'liverUID not exist or less than 1'
      });
      return;
    }

    const clientID = req.headers['x-client-id'] || 'anonymous';
    const conn = connectionManager.getConnection(clientID);
    const reqID = req.headers['x-request-id'] || '';

    await stopDanmu(conn, uid, reqID);

    // 关闭对应的EventSource连接
    if (conn.eventSources.has(uid)) {
      conn.eventSources.get(uid).end();
      conn.eventSources.delete(uid);
    }

    res.json({
      type: stopDanmuType,
      requestID: reqID,
      result: 1,
      data: { liverUID: uid }
    });
  } catch (error) {
    logger.error('Stop danmu error:', error);
    res.status(500).json({
      type: stopDanmuType,
      requestID: req.headers['x-request-id'] || '',
      result: reqHandleErr,
      error: error.message
    });
  }
});

// 通用命令处理路由
app.post('/api/command/:type', async (req, res) => {
  try {
    const reqType = parseInt(req.params.type);
    const clientID = req.headers['x-client-id'] || 'anonymous';
    const conn = connectionManager.getConnection(clientID);
    const reqID = req.headers['x-request-id'] || '';
    const msg = req.body;

    // 检查是否需要登录
    const ac = conn.acMap.get(0);
    if (!ac && reqType !== loginType && reqType !== setTokenType) {
      res.status(401).json({
        type: reqType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login or token'
      });
      return;
    }

    // 处理命令
    await handleCommand(conn, msg, reqType, reqID);

    // 注意：实际命令处理函数应直接发送响应，这里是示例结构
    res.json({
      type: reqType,
      requestID: reqID,
      result: 1,
      data: { message: 'Command processed' }
    });
  } catch (error) {
    logger.error('Command error:', error);
    res.status(500).json({
      type: parseInt(req.params.type) || 0,
      requestID: req.headers['x-request-id'] || '',
      result: reqHandleErr,
      error: error.message
    });
  }
});

// 健康检查路由
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// 创建HTTP服务器
const server = http.createServer(app);

// 启动服务器
server.listen(port, () => {
  logger.info(`HTTP server is running on port ${port}`);
});

// 处理退出信号
process.on('SIGINT', () => {
  logger.info('Received SIGINT, shutting down...');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  logger.info('Received SIGTERM, shutting down...');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

// 弹幕客户端工厂函数
function danmuClient() {
  if (isTCP) {
    return new TCPDanmuClient();
  } else {
    return new WebSocketDanmuClient();
  }
}

module.exports = { danmuClient };