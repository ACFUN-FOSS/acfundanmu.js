# API 接口定义

本文档定义了主播直播管理系统中的三类核心 API：IPC API、本地 HTTP API 和服务层 API。

## 1. IPC API (主进程 ↔ 渲染进程)

IPC (Inter-Process Communication) API 是主进程和渲染进程之间通信的桥梁，遵循请求-响应模式和事件推送模式。所有通道名称都采用 `namespace:action` 的格式。

### 1.1. 请求/响应 (Invoke/Handle)

渲染进程通过 `ipcRenderer.invoke` 发起请求，主进程通过 `ipcMain.handle` 处理并返回结果。

| Channel | 描述 | 参数 (渲染进程 -> 主进程) | 返回值 (主进程 -> 渲染进程) |
| :--- | :--- | :--- | :--- |
| `auth:login` | 执行二维码登录流程 | `void` | `Promise<ApiResponse<AuthResponse>>` |
| `auth:logout` | 退出登录 | `void` | `Promise<ApiResponse<void>>` |
| `auth:getStatus` | 获取当前认证状态 | `void` | `Promise<boolean>` |
| `live:start` | 开始直播 | `{ streamName: string, portrait: boolean, panoramic: boolean }` | `Promise<ApiResponse<any>>` |
| `live:stop` | 停止直播 | `{ liveId: string }` | `Promise<ApiResponse<any>>` |
| `live:getObsConfig` | 获取 OBS 推流配置 | `void` | `Promise<ApiResponse<any>>` |
| `live:getObsStatus` | 获取 OBS 推流状态 | `void` | `Promise<ApiResponse<any>>` |
| `live:getTranscodeInfo` | 获取转码信息 | `{ streamName: string }` | `Promise<ApiResponse<any>>` |
| `live:changeCover` | 更换直播封面 | `{ liveId: string, coverFile: string }` | `Promise<ApiResponse<any>>` |
| `manager:getList` | 获取房管列表 | `void` | `Promise<ApiResponse<Manager[]>>` |
| `manager:add` | 添加房管 | `{ userId: string }` | `Promise<ApiResponse<any>>` |
| `manager:remove` | 移除房管 | `{ userId: string }` | `Promise<ApiResponse<any>>` |
| `manager:kick` | 踢出用户 | `{ userId: string, duration: number }` | `Promise<ApiResponse<any>>` |
| `danmu:start` | 连接弹幕服务 | `{ liverUID: string }` | `Promise<{ sessionId: string }>` |
| `danmu:stop` | 断开弹幕服务 | `{ sessionId: string }` | `Promise<void>` |
| `plugin:list` | 获取已安装插件列表 | `void` | `Promise<PluginManifest[]>` |
| `plugin:toggle` | 启用/禁用插件 | `{ pluginId: string, enabled: boolean }` | `Promise<void>` |

### 1.2. 事件推送 (Send)

主进程通过 `window.webContents.send` 将实时事件推送给渲染进程。

| Channel | 描述 | 数据体 |
| :--- | :--- | :--- |
| `danmu:event` | 推送实时弹幕事件 | `DanmuMessage` (包含评论、礼物、点赞、进入房间等) |
| `live:statusUpdate` | 直播状态变更通知 | `{ status: 'streaming' \| 'stopped', ... }` |
| `system:health` | 系统健康状态更新 | `{ heartbeat: 'ok' \| 'failed', reconnecting: boolean }` |
| `plugin:ui-update` | 插件UI更新通知 | `{ pluginId: string, slot: string, component: ReactNode }` |

## 2. 本地 HTTP API

主进程会启动一个本地 HTTP 服务器，用于插件或外部工具的高级交互。所有端点都以 `/api/v1` 为前缀。

| Method | Endpoint | 描述 | 请求体 | 响应体 |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/live/status` | 获取当前直播状态 | - | `LiveStatus` |
| `GET` | `/api/v1/danmu/stats` | 获取弹幕统计数据 | - | `{ commentCount: number, giftValue: number, ... }` |
| `POST`| `/api/v1/danmu/send` | **[高风险]** 发送弹幕 | `{ message: string }` | `{ success: boolean }` |
| `GET` | `/api/v1/plugins` | 获取插件列表 | - | `PluginManifest[]` |
| `POST`| `/api/v1/plugins/:id/invoke` | **[高风险]** 调用插件暴露的动作 | `{ action: string, payload: any }` | `any` |

**注意**: 高风险 API 需要在插件的 `manifest.json` 中明确声明权限，并由用户授权。

## 3. 服务层 API (主进程内部)

服务层 API 是对 `acfunlive-backend` 库的直接封装，供主进程内部调用。其接口设计与 `acfunlive-backend` 中的服务类 (`LiveService`, `DanmuService` 等) 基本保持一致。

### `LiveControlService`

```typescript
class LiveControlService {
  // 对应 LiveService.startLiveStream
  async startLive(params: { streamName: string, ... }): Promise<ApiResponse<any>>;

  // 对应 LiveService.stopLiveStream
  async stopLive(params: { liveId: string }): Promise<ApiResponse<any>>;

  // 对应 LiveService.getObsConfig
  async getObsConfig(): Promise<ApiResponse<any>>;

  // ... 其他 LiveService 方法
}
```

### `DanmuFeedService`

```typescript
class DanmuFeedService {
  private eventBus: EventEmitter;

  constructor(api: AcFunLiveApi) {
    // ...
  }

  // 对应 DanmuService.startDanmu
  async connect(liverUID: string): Promise<string>;

  // 对应 DanmuService.stopDanmu
  async disconnect(sessionId: string): Promise<void>;

  // 订阅弹幕事件
  subscribe(eventName: string, listener: (data: any) => void): void;
}
```

### `PluginExecutionService`

```typescript
class PluginExecutionService {
  // 加载所有插件
  loadPlugins(): void;

  // 启用/禁用插件
  togglePlugin(pluginId: string, enabled: boolean): void;

  // 向所有插件广播事件
  broadcastEvent(event: { type: string, payload: any }): void;

  // 执行插件的特定动作
  invokeAction(pluginId: string, action: string, payload: any): Promise<any>;
}
```

此 API 设计确保了前后端职责分离，并通过统一的 IPC 通道保证了通信的有序性和安全性。
