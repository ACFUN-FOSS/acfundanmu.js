
const { parseUserInfo } = require('../dist/core/EventParser');
const fs = require('fs');
const path = require('path');

const mockUserInfoData = {
  userId: "214844",
  nickname: "朝灵ACFUN唯一指定三次元老公",
  avatar: [
    {
      url: "https://imgs.aixifan.com/FsKfHpfsYWpWRGkZDsS_emNN_Agj"
    }
  ],
  badge: "{\"medalInfo\":{\"uperId\":23682490,\"userId\":214844,\"clubName\":\"ACER\",\"level\":8}}",
  userIdentity: {
    managerType: 1 // Assuming 1 matches ManagerType enum, though in raw it was "NORMAL" which might be enum value
  }
};

console.log('Testing parseUserInfo with mock data containing badge...');
const result = parseUserInfo(mockUserInfoData);
console.log('Result:', JSON.stringify(result, null, 2));

if (result.medal.clubName === 'ACER' && result.medal.level === 8) {
  console.log('SUCCESS: Medal info parsed correctly.');
} else {
  console.error('FAILURE: Medal info not parsed correctly.');
  process.exit(1);
}
