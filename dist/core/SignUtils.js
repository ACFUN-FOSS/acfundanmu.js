"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUtils = void 0;
const crypto_1 = __importDefault(require("crypto"));
const url_1 = require("url");
// 简单的自然排序实现（模拟natsort.Sort）
function naturalSort(arr) {
    return [...arr].sort((a, b) => {
        const aParts = a.split(/(\d+)/).filter(Boolean);
        const bParts = b.split(/(\d+)/).filter(Boolean);
        for (let i = 0; i < Math.min(aParts.length, bParts.length); i++) {
            const aPart = aParts[i];
            const bPart = bParts[i];
            // 检查是否都是数字
            const aIsNum = !isNaN(Number(aPart));
            const bIsNum = !isNaN(Number(bPart));
            if (aIsNum && bIsNum) {
                // 数字比较
                const aNum = Number(aPart);
                const bNum = Number(bPart);
                if (aNum !== bNum)
                    return aNum - bNum;
            }
            else if (aIsNum || bIsNum) {
                // 一个是数字，一个是字符串，数字优先
                return aIsNum ? -1 : 1;
            }
            else {
                // 字符串比较
                if (aPart !== bPart)
                    return aPart.localeCompare(bPart);
            }
        }
        // 前缀相同，长度短的优先
        return aParts.length - bParts.length;
    });
}
class SignUtils {
    /**
     * 生成客户端签名
     * 参照Go源码中的genClientSign方法实现
     */
    static generateClientSign(options) {
        const { url, formData, securityKey } = options;
        try {
            // 解析URL
            const parsedUrl = new url_1.URL(url);
            const path = parsedUrl.pathname;
            // 收集URL参数和表单参数，忽略以__开头的参数
            const paramsStr = [];
            // 收集URL参数
            parsedUrl.searchParams.forEach((value, key) => {
                // 忽略以__开头的参数
                if (typeof key === 'string' && !key.startsWith('__')) {
                    paramsStr.push(`${key}=${value}`);
                }
            });
            // 收集表单参数
            if (formData) {
                formData.forEach((value, key) => {
                    // 忽略以__开头的参数
                    if (typeof key === 'string' && !key.startsWith('__')) {
                        paramsStr.push(`${key}=${value}`);
                    }
                });
            }
            // 使用自然排序算法排序参数
            const sortedParams = naturalSort(paramsStr);
            // 生成nonce - 完全按照Go源码实现
            const minute = Math.floor(Date.now() / 60000);
            const randomNum = Math.floor(Math.random() * 2147483647); // 32位随机数
            const nonce = BigInt(minute) | (BigInt(randomNum) << 32n);
            const nonceStr = nonce.toString();
            // 构建需要签名的字符串
            const joinedParams = sortedParams.join('&');
            const needSigned = `POST&${path}&${joinedParams}&${nonceStr}`;
            // 解码securityKey
            const key = Buffer.from(securityKey, 'base64');
            // 计算HMAC-SHA256
            const hmac = crypto_1.default.createHmac('sha256', key);
            hmac.update(needSigned);
            const hashed = hmac.digest();
            // 构建签名字节 - 使用writeBigInt64BE简化实现
            const nonceBuffer = Buffer.alloc(8);
            nonceBuffer.writeBigInt64BE(nonce);
            const signedBytes = Buffer.concat([nonceBuffer, hashed]);
            // 返回base64RawURL编码
            const clientSign = signedBytes.toString('base64url');
            return clientSign;
        }
        catch (error) {
            console.error('生成客户端签名失败:', error);
            throw new Error(`生成客户端签名失败: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    /**
     * 验证签名是否有效
     */
    static validateClientSign(sign, options) {
        try {
            const generatedSign = this.generateClientSign(options);
            return sign === generatedSign;
        }
        catch {
            return false;
        }
    }
}
exports.SignUtils = SignUtils;
//# sourceMappingURL=SignUtils.js.map