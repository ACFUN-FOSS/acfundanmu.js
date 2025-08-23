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

describe('直播数据接口测试', () => {
  // 测试获取观看列表
  test('GET /api/live/watching 应返回观看列表', async () => {
    const requestID = uuidv4();
    const response = await request(app)
      .get(`/api/live/watching?requestID=${requestID}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('type', 401);
    expect(response.body).toHaveProperty('requestID', requestID);
    expect(response.body).toHaveProperty('result', 0);
    expect(response.body.data).toHaveProperty('watchingList');
    expect(Array.isArray(response.body.data.watchingList)).toBeTruthy();
    expect(response.body.error).toBe('');
  });

  // 测试获取排行榜
  test('GET /api/live/billboard 应返回排行榜数据', async () => {
    const requestID = uuidv4();
    const response = await request(app)
      .get(`/api/live/billboard?requestID=${requestID}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('type', 402);
    expect(response.body).toHaveProperty('requestID', requestID);
    expect(response.body).toHaveProperty('result', 0);
    expect(response.body.data).toHaveProperty('billboard');
    expect(response.body.error).toBe('');
  });

  // 测试获取直播摘要信息
  test('GET /api/live/summary 应返回直播摘要信息', async () => {
    const requestID = uuidv4();
    const response = await request(app)
      .get(`/api/live/summary?requestID=${requestID}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('type', 403);
    expect(response.body).toHaveProperty('requestID', requestID);
    expect(response.body).toHaveProperty('result', 0);
    expect(response.body.data).toHaveProperty('summary');
    expect(response.body.error).toBe('');
  });

  // 测试获取指定主播的直播数据
  test('GET /api/live/data/:uid 应返回指定主播的直播数据', async () => {
    const requestID = uuidv4();
    const response = await request(app)
      .get(`/api/live/data/${testUID}?requestID=${requestID}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('type', 404);
    expect(response.body).toHaveProperty('requestID', requestID);
    expect(response.body).toHaveProperty('result', 0);
    expect(response.body.data).toHaveProperty('liveData');
    expect(response.body.error).toBe('');
  });

  // 测试获取所有直播列表
  test('GET /api/live/all 应返回所有直播列表', async () => {
    const requestID = uuidv4();
    const response = await request(app)
      .get(`/api/live/all?requestID=${requestID}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('type', 405);
    expect(response.body).toHaveProperty('requestID', requestID);
    expect(response.body).toHaveProperty('result', 0);
    expect(response.body.data).toHaveProperty('liveList');
    expect(Array.isArray(response.body.data.liveList)).toBeTruthy();
    expect(response.body.error).toBe('');
  });
});