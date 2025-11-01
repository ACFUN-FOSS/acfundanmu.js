"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerService = void 0;
class ManagerService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    /**
     * 获取房管列表
     */
    async getManagerList() {
        try {
            // 从HTTP客户端的认证头中获取并验证token信息
            const { tokenInfo, error } = this.httpClient.getValidatedTokenInfo();
            if (error || !tokenInfo) {
                return {
                    success: false,
                    error: error || 'token信息不完整，缺少必要的字段'
                };
            }
            // 根据source目录中的逻辑构建请求URL
            // managerListURL格式: https://api.kuaishouzt.com/rest/zt/live/web/author/action/manager/list?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=%d&did=%s&%s=%s
            const url = `https://api.kuaishouzt.com/rest/zt/live/web/author/action/manager/list?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=${tokenInfo.userID}&did=${tokenInfo.deviceID}&acfun.midground.api_st=${tokenInfo.serviceToken}`;
            // 根据source目录中的fetchKuaiShouAPI逻辑，需要传递form参数
            const formData = new URLSearchParams();
            formData.append('visitorId', tokenInfo.userID.toString());
            // 使用httpClient.post发送请求
            const response = await this.httpClient.post(url, formData.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            // 解析响应数据
            const data = response.data;
            // 根据source目录中的逻辑验证响应
            if (data.result !== 1) {
                return {
                    success: false,
                    error: `获取房管列表失败，响应为 ${JSON.stringify(data)}`
                };
            }
            // 解析房管列表数据
            const list = data.data?.list || [];
            const managerList = list.map((item) => ({
                userId: item.userId?.toString() || '',
                nickname: item.nickname || '',
                avatar: Array.isArray(item.avatar) && item.avatar.length > 0 ? item.avatar[0].url || '' : '',
                customData: item.customData || '',
                online: item.online || false
            }));
            return {
                success: true,
                data: managerList
            };
        }
        catch (error) {
            return {
                success: false,
                error: `获取房管列表失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 添加房管
     */
    async addManager(managerUID) {
        try {
            // 从HTTP客户端的认证头中获取并验证token信息
            const { tokenInfo, error } = this.httpClient.getValidatedTokenInfo();
            if (error || !tokenInfo) {
                return {
                    success: false,
                    error: error || 'token信息不完整，缺少必要的字段'
                };
            }
            // 根据source目录中的逻辑构建请求URL
            // addManagerURL格式: https://api.kuaishouzt.com/rest/zt/live/web/author/action/manager/add?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=%d&did=%s&%s=%s
            const url = `https://api.kuaishouzt.com/rest/zt/live/web/author/action/manager/add?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=${tokenInfo.userID}&did=${tokenInfo.deviceID}&acfun.midground.api_st=${tokenInfo.serviceToken}`;
            // 根据source目录中的fetchKuaiShouAPI逻辑，需要传递form参数
            const formData = new URLSearchParams();
            formData.append('visitorId', tokenInfo.userID.toString());
            formData.append('managerUserId', managerUID.toString());
            // 使用httpClient.post发送请求
            const response = await this.httpClient.post(url, formData.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            // 解析响应数据
            const data = response.data;
            // 根据source目录中的逻辑验证响应
            if (data.result !== 1) {
                return {
                    success: false,
                    error: `添加房管失败，响应为 ${JSON.stringify(data)}`
                };
            }
            return {
                success: true
            };
        }
        catch (error) {
            return {
                success: false,
                error: `添加房管失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 删除房管
     * @param managerUID 房管的用户ID
     */
    async deleteManager(managerUID) {
        try {
            // 从HTTP客户端的认证头中获取并验证token信息
            const { tokenInfo, error } = this.httpClient.getValidatedTokenInfo();
            if (error || !tokenInfo) {
                return {
                    success: false,
                    error: error || 'token信息不完整，缺少必要的字段'
                };
            }
            // 根据source目录中的逻辑构建请求URL
            // deleteManagerURL格式: https://api.kuaishouzt.com/rest/zt/live/web/author/action/manager/delete?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=%d&did=%s&%s=%s
            const url = `https://api.kuaishouzt.com/rest/zt/live/web/author/action/manager/delete?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=${tokenInfo.userID}&did=${tokenInfo.deviceID}&acfun.midground.api_st=${tokenInfo.serviceToken}`;
            // 根据source目录中的fetchKuaiShouAPI逻辑，需要传递form参数
            const formData = new URLSearchParams();
            formData.append('visitorId', tokenInfo.userID.toString());
            formData.append('managerUserId', managerUID.toString());
            // 使用httpClient.post发送请求
            const response = await this.httpClient.post(url, formData.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            // 解析响应数据
            const data = response.data;
            // 根据source目录中的逻辑验证响应
            if (data.result !== 1) {
                return {
                    success: false,
                    error: `删除房管失败，响应为 ${JSON.stringify(data)}`
                };
            }
            return {
                success: true
            };
        }
        catch (error) {
            return {
                success: false,
                error: `删除房管失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 获取主播踢人记录
     */
    async getAuthorKickRecords(liveId, count = 20, page = 0) {
        try {
            // 从HTTP客户端的认证头中获取并验证token信息
            const { tokenInfo, error } = this.httpClient.getValidatedTokenInfo();
            if (error || !tokenInfo) {
                return {
                    success: false,
                    error: error || 'token信息不完整，缺少必要的字段'
                };
            }
            // 根据source目录中的逻辑构建请求URL
            // kickHistoryURL格式: https://api.kuaishouzt.com/rest/zt/live/web/author/action/kickHistory?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=%d&did=%s&%s=%s
            const url = `https://api.kuaishouzt.com/rest/zt/live/web/author/action/kickHistory?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=${tokenInfo.userID}&did=${tokenInfo.deviceID}&acfun.midground.api_st=${tokenInfo.serviceToken}`;
            // 根据source目录中的fetchKuaiShouAPI逻辑，需要传递form参数
            const formData = new URLSearchParams();
            formData.append('liveId', liveId);
            formData.append('limit', count.toString());
            formData.append('pcursor', page.toString());
            // 使用httpClient.post发送请求
            const response = await this.httpClient.post(url, formData.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            // 解析响应数据
            const data = response.data;
            // 根据source目录中的逻辑验证响应
            if (data.result !== 1) {
                return {
                    success: false,
                    error: `获取主播踢人记录失败，响应为 ${JSON.stringify(data)}`
                };
            }
            // 解析踢人记录数据
            const list = data.data?.list || [];
            const kickRecords = list.map((item) => ({
                userId: item.userId?.toString() || '',
                nickname: item.nickname || '',
                kickTime: item.kickTime || 0
            }));
            return {
                success: true,
                data: kickRecords
            };
        }
        catch (error) {
            return {
                success: false,
                error: `获取主播踢人记录失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 房管踢人
     */
    async managerKick(liveID, kickedUID) {
        try {
            // 从HTTP客户端的认证头中获取并验证token信息
            const { tokenInfo, error } = this.httpClient.getValidatedTokenInfo();
            if (error || !tokenInfo) {
                return {
                    success: false,
                    error: error || 'token信息不完整，缺少必要的字段'
                };
            }
            // 根据source目录中的逻辑构建请求URL
            // managerKickURL格式: https://api.kuaishouzt.com/rest/zt/live/web/manager/kick?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=%d&did=%s&%s=%s
            const url = `https://api.kuaishouzt.com/rest/zt/live/web/manager/kick?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=${tokenInfo.userID}&did=${tokenInfo.deviceID}&acfun.midground.api_st=${tokenInfo.serviceToken}`;
            // 根据source目录中的fetchKuaiShouAPI逻辑，需要传递form参数
            const formData = new URLSearchParams();
            formData.append('liveId', liveID);
            formData.append('kickedUserId', kickedUID.toString());
            // 使用httpClient.post发送请求
            const response = await this.httpClient.post(url, formData.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            // 解析响应数据
            const data = response.data;
            // 根据source目录中的逻辑验证响应
            if (!data || data.result !== 1 || !data.data?.kickSucc) {
                return {
                    success: false,
                    error: `房管踢人失败，响应为 ${JSON.stringify(data)}`
                };
            }
            return {
                success: true
            };
        }
        catch (error) {
            return {
                success: false,
                error: `房管踢人失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    /**
     * 主播踢人
     */
    async authorKick(liveID, kickedUID) {
        try {
            // 从HTTP客户端的认证头中获取并验证token信息
            const { tokenInfo, error } = this.httpClient.getValidatedTokenInfo();
            if (error || !tokenInfo) {
                return {
                    success: false,
                    error: error || 'token信息不完整，缺少必要的字段'
                };
            }
            // 根据source目录中的逻辑构建请求URL
            // authorKickURL格式: https://api.kuaishouzt.com/rest/zt/live/web/author/action/kick?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=%d&did=%s&%s=%s
            const url = `https://api.kuaishouzt.com/rest/zt/live/web/author/action/kick?subBiz=mainApp&kpn=ACFUN_APP&kpf=PC_WEB&userId=${tokenInfo.userID}&did=${tokenInfo.deviceID}&acfun.midground.api_st=${tokenInfo.serviceToken}`;
            // 根据source目录中的fetchKuaiShouAPI逻辑，需要传递form参数
            const formData = new URLSearchParams();
            formData.append('liveId', liveID);
            formData.append('kickedUserId', kickedUID.toString());
            // 使用httpClient.post发送请求
            const response = await this.httpClient.post(url, formData.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            // 解析响应数据
            const data = response.data;
            // 根据source目录中的逻辑验证响应
            if (!data || data.result !== 1 || !data.data?.kickSucc) {
                return {
                    success: false,
                    error: `主播踢人失败，响应为 ${JSON.stringify(data)}`
                };
            }
            return {
                success: true
            };
        }
        catch (error) {
            return {
                success: false,
                error: `主播踢人失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
}
exports.ManagerService = ManagerService;
//# sourceMappingURL=ManagerService.js.map