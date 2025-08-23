const request = require('supertest');
const app = require('../main');
const { v4: uuidv4 } = require('uuid');

// 测试用例中使用的测试数据
let testToken = '';

// 先登录获取token
beforeAll(async () => {
  const response = await request(app)
    .post('/api/login')
    .send({
      username: 'test_user',
      password: 'test_password',
      requestID: uuidv4()
    });
  testToken = response.body.data.token;

  // 设置token
  await request(app)
    .post('/api/token')
    .send({
      token: testToken,
      requestID: uuidv4()
    });
});

describe('用户信息接口测试', () => {
  // 测试获取用户信息
  test('GET /api/user/info 应返回当前用户信息', async () => {
    const requestID = uuidv4();
    const response = await request(app)
      .get(`/api/user/info?requestID=${requestID}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('type', 301);
    expect(response.body).toHaveProperty('requestID', requestID);
    expect(response.body).toHaveProperty('result', 0);
    expect(response.body.data).toHaveProperty('userInfo');
    expect(response.body.data.userInfo).toHaveProperty('username');
    expect(response.body.data.userInfo).toHaveProperty('uid');
    expect(response.body.error).toBe('');
  });

  // 测试获取用户直播信息
  test('GET /api/user/live 应返回用户直播信息', async () => {
    const requestID = uuidv4();
    const response = await request(app)
      .get(`/api/user/live?requestID=${requestID}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('type', 302);
    expect(response.body).toHaveProperty('requestID', requestID);
    expect(response.body).toHaveProperty('result', 0);
    expect(response.body.data).toHaveProperty('liveInfo');
    expect(response.body.error).toBe('');
  });

  // 测试获取用户钱包信息
  test('GET /api/user/wallet 应返回用户钱包信息', async () => {
    const requestID = uuidv4();
    const response = await request(app)
      .get(`/api/user/wallet?requestID=${requestID}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('type', 303);
    expect(response.body).toHaveProperty('requestID', requestID);
    expect(response.body).toHaveProperty('result', 0);
    expect(response.body.data).toHaveProperty('walletInfo');
    expect(response.body.data.walletInfo).toHaveProperty('balance');
    expect(response.body.error).toBe('');
  });

  // 测试未登录状态下获取用户信息
  test('GET /api/user/info 未登录状态应返回错误', async () => {
    // 清除token
    await request(app)
      .post('/api/token')
      .send({
        token: '',
        requestID: uuidv4()
      });

    const requestID = uuidv4();
    const response = await request(app)
      .get(`/api/user/info?requestID=${requestID}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('type', 301);
    expect(response.body).toHaveProperty('requestID', requestID);
    expect(response.body.result).not.toBe(0);
    expect(response.body.error).not.toBe('');

    // 恢复token
    await request(app)
      .post('/api/token')
      .send({
        token: testToken,
        requestID: uuidv4()
      });
  });
});