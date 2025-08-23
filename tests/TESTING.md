# 测试指南

## 概述

本测试套件用于验证ACFUN直播后端服务的所有API接口功能。测试使用Jest框架编写，涵盖登录、弹幕获取、礼物列表等核心功能。

## 环境准备

1. 安装依赖：
```bash
cd d:\Code\acfunlive-backend\js
npm install --save-dev jest supertest
```

2. 确保服务已启动：
```bash
npm start
```

## 运行测试

1. 运行所有测试：
```bash
npm test
```

2. 运行特定测试文件：
```bash
npm test tests/login.test.js
```

3. 运行测试并生成覆盖率报告：
```bash
npm test -- --coverage
```

## 测试用例结构

测试用例遵循以下结构：

```javascript
const request = require('supertest');
const app = require('../main'); // 导入Express应用

describe('API测试', () => {
  // 在所有测试前执行
  beforeAll(() => {
    // 启动测试服务器
  });

  // 在所有测试后执行
  afterAll(() => {
    // 关闭测试服务器
  });

  // 测试用例组
  describe('登录接口', () => {
    test('应成功登录并返回token', async () => {
      // 测试代码
    });
  });
});
```

## 测试用例说明

1. `login.test.js`: 测试登录接口、扫码登录接口和设置Token接口
2. `danmu.test.js`: 测试弹幕获取和停止接口
3. `gift.test.js`: 测试礼物列表相关接口
4. `user.test.js`: 测试用户信息相关接口
5. `live.test.js`: 测试直播数据相关接口

## 注意事项

1. 确保测试前服务已启动
2. 测试数据应使用测试账号，避免使用真实账号
3. 部分测试需要网络连接，请确保网络通畅
4. 测试过程中可能会产生临时文件，测试完成后会自动清理