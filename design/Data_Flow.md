# 系统数据流

本文档使用 Mermaid 流程图展示了主播直播管理系统中的核心数据流，以阐明各模块之间的交互方式。

## 1. 核心数据流图

下图描绘了从用户界面操作到与 AcFun 服务器交互，再到数据返回并更新界面的完整流程。

```mermaid
flowchart TD
    subgraph Renderer Process (UI)
        A[用户操作 (例如: 点击"开始直播")] --> B{React 组件};
        B -- "ipcRenderer.invoke('live:start', params)" --> C[IPC 发送];
        I[IPC 接收] -- "webContents.send('danmu:event', data)" --> J{Redux Store};
        J -- "更新状态" --> K[React UI 更新];
    end

    subgraph Main Process (Backend)
        D[IPC 接收] -- "ipcMain.handle('live:start')" --> E{服务层 (LiveControlService)};
        E -- "调用 AcFunLiveApi" --> F[acfunlive-backend];
        F -- "HTTP/WebSocket 请求" --> G[AcFun 服务器];
        G -- "HTTP/WebSocket 响应" --> F;
        F -- "返回结果" --> E;
        E -- "Promise.resolve(result)" --> D;

        F -- "推送实时事件 (弹幕/礼物)" --> H{事件总线 (EventEmitter)};
        H -- "分发事件" --> D;
        H -- "分发事件" --> L[插件系统];
    end

    subgraph Plugin System
        L -- "订阅事件" --> M{插件实例};
        M -- "执行逻辑 (例如: 弹幕统计)" --> N[插件自有状态];
        M -- "调用UI更新" --> D;
    end

    C --> D;
    D --> I;
```

## 2. 数据流说明

### 2.1. 用户操作流程 (以“开始直播”为例)

1.  **用户界面 (Renderer Process)**:
    -   用户在 React 组件中点击“开始直播”按钮。
    -   该操作触发一个函数，调用 `ipcRenderer.invoke('live:start', { ...params })`，将请求异步发送到主进程。

2.  **主进程 (Main Process)**:
    -   `ipcMain` 监听到 `live:start` 通道的消息，并由注册的处理器 `LiveControlService` 接收。
    -   `LiveControlService` 调用 `acfunlive-backend` 中 `LiveService` 的 `startLiveStream` 方法。
    -   `acfunlive-backend` 库构造一个 HTTP 请求，并发送给 AcFun 的直播服务器。

3.  **数据返回**:
    -   AcFun 服务器处理请求，并返回一个 HTTP 响应。
    -   `acfunlive-backend` 接收响应并将其解析为结构化的 `ApiResponse` 对象。
    -   结果通过 `Promise` 返回给 `LiveControlService`，再由 `ipcMain` 返回给渲染进程。

4.  **UI 更新**:
    -   渲染进程中的 `ipcRenderer.invoke` 的 `Promise` 被 `resolve`，得到操作结果。
    -   根据结果，通过 Redux 更新应用状态，并触发 React UI 的重新渲染（例如，显示“直播已开始”的状态提示）。

### 2.2. 实时事件流程 (以“接收弹幕”为例)

1.  **连接建立**:
    -   用户进入直播间后，UI 通过 IPC 请求 `danmu:start`。
    -   主进程的 `DanmuFeedService` 调用 `acfunlive-backend` 的 `DanmuService`，与 AcFun 的弹幕服务器建立 WebSocket 连接。

2.  **事件接收与分发 (Main Process)**:
    -   `DanmuService` 接收到来自服务器的二进制 Protobuf 数据。
    -   数据经过 `EventParser` 解析，转换为结构化的 `DanmuMessage` 对象（如评论、礼物、点赞等）。
    -   解析后的事件被发布到主进程的内部**事件总线 (EventEmitter)**。

3.  **事件消费**:
    -   **渲染进程**: 主进程的 IPC 模块订阅了事件总线。当新事件到达时，它通过 `window.webContents.send('danmu:event', eventData)` 将事件推送到渲染进程。渲染进程接收到事件后，更新 Redux store，从而实时显示在弹幕列表中。
    -   **插件系统**: 已启用的插件同样可以订阅事件总线。例如，一个“弹幕统计”插件可以监听所有评论事件，并在内部进行计数，然后通过 IPC 请求更新其在 UI 插槽中展示的内容。

此数据流设计确保了操作请求与实时事件处理的分离，提高了系统的响应速度和稳定性。
