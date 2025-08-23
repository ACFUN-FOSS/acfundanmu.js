const WebSocket = require('ws');
const net = require('net');
const axios = require('axios');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { EventEmitter } = require('events');

// 常量定义
const APP_ID = 1000;
const CLIENT_VERSION = '1.0.0';
const USER_AGENT = `acfunlive/${CLIENT_VERSION} (Node.js)`;
const API_URL = 'https://api.acfun.cn';
const LIVE_API_URL = 'https://live.acfun.cn';
const WS_URL = 'wss://wsproxy.acfun.cn/ws/live';
const TCP_URL = 'tcp.acfun.cn';
const TCP_PORT = 9000;

// 错误码
const ERR_OK = 0;
const ERR_NOT_LOGIN = -1001;
const ERR_INVALID_PARAM = -1002;
const ERR_NETWORK = -1003;
const ERR_TIMEOUT = -1004;
const ERR_UNKNOWN = -1005;

// 消息类型
const MSG_TYPE_HEARTBEAT = 1;
const MSG_TYPE_LOGIN = 2;
const MSG_TYPE_LOGIN_RESP = 3;
const MSG_TYPE_DANMU = 4;
const MSG_TYPE_GIFT = 5;
const MSG_TYPE_LIKE = 6;
const MSG_TYPE_ENTER_ROOM = 7;
const MSG_TYPE_FOLLOW = 8;
const MSG_TYPE_SHARE = 9;
const MSG_TYPE_ROOM_INFO = 10;
const MSG_TYPE_LIVE_STATUS = 11;
const MSG_TYPE_WARNING = 12;
const MSG_TYPE_ERROR = 13;

/**
 * 弹幕客户端基类
 */
class BaseDanmuClient extends EventEmitter {
  constructor() {
    super();
    this.connected = false;
    this.reconnectDelay = 1000;
    this.maxReconnectDelay = 30000;
    this.reconnecting = false;
    this.clientID = uuidv4();
    this.sessionID = null;
    this.tokenInfo = null;
  }

  connect() {
    throw new Error('Not implemented');
  }

  disconnect() {
    throw new Error('Not implemented');
  }

  send(msg) {
    throw new Error('Not implemented');
  }

  heartbeat() {
    throw new Error('Not implemented');
  }

  handleMessage(msg) {
    throw new Error('Not implemented');
  }

  reconnect() {
    if (this.reconnecting) return;

    this.reconnecting = true;
    setTimeout(() => {
      this.disconnect();
      this.connect();
      this.reconnecting = false;
      this.reconnectDelay = Math.min(this.reconnectDelay * 2, this.maxReconnectDelay);
    }, this.reconnectDelay);
  }
}

/**
 * WebSocket弹幕客户端
 */
class WebSocketDanmuClient extends BaseDanmuClient {
  constructor() {
    super();
    this.ws = null;
    this.heartbeatInterval = null;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(WS_URL);

      this.ws.on('open', () => {
        this.connected = true;
        this.reconnectDelay = 1000;
        this.heartbeatInterval = setInterval(() => this.heartbeat(), 30000);
        resolve();
      });

      this.ws.on('message', (data) => {
        this.handleMessage(JSON.parse(data.toString()));
      });

      this.ws.on('close', () => {
        this.connected = false;
        clearInterval(this.heartbeatInterval);
        this.reconnect();
      });

      this.ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        this.connected = false;
        clearInterval(this.heartbeatInterval);
        this.reconnect();
        reject(error);
      });
    });
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.connected = false;
    clearInterval(this.heartbeatInterval);
  }

  send(msg) {
    if (!this.connected || !this.ws) return false;

    try {
      this.ws.send(JSON.stringify(msg));
      return true;
    } catch (error) {
      console.error('Failed to send message:', error);
      return false;
    }
  }

  heartbeat() {
    this.send({
      type: MSG_TYPE_HEARTBEAT,
      clientID: this.clientID,
      sessionID: this.sessionID,
      timestamp: Date.now()
    });
  }

  handleMessage(msg) {
    switch (msg.type) {
      case MSG_TYPE_HEARTBEAT:
        // 服务器心跳响应
        break;
      case MSG_TYPE_LOGIN_RESP:
        if (msg.result === ERR_OK) {
          this.sessionID = msg.sessionID;
          this.tokenInfo = msg.tokenInfo;
          this.emit('login', msg);
        } else {
          this.emit('error', new Error(`Login failed: ${msg.error}`));
        }
        break;
      case MSG_TYPE_DANMU:
        this.emit('danmu', msg.data);
        break;
      case MSG_TYPE_GIFT:
        this.emit('gift', msg.data);
        break;
      case MSG_TYPE_LIKE:
        this.emit('like', msg.data);
        break;
      case MSG_TYPE_ENTER_ROOM:
        this.emit('enterRoom', msg.data);
        break;
      case MSG_TYPE_FOLLOW:
        this.emit('follow', msg.data);
        break;
      case MSG_TYPE_SHARE:
        this.emit('share', msg.data);
        break;
      case MSG_TYPE_ROOM_INFO:
        this.emit('roomInfo', msg.data);
        break;
      case MSG_TYPE_LIVE_STATUS:
        this.emit('liveStatus', msg.data);
        break;
      case MSG_TYPE_WARNING:
        this.emit('warning', msg.data);
        break;
      case MSG_TYPE_ERROR:
        this.emit('error', new Error(msg.data.error));
        break;
      default:
        this.emit('unknownMessage', msg);
    }
  }
}

/**
 * TCP弹幕客户端
 */
class TCPDanmuClient extends BaseDanmuClient {
  constructor() {
    super();
    this.socket = null;
    this.heartbeatInterval = null;
    this.buffer = Buffer.alloc(0);
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.socket = net.connect({
        host: TCP_URL,
        port: TCP_PORT
      });

      this.socket.on('connect', () => {
        this.connected = true;
        this.reconnectDelay = 1000;
        this.heartbeatInterval = setInterval(() => this.heartbeat(), 30000);
        resolve();
      });

      this.socket.on('data', (data) => {
        this.buffer = Buffer.concat([this.buffer, data]);
        this.parseBuffer();
      });

      this.socket.on('close', () => {
        this.connected = false;
        clearInterval(this.heartbeatInterval);
        this.reconnect();
      });

      this.socket.on('error', (error) => {
        console.error('TCP error:', error);
        this.connected = false;
        clearInterval(this.heartbeatInterval);
        this.reconnect();
        reject(error);
      });
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.destroy();
      this.socket = null;
    }
    this.connected = false;
    clearInterval(this.heartbeatInterval);
    this.buffer = Buffer.alloc(0);
  }

  send(msg) {
    if (!this.connected || !this.socket) return false;

    try {
      const data = JSON.stringify(msg);
      const length = Buffer.byteLength(data);
      const header = Buffer.alloc(4);
      header.writeUInt32BE(length, 0);
      this.socket.write(Buffer.concat([header, Buffer.from(data)]));
      return true;
    } catch (error) {
      console.error('Failed to send message:', error);
      return false;
    }
  }

  heartbeat() {
    this.send({
      type: MSG_TYPE_HEARTBEAT,
      clientID: this.clientID,
      sessionID: this.sessionID,
      timestamp: Date.now()
    });
  }

  parseBuffer() {
    while (this.buffer.length >= 4) {
      const length = this.buffer.readUInt32BE(0);
      if (this.buffer.length < 4 + length) break;

      const data = this.buffer.slice(4, 4 + length);
      this.buffer = this.buffer.slice(4 + length);

      try {
        const msg = JSON.parse(data.toString());
        this.handleMessage(msg);
      } catch (error) {
        console.error('Failed to parse message:', error);
      }
    }
  }

  handleMessage(msg) {
    // 与WebSocket处理逻辑相同
    switch (msg.type) {
      case MSG_TYPE_HEARTBEAT:
        // 服务器心跳响应
        break;
      case MSG_TYPE_LOGIN_RESP:
        if (msg.result === ERR_OK) {
          this.sessionID = msg.sessionID;
          this.tokenInfo = msg.tokenInfo;
          this.emit('login', msg);
        } else {
          this.emit('error', new Error(`Login failed: ${msg.error}`));
        }
        break;
      case MSG_TYPE_DANMU:
        this.emit('danmu', msg.data);
        break;
      case MSG_TYPE_GIFT:
        this.emit('gift', msg.data);
        break;
      case MSG_TYPE_LIKE:
        this.emit('like', msg.data);
        break;
      case MSG_TYPE_ENTER_ROOM:
        this.emit('enterRoom', msg.data);
        break;
      case MSG_TYPE_FOLLOW:
        this.emit('follow', msg.data);
        break;
      case MSG_TYPE_SHARE:
        this.emit('share', msg.data);
        break;
      case MSG_TYPE_ROOM_INFO:
        this.emit('roomInfo', msg.data);
        break;
      case MSG_TYPE_LIVE_STATUS:
        this.emit('liveStatus', msg.data);
        break;
      case MSG_TYPE_WARNING:
        this.emit('warning', msg.data);
        break;
      case MSG_TYPE_ERROR:
        this.emit('error', new Error(msg.data.error));
        break;
      default:
        this.emit('unknownMessage', msg);
    }
  }
}

/**
 * AcFun直播API客户端
 */
class AcFunLive extends EventEmitter {
  constructor(danmuClient, options = {}) {
    super();
    this.danmuClient = danmuClient;
    this.options = options;
    this.userInfo = null;
    this.liveInfo = null;
    this.isLogin = false;
    this.watchingList = new Map();

    // 绑定事件
    this.danmuClient.on('login', this.onLogin.bind(this));
    this.danmuClient.on('danmu', this.onDanmu.bind(this));
    this.danmuClient.on('gift', this.onGift.bind(this));
    this.danmuClient.on('like', this.onLike.bind(this));
    this.danmuClient.on('enterRoom', this.onEnterRoom.bind(this));
    this.danmuClient.on('follow', this.onFollow.bind(this));
    this.danmuClient.on('share', this.onShare.bind(this));
    this.danmuClient.on('roomInfo', this.onRoomInfo.bind(this));
    this.danmuClient.on('liveStatus', this.onLiveStatus.bind(this));
    this.danmuClient.on('error', this.onError.bind(this));

    // 如果提供了token信息，直接登录
    if (options.tokenInfo) {
      this.tokenInfo = options.tokenInfo;
      this.isLogin = true;
    }
  }

  /**
   * 创建AcFunLive实例
   */
  static async create(danmuClient, options = {}) {
    const instance = new AcFunLive(danmuClient, options);
    await instance.danmuClient.connect();
    return instance;
  }

  /**
   * 账号密码登录
   */
  static async login(account, password) {
    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        account,
        password: crypto.createHash('md5').update(password).digest('hex'),
        appId: APP_ID,
        clientVersion: CLIENT_VERSION
      }, {
        headers: {
          'User-Agent': USER_AGENT
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Login failed: ${response.data.error}`);
      }

      return response.data.cookies;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  /**
   * 扫码登录
   */
  static async loginWithQRCode(showQRCode, onScanned) {
    try {
      // 获取二维码
      const response = await axios.post(`${API_URL}/user/login/qrcode`, {
        appId: APP_ID,
        clientVersion: CLIENT_VERSION
      }, {
        headers: {
          'User-Agent': USER_AGENT
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Get QR code failed: ${response.data.error}`);
      }

      const qrCode = response.data.data;
      showQRCode(qrCode);

      // 轮询二维码状态
      const checkStatus = async () => {
        try {
          const statusResponse = await axios.post(`${API_URL}/user/login/qrcode/check`, {
            qrcodeKey: qrCode.qrcodeKey,
            appId: APP_ID
          }, {
            headers: {
              'User-Agent': USER_AGENT
            }
          });

          if (statusResponse.data.result !== ERR_OK) {
            throw new Error(`Check QR code status failed: ${statusResponse.data.error}`);
          }

          const status = statusResponse.data.data.status;
          if (status === 1) {
            // 已扫描
            onScanned();
            return checkStatus();
          } else if (status === 2) {
            // 已确认
            return statusResponse.data.data.cookies;
          } else if (status === 3) {
            // 已过期
            throw new Error('QR code expired');
          } else {
            // 等待扫描
            await new Promise(resolve => setTimeout(resolve, 2000));
            return checkStatus();
          }
        } catch (error) {
          console.error('Check QR code status failed:', error);
          throw error;
        }
      };

      return checkStatus();
    } catch (error) {
      console.error('QR code login failed:', error);
      throw error;
    }
  }

  /**
   * 获取用户ID
   */
  getUserID() {
    return this.userInfo?.userId || 0;
  }

  /**
   * 获取token信息
   */
  getTokenInfo() {
    return this.danmuClient.tokenInfo;
  }

  /**
   * 登录回调
   */
  onLogin(data) {
    this.isLogin = true;
    this.userInfo = data.userInfo;
    this.emit('login', data);
  }

  /**
   * 弹幕回调
   */
  onDanmu(data) {
    this.emit('danmu', data);
  }

  /**
   * 礼物回调
   */
  onGift(data) {
    this.emit('gift', data);
  }

  /**
   * 点赞回调
   */
  onLike(data) {
    this.emit('like', data);
  }

  /**
   * 进入房间回调
   */
  onEnterRoom(data) {
    this.emit('enterRoom', data);
  }

  /**
   * 关注回调
   */
  onFollow(data) {
    this.emit('follow', data);
  }

  /**
   * 分享回调
   */
  onShare(data) {
    this.emit('share', data);
  }

  /**
   * 房间信息回调
   */
  onRoomInfo(data) {
    this.liveInfo = data;
    this.emit('roomInfo', data);
  }

  /**
   * 直播状态回调
   */
  onLiveStatus(data) {
    this.emit('liveStatus', data);
  }

  /**
   * 错误回调
   */
  onError(error) {
    console.error('AcFunLive error:', error);
    this.emit('error', error);
  }

  /**
   * 获取观看列表
   */
  async getWatchingList(liveID) {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.get(`${LIVE_API_URL}/api/live/getWatchingList`, {
        params: {
          liveId: liveID
        },
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Get watching list failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Get watching list failed:', error);
      throw error;
    }
  }

  /**
   * 获取排行榜
   */
  async getBillboard() {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.get(`${LIVE_API_URL}/api/live/getBillboard`, {
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Get billboard failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Get billboard failed:', error);
      throw error;
    }
  }

  /**
   * 获取摘要信息
   */
  async getSummary() {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.get(`${LIVE_API_URL}/api/live/getSummary`, {
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Get summary failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Get summary failed:', error);
      throw error;
    }
  }

  /**
   * 获取幸运列表
   */
  async getLuckList() {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.get(`${LIVE_API_URL}/api/live/getLuckList`, {
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Get luck list failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Get luck list failed:', error);
      throw error;
    }
  }

  /**
   * 获取回放信息
   */
  async getPlayback(liveID) {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.get(`${LIVE_API_URL}/api/live/getPlayback`, {
        params: {
          liveId: liveID
        },
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Get playback failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Get playback failed:', error);
      throw error;
    }
  }

  /**
   * 获取全部礼物列表
   */
  async getAllGiftList() {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.get(`${LIVE_API_URL}/api/live/getAllGiftList`, {
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Get all gift list failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Get all gift list failed:', error);
      throw error;
    }
  }

  /**
   * 获取账户钱包数据
   */
  async getWalletBalance() {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.get(`${API_URL}/wallet/getBalance`, {
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Get wallet balance failed: ${response.data.error}`);
      }

      return [response.data.data.acCoin, response.data.data.banana];
    } catch (error) {
      console.error('Get wallet balance failed:', error);
      throw error;
    }
  }

  /**
   * 获取用户直播信息
   */
  async getUserLiveInfo() {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.get(`${LIVE_API_URL}/api/user/getUserLiveInfo`, {
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Get user live info failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Get user live info failed:', error);
      throw error;
    }
  }

  /**
   * 获取所有直播列表
   */
  async getAllLiveList() {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.get(`${LIVE_API_URL}/api/live/getAllLiveList`, {
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Get all live list failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Get all live list failed:', error);
      throw error;
    }
  }

  /**
   * 获取直播数据
   * @param {number} days - 获取最近几天的直播统计数据
   */
  async getLiveData(days = 7) {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.get(`${LIVE_API_URL}/api/live/getLiveData`, {
        params: {
          days: days
        },
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Get live data failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Get live data failed:', error);
      throw error;
    }
  }

  /**
   * 获取直播间礼物列表
   */
  async getGiftList(liveID) {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.get(`${LIVE_API_URL}/api/live/getGiftList`, {
        params: {
          liveId: liveID
        },
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Get gift list failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Get gift list failed:', error);
      throw error;
    }
  }

  /**
   * 获取用户信息
   * @param {number} [userID] - 可选的用户ID，不提供则获取当前登录用户信息
   */
  async getUserInfo(userID) {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const params = {};
      if (userID) {
        params.userId = userID;
      }

      const response = await axios.get(`${API_URL}/user/getUserInfo`, {
        params,
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Get user info failed: ${response.data.error}`);
      }

      this.userInfo = response.data.data;
      return this.userInfo;
    } catch (error) {
      console.error('Get user info failed:', error);
      throw error;
    }
  }

  /**
   * 生成Cookie字符串
   */
  getCookieString() {
    if (!this.options.cookies) return '';

    return this.options.cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
  }

  /**
   * 销毁实例
   */
  destroy() {
    this.danmuClient.disconnect();
    this.removeAllListeners();
  }

  /**
   * 上传图片
   * @param {string} imagePath - 图片本地路径
   */
  async uploadImage(imagePath) {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      // 注意：这里只是模拟实现，实际上传图片可能需要使用FormData
      const response = await axios.post(`${API_URL}/upload/image`, {
        imageFile: imagePath
      }, {
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString(),
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Upload image failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Upload image failed:', error);
      throw error;
    }
  }

  /**
   * 获取直播预告列表
   */
  async getScheduleList() {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.get(`${LIVE_API_URL}/api/live/getScheduleList`, {
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Get schedule list failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Get schedule list failed:', error);
      throw error;
    }
  }

  /**
   * 获取直播剪辑信息
   * @param {number} liverUID - 主播UID
   * @param {string} liveID - 直播ID
   */
  async getLiveCutInfo(liverUID, liveID) {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.get(`${LIVE_API_URL}/api/live/getLiveCutInfo`, {
        params: {
          liverUID: liverUID,
          liveId: liveID
        },
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Get live cut info failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Get live cut info failed:', error);
      throw error;
    }
  }

  // 房管相关方法
  /**
   * 获取登陆用户的房管列表
   */
  async getManagerList() {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.get(`${LIVE_API_URL}/api/live/getManagerList`, {
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Get manager list failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Get manager list failed:', error);
      throw error;
    }
  }

  /**
   * 添加房管
   * @param {number} userID - 用户ID
   * @param {number} liveID - 直播ID
   */
  async addManager(userID, liveID) {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.post(`${LIVE_API_URL}/api/live/addManager`, {
        userId: userID,
        liveId: liveID
      }, {
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Add manager failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Add manager failed:', error);
      throw error;
    }
  }

  /**
   * 删除房管
   * @param {number} userID - 用户ID
   * @param {number} liveID - 直播ID
   */
  async removeManager(userID, liveID) {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.post(`${LIVE_API_URL}/api/live/removeManager`, {
        userId: userID,
        liveId: liveID
      }, {
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Remove manager failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Remove manager failed:', error);
      throw error;
    }
  }

  /**
   * 获取主播踢人记录
   * @param {number} liveID - 直播ID
   */
  async getKickRecord(liveID) {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.get(`${LIVE_API_URL}/api/live/getKickRecord`, {
        params: {
          liveId: liveID
        },
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Get kick record failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Get kick record failed:', error);
      throw error;
    }
  }

  /**
   * 房管踢人
   * @param {number} userID - 用户ID
   * @param {number} liveID - 直播ID
   * @param {string} reason - 踢人原因
   */
  async managerKickUser(userID, liveID, reason) {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.post(`${LIVE_API_URL}/api/live/managerKickUser`, {
        userId: userID,
        liveId: liveID,
        reason: reason
      }, {
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Manager kick user failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Manager kick user failed:', error);
      throw error;
    }
  }

  /**
   * 主播踢人
   * @param {number} userID - 用户ID
   * @param {number} liveID - 直播ID
   * @param {string} reason - 踢人原因
   */
  async authorKickUser(userID, liveID, reason) {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.post(`${LIVE_API_URL}/api/live/authorKickUser`, {
        userId: userID,
        liveId: liveID,
        reason: reason
      }, {
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Author kick user failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Author kick user failed:', error);
      throw error;
    }
  }

  // 守护徽章相关方法
  /**
   * 获取登陆用户拥有的指定主播守护徽章详细信息
   * @param {number} anchorUID - 主播UID
   */
  async getMedalDetail(anchorUID) {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.get(`${LIVE_API_URL}/api/medal/getMedalDetail`, {
        params: {
          anchorUID: anchorUID
        },
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Get medal detail failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Get medal detail failed:', error);
      throw error;
    }
  }

  /**
   * 获取登陆用户拥有的守护徽章列表
   */
  async getMedalList() {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.get(`${LIVE_API_URL}/api/medal/getMedalList`, {
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Get medal list failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Get medal list failed:', error);
      throw error;
    }
  }

  /**
   * 获取主播守护榜
   * @param {number} anchorUID - 主播UID
   */
  async getMedalRank(anchorUID) {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.get(`${LIVE_API_URL}/api/medal/getMedalRank`, {
        params: {
          anchorUID: anchorUID
        },
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Get medal rank failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Get medal rank failed:', error);
      throw error;
    }
  }

  /**
   * 获取指定用户正在佩戴的守护徽章信息
   * @param {number} userID - 用户ID
   */
  async getUserWearingMedal(userID) {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.get(`${LIVE_API_URL}/api/medal/getUserWearingMedal`, {
        params: {
          userId: userID
        },
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Get user wearing medal failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Get user wearing medal failed:', error);
      throw error;
    }
  }

  /**
   * 佩戴守护徽章
   * @param {number} anchorUID - 主播UID
   */
  async wearMedal(anchorUID) {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.post(`${LIVE_API_URL}/api/medal/wearMedal`, {
        anchorUID: anchorUID
      }, {
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Wear medal failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Wear medal failed:', error);
      throw error;
    }
  }

  /**
   * 取消佩戴守护徽章
   */
  async unwearMedal() {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.post(`${LIVE_API_URL}/api/medal/unwearMedal`, {}, {
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Unwear medal failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Unwear medal failed:', error);
      throw error;
    }
  }

  // 直播管理相关方法
  /**
   * 检测开播权限
   */
  async checkLiveAuth() {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.get(`${LIVE_API_URL}/api/live/checkLiveAuth`, {
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Check live auth failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Check live auth failed:', error);
      throw error;
    }
  }

  /**
   * 获取直播分类列表
   */
  async getLiveCategoryList() {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.get(`${LIVE_API_URL}/api/live/getLiveCategoryList`, {
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Get live category list failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Get live category list failed:', error);
      throw error;
    }
  }

  /**
   * 获取推流设置
   */
  async getStreamConfig() {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.get(`${LIVE_API_URL}/api/live/getStreamConfig`, {
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Get stream config failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Get stream config failed:', error);
      throw error;
    }
  }

  /**
   * 获取直播状态
   */
  async getLiveStatus() {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.get(`${LIVE_API_URL}/api/live/getLiveStatus`, {
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Get live status failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Get live status failed:', error);
      throw error;
    }
  }

  /**
   * 获取转码信息
   */
  async getTranscodeInfo() {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.get(`${LIVE_API_URL}/api/live/getTranscodeInfo`, {
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Get transcode info failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Get transcode info failed:', error);
      throw error;
    }
  }

  /**
   * 开始直播
   * @param {number} categoryID - 分类ID
   * @param {string} title - 直播间标题
   * @param {string} coverUrl - 封面URL
   */
  async startLive(categoryID, title, coverUrl) {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.post(`${LIVE_API_URL}/api/live/startLive`, {
        categoryId: categoryID,
        title: title,
        coverUrl: coverUrl
      }, {
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Start live failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Start live failed:', error);
      throw error;
    }
  }

  /**
   * 停止直播
   */
  async stopLive() {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.post(`${LIVE_API_URL}/api/live/stopLive`, {}, {
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Stop live failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Stop live failed:', error);
      throw error;
    }
  }

  /**
   * 更改直播间标题和封面
   * @param {string} title - 直播间标题
   * @param {string} coverUrl - 封面URL
   */
  async updateLiveInfo(title, coverUrl) {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.post(`${LIVE_API_URL}/api/live/updateLiveInfo`, {
        title: title,
        coverUrl: coverUrl
      }, {
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Update live info failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Update live info failed:', error);
      throw error;
    }
  }

  /**
   * 查询是否允许观众剪辑直播录像
   * @param {number} liveID - 直播ID
   */
  async checkCanCut(liveID) {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.get(`${LIVE_API_URL}/api/live/checkCanCut`, {
        params: {
          liveId: liveID
        },
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Check can cut failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Check can cut failed:', error);
      throw error;
    }
  }

  /**
   * 设置是否允许观众剪辑直播录像
   * @param {number} liveID - 直播ID
   * @param {boolean} canCut - 是否允许剪辑
   */
  async setCanCut(liveID, canCut) {
    if (!this.isLogin) {
      throw new Error('Not login');
    }

    try {
      const response = await axios.post(`${LIVE_API_URL}/api/live/setCanCut`, {
        liveId: liveID,
        canCut: canCut
      }, {
        headers: {
          'User-Agent': USER_AGENT,
          'Cookie': this.getCookieString()
        }
      });

      if (response.data.result !== ERR_OK) {
        throw new Error(`Set can cut failed: ${response.data.error}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Set can cut failed:', error);
      throw error;
    }
  }
}

// 导出
module.exports = {
  AcFunLive,
  WebSocketDanmuClient,
  TCPDanmuClient,
  ERR_OK,
  ERR_NOT_LOGIN,
  ERR_INVALID_PARAM,
  ERR_NETWORK,
  ERR_TIMEOUT,
  ERR_UNKNOWN,
  MSG_TYPE_HEARTBEAT,
  MSG_TYPE_LOGIN,
  MSG_TYPE_LOGIN_RESP,
  MSG_TYPE_DANMU,
  MSG_TYPE_GIFT,
  MSG_TYPE_LIKE,
  MSG_TYPE_ENTER_ROOM,
  MSG_TYPE_FOLLOW,
  MSG_TYPE_SHARE,
  MSG_TYPE_ROOM_INFO,
  MSG_TYPE_LIVE_STATUS
};