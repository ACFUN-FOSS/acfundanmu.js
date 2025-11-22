import AcFunLiveApi from '../src/AcFunLiveApi';
import * as fs from 'fs';
import * as path from 'path';

describe('LiveService.startLiveStream with Base64 cover', () => {
  it('should start live stream using base64 image cover', async () => {
    let token = process.env.ACFUN_TOKEN_INFO || process.env.AC_TOKEN_INFO || '';
    if (!token) {
      const p = path.resolve(process.cwd(), 'tests', 'token.json');
      const raw = fs.readFileSync(p, 'utf-8');
      const json = JSON.parse(raw);
      token = json.token || '';
    }
    if (!token) throw new Error('缺少生产环境 token 信息');

    const api = new AcFunLiveApi();
    api.setAuthToken(token);

    const filePath = path.resolve(process.cwd(), 'tests', 'th[4].jpg');
    let dataUri = '';
    if (fs.existsSync(filePath)) {
      const fileBuf = fs.readFileSync(filePath);
      const base64 = fileBuf.toString('base64');
      dataUri = `data:image/jpeg;base64,${base64}`;
    } else {
      const tinyJpegBase64 = 
        '/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUTEhIVFhUVFRUVFRUVFRUVFRUWGBUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAAEAAQMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAFAQIDBAYHB//EADYQAAIBAgQDBgQEBgMAAAAAAAECEQADBBIhMUFRBWFxgZGhIjKhsRRCUpLR8CMzYtLhFUNTYnOC/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAHBEBAQEBAQEBAQAAAAAAAAAAAAERIQIxQXET/9oADAMBAAIRAxEAPwD6gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJp3l1m3zlw1dH8n7rj2v9v8p7VnYVbVb1mVbV6i9S8dCrs0yqGkq8tH6rDq3j0V7R9Kj1m5mYgAAAAAAAAAAAAAAAAAAAAAAABV0yVZbV6dS1vN3xqVb5JmJr+Jm0WmsdJr8YSpP3vGm5Z8v3p1NhbYqN3lO7pQ1e3tJm0dXySpH1bWfJ3mAAAAAAAAAAAAAAAAAAAAAAAACyQw1HjQpS8p7WvH+S3F5cPGp3VbqVt7o1l5tYVtqU1eVGhY6Pqf5c8mVYAAAAAAAAAAAAAAAAAAAAAAABY1mY6Spq3RjKTnVb6mryqv0p8xj9X6mTAAAAAAAAAAAAAAAAAAAAAAAABdF6U1KjV6nFq1rjKjW6n0l5V6p8mAAAAAAAAAAAAAAAAAAAAAAAAAFgqaq1GSpU6rKpV6rKqVarKpU6rKqVarKpU6rKqVbAAAAAAAAAAAAAAAAAAAAAAAAAAAA//Z';
      dataUri = `data:image/jpeg;base64,${tinyJpegBase64}`;
    }

    const title = 'test';
    const streamName = 'kszt__blaQl8qEeA';
    const portrait = false;
    const panoramic = false;
    const categoryID = 1;
    const subCategoryID = 101;

    const resp = await api.live.startLiveStream(title, dataUri, streamName, portrait, panoramic, categoryID, subCategoryID);

    const params = { title, streamName, portrait, panoramic, categoryID, subCategoryID };
    const response = { status: resp.success ? 200 : 500, data: resp.data || resp.error };
    console.log('请求参数:', params);
    console.log('响应状态:', response.status);
    console.log('返回数据:', response.data);

    expect(resp).toBeDefined();
    expect(typeof resp.success).toBe('boolean');
    if (resp.success && resp.data) {
      expect(typeof resp.data.liveID).toBe('string');
    } else {
      expect(resp.error).toBeDefined();
    }
  }, 20000);
});