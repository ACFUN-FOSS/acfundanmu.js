"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivePreviewService = void 0;
class LivePreviewService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    /**
     * 获取直播预告列表
     */
    async getLivePreviewList() {
        try {
            // 从HTTP客户端的认证头中获取并验证token信息
            const { tokenInfo, error } = this.httpClient.getValidatedTokenInfo();
            if (error || !tokenInfo) {
                return {
                    success: false,
                    error: error || 'token信息不完整，缺少必要的字段'
                };
            }
            // 根据source目录中的scheduleListURL构建请求URL
            const url = 'https://api-new.app.acfun.cn/rest/app/live/schedule/list';
            // 根据source目录中的逻辑，需要传递form参数
            const formData = new URLSearchParams();
            // 使用httpClient.post直接发送请求
            const response = await this.httpClient.post(url, formData.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            if (!response.success) {
                return {
                    success: false,
                    error: response.error || '获取直播预告列表失败'
                };
            }
            const data = response.data;
            // 根据source目录中的逻辑验证响应
            if (data.result === undefined || data.result !== 0) {
                return {
                    success: false,
                    error: '获取直播预告列表失败'
                };
            }
            // 解析直播预告列表
            const liveScheduleList = data.liveScheduleList || [];
            const previewList = liveScheduleList.map((schedule) => {
                const user = schedule.user || {};
                return {
                    userId: parseInt(schedule.authorId) || 0,
                    userName: user.name || '',
                    liveTitle: schedule.title || '',
                    liveCover: schedule.cover || '',
                    scheduledTime: new Date(schedule.startTime || 0).toISOString()
                };
            });
            return {
                success: true,
                data: { previewList }
            };
        }
        catch (error) {
            return {
                success: false,
                error: `获取直播预告列表失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
}
exports.LivePreviewService = LivePreviewService;
//# sourceMappingURL=LivePreviewService.js.map