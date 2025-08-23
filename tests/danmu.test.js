const request = require('supertest');
const app = require('../main');
const { v4: uuidv4 } = require('uuid');
const EventSource = require('eventsource');

// 测试用例中使用的测试数据
const testUID = 12345; // 测试主播UID
let testToken = '';
let requestID = uuidv4();

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

describe('弹幕接口测试', () => {
  // 测试获取弹幕接口 (EventSource)
  test('GET /api/danmu/:uid 应建立EventSource连接并接收弹幕', (done) => {
    requestID = uuidv4();
    const url = `http://localhost:3000/api/danmu/${testUID}?requestID=${requestID}`;

    const es = new EventSource(url);

    // 设置超时
    const timeout = setTimeout(() => {
      es.close();
      done.fail('测试超时，未收到弹幕事件');
    }, 10000);

    // 监听open事件
    es.onopen = () => {
      console.log('EventSource连接已建立');
    };

    // 监听message事件
    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        expect(data).toHaveProperty('liverUID', testUID);
        expect(data).toHaveProperty('type');
        expect(data).toHaveProperty('data');

        // 收到一条消息后关闭连接并结束测试
        clearTimeout(timeout);
        es.close();
        done();
      } catch (error) {
        clearTimeout(timeout);
        es.close();
        done.fail('解析弹幕数据失败: ' + error.message);
      }
    };

    // 监听error事件
    es.onerror = (error) => {
      clearTimeout(timeout);
      es.close();
      done.fail('EventSource错误: ' + error);
    };
  });

  // 测试停止弹幕接口
  test('POST /api/danmu/:uid/stop 应成功停止弹幕', async () => {
    requestID = uuidv4();
    const response = await request(app)
      .post(`/api/danmu/${testUID}/stop`)
      .send({
        requestID: requestID
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('type', 2000);
    expect(response.body).toHaveProperty('requestID', requestID);
    expect(response.body).toHaveProperty('result', 0);
    expect(response.body.data).toHaveProperty('liverUID', testUID);
    expect(response.body.error).toBe('');
  });

  // 测试不存在的主播UID
  test('GET /api/danmu/:uid 使用不存在的主播UID应返回错误', (done) => {
    const invalidUID = 99999;
    requestID = uuidv4();
    const url = `http://localhost:3000/api/danmu/${invalidUID}?requestID=${requestID}`;

    const es = new EventSource(url);

    // 设置超时
    const timeout = setTimeout(() => {
      es.close();
      done.fail('测试超时');
    }, 5000);

    // 监听message事件
    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        expect(data).toHaveProperty('type', 2000); // 应该收到停止事件
        expect(data).toHaveProperty('result', -1);
        expect(data.data).toHaveProperty('liverUID', invalidUID);

        clearTimeout(timeout);
        es.close();
        done();
      } catch (error) {
        clearTimeout(timeout);
        es.close();
        done.fail('解析数据失败: ' + error.message);
      }
    };

    // 监听error事件
    es.onerror = (error) => {
      clearTimeout(timeout);
      es.close();
      done.fail('EventSource错误: ' + error);
    };
  });
});