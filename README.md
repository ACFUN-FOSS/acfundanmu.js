# ACFUN直播后端 Node.js 实现

这是ACFUN直播后端的Node.js实现版本，基于原Go代码转换而来。

## 项目结构

```
.\
├── main.js          # 程序入口
├── global.js        # 全局常量和类型定义
├── danmu.js         # 弹幕处理模块
├── cmd.js           # 命令处理模块
├── acfundanmu.js    # 核心功能模块，替代github.com/orzogc/acfundanmu包
├── package.json     # 项目依赖
├── .env             # 环境变量配置
├── .gitignore       # Git忽略文件
├── logs/            # 日志目录
└── README.md        # 项目说明
```

## 功能说明

本项目实现了以下功能：

1. HTTP服务器，用于客户端连接和API调用
2. 弹幕获取和处理（通过EventSource实现）
3. 多种命令处理（登录、获取礼物列表、获取用户信息等）
4. 直播统计数据获取（支持指定天数）
5. 指定用户信息获取
6. 上传图片功能
7. 直播预告列表获取
8. 直播剪辑信息获取
9. 日志记录和错误处理
10. 优雅关闭和信号处理

## 环境依赖

- Node.js 14+
- npm 6+

## 安装和运行

1. 安装依赖
```bash
npm install
```

2. 配置环境变量
编辑.env文件，设置所需的配置参数

3. 运行项目
```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

## 配置说明

.env文件包含以下配置项：

- `PORT`: 服务器端口，默认8080
- `DEBUG`: 是否启用调试模式，默认true
- `CONN_MODE`: 连接模式 (ws/tcp)，默认ws
- `LOG_FILE`: 日志文件路径，默认./logs/server.log
- `PANIC_FILE`: 异常日志文件路径，默认./logs/panic.log
- `API_TIMEOUT`: API超时设置，默认5000毫秒
- `HEARTBEAT_INTERVAL`: 心跳间隔，默认30000毫秒
- `RECONNECT_DELAY`: 重连延迟，默认1000毫秒
- `MAX_RECONNECT_DELAY`: 最大重连延迟，默认30000毫秒
- `DEFAULT_ANCHOR_UID`: 默认主播UID，默认0

## API接口说明

### 基础信息

- 基础URL: `http://localhost:<PORT>/api`
- 所有请求需设置`Content-Type: application/json`
- 所有响应格式为JSON

### 房管相关接口

#### 获取房管列表
**URL**: `/manager/list`
**方法**: `GET`
**参数**: 
- `liverUID`: 主播UID
- `reqID`: 请求ID (可选，默认自动生成)
**返回值**: 
```json
{
  "type": 200,
  "requestID": "string",
  "result": 0,
  "data": {
    "managers": [{
      "userID": number,
      "nickname": "string",
      "avatar": "string",
      "role": number
    }]
  },
  "error": "string"
}
```

#### 添加房管
**URL**: `/manager/add`
**方法**: `POST`
**入参**: 
```json
{
  "liverUID": number,
  "userID": number
}
```
**返回值**: 
```json
{
  "type": 201,
  "requestID": "string",
  "result": 0,
  "data": {},
  "error": "string"
}
```

#### 移除房管
**URL**: `/manager/remove`
**方法**: `POST`
**入参**: 
```json
{
  "liverUID": number,
  "userID": number
}
```
**返回值**: 
```json
{
  "type": 202,
  "requestID": "string",
  "result": 0,
  "data": {},
  "error": "string"
}
```

#### 禁言用户
**URL**: `/manager/mute`
**方法**: `POST`
**入参**: 
```json
{
  "liverUID": number,
  "userID": number,
  "duration": number // 禁言时长(秒)
}
```
**返回值**: 
```json
{
  "type": 203,
  "requestID": "string",
  "result": 0,
  "data": {},
  "error": "string"
}
```

#### 解除禁言
**URL**: `/manager/unmute`
**方法**: `POST`
**入参**: 
```json
{
  "liverUID": number,
  "userID": number
}
```
**返回值**: 
```json
{
  "type": 204,
  "requestID": "string",
  "result": 0,
  "data": {},
  "error": "string"
}
```

#### 踢出直播间
**URL**: `/manager/kick`
**方法**: `POST`
**入参**: 
```json
{
  "liverUID": number,
  "userID": number
}
```
**返回值**: 
```json
{
  "type": 205,
  "requestID": "string",
  "result": 0,
  "data": {},
  "error": "string"
}
```

### 守护徽章相关接口

#### 获取徽章详情
**URL**: `/medal/detail`
**方法**: `GET`
**参数**: 
- `liverUID`: 主播UID
- `reqID`: 请求ID (可选，默认自动生成)
**返回值**: 
```json
{
  "type": 300,
  "requestID": "string",
  "result": 0,
  "data": {
    "medalID": number,
    "name": "string",
    "level": number,
    "exp": number,
    "nextExp": number
  },
  "error": "string"
}
```

#### 佩戴徽章
**URL**: `/medal/wear`
**方法**: `POST`
**入参**: 
```json
{
  "medalID": number
}
```
**返回值**: 
```json
{
  "type": 301,
  "requestID": "string",
  "result": 0,
  "data": {},
  "error": "string"
}
```

#### 取消佩戴徽章
**URL**: `/medal/remove`
**方法**: `POST`
**入参**: 
```json
{
  "medalID": number
}
```
**返回值**: 
```json
{
  "type": 302,
  "requestID": "string",
  "result": 0,
  "data": {},
  "error": "string"
}
```

#### 获取我的徽章列表
**URL**: `/medal/list`
**方法**: `GET`
**参数**: 
- `reqID`: 请求ID (可选，默认自动生成)
**返回值**: 
```json
{
  "type": 303,
  "requestID": "string",
  "result": 0,
  "data": {
    "medals": [{
      "medalID": number,
      "liverUID": number,
      "liverName": "string",
      "name": "string",
      "level": number
    }]
  },
  "error": "string"
}
```

#### 升级徽章
**URL**: `/medal/upgrade`
**方法**: `POST`
**入参**: 
```json
{
  "medalID": number
}
```
**返回值**: 
```json
{
  "type": 304,
  "requestID": "string",
  "result": 0,
  "data": {
    "level": number
  },
  "error": "string"
}
```

#### 赠送徽章经验
**URL**: `/medal/giveexp`
**方法**: `POST`
**入参**: 
```json
{
  "medalID": number,
  "exp": number
}
```
**返回值**: 
```json
{
  "type": 305,
  "requestID": "string",
  "result": 0,
  "data": {},
  "error": "string"
}
```

### 直播管理相关接口

#### 检查直播权限
**URL**: `/live/checkauth`
**方法**: `GET`
**参数**: 
- `reqID`: 请求ID (可选，默认自动生成)
**返回值**: 
```json
{
  "type": 900,
  "requestID": "string",
  "result": 0,
  "data": {
    "hasAuth": boolean
  },
  "error": "string"
}
```

#### 开始直播
**URL**: `/live/start`
**方法**: `POST`
**入参**: 
```json
{
  "title": "string",
  "coverPath": "string",
  "categoryID": number
}
```
**返回值**: 
```json
{
  "type": 901,
  "requestID": "string",
  "result": 0,
  "data": {
    "liveID": number
  },
  "error": "string"
}
```

#### 结束直播
**URL**: `/live/end`
**方法**: `POST`
**入参**: 
```json
{
  "liveID": number
}
```
**返回值**: 
```json
{
  "type": 902,
  "requestID": "string",
  "result": 0,
  "data": {},
  "error": "string"
}
```

#### 修改直播信息
**URL**: `/live/update`
**方法**: `POST`
**入参**: 
```json
{
  "liveID": number,
  "title": "string",
  "coverPath": "string",
  "categoryID": number
}
```
**返回值**: 
```json
{
  "type": 903,
  "requestID": "string",
  "result": 0,
  "data": {},
  "error": "string"
}
```

#### 获取直播配置
**URL**: `/live/config`
**方法**: `GET`
**参数**: 
- `liveID`: 直播ID
- `reqID`: 请求ID (可选，默认自动生成)
**返回值**: 
```json
{
  "type": 904,
  "requestID": "string",
  "result": 0,
  "data": {
    "rtmpURL": "string",
    "streamKey": "string",
    "hlsURL": "string"
  },
  "error": "string"
}
```

#### 获取直播状态
**URL**: `/live/status`
**方法**: `GET`
**参数**: 
- `liveID`: 直播ID
- `reqID`: 请求ID (可选，默认自动生成)
**返回值**: 
```json
{
  "type": 905,
  "requestID": "string",
  "result": 0,
  "data": {
    "status": number,
    "viewerCount": number,
    "likeCount": number,
    "commentCount": number
  },
  "error": "string"
}
```

#### 发送直播通知
**URL**: `/live/notify`
**方法**: `POST`
**入参**: 
```json
{
  "liveID": number,
  "message": "string"
}
```
**返回值**: 
```json
{
  "type": 906,
  "requestID": "string",
  "result": 0,
  "data": {},
  "error": "string"
}
```

#### 设置直播封面
**URL**: `/live/cover`
**方法**: `POST`
**入参**: 
```json
{
  "liveID": number,
  "coverPath": "string"
}
```
**返回值**: 
```json
{
  "type": 907,
  "requestID": "string",
  "result": 0,
  "data": {},
  "error": "string"
}
```

#### 设置是否允许观众剪辑直播录像
**URL**: `/live/cut/allow`
**方法**: `POST`
**入参**: 
```json
{
  "liveID": number,
  "allow": boolean
}
```
**返回值**: 
```json
{
  "type": 909,
  "requestID": "string",
  "result": 0,
  "data": {},
  "error": "string"
}
```

### 原有接口

### 登录接口

**URL**: `/login`
**方法**: `POST`
**入参**: 
```json
{
  "username": "string", // ACFUN用户名
  "password": "string"  // ACFUN密码
}
```
**返回值**: 
```json
{
  "type": 100,          // 固定值
  "requestID": "string", // 请求ID
  "result": 0,          // 0表示成功，其他表示失败
  "data": {
    "token": "string", // 登录token
    "expires": number   // 过期时间戳
  },
  "error": "string"     // 错误信息，成功时为空
}
```

### 扫码登录接口

**URL**: `/login/qrcode`
**方法**: `GET`
**返回值**: 
```json
{
  "type": 101,          // 固定值
  "requestID": "string", // 请求ID
  "result": 0,          // 0表示成功，其他表示失败
  "data": {
    "qrcodeUrl": "string", // 二维码URL
    "ticket": "string"     // 二维码ticket
  },
  "error": "string"     // 错误信息，成功时为空
}
```

### 设置Token接口

**URL**: `/token`
**方法**: `POST`
**入参**: 
```json
{
  "token": "string"  // 登录token
}
```
**返回值**: 
```json
{
  "type": 102,          // 固定值
  "requestID": "string", // 请求ID
  "result": 0,          // 0表示成功，其他表示失败
  "data": {},
  "error": "string"     // 错误信息，成功时为空
}
```

### 获取弹幕接口 (EventSource)

**URL**: `/danmu/:uid`
**方法**: `GET`
**参数**: 
- `uid`: 主播UID
- `reqID`: 请求ID (可选，默认自动生成)
**说明**: 此接口使用EventSource协议，客户端连接后会持续收到弹幕事件
**事件格式**: 
```json
{
  "liverUID": number,   // 主播UID
  "type": number,       // 事件类型
  "data": object        // 事件数据
}
```
**事件类型**: 
- 1000: 评论弹幕
- 1001: 点赞
- 1002: 进入房间
- 1003: 关注主播
- 1004: 扔香蕉
- 1005: 送礼物
- 1006: 富文本消息
- 1007: 加入俱乐部
- 1008: 分享直播
- 2000: 弹幕停止
- 2001: 香蕉数量更新

### 停止弹幕接口

**URL**: `/danmu/:uid/stop`
**方法**: `POST`
**参数**: 
- `uid`: 主播UID
- `reqID`: 请求ID (可选，默认自动生成)
**返回值**: 
```json
{
  "type": 2000,         // 固定值
  "requestID": "string", // 请求ID
  "result": 0,          // 0表示成功，其他表示失败
  "data": {
    "liverUID": number  // 主播UID
  },
  "error": "string"     // 错误信息，成功时为空
}
```

### 直播统计数据接口

**URL**: `/live/data`
**方法**: `GET`
**参数**: 
- `days`: 统计天数 (可选，默认7天)
- `reqID`: 请求ID (可选，默认自动生成)
**返回值**: 
```json
{
  "type": 112,          // 固定值
  "requestID": "string", // 请求ID
  "result": 0,          // 0表示成功，其他表示失败
  "data": {
    "startDate": "string", // 开始日期
    "endDate": "string",   // 结束日期
    "overview": object,     // 直播概况
    "liveStats": array,     // 单场直播统计
    "dayStats": array       // 单日统计数据
  },
  "error": "string"     // 错误信息，成功时为空
}
```

### 指定用户信息接口

**URL**: `/user/info`
**方法**: `GET`
**参数**: 
- `userID`: 用户ID (可选，默认当前登录用户)
- `reqID`: 请求ID (可选，默认自动生成)
**返回值**: 
```json
{
  "type": 115,          // 固定值
  "requestID": "string", // 请求ID
  "result": 0,          // 0表示成功，其他表示失败
  "data": {
    "userID": number,       // 用户ID
    "nickname": "string",  // 昵称
    "avatar": "string",    // 头像URL
    "followingCount": number, // 关注数
    "fansCount": number,     // 粉丝数
    "signature": "string"   // 个性签名
  },
  "error": "string"     // 错误信息，成功时为空
}
```

### 上传图片接口

**URL**: `/upload/image`
**方法**: `POST`
**参数**: 
- `imagePath`: 图片本地路径
- `reqID`: 请求ID (可选，默认自动生成)
**返回值**: 
```json
{
  "type": 111,          // 固定值
  "requestID": "string", // 请求ID
  "result": 0,          // 0表示成功，其他表示失败
  "data": {
    "imageUrl": "string"  // 上传后的图片URL
  },
  "error": "string"     // 错误信息，成功时为空
}
```

### 直播预告列表接口

**URL**: `/live/schedule`
**方法**: `GET`
**参数**: 
- `reqID`: 请求ID (可选，默认自动生成)
**返回值**: 
```json
{
  "type": 113,          // 固定值
  "requestID": "string", // 请求ID
  "result": 0,          // 0表示成功，其他表示失败
  "data": array,         // 直播预告列表
  "error": "string"     // 错误信息，成功时为空
}
```

### 直播剪辑信息接口

**URL**: `/live/cut`
**方法**: `GET`
**参数**: 
- `liverUID`: 主播UID
- `liveID`: 直播ID
- `reqID`: 请求ID (可选，默认自动生成)
**返回值**: 
```json
{
  "type": 116,          // 固定值
  "requestID": "string", // 请求ID
  "result": 0,          // 0表示成功，其他表示失败
  "data": {
    "status": number,      // 剪辑状态
    "url": "string"       // 剪辑视频URL
  },
  "error": "string"     // 错误信息，成功时为空
}
```

## 开发说明

### 核心模块

1. `acfundanmu.js`: 实现了与ACFUN直播平台的通信，包括WebSocket和TCP两种连接方式，以及各种API调用。
2. `danmu.js`: 处理弹幕相关逻辑，包括获取弹幕、通过EventSource发送弹幕事件等。
3. `cmd.js`: 处理各种命令，包括登录、获取礼物列表、获取用户信息等。
4. `main.js`: 程序入口，负责初始化HTTP服务器、配置路由和中间件等。

### 数据流

1. 客户端通过HTTP接口进行登录和其他命令操作
2. 客户端通过EventSource连接获取实时弹幕
3. 服务器通过acfundanmu.js模块与ACFUN平台通信
4. 服务器将获取到的弹幕通过EventSource推送给客户端

### 错误处理

项目实现了完善的错误处理机制，包括：

1. API调用错误处理
2. 连接错误处理和自动重连
3. 日志记录错误信息
4. HTTP请求错误处理和友好的错误响应

## 贡献

欢迎提交Issue和Pull Request。

## 许可证

[MIT](LICENSE)