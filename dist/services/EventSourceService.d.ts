import { HttpClient } from '../core/HttpClient';
export interface EventSourceConfig {
    liverUID: string;
    eventTypes?: number[];
    onMessage?: (event: MessageEvent) => void;
    onError?: (event: Event) => void;
    onOpen?: (event: Event) => void;
}
export interface DanmuPushData {
    liverUID: number;
    type: number;
    data: {
        danmuInfo: {
            sendTime: number;
            userInfo: {
                userID: number;
                nickname: string;
                avatar: string;
                medal: {
                    uperID: number;
                    userID: number;
                    clubName: string;
                    level: number;
                };
                managerType: number;
            };
        };
        content: string;
    };
}
export interface LikePushData {
    liverUID: number;
    type: number;
    data: {
        sendTime: number;
        userInfo: {
            userID: number;
            nickname: string;
            avatar: string;
            medal: {
                uperID: number;
                userID: number;
                clubName: string;
                level: number;
            };
            managerType: number;
        };
    };
}
export interface EnterRoomPushData {
    liverUID: number;
    type: number;
    data: {
        sendTime: number;
        userInfo: {
            userID: number;
            nickname: string;
            avatar: string;
            medal: {
                uperID: number;
                userID: number;
                clubName: string;
                level: number;
            };
            managerType: number;
        };
    };
}
export interface FollowPushData {
    liverUID: number;
    type: number;
    data: {
        sendTime: number;
        userInfo: {
            userID: number;
            nickname: string;
            avatar: string;
            medal: {
                uperID: number;
                userID: number;
                clubName: string;
                level: number;
            };
            managerType: number;
        };
    };
}
export interface BananaPushData {
    liverUID: number;
    type: number;
    data: {
        danmuInfo: {
            sendTime: number;
            userInfo: {
                userID: number;
                nickname: string;
                avatar: string;
                medal: {
                    uperID: number;
                    userID: number;
                    clubName: string;
                    level: number;
                };
                managerType: number;
            };
        };
        bananaCount: number;
    };
}
export interface GiftPushData {
    liverUID: number;
    type: number;
    data: {
        danmuInfo: {
            sendTime: number;
            userInfo: {
                userID: number;
                nickname: string;
                avatar: string;
                medal: {
                    uperID: number;
                    userID: number;
                    clubName: string;
                    level: number;
                };
                managerType: number;
            };
        };
        giftDetail: {
            giftID: number;
            giftName: string;
            arLiveName: string;
            payWalletType: number;
            price: number;
            webpPic: string;
            pngPic: string;
            smallPngPic: string;
            allowBatchSendSizeList: number[] | null;
            canCombo: boolean;
            canDraw: boolean;
            magicFaceID: number;
            vupArID: number;
            description: string;
            redpackPrice: number;
            cornerMarkerText: string;
        };
        count: number;
        combo: number;
        value: number;
        comboID: string;
        slotDisplayDuration: number;
        expireDuration: number;
        drawGiftInfo: {
            screenWidth: number;
            screenHeight: number;
            drawPoint: Array<{
                marginLeft: number;
                marginTop: number;
                scaleRatio: number;
                handup: boolean;
                pointWidth: number;
                pointHeight: number;
            }> | null;
        };
    };
}
export interface RichTextPushData {
    liverUID: number;
    type: number;
    data: {
        sendTime: number;
        segments: Array<{
            type: number;
            segment: any;
        }>;
    };
}
export interface JoinClubPushData {
    liverUID: number;
    type: number;
    data: {
        joinTime: number;
        fansInfo: {
            userID: number;
            nickname: string;
            avatar: string;
            medal: {
                uperID: number;
                userID: number;
                clubName: string;
                level: number;
            };
            managerType: number;
        };
        uperInfo: {
            userID: number;
            nickname: string;
            avatar: string;
            medal: {
                uperID: number;
                userID: number;
                clubName: string;
                level: number;
            };
            managerType: number;
        };
    };
}
export interface SharePushData {
    liverUID: number;
    type: number;
    data: {
        danmuInfo: {
            sendTime: number;
            userInfo: {
                userID: number;
                nickname: string;
                avatar: string;
                medal: {
                    uperID: number;
                    userID: number;
                    clubName: string;
                    level: number;
                };
                managerType: number;
            };
        };
        sharePlatform: number;
        sharePlatformIcon: string;
    };
}
export interface DanmuEndSignal {
    liverUID: number;
    type: number;
}
export interface DanmuErrorSignal {
    liverUID: number;
    type: number;
    data: {
        error: string;
    };
}
export interface BananaCountSignal {
    liverUID: number;
    type: number;
    data: {
        bananaCount: string;
    };
}
export interface WatchingLikeSignal {
    liverUID: number;
    type: number;
    data: {
        watchingCount: string;
        likeCount: string;
        likeDelta: number;
    };
}
export interface TopWatchingSignal {
    liverUID: number;
    type: number;
    data: Array<{
        userInfo: {
            userID: number;
            nickname: string;
            avatar: string;
            medal: {
                uperID: number;
                userID: number;
                clubName: string;
                level: number;
            };
            managerType: number;
        };
        anonymousUser: boolean;
        displaySendAmount: string;
        customData: string;
    }>;
}
export interface RecentDanmuSignal {
    liverUID: number;
    type: number;
    data: Array<{
        danmuInfo: {
            sendTime: number;
            userInfo: {
                userID: number;
                nickname: string;
                avatar: string;
                medal: {
                    uperID: number;
                    userID: number;
                    clubName: string;
                    level: number;
                };
                managerType: number;
            };
        };
        content: string;
    }>;
}
export interface RedpackListSignal {
    liverUID: number;
    type: number;
    data: Array<{
        userInfo: {
            userID: number;
            nickname: string;
            avatar: string;
            medal: {
                uperID: number;
                userID: number;
                clubName: string;
                level: number;
            };
            managerType: number;
        };
        displayStatus: number;
        grabBeginTime: number;
        getTokenLatestTime: number;
        redpackID: string;
        redpackBizUnit: string;
        redpackAmount: number;
        settleBeginTime: number;
    }>;
}
export interface ChatCallSignal {
    liverUID: number;
    type: number;
    data: {
        chatID: string;
        liveID: string;
        callTime: number;
    };
}
export interface ChatAcceptSignal {
    liverUID: number;
    type: number;
    data: {
        chatID: string;
        mediaType: number;
        signalInfo: string;
    };
}
export interface ChatReadySignal {
    liverUID: number;
    type: number;
    data: {
        chatID: string;
        guest: {
            userID: number;
            nickname: string;
            avatar: string;
            medal: {
                uperID: number;
                userID: number;
                clubName: string;
                level: number;
            };
            managerType: number;
        };
        mediaType: number;
    };
}
export interface ChatEndSignal {
    liverUID: number;
    type: number;
    data: {
        chatID: string;
        endType: number;
    };
}
export interface KickedOutSignal {
    liverUID: number;
    type: number;
    data: {
        kickedOutReason: string;
    };
}
export interface LiveWarningSignal {
    liverUID: number;
    type: number;
    data: {
        violationContent: string;
    };
}
export interface ManagerStateSignal {
    liverUID: number;
    type: number;
    data: {
        managerState: number;
    };
}
export declare class EventSourceService {
    private httpClient;
    private eventSource;
    constructor(httpClient: HttpClient);
    /**
     * 连接到直播间实时数据推送
     */
    connectToLiveEvents(config: EventSourceConfig): EventSource;
    /**
     * 断开实时数据推送连接
     */
    disconnect(): void;
    /**
     * 监听弹幕事件
     */
    onDanmu(callback: (data: DanmuPushData) => void): void;
    /**
     * 监听点赞事件
     */
    onLike(callback: (data: LikePushData) => void): void;
    /**
     * 监听进入直播间事件
     */
    onEnterRoom(callback: (data: EnterRoomPushData) => void): void;
    /**
     * 监听关注主播事件
     */
    onFollow(callback: (data: FollowPushData) => void): void;
    /**
     * 监听投蕉事件
     */
    onBanana(callback: (data: BananaPushData) => void): void;
    /**
     * 监听礼物事件
     */
    onGift(callback: (data: GiftPushData) => void): void;
    /**
     * 监听富文本事件
     */
    onRichText(callback: (data: RichTextPushData) => void): void;
    /**
     * 监听加入守护团事件
     */
    onJoinClub(callback: (data: JoinClubPushData) => void): void;
    /**
     * 监听分享直播间事件
     */
    onShare(callback: (data: SharePushData) => void): void;
    /**
     * 监听弹幕结束信号
     */
    onDanmuEnd(callback: (data: DanmuEndSignal) => void): void;
    /**
     * 监听弹幕错误信号
     */
    onDanmuError(callback: (data: DanmuErrorSignal) => void): void;
    /**
     * 监听香蕉总数信号
     */
    onBananaCount(callback: (data: BananaCountSignal) => void): void;
    /**
     * 监听在线观众和点赞数量信号
     */
    onWatchingLike(callback: (data: WatchingLikeSignal) => void): void;
    /**
     * 监听在线观众前三名信号
     */
    onTopWatching(callback: (data: TopWatchingSignal) => void): void;
    /**
     * 监听最近弹幕信号
     */
    onRecentDanmu(callback: (data: RecentDanmuSignal) => void): void;
    /**
     * 监听红包列表信号
     */
    onRedpackList(callback: (data: RedpackListSignal) => void): void;
    /**
     * 监听Chat Call信号
     */
    onChatCall(callback: (data: ChatCallSignal) => void): void;
    /**
     * 监听Chat Accept信号
     */
    onChatAccept(callback: (data: ChatAcceptSignal) => void): void;
    /**
     * 监听Chat Ready信号
     */
    onChatReady(callback: (data: ChatReadySignal) => void): void;
    /**
     * 监听Chat End信号
     */
    onChatEnd(callback: (data: ChatEndSignal) => void): void;
    /**
     * 监听被踢出直播间信号
     */
    onKickedOut(callback: (data: KickedOutSignal) => void): void;
    /**
     * 监听直播警告信号
     */
    onLiveWarning(callback: (data: LiveWarningSignal) => void): void;
    /**
     * 监听房管状态信号
     */
    onManagerState(callback: (data: ManagerStateSignal) => void): void;
    /**
     * 获取当前连接状态
     */
    getConnectionState(): 'connecting' | 'open' | 'closed' | 'error';
    /**
     * 重新连接
     */
    reconnect(config: EventSourceConfig): EventSource;
}
