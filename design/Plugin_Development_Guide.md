# 插件开发指南

本指南旨在帮助开发者为 AcFun 主播直播管理系统创建插件。插件系统允许您扩展应用的核心功能，例如添加新的数据可视化、自定义弹幕交互或与第三方服务集成。

## 1. 插件基础

每个插件都是一个独立的 Node.js 模块，包含一个 `manifest.json` 文件和业务逻辑代码。

### 1.1. 目录结构

一个典型的插件目录结构如下：

```
/my-plugin
├── manifest.json       # 插件清单文件 (必需)
├── index.js            # 插件主入口文件 (必需)
└── components/
    └── MyCard.jsx      # 插件的 React UI 组件
```

### 1.2. `manifest.json`

清单文件定义了插件的元数据、权限和 UI 挂载点。

```json
{
  "id": "com.example.my-plugin",
  "name": "我的第一个插件",
  "version": "1.0.0",
  "description": "一个简单的弹幕统计插件。",
  "author": "Your Name",
  "main": "index.js",
  "permissions": [
    "danmu:read",
    "ui:slot:dashboard"
  ],
  "uiSlots": [
    {
      "id": "dashboard-card",
      "slot": "dashboard",
      "label": "弹幕统计卡片",
      "component": "./components/MyCard.jsx"
    }
  ]
}
```

- **`id`**: 插件的唯一标识符，建议使用反向域名格式。
- **`permissions`**: 插件需要向系统申请的权限列表。
- **`uiSlots`**: 定义插件需要在哪个 UI 插槽中渲染组件。

## 2. 插件生命周期

插件在主进程中被加载和管理，并遵循以下生命周期：

- **`onLoad(context)`**: 插件被加载时调用的第一个函数。`context` 对象包含了插件与系统交互所需的所有 API。
- **`onStart()`**: 插件被启用时调用。通常在此处开始订阅事件或执行后台任务。
- **`onStop()`**: 插件被禁用时调用。应在此处清理资源，如取消事件订阅。
- **`onUnload()`**: 插件被卸载前调用。

### `index.js` 示例

```javascript
// index.js

let contextApi;
let subscription;

// 插件加载
export function onLoad(context) {
  contextApi = context;
  console.log('插件已加载:', context.manifest.name);

  // 注册 UI 组件
  context.ui.register(context.manifest.uiSlots);
}

// 插件启用
export function onStart() {
  console.log('插件已启动');
  
  // 订阅弹幕评论事件
  subscription = contextApi.events.subscribe('danmu:comment', (comment) => {
    // 更新 UI
    contextApi.ui.update('dashboard-card', { newComment: comment.content });
  });
}

// 插件禁用
export function onStop() {
  console.log('插件已停止');
  if (subscription) {
    subscription.unsubscribe();
  }
}

// 插件卸载
export function onUnload() {
  console.log('插件已卸载');
}
```

## 3. 插件 API (`context` 对象)

`context` 对象是插件与主应用交互的唯一途径，它提供了以下 API：

### 3.1. `context.manifest`

- **描述**: 当前插件的 `manifest.json` 内容。
- **类型**: `PluginManifest`

### 3.2. `context.events`

- **描述**: 事件总线 API，用于订阅系统核心事件。
- **方法**:
    - `subscribe(eventName: string, handler: (data: any) => void): Subscription`: 订阅一个事件。返回一个包含 `unsubscribe` 方法的对象。
- **可用事件**:
    - `danmu:comment`: 收到评论弹幕
    - `danmu:gift`: 收到礼物
    - `danmu:like`: 收到点赞
    - `live:start`: 直播开始
    - `live:stop`: 直播结束
    - `system:health`: 系统健康状态变更

### 3.3. `context.ui`

- **描述**: 用于与渲染进程的 UI 交互。
- **方法**:
    - `register(slots: UiSlot[])`: 注册插件的 UI 组件。
    - `update(slotId: string, props: object)`: 更新指定插槽中组件的 `props`。
    - `getSlot(slotId: string): Promise<any>`: 获取插槽的当前状态。

### 3.4. `context.ipc`

- **描述**: 提供与主进程安全通信的能力，用于调用需要授权的 API。
- **方法**:
    - `invoke(channel: string, ...args: any[]): Promise<any>`: 调用主进程中已注册的、且插件有权限的 IPC 通道。
- **示例**:
  ```javascript
  // 前提：manifest.json 中已声明 "permissions": ["manager:list"]
  async function getManagers() {
    const managers = await context.ipc.invoke('manager:getList');
    console.log(managers);
  }
  ```

## 4. UI 开发

- 插件的 UI 组件使用 **React** 编写。
- 组件通过 `context.ui.update` 方法接收新的 `props` 并重新渲染。
- 样式建议使用 CSS-in-JS 或 CSS Modules，以避免全局样式污染。

### `MyCard.jsx` 示例

```jsx
// components/MyCard.jsx
import React, { useState, useEffect } from 'react';

// props 由 context.ui.update 传入
function MyCard({ newComment }) {
  const [lastComment, setLastComment] = useState('');

  useEffect(() => {
    if (newComment) {
      setLastComment(newComment);
    }
  }, [newComment]);

  return (
    <div>
      <h4>弹幕统计卡片</h4>
      <p>最新弹幕: {lastComment}</p>
    </div>
  );
}

export default MyCard;
```

## 5. 权限管理

插件的安全性至关重要。系统通过 `manifest.json` 中的 `permissions` 字段实施严格的权限控制。

- **`danmu:read`**: 允许订阅弹幕、礼物等实时事件。
- **`live:control`**: **[高风险]** 允许调用开始/结束直播等控制类 API。
- **`manager:write`**: **[高风险]** 允许调用添加/删除房管等管理类 API。
- **`ui:slot:*`**: 允许在指定的 UI 插槽中渲染组件，例如 `ui:slot:dashboard`。

在加载插件时，系统会校验其申请的权限。对于高风险权限，会在安装时向用户明确提示。

通过遵循本指南，您可以构建出功能强大且安全可靠的插件，与 AcFun 主播直播管理系统无缝集成。
