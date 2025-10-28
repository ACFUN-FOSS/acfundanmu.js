/**
 * 弹幕事件解析器
 * 将原始数据解析为弹幕事件对象
 */

import {
  DanmuMessage,
  Comment,
  Like,
  EnterRoom,
  FollowAuthor,
  ThrowBanana,
  Gift,
  RichText,
  JoinClub,
  ShareLive,
  UserInfo,
  ManagerType,
  GiftDetail,
  RichTextSegment,
  RichTextUserInfo,
  RichTextPlain,
  RichTextImage
} from '../types';
import { AcFunDanmu } from '../proto/acfun';

/**
 * 解析用户信息
 */
export function parseUserInfo(userInfoData: AcFunDanmu.IZtLiveUserInfo): UserInfo {
  return {
    userID: Number(userInfoData.userId || 0),
    nickname: userInfoData.nickname || '',
    avatar: (userInfoData.avatar && userInfoData.avatar.length > 0) ? (userInfoData.avatar[0].url || '') : '',
    medal: {
      uperID: 0,
      userID: 0,
      clubName: '',
      level: 0
    },
    managerType: (userInfoData.userIdentity?.managerType as number) || ManagerType.NotManager
  };
}

/**
 * 解析评论弹幕（转换为明文结构）
 */
export function parseComment(data: AcFunDanmu.ICommonActionSignalComment): any {
  const userInfo = parseUserInfo(data.userInfo || {});
  return {
    danmuInfo: {
      sendTime: Number(data.sendTimeMs || Date.now()),
      userInfo: {
        userID: userInfo.userID,
        nickname: userInfo.nickname,
        avatar: userInfo.avatar,
        medal: userInfo.medal,
        managerType: userInfo.managerType
      }
    },
    content: data.content || ''
  };
}

/**
 * 解析点赞（转换为明文结构）
 */
export function parseLike(data: AcFunDanmu.ICommonActionSignalLike): any {
  const userInfo = parseUserInfo(data.userInfo || {});
  return {
    danmuInfo: {
      sendTime: Number(data.sendTimeMs || Date.now()),
      userInfo: {
        userID: userInfo.userID,
        nickname: userInfo.nickname,
        avatar: userInfo.avatar,
        medal: userInfo.medal,
        managerType: userInfo.managerType
      }
    }
  };
}

/**
 * 解析进入直播间（转换为明文结构）
 */
export function parseEnterRoom(data: AcFunDanmu.ICommonActionSignalUserEnterRoom): any {
  const userInfo = parseUserInfo(data.userInfo || {});
  return {
    danmuInfo: {
      sendTime: Number(data.sendTimeMs || Date.now()),
      userInfo: {
        userID: userInfo.userID,
        nickname: userInfo.nickname,
        avatar: userInfo.avatar,
        medal: userInfo.medal,
        managerType: userInfo.managerType
      }
    }
  };
}

/**
 * 解析关注主播（转换为明文结构）
 */
export function parseFollowAuthor(data: AcFunDanmu.ICommonActionSignalUserFollowAuthor): any {
  const userInfo = parseUserInfo(data.userInfo || {});
  return {
    danmuInfo: {
      sendTime: Number(data.sendTimeMs || Date.now()),
      userInfo: {
        userID: userInfo.userID,
        nickname: userInfo.nickname,
        avatar: userInfo.avatar,
        medal: userInfo.medal,
        managerType: userInfo.managerType
      }
    }
  };
}

/**
 * 解析投蕉（转换为明文结构）
 */
export function parseThrowBanana(data: AcFunDanmu.IAcfunActionSignalThrowBanana): any {
  return {
    danmuInfo: {
      sendTime: Number(data.sendTimeMs || Date.now()),
      userInfo: {
        userID: Number(data.visitor?.userId || 0),
        nickname: data.visitor?.name || '',
        avatar: '',
        medal: {
          uperID: 0,
          userID: 0,
          clubName: '',
          level: 0
        },
        managerType: ManagerType.NotManager
      }
    },
    bananaCount: data.count || 0
  };
}

/**
 * 解析礼物（转换为明文结构）
 */
export function parseGift(data: AcFunDanmu.ICommonActionSignalGift, giftDetail?: GiftDetail): any {
  const userInfo = parseUserInfo(data.userInfo || {});
  
  const gift: any = {
    danmuInfo: {
      sendTime: Number(data.sendTimeMs || Date.now()),
      userInfo: {
        userID: userInfo.userID,
        nickname: userInfo.nickname,
        avatar: userInfo.avatar,
        medal: userInfo.medal,
        managerType: userInfo.managerType
      }
    },
    giftDetail: giftDetail || {
      giftID: Number(data.giftId || 0),
      giftName: `礼物${data.giftId}`,
      arLiveName: '',
      payWalletType: 0,
      price: 0,
      webpPic: '',
      pngPic: '',
      smallPngPic: '',
      allowBatchSendSizeList: [],
      canCombo: false,
      canDraw: false,
      magicFaceID: 0,
      vupArID: 0,
      description: '',
      redpackPrice: 0,
      cornerMarkerText: ''
    },
    count: data.batchSize || 1,
    combo: data.comboCount || 1,
    value: Number(data.rank || 0),
    comboID: data.comboKey || '',
    slotDisplayDuration: Number(data.slotDisplayDurationMs || 0),
    expireDuration: Number(data.expireDurationMs || 0)
  };

  // 解析涂鸦信息
  if (data.drawGiftInfo) {
    gift.drawGiftInfo = {
      screenWidth: Number(data.drawGiftInfo.screenWidth || 0),
      screenHeight: Number(data.drawGiftInfo.screenHeight || 0),
      drawPoint: (data.drawGiftInfo.drawPoint || []).map((point: any) => ({
        marginLeft: Number(point.marginLeft || 0),
        marginTop: Number(point.marginTop || 0),
        scaleRatio: Number(point.scaleRatio || 1),
        handup: point.handup || false,
        pointWidth: Number(point.pointWidth || 0),
        pointHeight: Number(point.pointHeight || 0)
      }))
    };
  }

  return gift;
}

/**
 * 解析富文本（转换为明文结构）
 */
export function parseRichText(data: AcFunDanmu.ICommonActionSignalRichText): any {
  const segments: RichTextSegment[] = (data.segments || []).map((seg: any) => {
    if (seg.userInfo) {
      return {
        type: 'userInfo',
        userInfo: parseUserInfo(seg.userInfo.user || {}),
        color: seg.userInfo.color || ''
      } as RichTextUserInfo;
    } else if (seg.plain) {
      return {
        type: 'plain',
        text: seg.plain.text || '',
        color: seg.plain.color || ''
      } as RichTextPlain;
    } else if (seg.image) {
      return {
        type: 'image',
        pictures: (seg.image.pictures || []).map((p: any) => p.url || ''),
        alternativeText: seg.image.alternativeText || '',
        alternativeColor: seg.image.alternativeColor || ''
      } as RichTextImage;
    }
    
    return {
      type: 'plain',
      text: '',
      color: ''
    } as RichTextPlain;
  });

  return {
    danmuInfo: {
      sendTime: Number(data.sendTimeMs || Date.now()),
      userInfo: {
        userID: 0,
        nickname: '',
        avatar: '',
        medal: { uperID: 0, userID: 0, clubName: '', level: 0 },
        managerType: ManagerType.NotManager
      }
    },
    segments
  };
}

/**
 * 解析加入守护团（转换为明文结构）
 */
export function parseJoinClub(data: AcFunDanmu.IAcfunActionSignalJoinClub): any {
  const fansInfo = {
    userID: Number(data.fansInfo?.userId || 0),
    nickname: data.fansInfo?.name || '',
    avatar: '',
    medal: {
      uperID: 0,
      userID: 0,
      clubName: '',
      level: 0
    },
    managerType: ManagerType.NotManager
  };
  
  return {
    danmuInfo: {
      sendTime: Number(data.joinTimeMs || Date.now()),
      userInfo: fansInfo
    },
    joinTime: Number(data.joinTimeMs || Date.now()),
    fansInfo: fansInfo,
    uperInfo: {
      userID: Number(data.uperInfo?.userId || 0),
      nickname: data.uperInfo?.name || '',
      avatar: '',
      medal: {
        uperID: 0,
        userID: 0,
        clubName: '',
        level: 0
      },
      managerType: ManagerType.NotManager
    }
  };
}

/**
 * 解析分享直播间（转换为明文结构）
 */
export function parseShareLive(data: AcFunDanmu.ICommonActionSignalUserShareLive): any {
  const userInfo = parseUserInfo(data.userInfo || {});
  return {
    danmuInfo: {
      sendTime: Number(data.sendTimeMs || Date.now()),
      userInfo: {
        userID: userInfo.userID,
        nickname: userInfo.nickname,
        avatar: userInfo.avatar,
        medal: userInfo.medal,
        managerType: userInfo.managerType
      }
    },
    sharePlatform: Number(data.sharePlatformId || 0),
    sharePlatformIcon: data.sharePlatformIcon || ''
  };
}

/**
 * 打印弹幕事件详细信息（适配统一的danmuInfo结构）
 */
function printDanmuEvent(event: any) {
  console.log('\n========== 收到弹幕事件 ==========');
  
  // 现在所有事件都有danmuInfo
  const danmuInfo = event.danmuInfo;
  const timestamp = new Date(danmuInfo.sendTime).toLocaleString('zh-CN');
  console.log('时间:', timestamp);
  console.log('用户:', danmuInfo.userInfo.nickname, `(ID: ${danmuInfo.userInfo.userID})`);
  
  if ('content' in event) {
    // Comment
    console.log('类型: 评论');
    console.log('内容:', event.content);
  } else if ('giftDetail' in event) {
    // Gift
    console.log('类型: 礼物');
    console.log('礼物:', event.giftDetail.giftName);
    console.log('数量:', event.count);
    console.log('Combo:', event.combo);
    console.log('价值:', event.value);
  } else if ('bananaCount' in event) {
    // ThrowBanana
    console.log('类型: 投蕉');
    console.log('数量:', event.bananaCount);
  } else if ('segments' in event) {
    // RichText
    console.log('类型: 富文本');
    console.log('内容:', event.segments.map((s: any) => {
      if (s.type === 'plain') return s.text;
      if (s.type === 'userInfo') return `@${s.userInfo.nickname}`;
      if (s.type === 'image') return '[图片]';
      return '';
    }).join(''));
  } else if ('fansInfo' in event) {
    // JoinClub
    console.log('类型: 加入守护团');
    console.log('粉丝:', event.fansInfo.nickname);
    console.log('主播:', event.uperInfo.nickname);
  } else if ('sharePlatform' in event) {
    // ShareLive
    console.log('类型: 分享直播');
  } else {
    // Like / EnterRoom / FollowAuthor
    console.log('类型: 点赞/进房/关注');
  }
  
  console.log('================================\n');
}

/**
 * 解析行为信号中的所有事件
 */
export function parseActionSignal(actionSignalData: Buffer): DanmuMessage[] {
  const events: DanmuMessage[] = [];
  
  try {
    // 使用 Protobuf 解析 ZtLiveScActionSignal
    const actionSignal = AcFunDanmu.ZtLiveScActionSignal.decode(actionSignalData);
    
    console.log('[ActionSignal] 解析 ActionSignal, item 数量:', actionSignal.item?.length || 0);
    
    if (!actionSignal.item) {
      return events;
    }

    for (const item of actionSignal.item) {
      const signalType = item.signalType;
      console.log('[ActionSignal] signalType:', signalType, 'payload 数量:', item.payload?.length || 0);
      
      for (const payload of item.payload || []) {
        try {
          switch (signalType) {
            case 'CommonActionSignalComment': {
              const comment = AcFunDanmu.CommonActionSignalComment.decode(payload);
              const event = parseComment(comment);
              events.push(event);
              printDanmuEvent(event);
              break;
            }
            case 'CommonActionSignalLike': {
              const like = AcFunDanmu.CommonActionSignalLike.decode(payload);
              events.push(parseLike(like));
              break;
            }
            case 'CommonActionSignalUserEnterRoom': {
              const enterRoom = AcFunDanmu.CommonActionSignalUserEnterRoom.decode(payload);
              events.push(parseEnterRoom(enterRoom));
              break;
            }
            case 'CommonActionSignalUserFollowAuthor': {
              const follow = AcFunDanmu.CommonActionSignalUserFollowAuthor.decode(payload);
              events.push(parseFollowAuthor(follow));
              break;
            }
            case 'AcfunActionSignalThrowBanana': {
              const banana = AcFunDanmu.AcfunActionSignalThrowBanana.decode(payload);
              const event = parseThrowBanana(banana);
              events.push(event);
              printDanmuEvent(event);
              break;
            }
            case 'CommonActionSignalGift': {
              const gift = AcFunDanmu.CommonActionSignalGift.decode(payload);
              const event = parseGift(gift);
              events.push(event);
              printDanmuEvent(event);
              break;
            }
            case 'CommonActionSignalRichText': {
              const richText = AcFunDanmu.CommonActionSignalRichText.decode(payload);
              const event = parseRichText(richText);
              events.push(event);
              printDanmuEvent(event);
              break;
            }
            case 'AcfunActionSignalJoinClub': {
              const joinClub = AcFunDanmu.AcfunActionSignalJoinClub.decode(payload);
              const event = parseJoinClub(joinClub);
              events.push(event);
              printDanmuEvent(event);
              break;
            }
            case 'CommonActionSignalUserShareLive': {
              const shareLive = AcFunDanmu.CommonActionSignalUserShareLive.decode(payload);
              events.push(parseShareLive(shareLive));
              break;
            }
            default:
              console.log('[ActionSignal] 未知的信号类型:', signalType);
          }
        } catch (error) {
          console.error('[ActionSignal] 解析事件失败:', error);
        }
      }
    }

    // 按发送时间排序（所有事件都有danmuInfo.sendTime）
    events.sort((a, b) => (a as any).danmuInfo.sendTime - (b as any).danmuInfo.sendTime);

    return events;
  } catch (error) {
    console.error('[ActionSignal] 解析 ActionSignal 失败:', error);
    return events;
  }
}
