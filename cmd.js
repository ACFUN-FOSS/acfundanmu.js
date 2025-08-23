const { respJSON, respNoDataJSON, respErrJSON, reqHandleErr, invalidReqData } = require('./global');
const fastJsonStringify = require('fast-json-stringify');

// 命令分发映射
const cmdDispatch = new Map();

// 初始化命令分发
function initCmdDispatch() {
  cmdDispatch.set(getWatchingListType, handleGetWatchingList);
  cmdDispatch.set(getBillboardType, handleGetBillboard);
  cmdDispatch.set(getSummaryType, handleGetSummary);
  cmdDispatch.set(getLuckListType, handleGetLuckList);
  cmdDispatch.set(getPlaybackType, handleGetPlayback);
  cmdDispatch.set(getAllGiftListType, handleGetAllGiftList);
  cmdDispatch.set(getWalletBalanceType, handleGetWalletBalance);
  cmdDispatch.set(getUserLiveInfoType, handleGetUserLiveInfo);
  cmdDispatch.set(getAllLiveListType, handleGetAllLiveList);
  cmdDispatch.set(getLiveDataType, handleGetLiveData);
  cmdDispatch.set(getGiftListType, handleGetGiftList);
  cmdDispatch.set(getUserInfoType, handleGetUserInfo);
  cmdDispatch.set(uploadImageType, handleUploadImage);
  cmdDispatch.set(getScheduleListType, handleGetScheduleList);
  cmdDispatch.set(getLiveCutInfoType, handleGetLiveCutInfo);
  // 房管相关命令
  cmdDispatch.set(getManagerListType, handleGetManagerList);
  cmdDispatch.set(addManagerType, handleAddManager);
  cmdDispatch.set(removeManagerType, handleRemoveManager);
  cmdDispatch.set(getKickRecordType, handleGetKickRecord);
  cmdDispatch.set(modKickUserType, handleModKickUser);
  cmdDispatch.set(hostKickUserType, handleHostKickUser);
  // 守护徽章相关命令
  cmdDispatch.set(getMedalDetailType, handleGetMedalDetail);
  cmdDispatch.set(getMedalListType, handleGetMedalList);
  cmdDispatch.set(getMedalRankType, handleGetMedalRank);
  cmdDispatch.set(getUserMedalType, handleGetUserMedal);
  cmdDispatch.set(wearMedalType, handleWearMedal);
  cmdDispatch.set(unwearMedalType, handleUnwearMedal);
  // 直播管理相关命令
  cmdDispatch.set(checkLiveAuthType, handleCheckLiveAuth);
  cmdDispatch.set(getLiveCategoryType, handleGetLiveCategory);
  cmdDispatch.set(getStreamSettingType, handleGetStreamSetting);
  cmdDispatch.set(getLiveStatusType, handleGetLiveStatus);
  cmdDispatch.set(getTranscodeInfoType, handleGetTranscodeInfo);
  cmdDispatch.set(startLiveType, handleStartLive);
  cmdDispatch.set(stopLiveType, handleStopLive);
  cmdDispatch.set(updateLiveInfoType, handleUpdateLiveInfo);
  cmdDispatch.set(checkAllowCutType, handleCheckAllowCut);
  cmdDispatch.set(setAllowCutType, handleSetAllowCut);
}

// 处理命令
async function handleCommand(conn, msg, reqType, reqID) {
  try {
    const handler = cmdDispatch.get(reqType);
    if (!handler) {
      conn.debug('Unknown command type: %d', reqType);
      await conn.send(fastJsonStringify({
        type: reqType,
        requestID: reqID,
        result: invalidReqType,
        error: `Unknown command type: ${reqType}`
      }));
      return;
    }

    await handler(conn, msg, reqID);
  } catch (error) {
    conn.debug('handleCommand(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: reqType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 处理登录命令
async function handleLogin(conn, account, password, reqID) {
  try {
    conn.debug('Client requests login');
    const { AcFunLive, TCPDanmuClient, WebSocketDanmuClient } = require('./acfundanmu');
    const danmuClient = require('./main').danmuClient;

    let newAC;
    if (!account || !password) {
      // 匿名登录
      newAC = await AcFunLive.create(danmuClient());
    } else {
      // 账号密码登录
      const cookies = await AcFunLive.login(account, password);
      newAC = await AcFunLive.create(danmuClient(), { cookies });
    }

    conn.debug('Client\'s login is successful, uid is %d', newAC.getUserID());

    // 存储ac实例
    conn.acMap.set(0, {
      conn,
      ac: newAC,
      cancel: null
    });

    // 获取token信息
    const tokenInfo = newAC.getTokenInfo();
    await conn.send(fastJsonStringify({
      type: loginType,
      requestID: reqID,
      result: 1,
      data: { tokenInfo }
    }));
  } catch (error) {
    conn.debug('handleLogin(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: loginType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 处理扫码登录命令
async function handleLoginWithQRCode(conn, reqID) {
  try {
    conn.debug('Client requests login with QR code');
    const { AcFunLive } = require('./acfundanmu');
    const danmuClient = require('./main').danmuClient;

    // 显示二维码
    const showQRCode = (qrCode) => {
      conn.send(fastJsonStringify({
        type: QRCodeLoginType,
        requestID: reqID,
        result: 1,
        data: qrCode
      }));
    };

    // 二维码已扫描
    const onScanned = () => {
      conn.send(fastJsonStringify({
        type: QRCodeScannedType,
        requestID: reqID,
        result: 1
      }));
    };

    // 执行扫码登录
    const cookies = await AcFunLive.loginWithQRCode(showQRCode, onScanned);

    if (!cookies) {
      conn.debug('Login with QR code is expired or cancelled by user');
      await conn.send(fastJsonStringify({
        type: QRCodeLoginCancelType,
        requestID: reqID,
        result: 1
      }));
      return;
    }

    // 创建AcFunLive实例
    const newAC = await AcFunLive.create(danmuClient(), { cookies });
    conn.debug('Client\'s login is successful, uid is %d', newAC.getUserID());

    // 存储ac实例
    conn.acMap.set(0, {
      conn,
      ac: newAC,
      cancel: null
    });

    // 获取token信息
    const tokenInfo = newAC.getTokenInfo();
    await conn.send(fastJsonStringify({
      type: QRCodeLoginSuccessType,
      requestID: reqID,
      result: 1,
      data: { tokenInfo }
    }));
  } catch (error) {
    conn.debug('handleLoginWithQRCode(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: QRCodeLoginType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 处理设置token命令
async function handleSetToken(conn, token, reqID) {
  try {
    conn.debug('Client sets token');
    const { AcFunLive } = require('./acfundanmu');
    const danmuClient = require('./main').danmuClient;

    // 使用token创建实例
    const newAC = await AcFunLive.create(danmuClient(), { tokenInfo: token });

    // 存储ac实例
    conn.acMap.set(0, {
      conn,
      ac: newAC,
      cancel: null
    });

    await conn.send(fastJsonStringify({
      type: setTokenType,
      requestID: reqID,
      result: 1
    }));
  } catch (error) {
    conn.debug('handleSetToken(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: setTokenType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 获取观看列表
async function handleGetWatchingList(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: getWatchingListType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const liveID = msg.data?.liveID;
    if (!liveID) {
      conn.debug('getWatchingList(): No liveID');
      await conn.send(fastJsonStringify({
        type: getWatchingListType,
        requestID: reqID,
        result: invalidReqData,
        error: 'Need liveID'
      }));
      return;
    }

    const watchingList = await ac.ac.getWatchingList(liveID);
    await conn.send(fastJsonStringify({
      type: getWatchingListType,
      requestID: reqID,
      result: 1,
      data: watchingList
    }));
  } catch (error) {
    conn.debug('handleGetWatchingList(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: getWatchingListType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 获取排行榜
async function handleGetBillboard(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: getBillboardType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const billboard = await ac.ac.getBillboard();
    await conn.send(fastJsonStringify({
      type: getBillboardType,
      requestID: reqID,
      result: 1,
      data: billboard
    }));
  } catch (error) {
    conn.debug('handleGetBillboard(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: getBillboardType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 获取摘要信息
async function handleGetSummary(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: getSummaryType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const summary = await ac.ac.getSummary();
    await conn.send(fastJsonStringify({
      type: getSummaryType,
      requestID: reqID,
      result: 1,
      data: summary
    }));
  } catch (error) {
    conn.debug('handleGetSummary(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: getSummaryType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 获取幸运列表
async function handleGetLuckList(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: getLuckListType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const luckList = await ac.ac.getLuckList();
    await conn.send(fastJsonStringify({
      type: getLuckListType,
      requestID: reqID,
      result: 1,
      data: luckList
    }));
  } catch (error) {
    conn.debug('handleGetLuckList(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: getLuckListType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 获取回放信息
async function handleGetPlayback(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: getPlaybackType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const liveID = msg.data?.liveID;
    if (!liveID) {
      conn.debug('getPlayback(): No liveID');
      await conn.send(fastJsonStringify({
        type: getPlaybackType,
        requestID: reqID,
        result: invalidReqData,
        error: 'Need liveID'
      }));
      return;
    }

    const playback = await ac.ac.getPlayback(liveID);
    await conn.send(fastJsonStringify({
      type: getPlaybackType,
      requestID: reqID,
      result: 1,
      data: playback
    }));
  } catch (error) {
    conn.debug('handleGetPlayback(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: getPlaybackType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 获取全部礼物列表
async function handleGetAllGiftList(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: getAllGiftListType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const giftList = await ac.ac.getAllGiftList();
    // 排序
    giftList.sort((a, b) => a.GiftID - b.GiftID);
    await conn.send(fastJsonStringify({
      type: getAllGiftListType,
      requestID: reqID,
      result: 1,
      data: giftList
    }));
  } catch (error) {
    conn.debug('handleGetAllGiftList(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: getAllGiftListType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 获取账户钱包数据
async function handleGetWalletBalance(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: getWalletBalanceType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const [acCoin, banana] = await ac.ac.getWalletBalance();
    await conn.send(fastJsonStringify({
      type: getWalletBalanceType,
      requestID: reqID,
      result: 1,
      data: { acCoin, banana }
    }));
  } catch (error) {
    conn.debug('handleGetWalletBalance(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: getWalletBalanceType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 获取用户直播信息
async function handleGetUserLiveInfo(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: getUserLiveInfoType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const userLiveInfo = await ac.ac.getUserLiveInfo();
    await conn.send(fastJsonStringify({
      type: getUserLiveInfoType,
      requestID: reqID,
      result: 1,
      data: userLiveInfo
    }));
  } catch (error) {
    conn.debug('handleGetUserLiveInfo(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: getUserLiveInfoType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 获取所有直播列表
async function handleGetAllLiveList(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: getAllLiveListType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const allLiveList = await ac.ac.getAllLiveList();
    await conn.send(fastJsonStringify({
      type: getAllLiveListType,
      requestID: reqID,
      result: 1,
      data: allLiveList
    }));
  } catch (error) {
    conn.debug('handleGetAllLiveList(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: getAllLiveListType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 获取直播数据
async function handleGetLiveData(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: getLiveDataType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const days = msg.data?.days || 7; // 默认获取最近7天的数据
    const liveData = await ac.ac.getLiveData(days);
    await conn.send(fastJsonStringify({
      type: getLiveDataType,
      requestID: reqID,
      result: 1,
      data: liveData
    }));
  } catch (error) {
    conn.debug('handleGetLiveData(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: getLiveDataType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 获取直播间礼物列表
async function handleGetGiftList(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: getGiftListType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const liveID = msg.data?.liveID;
    if (!liveID) {
      conn.debug('getGiftList(): No liveID');
      await conn.send(fastJsonStringify({
        type: getGiftListType,
        requestID: reqID,
        result: invalidReqData,
        error: 'Need liveID'
      }));
      return;
    }

    const giftList = await ac.ac.getGiftList(liveID);
    await conn.send(fastJsonStringify({
      type: getGiftListType,
      requestID: reqID,
      result: 1,
      data: giftList
    }));
  } catch (error) {
    conn.debug('handleGetGiftList(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: getGiftListType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 获取用户信息
async function handleGetUserInfo(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: getUserInfoType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const userID = msg.data?.userID;
    const userInfo = await ac.ac.getUserInfo(userID);
    await conn.send(fastJsonStringify({
      type: getUserInfoType,
      requestID: reqID,
      result: 1,
      data: userInfo
    }));
  } catch (error) {
    conn.debug('handleGetUserInfo(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: getUserInfoType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 上传图片
async function handleUploadImage(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: uploadImageType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const imagePath = msg.data?.imagePath;
    if (!imagePath) {
      conn.debug('uploadImage(): No imagePath');
      await conn.send(fastJsonStringify({
        type: uploadImageType,
        requestID: reqID,
        result: invalidReqData,
        error: 'Need imagePath'
      }));
      return;
    }

    const uploadResult = await ac.ac.uploadImage(imagePath);
    await conn.send(fastJsonStringify({
      type: uploadImageType,
      requestID: reqID,
      result: 1,
      data: uploadResult
    }));
  } catch (error) {
    conn.debug('handleUploadImage(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: uploadImageType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 获取直播预告列表
async function handleGetScheduleList(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: getScheduleListType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const scheduleList = await ac.ac.getScheduleList();
    await conn.send(fastJsonStringify({
      type: getScheduleListType,
      requestID: reqID,
      result: 1,
      data: scheduleList
    }));
  } catch (error) {
    conn.debug('handleGetScheduleList(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: getScheduleListType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 获取直播剪辑信息
async function handleGetLiveCutInfo(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: getLiveCutInfoType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const liverUID = msg.data?.liverUID;
    const liveID = msg.data?.liveID;
    if (!liverUID || !liveID) {
      conn.debug('getLiveCutInfo(): No liverUID or liveID');
      await conn.send(fastJsonStringify({
        type: getLiveCutInfoType,
        requestID: reqID,
        result: invalidReqData,
        error: 'Need liverUID and liveID'
      }));
      return;
    }

    const liveCutInfo = await ac.ac.getLiveCutInfo(liverUID, liveID);
    await conn.send(fastJsonStringify({
      type: getLiveCutInfoType,
      requestID: reqID,
      result: 1,
      data: liveCutInfo
    }));
  } catch (error) {
    conn.debug('handleGetLiveCutInfo(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: getLiveCutInfoType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 获取房管列表
async function handleGetManagerList(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: getManagerListType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const liverUID = msg.data?.liverUID;
    if (!liverUID) {
      conn.debug('getManagerList(): No liverUID');
      await conn.send(fastJsonStringify({
        type: getManagerListType,
        requestID: reqID,
        result: invalidReqData,
        error: 'Need liverUID'
      }));
      return;
    }

    const managerList = await ac.ac.getManagerList(liverUID);
    await conn.send(fastJsonStringify({
      type: getManagerListType,
      requestID: reqID,
      result: 1,
      data: managerList
    }));
  } catch (error) {
    conn.debug('handleGetManagerList(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: getManagerListType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 添加房管
async function handleAddManager(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: addManagerType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const { liverUID, userID } = msg.data;
    if (!liverUID || !userID) {
      conn.debug('addManager(): No liverUID or userID');
      await conn.send(fastJsonStringify({
        type: addManagerType,
        requestID: reqID,
        result: invalidReqData,
        error: 'Need liverUID and userID'
      }));
      return;
    }

    const result = await ac.ac.addManager(liverUID, userID);
    await conn.send(fastJsonStringify({
      type: addManagerType,
      requestID: reqID,
      result: 1,
      data: result
    }));
  } catch (error) {
    conn.debug('handleAddManager(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: addManagerType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 删除房管
async function handleRemoveManager(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: removeManagerType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const { liverUID, userID } = msg.data;
    if (!liverUID || !userID) {
      conn.debug('removeManager(): No liverUID or userID');
      await conn.send(fastJsonStringify({
        type: removeManagerType,
        requestID: reqID,
        result: invalidReqData,
        error: 'Need liverUID and userID'
      }));
      return;
    }

    const result = await ac.ac.removeManager(liverUID, userID);
    await conn.send(fastJsonStringify({
      type: removeManagerType,
      requestID: reqID,
      result: 1,
      data: result
    }));
  } catch (error) {
    conn.debug('handleRemoveManager(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: removeManagerType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 获取踢人记录
async function handleGetKickRecord(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: getKickRecordType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const liverUID = msg.data?.liverUID;
    if (!liverUID) {
      conn.debug('getKickRecord(): No liverUID');
      await conn.send(fastJsonStringify({
        type: getKickRecordType,
        requestID: reqID,
        result: invalidReqData,
        error: 'Need liverUID'
      }));
      return;
    }

    const kickRecord = await ac.ac.getKickRecord(liverUID);
    await conn.send(fastJsonStringify({
      type: getKickRecordType,
      requestID: reqID,
      result: 1,
      data: kickRecord
    }));
  } catch (error) {
    conn.debug('handleGetKickRecord(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: getKickRecordType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 房管踢人
async function handleModKickUser(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: modKickUserType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const { liverUID, userID, duration, reason } = msg.data;
    if (!liverUID || !userID) {
      conn.debug('modKickUser(): No liverUID or userID');
      await conn.send(fastJsonStringify({
        type: modKickUserType,
        requestID: reqID,
        result: invalidReqData,
        error: 'Need liverUID and userID'
      }));
      return;
    }

    const result = await ac.ac.modKickUser(liverUID, userID, duration, reason);
    await conn.send(fastJsonStringify({
      type: modKickUserType,
      requestID: reqID,
      result: 1,
      data: result
    }));
  } catch (error) {
    conn.debug('handleModKickUser(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: modKickUserType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 主播踢人
async function handleHostKickUser(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: hostKickUserType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const { userID, duration, reason } = msg.data;
    if (!userID) {
      conn.debug('hostKickUser(): No userID');
      await conn.send(fastJsonStringify({
        type: hostKickUserType,
        requestID: reqID,
        result: invalidReqData,
        error: 'Need userID'
      }));
      return;
    }

    const result = await ac.ac.hostKickUser(userID, duration, reason);
    await conn.send(fastJsonStringify({
      type: hostKickUserType,
      requestID: reqID,
      result: 1,
      data: result
    }));
  } catch (error) {
    conn.debug('handleHostKickUser(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: hostKickUserType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 获取守护徽章详情
async function handleGetMedalDetail(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: getMedalDetailType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const { liverUID, medalID } = msg.data;
    if (!liverUID || !medalID) {
      conn.debug('getMedalDetail(): No liverUID or medalID');
      await conn.send(fastJsonStringify({
        type: getMedalDetailType,
        requestID: reqID,
        result: invalidReqData,
        error: 'Need liverUID and medalID'
      }));
      return;
    }

    const medalDetail = await ac.ac.getMedalDetail(liverUID, medalID);
    await conn.send(fastJsonStringify({
      type: getMedalDetailType,
      requestID: reqID,
      result: 1,
      data: medalDetail
    }));
  } catch (error) {
    conn.debug('handleGetMedalDetail(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: getMedalDetailType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 获取守护徽章列表
async function handleGetMedalList(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: getMedalListType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const medalList = await ac.ac.getMedalList();
    await conn.send(fastJsonStringify({
      type: getMedalListType,
      requestID: reqID,
      result: 1,
      data: medalList
    }));
  } catch (error) {
    conn.debug('handleGetMedalList(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: getMedalListType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 获取守护榜
async function handleGetMedalRank(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: getMedalRankType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const liverUID = msg.data?.liverUID;
    if (!liverUID) {
      conn.debug('getMedalRank(): No liverUID');
      await conn.send(fastJsonStringify({
        type: getMedalRankType,
        requestID: reqID,
        result: invalidReqData,
        error: 'Need liverUID'
      }));
      return;
    }

    const medalRank = await ac.ac.getMedalRank(liverUID);
    await conn.send(fastJsonStringify({
      type: getMedalRankType,
      requestID: reqID,
      result: 1,
      data: medalRank
    }));
  } catch (error) {
    conn.debug('handleGetMedalRank(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: getMedalRankType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 获取用户佩戴的徽章
async function handleGetUserMedal(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: getUserMedalType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const userID = msg.data?.userID;
    if (!userID) {
      conn.debug('getUserMedal(): No userID');
      await conn.send(fastJsonStringify({
        type: getUserMedalType,
        requestID: reqID,
        result: invalidReqData,
        error: 'Need userID'
      }));
      return;
    }

    const userMedal = await ac.ac.getUserMedal(userID);
    await conn.send(fastJsonStringify({
      type: getUserMedalType,
      requestID: reqID,
      result: 1,
      data: userMedal
    }));
  } catch (error) {
    conn.debug('handleGetUserMedal(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: getUserMedalType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 佩戴守护徽章
async function handleWearMedal(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: wearMedalType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const { liverUID, medalID } = msg.data;
    if (!liverUID || !medalID) {
      conn.debug('wearMedal(): No liverUID or medalID');
      await conn.send(fastJsonStringify({
        type: wearMedalType,
        requestID: reqID,
        result: invalidReqData,
        error: 'Need liverUID and medalID'
      }));
      return;
    }

    const result = await ac.ac.wearMedal(liverUID, medalID);
    await conn.send(fastJsonStringify({
      type: wearMedalType,
      requestID: reqID,
      result: 1,
      data: result
    }));
  } catch (error) {
    conn.debug('handleWearMedal(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: wearMedalType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 取消佩戴守护徽章
async function handleUnwearMedal(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: unwearMedalType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const result = await ac.ac.unwearMedal();
    await conn.send(fastJsonStringify({
      type: unwearMedalType,
      requestID: reqID,
      result: 1,
      data: result
    }));
  } catch (error) {
    conn.debug('handleUnwearMedal(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: unwearMedalType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 检测开播权限
async function handleCheckLiveAuth(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: checkLiveAuthType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const authInfo = await ac.ac.checkLiveAuth();
    await conn.send(fastJsonStringify({
      type: checkLiveAuthType,
      requestID: reqID,
      result: 1,
      data: authInfo
    }));
  } catch (error) {
    conn.debug('handleCheckLiveAuth(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: checkLiveAuthType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 获取直播分类列表
async function handleGetLiveCategory(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: getLiveCategoryType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const categoryList = await ac.ac.getLiveCategory();
    await conn.send(fastJsonStringify({
      type: getLiveCategoryType,
      requestID: reqID,
      result: 1,
      data: categoryList
    }));
  } catch (error) {
    conn.debug('handleGetLiveCategory(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: getLiveCategoryType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 获取推流设置
async function handleGetStreamSetting(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: getStreamSettingType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const setting = await ac.ac.getStreamSetting();
    await conn.send(fastJsonStringify({
      type: getStreamSettingType,
      requestID: reqID,
      result: 1,
      data: setting
    }));
  } catch (error) {
    conn.debug('handleGetStreamSetting(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: getStreamSettingType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 获取直播状态
async function handleGetLiveStatus(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: getLiveStatusType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const status = await ac.ac.getLiveStatus();
    await conn.send(fastJsonStringify({
      type: getLiveStatusType,
      requestID: reqID,
      result: 1,
      data: status
    }));
  } catch (error) {
    conn.debug('handleGetLiveStatus(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: getLiveStatusType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 获取转码信息
async function handleGetTranscodeInfo(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: getTranscodeInfoType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const transcodeInfo = await ac.ac.getTranscodeInfo();
    await conn.send(fastJsonStringify({
      type: getTranscodeInfoType,
      requestID: reqID,
      result: 1,
      data: transcodeInfo
    }));
  } catch (error) {
    conn.debug('handleGetTranscodeInfo(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: getTranscodeInfoType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 开始直播
async function handleStartLive(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: startLiveType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const { categoryID, title, coverPath } = msg.data;
    if (!categoryID || !title) {
      conn.debug('startLive(): No categoryID or title');
      await conn.send(fastJsonStringify({
        type: startLiveType,
        requestID: reqID,
        result: invalidReqData,
        error: 'Need categoryID and title'
      }));
      return;
    }

    const liveInfo = await ac.ac.startLive(categoryID, title, coverPath);
    await conn.send(fastJsonStringify({
      type: startLiveType,
      requestID: reqID,
      result: 1,
      data: liveInfo
    }));
  } catch (error) {
    conn.debug('handleStartLive(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: startLiveType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 停止直播
async function handleStopLive(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: stopLiveType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const result = await ac.ac.stopLive();
    await conn.send(fastJsonStringify({
      type: stopLiveType,
      requestID: reqID,
      result: 1,
      data: result
    }));
  } catch (error) {
    conn.debug('handleStopLive(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: stopLiveType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 更新直播间信息
async function handleUpdateLiveInfo(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: updateLiveInfoType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const { title, coverPath } = msg.data;
    if (!title) {
      conn.debug('updateLiveInfo(): No title');
      await conn.send(fastJsonStringify({
        type: updateLiveInfoType,
        requestID: reqID,
        result: invalidReqData,
        error: 'Need title'
      }));
      return;
    }

    const result = await ac.ac.updateLiveInfo(title, coverPath);
    await conn.send(fastJsonStringify({
      type: updateLiveInfoType,
      requestID: reqID,
      result: 1,
      data: result
    }));
  } catch (error) {
    conn.debug('handleUpdateLiveInfo(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: updateLiveInfoType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 检查是否允许观众剪辑
async function handleCheckAllowCut(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: checkAllowCutType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const allowCut = await ac.ac.checkAllowCut();
    await conn.send(fastJsonStringify({
      type: checkAllowCutType,
      requestID: reqID,
      result: 1,
      data: { allowCut }
    }));
  } catch (error) {
    conn.debug('handleCheckAllowCut(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: checkAllowCutType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 设置是否允许观众剪辑
async function handleSetAllowCut(conn, msg, reqID) {
  try {
    const ac = conn.acMap.get(0);
    if (!ac) {
      await conn.send(fastJsonStringify({
        type: setAllowCutType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      }));
      return;
    }

    const { allowCut } = msg.data;
    if (typeof allowCut !== 'boolean') {
      conn.debug('setAllowCut(): Invalid allowCut value');
      await conn.send(fastJsonStringify({
        type: setAllowCutType,
        requestID: reqID,
        result: invalidReqData,
        error: 'allowCut must be boolean'
      }));
      return;
    }

    const result = await ac.ac.setAllowCut(allowCut);
    await conn.send(fastJsonStringify({
      type: setAllowCutType,
      requestID: reqID,
      result: 1,
      data: result
    }));
  } catch (error) {
    conn.debug('handleSetAllowCut(): error: %v', error);
    await conn.send(fastJsonStringify({
      type: setAllowCutType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    }));
  }
}

// 初始化命令分发
initCmdDispatch();

// 导出
module.exports = {
  handleCommand,
  handleLogin,
  handleLoginWithQRCode,
  handleSetToken
};