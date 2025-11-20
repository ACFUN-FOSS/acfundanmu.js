"use strict";
/**
 * 弹幕事件解析器
 * 将原始数据解析为弹幕事件对象
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUserInfo = parseUserInfo;
exports.parseComment = parseComment;
exports.parseLike = parseLike;
exports.parseEnterRoom = parseEnterRoom;
exports.parseFollowAuthor = parseFollowAuthor;
exports.parseThrowBanana = parseThrowBanana;
exports.parseGift = parseGift;
exports.parseRichText = parseRichText;
exports.parseJoinClub = parseJoinClub;
exports.parseShareLive = parseShareLive;
exports.parseActionSignal = parseActionSignal;
exports.parseStateSignal = parseStateSignal;
exports.parseNotifySignal = parseNotifySignal;
const types_1 = require("../types");
const acfun_1 = require("../proto/acfun");
/**
 * 解析用户信息
 */
function parseUserInfo(userInfoData) {
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
        managerType: userInfoData.userIdentity?.managerType || types_1.ManagerType.NotManager
    };
}
/**
 * 解析评论弹幕（转换为明文结构）
 */
function parseComment(data) {
    const userInfo = parseUserInfo(data.userInfo || {});
    return {
        actionType: 'comment',
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
function parseLike(data) {
    const userInfo = parseUserInfo(data.userInfo || {});
    return {
        actionType: 'like',
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
function parseEnterRoom(data) {
    const userInfo = parseUserInfo(data.userInfo || {});
    return {
        actionType: 'enterRoom',
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
function parseFollowAuthor(data) {
    const userInfo = parseUserInfo(data.userInfo || {});
    return {
        actionType: 'followAuthor',
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
function parseThrowBanana(data) {
    return {
        actionType: 'throwBanana',
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
                managerType: types_1.ManagerType.NotManager
            }
        },
        bananaCount: data.count || 0
    };
}
/**
 * 解析礼物（转换为明文结构）
 */
function parseGift(data, giftDetail) {
    const userInfo = parseUserInfo(data.userInfo || {});
    const gift = {
        actionType: 'gift',
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
            drawPoint: (data.drawGiftInfo.drawPoint || []).map((point) => ({
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
function parseRichText(data) {
    const segments = (data.segments || []).map((seg) => {
        if (seg.userInfo) {
            return {
                type: 'userInfo',
                userInfo: parseUserInfo(seg.userInfo.user || {}),
                color: seg.userInfo.color || ''
            };
        }
        else if (seg.plain) {
            return {
                type: 'plain',
                text: seg.plain.text || '',
                color: seg.plain.color || ''
            };
        }
        else if (seg.image) {
            return {
                type: 'image',
                pictures: (seg.image.pictures || []).map((p) => p.url || ''),
                alternativeText: seg.image.alternativeText || '',
                alternativeColor: seg.image.alternativeColor || ''
            };
        }
        return {
            type: 'plain',
            text: '',
            color: ''
        };
    });
    return {
        actionType: 'richText',
        danmuInfo: {
            sendTime: Number(data.sendTimeMs || Date.now()),
            userInfo: {
                userID: 0,
                nickname: '',
                avatar: '',
                medal: { uperID: 0, userID: 0, clubName: '', level: 0 },
                managerType: types_1.ManagerType.NotManager
            }
        },
        segments
    };
}
/**
 * 解析加入守护团（转换为明文结构）
 */
function parseJoinClub(data) {
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
        managerType: types_1.ManagerType.NotManager
    };
    return {
        actionType: 'joinClub',
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
            managerType: types_1.ManagerType.NotManager
        }
    };
}
/**
 * 解析分享直播间（转换为明文结构）
 */
function parseShareLive(data) {
    const userInfo = parseUserInfo(data.userInfo || {});
    return {
        actionType: 'shareLive',
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
function printDanmuEvent(event) {
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
    }
    else if ('giftDetail' in event) {
        // Gift
        console.log('类型: 礼物');
        console.log('礼物:', event.giftDetail.giftName);
        console.log('数量:', event.count);
        console.log('Combo:', event.combo);
        console.log('价值:', event.value);
    }
    else if ('bananaCount' in event) {
        // ThrowBanana
        console.log('类型: 投蕉');
        console.log('数量:', event.bananaCount);
    }
    else if ('segments' in event) {
        // RichText
        console.log('类型: 富文本');
        console.log('内容:', event.segments.map((s) => {
            if (s.type === 'plain')
                return s.text;
            if (s.type === 'userInfo')
                return `@${s.userInfo.nickname}`;
            if (s.type === 'image')
                return '[图片]';
            return '';
        }).join(''));
    }
    else if ('fansInfo' in event) {
        // JoinClub
        console.log('类型: 加入守护团');
        console.log('粉丝:', event.fansInfo.nickname);
        console.log('主播:', event.uperInfo.nickname);
    }
    else if ('sharePlatform' in event) {
        // ShareLive
        console.log('类型: 分享直播');
    }
    else {
        // Like / EnterRoom / FollowAuthor
        console.log('类型: 点赞/进房/关注');
    }
    console.log('================================\n');
}
/**
 * 解析行为信号中的所有事件
 */
function parseActionSignal(actionSignalData) {
    const events = [];
    try {
        // 使用 Protobuf 解析 ZtLiveScActionSignal
        const actionSignal = acfun_1.AcFunDanmu.ZtLiveScActionSignal.decode(actionSignalData);
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
                            const comment = acfun_1.AcFunDanmu.CommonActionSignalComment.decode(payload);
                            const event = parseComment(comment);
                            events.push(event);
                            printDanmuEvent(event);
                            break;
                        }
                        case 'CommonActionSignalLike': {
                            const like = acfun_1.AcFunDanmu.CommonActionSignalLike.decode(payload);
                            events.push(parseLike(like));
                            break;
                        }
                        case 'CommonActionSignalUserEnterRoom': {
                            const enterRoom = acfun_1.AcFunDanmu.CommonActionSignalUserEnterRoom.decode(payload);
                            events.push(parseEnterRoom(enterRoom));
                            break;
                        }
                        case 'CommonActionSignalUserFollowAuthor': {
                            const follow = acfun_1.AcFunDanmu.CommonActionSignalUserFollowAuthor.decode(payload);
                            events.push(parseFollowAuthor(follow));
                            break;
                        }
                        case 'AcfunActionSignalThrowBanana': {
                            const banana = acfun_1.AcFunDanmu.AcfunActionSignalThrowBanana.decode(payload);
                            const event = parseThrowBanana(banana);
                            events.push(event);
                            printDanmuEvent(event);
                            break;
                        }
                        case 'CommonActionSignalGift': {
                            const gift = acfun_1.AcFunDanmu.CommonActionSignalGift.decode(payload);
                            const event = parseGift(gift);
                            events.push(event);
                            printDanmuEvent(event);
                            break;
                        }
                        case 'CommonActionSignalRichText': {
                            const richText = acfun_1.AcFunDanmu.CommonActionSignalRichText.decode(payload);
                            const event = parseRichText(richText);
                            events.push(event);
                            printDanmuEvent(event);
                            break;
                        }
                        case 'AcfunActionSignalJoinClub': {
                            const joinClub = acfun_1.AcFunDanmu.AcfunActionSignalJoinClub.decode(payload);
                            const event = parseJoinClub(joinClub);
                            events.push(event);
                            printDanmuEvent(event);
                            break;
                        }
                        case 'CommonActionSignalUserShareLive': {
                            const shareLive = acfun_1.AcFunDanmu.CommonActionSignalUserShareLive.decode(payload);
                            events.push(parseShareLive(shareLive));
                            break;
                        }
                        default:
                            console.log('[ActionSignal] 未知的信号类型:', signalType);
                    }
                }
                catch (error) {
                    console.error('[ActionSignal] 解析事件失败:', error);
                }
            }
        }
        // 按发送时间排序（所有事件都有danmuInfo.sendTime）
        events.sort((a, b) => a.danmuInfo.sendTime - b.danmuInfo.sendTime);
        return events;
    }
    catch (error) {
        console.error('[ActionSignal] 解析 ActionSignal 失败:', error);
        return events;
    }
}
function parseStateSignal(stateSignalData) {
    const events = [];
    try {
        const state = acfun_1.AcFunDanmu.ZtLiveScStateSignal.decode(stateSignalData);
        if (!state.item)
            return events;
        for (const item of state.item) {
            switch (item.signalType) {
                case 'AcfunStateSignalDisplayInfo': {
                    const info = acfun_1.AcFunDanmu.AcfunStateSignalDisplayInfo.decode(item.payload);
                    events.push({ type: 'bananaCount', data: Number(info.bananaCount || 0) });
                    break;
                }
                case 'CommonStateSignalDisplayInfo': {
                    const info = acfun_1.AcFunDanmu.CommonStateSignalDisplayInfo.decode(item.payload);
                    events.push({ type: 'displayInfo', data: { watchingCount: String(info.watchingCount || ''), likeCount: String(info.likeCount || ''), likeDelta: Number(info.likeDelta || 0) } });
                    break;
                }
                case 'CommonStateSignalTopUsers': {
                    const top = acfun_1.AcFunDanmu.CommonStateSignalTopUsers.decode(item.payload);
                    const users = (top.user || []).map(u => ({
                        userInfo: parseUserInfo(u.userInfo || {}),
                        anonymousUser: Boolean(u.anonymousUser),
                        displaySendAmount: String(u.displaySendAmount || ''),
                        customData: String(u.customWatchingListData || '')
                    }));
                    events.push({ type: 'topUsers', data: users });
                    break;
                }
                case 'CommonStateSignalRecentComment': {
                    const rc = acfun_1.AcFunDanmu.CommonStateSignalRecentComment.decode(item.payload);
                    const list = (rc.comment || []).map(c => ({
                        sendTime: Number(c.sendTimeMs || 0),
                        userInfo: parseUserInfo(c.userInfo || {}),
                        content: String(c.content || '')
                    }));
                    events.push({ type: 'recentComment', data: list });
                    break;
                }
                case 'CommonStateSignalChatCall': {
                    const cc = acfun_1.AcFunDanmu.CommonStateSignalChatCall.decode(item.payload);
                    events.push({ type: 'chatCall', data: { chatID: String(cc.chatId || ''), liveID: String(cc.liveId || ''), callTime: Number(cc.callTimestampMs || 0) } });
                    break;
                }
                case 'CommonStateSignalChatAccept': {
                    const ca = acfun_1.AcFunDanmu.CommonStateSignalChatAccept.decode(item.payload);
                    events.push({ type: 'chatAccept', data: { chatID: String(ca.chatId || ''), mediaType: Number(ca.mediaType || 0), signalInfo: String(ca.aryaSignalInfo || '') } });
                    break;
                }
                case 'CommonStateSignalChatReady': {
                    const cr = acfun_1.AcFunDanmu.CommonStateSignalChatReady.decode(item.payload);
                    const guest = parseUserInfo(cr.guestUserInfo || {});
                    events.push({ type: 'chatReady', data: { chatID: String(cr.chatId || ''), guest, mediaType: Number(cr.mediaType || 0) } });
                    break;
                }
                case 'CommonStateSignalChatEnd': {
                    const ce = acfun_1.AcFunDanmu.CommonStateSignalChatEnd.decode(item.payload);
                    events.push({ type: 'chatEnd', data: { chatID: String(ce.chatId || ''), endType: Number(ce.endType || 0) } });
                    break;
                }
                default: {
                    break;
                }
            }
        }
        return events;
    }
    catch {
        return events;
    }
}
function parseNotifySignal(notifySignalData) {
    const events = [];
    try {
        const notify = acfun_1.AcFunDanmu.ZtLiveScNotifySignal.decode(notifySignalData);
        if (!notify.item)
            return events;
        for (const item of notify.item) {
            switch (item.signalType) {
                case 'CommonNotifySignalKickedOut': {
                    const ko = acfun_1.AcFunDanmu.CommonNotifySignalKickedOut.decode(item.payload);
                    events.push({ type: 'kickedOut', data: String(ko.reason || '') });
                    break;
                }
                case 'CommonNotifySignalViolationAlert': {
                    const va = acfun_1.AcFunDanmu.CommonNotifySignalViolationAlert.decode(item.payload);
                    events.push({ type: 'violationAlert', data: String(va.violationContent || '') });
                    break;
                }
                case 'CommonNotifySignalLiveManagerState': {
                    const ms = acfun_1.AcFunDanmu.CommonNotifySignalLiveManagerState.decode(item.payload);
                    events.push({ type: 'managerState', data: Number(ms.state || 0) });
                    break;
                }
                default: {
                    break;
                }
            }
        }
        return events;
    }
    catch {
        return events;
    }
}
//# sourceMappingURL=EventParser.js.map