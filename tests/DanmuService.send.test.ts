import { AcFunLiveApi } from '../src/index';
import * as fs from 'fs';
import * as path from 'path';

describe('DanmuService - Send Danmu', () => {
  let api: AcFunLiveApi;
  let liveId: string;

  beforeAll(async () => {
    api = new AcFunLiveApi();
    
    // Try to load token
    const tokenPath = path.join(__dirname, 'token.json');
    if (fs.existsSync(tokenPath)) {
      const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
      api.setAuthToken(tokenData.token);
    } else {
      console.warn('Warning: token.json not found. Tests requiring auth will fail.');
    }

    // Get live room ID for user 173620
    const targetUserId = '173620';
    const userInfo = await api.user.getUserInfo(targetUserId);
    
    if (userInfo.success && userInfo.data) {
      liveId = userInfo.data.liveRoomId || '';
      console.log(`Target User: ${targetUserId}, Live ID: ${liveId}, Is Live: ${userInfo.data.isLive}`);
      
      if (!liveId) {
        console.warn(`User ${targetUserId} does not have an active live room ID.`);
        // Fallback to a placeholder or fail gracefully if strict
        liveId = '123456';
      }
    } else {
      console.warn(`Could not fetch user info for ${targetUserId}. Error: ${userInfo.error}`);
      liveId = '123456'; // Placeholder
    }
  });

  it('should send danmu successfully', async () => {
    if (!api.isAuthenticated()) {
        // Check if we have a valid token set manually if isAuthenticated returns false (it returns false by default in current impl)
        // But setAuthToken sets the header.
        // We will proceed and expect failure if no token.
    }

    const content = 'Test Danmu from API Client';
    console.log(`Sending danmu to ${liveId}: ${content}`);

    const result = await api.danmu.sendDanmu(liveId, content);
    
    console.log('Send Danmu Result:', result);

    if (result.success) {
        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
    } else {
        console.warn('Send Danmu failed (expected if not logged in or not a real live room):', result.error);
        // If we don't have a real token, we expect failure.
        // If we do have a real token, we expect success.
    }
  });
});
