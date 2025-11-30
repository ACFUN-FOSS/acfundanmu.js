"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = exports.ErrorType = exports.ChatEndType = exports.ChatMediaType = exports.SharePlatformType = exports.ManagerState = exports.ManagerType = exports.DanmuSessionState = void 0;
// 弹幕会话相关类型
var DanmuSessionState;
(function (DanmuSessionState) {
    DanmuSessionState["Idle"] = "IDLE";
    DanmuSessionState["Connecting"] = "CONNECTING";
    DanmuSessionState["Authenticating"] = "AUTHENTICATING";
    DanmuSessionState["Registering"] = "REGISTERING";
    DanmuSessionState["EnteringRoom"] = "ENTERING_ROOM";
    DanmuSessionState["Active"] = "ACTIVE";
    DanmuSessionState["Disconnecting"] = "DISCONNECTING";
    DanmuSessionState["Error"] = "ERROR";
})(DanmuSessionState || (exports.DanmuSessionState = DanmuSessionState = {}));
var ManagerType;
(function (ManagerType) {
    ManagerType[ManagerType["NotManager"] = 0] = "NotManager";
    ManagerType[ManagerType["NormalManager"] = 1] = "NormalManager";
})(ManagerType || (exports.ManagerType = ManagerType = {}));
// 管理员状态枚举
var ManagerState;
(function (ManagerState) {
    ManagerState[ManagerState["Unknown"] = 0] = "Unknown";
    ManagerState[ManagerState["Added"] = 1] = "Added";
    ManagerState[ManagerState["Removed"] = 2] = "Removed";
    ManagerState[ManagerState["IsManager"] = 3] = "IsManager";
})(ManagerState || (exports.ManagerState = ManagerState = {}));
// 分享平台类型
var SharePlatformType;
(function (SharePlatformType) {
    SharePlatformType[SharePlatformType["PlatformUnknown"] = 0] = "PlatformUnknown";
    SharePlatformType[SharePlatformType["PlatformQQ"] = 1] = "PlatformQQ";
    SharePlatformType[SharePlatformType["PlatformQzone"] = 2] = "PlatformQzone";
    SharePlatformType[SharePlatformType["PlatformWeibo"] = 3] = "PlatformWeibo";
    SharePlatformType[SharePlatformType["PlatformWeChat"] = 4] = "PlatformWeChat";
    SharePlatformType[SharePlatformType["PlatformWeChatMoments"] = 5] = "PlatformWeChatMoments";
    SharePlatformType[SharePlatformType["PlatformAcFunMoment"] = 6] = "PlatformAcFunMoment";
})(SharePlatformType || (exports.SharePlatformType = SharePlatformType = {}));
var ChatMediaType;
(function (ChatMediaType) {
    ChatMediaType[ChatMediaType["Unknown"] = 0] = "Unknown";
    ChatMediaType[ChatMediaType["Audio"] = 1] = "Audio";
    ChatMediaType[ChatMediaType["Video"] = 2] = "Video";
})(ChatMediaType || (exports.ChatMediaType = ChatMediaType = {}));
var ChatEndType;
(function (ChatEndType) {
    ChatEndType[ChatEndType["Unknown"] = 0] = "Unknown";
    ChatEndType[ChatEndType["Normal"] = 1] = "Normal";
})(ChatEndType || (exports.ChatEndType = ChatEndType = {}));
// 错误类型定义
var ErrorType;
(function (ErrorType) {
    ErrorType["CONNECTION_ERROR"] = "CONNECTION_ERROR";
    ErrorType["AUTH_ERROR"] = "AUTH_ERROR";
    ErrorType["PROTOCOL_ERROR"] = "PROTOCOL_ERROR";
    ErrorType["BUSINESS_ERROR"] = "BUSINESS_ERROR";
    ErrorType["SYSTEM_ERROR"] = "SYSTEM_ERROR";
})(ErrorType || (exports.ErrorType = ErrorType = {}));
// 错误码定义
var ErrorCode;
(function (ErrorCode) {
    // 连接错误 1000-1999
    ErrorCode[ErrorCode["CONNECTION_TIMEOUT"] = 1001] = "CONNECTION_TIMEOUT";
    ErrorCode[ErrorCode["CONNECTION_REFUSED"] = 1002] = "CONNECTION_REFUSED";
    ErrorCode[ErrorCode["CONNECTION_CLOSED"] = 1003] = "CONNECTION_CLOSED";
    // 认证错误 2000-2999
    ErrorCode[ErrorCode["TOKEN_INVALID"] = 2001] = "TOKEN_INVALID";
    ErrorCode[ErrorCode["TOKEN_EXPIRED"] = 2002] = "TOKEN_EXPIRED";
    ErrorCode[ErrorCode["PERMISSION_DENIED"] = 2003] = "PERMISSION_DENIED";
    // 协议错误 3000-3999
    ErrorCode[ErrorCode["MESSAGE_FORMAT_ERROR"] = 3001] = "MESSAGE_FORMAT_ERROR";
    ErrorCode[ErrorCode["DECODE_ERROR"] = 3002] = "DECODE_ERROR";
    ErrorCode[ErrorCode["UNKNOWN_COMMAND"] = 3003] = "UNKNOWN_COMMAND";
    // 业务错误 4000-4999
    ErrorCode[ErrorCode["LIVE_ROOM_NOT_FOUND"] = 4001] = "LIVE_ROOM_NOT_FOUND";
    ErrorCode[ErrorCode["SESSION_NOT_FOUND"] = 4002] = "SESSION_NOT_FOUND";
    ErrorCode[ErrorCode["DUPLICATE_SESSION"] = 4003] = "DUPLICATE_SESSION";
    // 系统错误 5000-5999
    ErrorCode[ErrorCode["INTERNAL_ERROR"] = 5001] = "INTERNAL_ERROR";
    ErrorCode[ErrorCode["RESOURCE_EXHAUSTED"] = 5002] = "RESOURCE_EXHAUSTED";
    ErrorCode[ErrorCode["CONFIG_ERROR"] = 5003] = "CONFIG_ERROR";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
//# sourceMappingURL=index.js.map