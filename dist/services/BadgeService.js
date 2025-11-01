"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgeService = void 0;
const ApiUtils_1 = require("../core/ApiUtils");
class BadgeService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    /**
     * 获取登陆用户拥有的指定主播守护徽章详细信息
     */
    async getBadgeDetail(uperID) {
        try {
            // 构建请求URL
            const url = `https://live.acfun.cn/rest/pc-direct/fansClub/fans/medal/detail?uperId=${uperID}`;
            // 使用通用GET请求函数
            const response = await (0, ApiUtils_1.apiGet)(this.httpClient, url, '获取守护徽章详细信息');
            if (!response.success) {
                return response;
            }
            const data = response.data;
            // 解析守护徽章详细信息 - 根据实际API响应结构调整
            // API返回的是medalDegreeLimit字段，而不是medal字段
            const medalInfo = data.medalDegreeLimit;
            if (!medalInfo) {
                return {
                    success: false,
                    error: '守护徽章详细信息数据为空'
                };
            }
            const badgeDetail = {
                uperID: medalInfo.uperId || uperID,
                userID: 0, // 这个API可能不返回userId，需要从其他接口获取
                clubName: '', // 这个API可能不返回clubName，需要从其他接口获取
                level: 0, // 这个API可能不返回level，需要从其他接口获取
                experience: medalInfo.giftDegree || 0,
                nextLevelExperience: medalInfo.giftDegreeLimit || 0,
                joinTime: 0 // 这个API可能不返回joinTime，需要从其他接口获取
            };
            return {
                success: true,
                data: badgeDetail
            };
        }
        catch (error) {
            return {
                success: false,
                error: `获取守护徽章详细信息失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 获取登陆用户拥有的守护徽章列表
     */
    async getBadgeList() {
        try {
            // 构建请求URL
            const url = 'https://www.acfun.cn/rest/pc-direct/fansClub/fans/medal/list';
            // 使用通用GET请求函数
            const response = await (0, ApiUtils_1.apiGet)(this.httpClient, url, '获取守护徽章列表');
            if (!response.success) {
                return response;
            }
            const data = response.data;
            // 解析守护徽章列表
            const medalList = data.medalList || [];
            const badges = medalList.map((medal) => ({
                uperID: medal.uperId || 0,
                userID: medal.userId || 0,
                clubName: medal.clubName || '',
                level: medal.level || 0
            }));
            return {
                success: true,
                data: badges
            };
        }
        catch (error) {
            return {
                success: false,
                error: `获取守护徽章列表失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 获取主播守护榜
     */
    async getBadgeRank(uperID) {
        try {
            // 构建请求URL
            const url = `https://live.acfun.cn/rest/pc-direct/fansClub/friendshipDegreeRankInfo?uperId=${uperID}`;
            // 使用通用GET请求函数
            const response = await (0, ApiUtils_1.apiGet)(this.httpClient, url, '获取主播守护榜');
            if (!response.success) {
                return response;
            }
            const data = response.data;
            // 解析守护榜信息
            const rankList = data.rankList || [];
            const badgeRanks = rankList.map((rank, index) => ({
                userID: rank.userId || 0,
                nickname: rank.nickname || '',
                avatar: rank.avatar || '',
                level: rank.level || 0,
                experience: rank.friendshipDegree || 0,
                rank: index + 1
            }));
            return {
                success: true,
                data: badgeRanks
            };
        }
        catch (error) {
            return {
                success: false,
                error: `获取主播守护榜失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 获取指定用户正在佩戴的守护徽章信息
     */
    async getWornBadge(userID) {
        try {
            // 构建请求URL
            const url = `https://live.acfun.cn/rest/pc-direct/fansClub/user/info?userId=${userID}`;
            // 使用通用GET请求函数
            const response = await (0, ApiUtils_1.apiGet)(this.httpClient, url, '获取用户佩戴徽章信息');
            if (!response.success) {
                return response;
            }
            const data = response.data;
            // 解析佩戴徽章信息
            const wearMedalInfo = data.wearMedalInfo;
            if (!wearMedalInfo) {
                return {
                    success: false,
                    error: '用户佩戴徽章信息数据为空'
                };
            }
            const badge = {
                uperID: wearMedalInfo.uperId || 0,
                userID: userID,
                clubName: wearMedalInfo.clubName || '',
                level: wearMedalInfo.level || 0
            };
            return {
                success: true,
                data: badge
            };
        }
        catch (error) {
            return {
                success: false,
                error: `获取用户佩戴徽章信息失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 佩戴守护徽章
     */
    async wearBadge(uperID) {
        try {
            // 构建请求URL
            const url = `https://live.acfun.cn/rest/pc-direct/fansClub/fans/medal/wear?uperId=${uperID}`;
            // 使用通用GET请求函数
            const response = await (0, ApiUtils_1.apiGet)(this.httpClient, url, '佩戴守护徽章');
            if (!response.success) {
                return response;
            }
            const data = response.data;
            // 检查API响应结果
            if (data.result === undefined || data.result === null || data.result !== 0) {
                return {
                    success: false,
                    error: `佩戴守护徽章失败，响应为 ${JSON.stringify(data)}`,
                    code: data.result
                };
            }
            return {
                success: true
            };
        }
        catch (error) {
            return {
                success: false,
                error: `佩戴守护徽章失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 取消佩戴守护徽章
     */
    async unwearBadge() {
        try {
            // 首先需要获取用户当前佩戴的徽章信息，以获取主播ID
            // 构建请求URL获取用户信息
            const userUrl = 'https://live.acfun.cn/rest/pc-direct/fansClub/user/info?userId=0'; // 0表示当前用户
            // 使用通用GET请求函数获取用户佩戴的徽章信息
            const userResponse = await (0, ApiUtils_1.apiGet)(this.httpClient, userUrl, '获取用户信息');
            if (!userResponse.success) {
                return userResponse;
            }
            const userData = userResponse.data;
            // 获取当前佩戴徽章的主播ID
            const wearMedalInfo = userData.wearMedalInfo;
            if (!wearMedalInfo || !wearMedalInfo.uperId) {
                return {
                    success: false,
                    error: '用户未佩戴任何徽章'
                };
            }
            const uperID = wearMedalInfo.uperId;
            // 构建取消佩戴徽章的请求URL
            const url = `https://live.acfun.cn/rest/pc-direct/fansClub/fans/medal/cancelWear?uperId=${uperID}`;
            // 使用通用GET请求函数
            const response = await (0, ApiUtils_1.apiGet)(this.httpClient, url, '取消佩戴守护徽章');
            if (!response.success) {
                return response;
            }
            const data = response.data;
            // 检查API响应结果
            if (data.result === undefined || data.result === null || data.result !== 0) {
                return {
                    success: false,
                    error: `取消佩戴守护徽章失败，响应为 ${JSON.stringify(data)}`,
                    code: data.result
                };
            }
            return {
                success: true
            };
        }
        catch (error) {
            return {
                success: false,
                error: `取消佩戴守护徽章失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
}
exports.BadgeService = BadgeService;
//# sourceMappingURL=BadgeService.js.map