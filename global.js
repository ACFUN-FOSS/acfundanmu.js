// 常量定义
const heartbeatJSON = JSON.stringify({ type: 1 });
const respJSON = '{"type":%d,"requestID":"%s","result":1,"data":%s}';
const respNoDataJSON = '{"type":%d,"requestID":"%s","result":1}';
const respErrJSON = '{"type":%d,"requestID":"%s","result":%d,"error":"%s"}';
const danmuJSON = '{"liverUID":%d,"type":%d,"data":%s}';
const danmuNoDataJSON = '{"liverUID":%d,"type":%d}';

// 基础类型
const heartbeatType = 1;
const loginType = 2;
const setClientIDType = 3;
const requestForwardDataType = 4;
const forwardDataType = 5;
const setTokenType = 6;
const QRCodeLoginType = 7;
const QRCodeScannedType = 8;
const QRCodeLoginCancelType = 9;
const QRCodeLoginSuccessType = 10;

// 命令类型
const getDanmuType = 100;
const stopDanmuType = 101;
const getWatchingListType = 102;
const getBillboardType = 103;
const getSummaryType = 104;
const getLuckListType = 105;
const getPlaybackType = 106;
const getAllGiftListType = 107;
const getWalletBalanceType = 108;
const getUserLiveInfoType = 109;
const getAllLiveListType = 110;
const uploadImageType = 111;
const getLiveDataType = 112;
const getScheduleListType = 113;
const getGiftListType = 114;
const getUserInfoType = 115;
const getLiveCutInfoType = 116;

// 房管相关命令类型
const getManagerListType = 200;
const addManagerType = 201;
const removeManagerType = 202;
const getKickRecordType = 203;
const managerKickUserType = 204;
const authorKickUserType = 205;

// 守护徽章相关命令类型
const getMedalDetailType = 300;
const getMedalListType = 301;
const getMedalRankType = 302;
const getUserWearingMedalType = 303;
const wearMedalType = 304;
const unwearMedalType = 305;

// 直播管理相关命令类型
const checkLiveAuthType = 900;
const getLiveCategoryListType = 901;
const getStreamConfigType = 902;
const getLiveStatusType = 903;
const getTranscodeInfoType = 904;
const startLiveType = 905;
const stopLiveType = 906;
const updateLiveInfoType = 907;
const checkCanCutType = 908;
const setCanCutType = 909;

// 错误码
const jsonParseErr = 10;
const invalidReqType = 11;
const invalidReqData = 12;
const reqHandleErr = 13;
const needLogin = 14;

// 超时设置
const timeout = 10 * 1000; // 10秒
const idleTimeout = 60 * 1000; // 60秒

// 导出
module.exports = {
  heartbeatJSON,
  respJSON,
  respNoDataJSON,
  respErrJSON,
  danmuJSON,
  danmuNoDataJSON,
  heartbeatType,
  loginType,
  setClientIDType,
  requestForwardDataType,
  forwardDataType,
  setTokenType,
  QRCodeLoginType,
  QRCodeScannedType,
  QRCodeLoginCancelType,
  QRCodeLoginSuccessType,
  getDanmuType,
  stopDanmuType,
  getWatchingListType,
  getBillboardType,
  getSummaryType,
  getLuckListType,
  getPlaybackType,
  getAllGiftListType,
  getWalletBalanceType,
  getUserLiveInfoType,
  getAllLiveListType,
  uploadImageType,
  getLiveDataType,
  getScheduleListType,
  getGiftListType,
  getUserInfoType,
  getLiveCutInfoType,
  jsonParseErr,
  invalidReqType,
  invalidReqData,
  reqHandleErr,
  needLogin,
  timeout,
  idleTimeout
};