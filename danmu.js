const { reqHandleErr, needLogin, getDanmuType, stopDanmuType } = require('./global');
const { AcFunLive } = require('./acfundanmu');
const fastJsonStringify = require('fast-json-stringify');

// 弹幕类型
const commentType = 1000;
const likeType = 1001;
const enterRoomType = 1002;
const followAuthorType = 1003;
const throwBananaType = 1004;
const giftType = 1005;
const richTextType = 1006;
const joinClubType = 1007;
const shareLiveType = 1008;

// 状态信号类型
const bananaCountType = 2001;
const displayInfoType = 2002;
const topUsersType = 2003;
const recentCommentType = 2004;
const redpackListType = 2005;
const danmuStopErrType = 2999;

// 富文本类型
const richTextUserInfoType = 1900;
const richTextPlainType = 1901;
const richTextImageType = 1902;

// 全局存储活动连接
const activeConnections = new Map();

// 获取弹幕
async function getDanmu(response, uid, reqID, acMap) {
  try {
    if (conn.acMap.has(uid)) {
      await conn.send(fastJsonStringify({
        type: getDanmuType,
        requestID: reqID,
        result: 1,
        data: { liverUID: uid }
      }));
      return;
    }

    // 获取登录的ac实例
    const ac = acMap.get(0);
    if (!ac) {
      response.write(`data: ${JSON.stringify({
        type: getDanmuType,
        requestID: reqID,
        result: needLogin,
        error: 'Need login first'
      })}

`);
      response.end();
      return;
    }

    // 设置主播UID
    const newAC = await ac.ac.setLiverUID(uid);

    // 创建新的acLive实例
    const liveAC = {
      response,
      ac: newAC,
      cancel: null
    };
    const connectionKey = `${uid}:${reqID}`;
    activeConnections.set(connectionKey, liveAC);

    // 监听连接关闭事件
    response.on('close', () => {
      if (liveAC.cancel) {
        liveAC.cancel();
      }
      activeConnections.delete(connectionKey);
    });

    // 获取流信息
    const info = newAC.getStreamInfo();
    response.write(`data: ${JSON.stringify({
      type: getDanmuType,
      requestID: reqID,
      result: 1,
      data: { liverUID: uid, StreamInfo: info }
    })}

`);

    // 创建上下文
    const ctx = {}; // 在Node.js中，我们可以使用对象代替context
    const errCh = []; // 使用数组代替channel

    // 设置事件监听
    newAC.onComment((d) => {
      try {
        const data = JSON.stringify(d);
        response.write(`data: ${JSON.stringify({
          liverUID: uid,
          type: commentType,
          data: JSON.parse(data)
        })}

`);
      } catch (error) {
        console.error('OnComment(): cannot stringify to json:', d);
        errCh.push(error);
      }
    });

    newAC.onLike((d) => {
      try {
        const data = JSON.stringify(d);
        response.write(`data: ${JSON.stringify({
          liverUID: uid,
          type: likeType,
          data: JSON.parse(data)
        })}

`);
      } catch (error) {
        console.error('OnLike(): cannot stringify to json:', d);
        errCh.push(error);
      }
    });

    newAC.onEnterRoom((d) => {
      try {
        const data = JSON.stringify(d);
        response.write(`data: ${JSON.stringify({
          liverUID: uid,
          type: enterRoomType,
          data: JSON.parse(data)
        })}

`);
      } catch (error) {
        console.error('OnEnterRoom(): cannot stringify to json:', d);
        errCh.push(error);
      }
    });

    newAC.onFollowAuthor((d) => {
      try {
        const data = JSON.stringify(d);
        response.write(`data: ${JSON.stringify({
          liverUID: uid,
          type: followAuthorType,
          data: JSON.parse(data)
        })}

`);
      } catch (error) {
        console.error('OnFollowAuthor(): cannot stringify to json:', d);
        errCh.push(error);
      }
    });

    newAC.onThrowBanana((d) => {
      try {
        const data = JSON.stringify(d);
        response.write(`data: ${JSON.stringify({
          liverUID: uid,
          type: throwBananaType,
          data: JSON.parse(data)
        })}

`);
      } catch (error) {
        console.error('OnThrowBanana(): cannot stringify to json:', d);
        errCh.push(error);
      }
    });

    newAC.onGift((d) => {
      try {
        const data = JSON.stringify(d);
        response.write(`data: ${JSON.stringify({
          liverUID: uid,
          type: giftType,
          data: JSON.parse(data)
        })}

`);
      } catch (error) {
        console.error('OnGift(): cannot stringify to json:', d);
        errCh.push(error);
      }
    });

    newAC.onRichText((d) => {
      try {
        const segments = [];
        for (const r of d.Segments) {
          if (r.type === 'userInfo') {
            segments.push({
              type: richTextUserInfoType,
              segment: r
            });
          } else if (r.type === 'plain') {
            segments.push({
              type: richTextPlainType,
              segment: r
            });
          } else if (r.type === 'image') {
            segments.push({
              type: richTextImageType,
              segment: r
            });
          }
        }

        const data = {
          sendTime: d.SendTime,
          segments: segments
        };

        response.write(`data: ${JSON.stringify({
          liverUID: uid,
          type: richTextType,
          data: data
        })}

`);
      } catch (error) {
        console.error('OnRichText(): cannot stringify to json:', d);
        errCh.push(error);
      }
    });

    newAC.onJoinClub((d) => {
      try {
        const data = JSON.stringify(d);
        response.write(`data: ${JSON.stringify({
          liverUID: uid,
          type: joinClubType,
          data: JSON.parse(data)
        })}

`);
      } catch (error) {
        console.error('OnJoinClub(): cannot stringify to json:', d);
        errCh.push(error);
      }
    });

    newAC.onShareLive((d) => {
      try {
        const data = JSON.stringify(d);
        response.write(`data: ${JSON.stringify({
          liverUID: uid,
          type: shareLiveType,
          data: JSON.parse(data)
        })}

`);
      } catch (error) {
        console.error('OnShareLive(): cannot stringify to json:', d);
        errCh.push(error);
      }
    });

    newAC.onDanmuStop((err) => {
      try {
        if (!err) {
          response.write(`data: ${JSON.stringify({
            liverUID: uid,
            type: stopDanmuType
          })}

`);
        } else {
          response.write(`data: ${JSON.stringify({
            liverUID: uid,
            type: danmuStopErrType,
            data: { error: err.message }
          })}

`);
        }
      } catch (error) {
        console.error('OnDanmuStop(): error:', error);
        errCh.push(error);
      }

      // 清理资源
      setTimeout(() => {
        activeConnections.delete(connectionKey);
        response.end();
      }, 1000);
    });

    newAC.onBananaCount((allBananaCount) => {
      try {
        response.write(`data: ${JSON.stringify({
          liverUID: uid,
          type: bananaCountType,
          data: { bananaCount: allBananaCount }
        })}

`);
      } catch (error) {
        console.error('OnBananaCount(): error:', error);
        errCh.push(error);
      }
    });

    // 启动弹幕
    liveAC.cancel = await newAC.startDanmu(ctx, true);
  } catch (error) {
    console.error('getDanmu(): error:', error);
    response.write(`data: ${JSON.stringify({
      type: getDanmuType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    })}

`);
    response.end();
  }
}

// 停止弹幕
async function stopDanmu(uid, reqID) {
  try {
    const connectionKey = `${uid}:${reqID}`;
    const ac = activeConnections.get(connectionKey);
    if (!ac) {
      return {
        type: stopDanmuType,
        requestID: reqID,
        result: 1,
        data: { liverUID: uid }
      };
    }

    // 取消弹幕
    if (ac.cancel) {
      ac.cancel();
    }

    // 从map中删除
    activeConnections.delete(connectionKey);
    ac.response.end();

    return {
      type: stopDanmuType,
      requestID: reqID,
      result: 1,
      data: { liverUID: uid }
    };
  } catch (error) {
    console.error('stopDanmu(): error:', error);
    return {
      type: stopDanmuType,
      requestID: reqID,
      result: reqHandleErr,
      error: error.message
    };
  }
}

// 导出
module.exports = {
  getDanmu,
  stopDanmu
};