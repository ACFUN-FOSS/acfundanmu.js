const request = require('supertest');
const app = require('../main');
const { v4: uuidv4 } = require('uuid');

// 测试用例中使用的测试数据
const testUID = 12345; // 测试主播UID
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

describe('礼物列表接口测试', () => {
  // 测试获取全部礼物列表
  test('GET /api/gift/all 应返回所有礼物列表', async () => {
    const requestID = uuidv4();
    const response = await request(app)
      .get(`/api/gift/all?requestID=${requestID}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('type', 202);
    expect(response.body).toHaveProperty('requestID', requestID);
    expect(response.body).toHaveProperty('result', 0);
    expect(response.body.data).toHaveProperty('giftList');
    expect(Array.isArray(response.body.data.giftList)).toBeTruthy();
    expect(response.body.error).toBe('');
  });

  // 测试获取直播间礼物列表
  test('GET /api/gift/list/:uid 应返回指定直播间的礼物列表', async () => {
    const requestID = uuidv4();
    const response = await request(app)
      .get(`/api/gift/list/${testUID}?requestID=${requestID}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('type', 201);
    expect(response.body).toHaveProperty('requestID', requestID);
    expect(response.body).toHaveProperty('result', 0);
    expect(response.body.data).toHaveProperty('giftList');
    expect(Array.isArray(response.body.data.giftList)).toBeTruthy();
    expect(response.body.error).toBe('');
  });

  // 测试获取不存在的直播间礼物列表
  test('GET /api/gift/list/:uid 使用不存在的主播UID应返回错误', async () => {
    const invalidUID = 99999;
    const requestID = uuidv4();
    const response = await request(app)
      .get(`/api/gift/list/${invalidUID}?requestID=${requestID}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('type', 201);
    expect(response.body).toHaveProperty('requestID', requestID);
    expect(response.body.result).not.toBe(0);
    expect(response.body.error).not.toBe('');
  });

  // 测试未登录状态下获取礼物列表
  test('GET /api/gift/all 未登录状态应返回错误', async () => {
    // 清除token
    await request(app)
      .post('/api/token')
      .send({
        token: '',
        requestID: uuidv4()
      });

    const requestID = uuidv4();
    const response = await request(app)
      .get(`/api/gift/all?requestID=${requestID}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('type', 202);
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