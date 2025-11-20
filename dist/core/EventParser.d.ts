/**
 * 弹幕事件解析器
 * 将原始数据解析为弹幕事件对象
 */
import { DanmuMessage, UserInfo, GiftDetail } from '../types';
import { AcFunDanmu } from '../proto/acfun';
/**
 * 解析用户信息
 */
export declare function parseUserInfo(userInfoData: AcFunDanmu.IZtLiveUserInfo): UserInfo;
/**
 * 解析评论弹幕（转换为明文结构）
 */
export declare function parseComment(data: AcFunDanmu.ICommonActionSignalComment): any;
/**
 * 解析点赞（转换为明文结构）
 */
export declare function parseLike(data: AcFunDanmu.ICommonActionSignalLike): any;
/**
 * 解析进入直播间（转换为明文结构）
 */
export declare function parseEnterRoom(data: AcFunDanmu.ICommonActionSignalUserEnterRoom): any;
/**
 * 解析关注主播（转换为明文结构）
 */
export declare function parseFollowAuthor(data: AcFunDanmu.ICommonActionSignalUserFollowAuthor): any;
/**
 * 解析投蕉（转换为明文结构）
 */
export declare function parseThrowBanana(data: AcFunDanmu.IAcfunActionSignalThrowBanana): any;
/**
 * 解析礼物（转换为明文结构）
 */
export declare function parseGift(data: AcFunDanmu.ICommonActionSignalGift, giftDetail?: GiftDetail): any;
/**
 * 解析富文本（转换为明文结构）
 */
export declare function parseRichText(data: AcFunDanmu.ICommonActionSignalRichText): any;
/**
 * 解析加入守护团（转换为明文结构）
 */
export declare function parseJoinClub(data: AcFunDanmu.IAcfunActionSignalJoinClub): any;
/**
 * 解析分享直播间（转换为明文结构）
 */
export declare function parseShareLive(data: AcFunDanmu.ICommonActionSignalUserShareLive): any;
/**
 * 解析行为信号中的所有事件
 */
export declare function parseActionSignal(actionSignalData: Buffer): DanmuMessage[];
export declare function parseStateSignal(stateSignalData: Buffer): any[];
export declare function parseNotifySignal(notifySignalData: Buffer): any[];
