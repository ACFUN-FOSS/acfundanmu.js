# AcFun直播平台HTTP API 项目文档

欢迎使用 AcFun 直播平台 HTTP API 封装库！本项目将复杂的 WebSocket 弹幕协议转换为简单易用的 HTTP API 和 SDK，帮助开发者快速集成 AcFun 直播功能。

## 📚 文档目录

- [快速开始](./quick-start.md) - 5分钟快速上手指南
- [API参考](./api-reference.md) - 完整的API接口文档
- [架构设计](./architecture.md) - 系统架构与设计理念
- [数据模型](./data-models.md) - 详细的数据结构定义
- [使用示例](./examples.md) - 常见业务场景示例代码

## 🚀 核心特性

### 协议转换
将复杂的 WebSocket 弹幕协议转换为简单易用的 HTTP API 和事件回调机制，降低接入门槛。

### 完整功能
- **用户认证**：二维码登录、Token管理
- **弹幕服务**：实时接收评论、礼物、进房等各类弹幕事件
- **直播管理**：开播、停播、推流配置、状态查询
- **用户服务**：用户信息查询、钱包管理
- **礼物系统**：礼物列表查询
- **房管功能**：房管管理、踢人功能

### 类型安全
完整的 TypeScript 类型定义，提供优秀的代码提示和类型检查。

### 双模式支持
- **SDK模式**：直接在 Node.js 应用中集成使用
- **服务器模式**：作为独立的 HTTP 服务部署

### 高级会话管理
- 多直播间并发监控
- 会话健康检查
- 自动重连机制
- 批量操作支持
- 性能统计分析

## 📦 技术栈

| 技术类别 | 使用技术 |
|---------|---------|
| 开发语言 | TypeScript |
| 运行时 | Node.js (>=16.0.0) |
| HTTP客户端 | Axios |
| WebSocket | ws库 |
| 协议解析 | Protobuf |
| HTTP服务器 | Express.js |
| 测试框架 | Jest |
| 构建工具 | TypeScript编译器(tsc) |

## 🎯 适用场景

- **直播监控**：实时监控直播间弹幕、礼物等数据
- **弹幕分析**：收集和分析直播间互动数据
- **自动化运营**：自动化直播管理和互动
- **数据统计**：直播数据统计和可视化
- **第三方集成**：将 AcFun 直播功能集成到其他系统

## ⚡ 快速开始

### 安装

```bash
npm install acfunlive-http-api
```

### 基础使用

```typescript
import { AcFunLiveApi } from 'acfunlive-http-api';

// 创建API实例
const api = new AcFunLiveApi({
  baseUrl: 'https://api.kuaishouzt.com',
  timeout: 10000
});

// 用户登录
const qrResult = await api.auth.qrLogin();
console.log('请扫描二维码:', qrResult.data.qrCode);

// 轮询检查登录状态
while (true) {
  const statusResult = await api.auth.checkQrLoginStatus();
  if (statusResult.success) {
    api.setAuthToken(statusResult.data.token);
    console.log('登录成功!');
    break;
  }
  await new Promise(resolve => setTimeout(resolve, 2000));
}

// 启动弹幕监控
const danmuResult = await api.danmu.startDanmu('主播UID', (event) => {
  if ('content' in event) {
    console.log('收到弹幕:', event.content);
  } else if ('giftDetail' in event) {
    console.log('收到礼物:', event.giftDetail.giftName);
  }
});

console.log('弹幕会话已启动:', danmuResult.data.sessionId);
```

更多详细示例请查看 [使用示例文档](./examples.md)。

## 📖 核心概念

### 认证令牌 (TokenInfo)
包含用户ID、安全密钥、服务令牌等信息，是所有API调用的凭证。

### 弹幕会话 (DanmuSession)
表示一个活跃的弹幕监控连接，可以同时为多个主播创建独立的会话。

### 会话状态
- **Idle**: 空闲状态，会话已创建
- **Connecting**: 正在连接WebSocket
- **Registering**: 正在注册
- **EnteringRoom**: 正在进入房间
- **Active**: 活跃状态，正常接收弹幕
- **Disconnecting**: 正在断开连接
- **Error**: 错误状态

### 弹幕消息类型
- **Comment**: 评论弹幕
- **Gift**: 礼物消息
- **Like**: 点赞
- **EnterRoom**: 用户进房
- **FollowAuthor**: 关注主播
- **RichText**: 富文本消息
- **JoinClub**: 加入守护团
- **ShareLive**: 分享直播间

## 🔧 API响应格式

所有API接口返回统一的响应格式：

```typescript
interface ApiResponse<T> {
  success: boolean;    // 请求是否成功
  data?: T;           // 成功时返回的数据
  error?: string;     // 失败时的错误消息
  code?: number;      // 错误码(可选)
}
```

## 📊 性能与可靠性

### 连接管理
- 自动心跳维持连接
- 连接超时检测(10秒)
- 优雅的资源清理

### 重连机制
- 自动重连支持
- 指数退避策略
- 可配置重连次数

### 健康检查
- 实时会话健康监控
- 心跳成功率统计
- 性能指标分析

### 批量操作
- 批量暂停/恢复会话
- 批量清理空闲会话
- 高效的资源管理

## 🛡️ 安全性

- **Token安全**: Token包含敏感信息，需安全存储
- **WebSocket加密**: 使用WSS加密连接，消息体采用AES加密
- **权限验证**: 敏感操作需要主播/房管权限验证

## 📝 开发规范

本项目遵循严格的开发规范：

### API开发规范
- 禁止使用模拟数据，所有接口必须返回真实业务数据
- 测试环境使用真实数据库或测试环境的真实数据

### 测试规范
- 测试文件命名：`[ServiceName].test.ts`
- 测试输出格式：打印请求参数、响应状态、返回数据
- 测试环境：直接使用生产环境进行测试
- 测试执行：每次仅执行一个接口测试用例

详细规范请参考项目根目录的 `api.md` 和 `test.md` 文档。

## 🔍 故障排查

### 常见错误

| 错误类型 | 错误码 | 描述 | 处理建议 |
|---------|--------|------|---------|
| 连接超时 | 10030 | WebSocket连接超过10秒未建立 | 检查网络，重试连接 |
| 认证失败 | 10028 | Token无效或过期 | 重新登录获取Token |
| 二维码过期 | 100400002 | 二维码超时未扫描 | 重新获取二维码 |
| 权限不足 | - | 无开播权限等 | 检查账号权限 |

### 调试建议
1. 检查Token是否有效
2. 确认网络连接正常
3. 查看会话健康状态
4. 检查日志输出

## 🤝 贡献指南

我们欢迎所有形式的贡献：

- 报告Bug
- 提交功能建议
- 改进文档
- 提交代码

## 📄 许可证

本项目采用 MIT 许可证。

## 🔗 相关链接

- [AcFun官网](https://www.acfun.cn)
- [项目仓库](https://github.com/acfunlive/acfunlive-http-api)
- [问题反馈](https://github.com/acfunlive/acfunlive-http-api/issues)

## 📮 联系方式

如有问题或建议，请通过以下方式联系我们：

- 提交 GitHub Issue
- 发送邮件至项目维护者

---

**Happy Coding! 🎉**
