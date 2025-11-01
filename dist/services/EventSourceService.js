"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSourceService = void 0;
class EventSourceService {
    constructor(httpClient) {
        this.eventSource = null;
        this.httpClient = httpClient;
    }
    /**
     * 连接到直播间实时数据推送
     */
    connectToLiveEvents(config) {
        // TODO: 实现连接到直播间实时数据推送逻辑
        const eventSource = new EventSource('');
        this.eventSource = eventSource;
        return eventSource;
    }
    /**
     * 断开实时数据推送连接
     */
    disconnect() {
        // TODO: 实现断开实时数据推送连接逻辑
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
        }
    }
    /**
     * 监听弹幕事件
     */
    onDanmu(callback) {
        // TODO: 实现监听弹幕事件逻辑
    }
    /**
     * 监听点赞事件
     */
    onLike(callback) {
        // TODO: 实现监听点赞事件逻辑
    }
    /**
     * 监听进入直播间事件
     */
    onEnterRoom(callback) {
        // TODO: 实现监听进入直播间事件逻辑
    }
    /**
     * 监听关注主播事件
     */
    onFollow(callback) {
        // TODO: 实现监听关注主播事件逻辑
    }
    /**
     * 监听投蕉事件
     */
    onBanana(callback) {
        // TODO: 实现监听投蕉事件逻辑
    }
    /**
     * 监听礼物事件
     */
    onGift(callback) {
        // TODO: 实现监听礼物事件逻辑
    }
    /**
     * 监听富文本事件
     */
    onRichText(callback) {
        // TODO: 实现监听富文本事件逻辑
    }
    /**
     * 监听加入守护团事件
     */
    onJoinClub(callback) {
        // TODO: 实现监听加入守护团事件逻辑
    }
    /**
     * 监听分享直播间事件
     */
    onShare(callback) {
        // TODO: 实现监听分享直播间事件逻辑
    }
    /**
     * 监听弹幕结束信号
     */
    onDanmuEnd(callback) {
        // TODO: 实现监听弹幕结束信号逻辑
    }
    /**
     * 监听弹幕错误信号
     */
    onDanmuError(callback) {
        // TODO: 实现监听弹幕错误信号逻辑
    }
    /**
     * 监听香蕉总数信号
     */
    onBananaCount(callback) {
        // TODO: 实现监听香蕉总数信号逻辑
    }
    /**
     * 监听在线观众和点赞数量信号
     */
    onWatchingLike(callback) {
        // TODO: 实现监听在线观众和点赞数量信号逻辑
    }
    /**
     * 监听在线观众前三名信号
     */
    onTopWatching(callback) {
        // TODO: 实现监听在线观众前三名信号逻辑
    }
    /**
     * 监听最近弹幕信号
     */
    onRecentDanmu(callback) {
        // TODO: 实现监听最近弹幕信号逻辑
    }
    /**
     * 监听红包列表信号
     */
    onRedpackList(callback) {
        // TODO: 实现监听红包列表信号逻辑
    }
    /**
     * 监听Chat Call信号
     */
    onChatCall(callback) {
        // TODO: 实现监听Chat Call信号逻辑
    }
    /**
     * 监听Chat Accept信号
     */
    onChatAccept(callback) {
        // TODO: 实现监听Chat Accept信号逻辑
    }
    /**
     * 监听Chat Ready信号
     */
    onChatReady(callback) {
        // TODO: 实现监听Chat Ready信号逻辑
    }
    /**
     * 监听Chat End信号
     */
    onChatEnd(callback) {
        // TODO: 实现监听Chat End信号逻辑
    }
    /**
     * 监听被踢出直播间信号
     */
    onKickedOut(callback) {
        // TODO: 实现监听被踢出直播间信号逻辑
    }
    /**
     * 监听直播警告信号
     */
    onLiveWarning(callback) {
        // TODO: 实现监听直播警告信号逻辑
    }
    /**
     * 监听房管状态信号
     */
    onManagerState(callback) {
        // TODO: 实现监听房管状态信号逻辑
    }
    /**
     * 获取当前连接状态
     */
    getConnectionState() {
        // TODO: 实现获取当前连接状态逻辑
        return 'closed';
    }
    /**
     * 重新连接
     */
    reconnect(config) {
        // TODO: 实现重新连接逻辑
        this.disconnect();
        return this.connectToLiveEvents(config);
    }
}
exports.EventSourceService = EventSourceService;
//# sourceMappingURL=EventSourceService.js.map