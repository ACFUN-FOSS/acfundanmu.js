"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiftService = void 0;
class GiftService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    /**
     * 获取全部礼物列表
     */
    async getAllGiftList() {
        try {
            // 从HTTP客户端的认证头中获取并验证token信息
            const { tokenInfo, error } = this.httpClient.getValidatedTokenInfo();
            if (error || !tokenInfo) {
                return {
                    success: false,
                    error: error || 'token信息不完整，缺少必要的字段'
                };
            }
            // 构建请求URL
            const url = `https://api.kuaishouzt.com/rest/zt/live/web/gift/all?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=${tokenInfo.userID}&did=${tokenInfo.deviceID}&acfun.midground.api_st=${tokenInfo.serviceToken}`;
            // 构建表单数据
            const formData = new URLSearchParams();
            formData.append('visitorId', tokenInfo.userID.toString());
            // 发送POST请求
            const response = await this.httpClient.post(url, formData.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            if (!response.success) {
                return {
                    success: false,
                    error: response.error || '获取全部礼物列表失败'
                };
            }
            // 验证API响应
            if (response.data.result !== 1) {
                return {
                    success: false,
                    error: `获取全部礼物列表失败，响应为 ${JSON.stringify(response.data)}`
                };
            }
            // 解析礼物列表数据
            const giftList = response.data.data?.giftList || [];
            const gifts = giftList.map((gift) => ({
                giftID: gift.giftId || 0,
                giftName: gift.giftName || '',
                arLiveName: gift.arLiveName || '',
                payWalletType: gift.payWalletType || 0,
                price: gift.giftPrice || 0,
                webpPic: gift.webpPicList?.[0]?.url || '',
                pngPic: gift.pngPicList?.[0]?.url || '',
                smallPngPic: gift.smallPngPicList?.[0]?.url || '',
                allowBatchSendSizeList: gift.allowBatchSendSizeList || [],
                canCombo: gift.canCombo || false,
                canDraw: gift.canDraw || false,
                magicFaceID: gift.magicFaceId || 0,
                vupArID: gift.vupArId || 0,
                description: gift.description || '',
                redpackPrice: gift.redpackPrice || 0,
                cornerMarkerText: gift.cornerMarkerText || ''
            }));
            return {
                success: true,
                data: gifts
            };
        }
        catch (error) {
            return {
                success: false,
                error: `获取全部礼物列表失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 获取直播间礼物列表
     */
    async getLiveGiftList(liveID) {
        try {
            // 输入参数验证
            if (!liveID || typeof liveID !== 'string' || liveID.trim() === '') {
                return {
                    success: false,
                    error: 'liveID参数不能为空'
                };
            }
            // 从HTTP客户端的认证头中获取并验证token信息
            const { tokenInfo, error } = this.httpClient.getValidatedTokenInfo();
            if (error || !tokenInfo) {
                return {
                    success: false,
                    error: error || 'token信息不完整，缺少必要的字段'
                };
            }
            // 根据source目录中的逻辑构建请求URL
            // giftURL格式: https://api.kuaishouzt.com/rest/zt/live/web/gift/list?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=%d&did=%s&%s=%s
            const serviceTokenType = tokenInfo.cookies && tokenInfo.cookies.length > 0 ? 'acfun.midground.api_st' : 'acfun.api.visitor_st';
            const url = `https://api.kuaishouzt.com/rest/zt/live/web/gift/list?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=${tokenInfo.userID}&did=${tokenInfo.deviceID}&${serviceTokenType}=${encodeURIComponent(tokenInfo.serviceToken)}`;
            // 根据source目录中的defaultForm逻辑构建表单数据
            const formData = new URLSearchParams();
            formData.append('visitorId', tokenInfo.userID.toString());
            formData.append('liveId', liveID);
            // 构建请求头
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Referer': 'https://live.acfun.cn/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            };
            // 设置cookies
            if (tokenInfo.cookies && tokenInfo.cookies.length > 0) {
                headers['Cookie'] = tokenInfo.cookies.map((cookie) => {
                    const parts = cookie.split(';')[0].split('=');
                    return `${parts[0]}=${parts[1]}`;
                }).join('; ');
            }
            else {
                headers['Cookie'] = `_did=${tokenInfo.deviceID}`;
            }
            // 发送POST请求
            const response = await this.httpClient.post(url, formData.toString(), { headers });
            if (!response.success) {
                return {
                    success: false,
                    error: response.error || '获取直播间礼物列表失败'
                };
            }
            // 验证API响应
            if (response.data.result !== 1) {
                return {
                    success: false,
                    error: `获取直播间礼物列表失败，响应为 ${JSON.stringify(response.data)}`
                };
            }
            // 解析礼物列表数据
            const giftList = response.data.data?.giftList || [];
            const gifts = giftList.map((gift) => ({
                giftID: gift.giftId || 0,
                giftName: gift.giftName || '',
                arLiveName: gift.arLiveName || '',
                payWalletType: gift.payWalletType || 0,
                price: gift.giftPrice || 0,
                webpPic: gift.webpPicList?.[0]?.url || '',
                pngPic: gift.pngPicList?.[0]?.url || '',
                smallPngPic: gift.smallPngPicList?.[0]?.url || '',
                allowBatchSendSizeList: gift.allowBatchSendSizeList || [],
                canCombo: gift.canCombo || false,
                canDraw: gift.canDraw || false,
                magicFaceID: gift.magicFaceId || 0,
                vupArID: gift.vupArId || 0,
                description: gift.description || '',
                redpackPrice: gift.redpackPrice || 0,
                cornerMarkerText: gift.cornerMarkerText || ''
            }));
            return {
                success: true,
                data: gifts
            };
        }
        catch (error) {
            return {
                success: false,
                error: `获取直播间礼物列表失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
}
exports.GiftService = GiftService;
//# sourceMappingURL=GiftService.js.map