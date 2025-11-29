# 迁移指南 v1.0

## 变更摘要
- 移除内置 HTTP 服务器与所有 `/api/*` 路由
- 移除导出 `ApiServer` 与 `createServer(...)`
- 保留并推荐使用 `AcFunLiveApi` 与 `createApi(...)` 进行 SDK 调用

## 路由到 SDK 的映射
- `/api/live/watching-list/:liveId` → `api.live.getWatchingList(liveId)`
- `/api/user/wallet` → `api.user.getWalletInfo()`
- 其他功能请参考对应服务：`api.auth.*`、`api.danmu.*`、`api.live.*`、`api.user.*`、`api.manager.*`、`api.replay.*`

## 代码迁移示例
```diff
- import { createServer } from 'acfunlive-http-api'
- const server = createServer()
- server.start()
 import { createApi } from 'acfunlive-http-api'
 const api = createApi()
 const users = await api.live.getWatchingList('liveId')
```

## 鉴权说明
- 旧：通过服务器中间件读取 `Authorization: Bearer <token>`
- 新：在客户端代码中直接调用 `api.setAuthToken(token)`

## 兼容性
- 此为不兼容变更（Breaking Change）
- 若需要 HTTP 服务，请在你的应用中单独实现并调用 SDK 方法

