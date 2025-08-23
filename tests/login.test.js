const request = require('supertest');
const app = require('../main');
const { v4: uuidv4 } = require('uuid');

// 测试用例中使用的测试数据
const testUser = {
  username: 'test_user',
  password: 'test_password'
};

let testToken = '';
let requestID = uuidv4();

describe('登录接口测试', () => {
  // 在所有测试前启动服务器
  beforeAll(() => {
    console.log('开始登录接口测试');
  });

  // 在所有测试后关闭服务器
  afterAll((done) => {
    console.log('登录接口测试结束');
    done();
  });

  // 测试账号密码登录
  test('POST /api/login 应成功登录并返回token', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        username: testUser.username,
        password: testUser.password,
        requestID: requestID
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('type', 100);
    expect(response.body).toHaveProperty('requestID', requestID);
    expect(response.body).toHaveProperty('result', 0);
    expect(response.body.data).toHaveProperty('token');
    expect(response.body.data).toHaveProperty('expires');
    expect(response.body.error).toBe('');

    // 保存token供后续测试使用
    testToken = response.body.data.token;
  });

  // 测试扫码登录
  test('GET /api/login/qrcode 应返回二维码信息', async () => {
    requestID = uuidv4();
    const response = await request(app)
      .get(`/api/login/qrcode?requestID=${requestID}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('type', 101);
    expect(response.body).toHaveProperty('requestID', requestID);
    expect(response.body).toHaveProperty('result', 0);
    expect(response.body.data).toHaveProperty('qrcodeUrl');
    expect(response.body.data).toHaveProperty('ticket');
    expect(response.body.error).toBe('');
  });

  // 测试设置token
  test('POST /api/token 应成功设置token', async () => {
    requestID = uuidv4();
    const response = await request(app)
      .post('/api/token')
      .send({
        token: testToken,
        requestID: requestID
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('type', 102);
    expect(response.body).toHaveProperty('requestID', requestID);
    expect(response.body).toHaveProperty('result', 0);
    expect(response.body.error).toBe('');
  });

  // 测试错误的账号密码
  test('POST /api/login 使用错误的账号密码应返回错误', async () => {
    requestID = uuidv4();
    const response = await request(app)
      .post('/api/login')
      .send({
        username: 'wrong_user',
        password: 'wrong_password',
        requestID: requestID
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('type', 100);
    expect(response.body).toHaveProperty('requestID', requestID);
    expect(response.body.result).not.toBe(0);
    expect(response.body.error).not.toBe('');
  });
});