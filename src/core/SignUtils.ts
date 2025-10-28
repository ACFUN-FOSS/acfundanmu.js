import crypto from 'crypto';
import { URL } from 'url';

// 简单的自然排序实现（模拟natsort.Sort）
function naturalSort<T extends string>(arr: T[]): T[] {
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
        if (aNum !== bNum) return aNum - bNum;
      } else if (aIsNum || bIsNum) {
        // 一个是数字，一个是字符串，数字优先
        return aIsNum ? -1 : 1;
      } else {
        // 字符串比较
        if (aPart !== bPart) return aPart.localeCompare(bPart);
      }
    }
    
    // 前缀相同，长度短的优先
    return aParts.length - bParts.length;
  });
}

export interface SignOptions {
  url: string;
  formData?: URLSearchParams;
  securityKey: string;
}

export class SignUtils {
  /**
   * 生成客户端签名
   * 参照Go源码中的genClientSign方法实现
   */
  public static generateClientSign(options: SignOptions): string {
    const { url, formData, securityKey } = options;
    
    try {
      console.log('=== 开始生成签名 ===');
      console.log('输入URL:', url);
      console.log('输入securityKey:', securityKey);
      
      // 解析URL
      const parsedUrl = new URL(url);
      const path = parsedUrl.pathname;
      console.log('解析后path:', path);
      
      // 收集URL参数和表单参数，忽略以__开头的参数
      const paramsStr: string[] = [];
      
      // 收集URL参数
      console.log('收集URL参数:');
      parsedUrl.searchParams.forEach((value, key) => {
        // 忽略以__开头的参数
        if (typeof key === 'string' && !key.startsWith('__')) {
          console.log(`  ${key}=${value}`);
          paramsStr.push(`${key}=${value}`);
        }
      });
      
      // 收集表单参数
      if (formData) {
        console.log('收集表单参数:');
        formData.forEach((value, key) => {
          // 忽略以__开头的参数
          if (typeof key === 'string' && !key.startsWith('__')) {
            console.log(`  ${key}=${value}`);
            paramsStr.push(`${key}=${value}`);
          }
        });
      }
      
      // 使用自然排序算法排序参数
      const sortedParams = naturalSort(paramsStr);
      console.log('排序后参数:', sortedParams);
      
      // 生成nonce - 完全按照Go源码实现
      const minute = Math.floor(Date.now() / 60000);
      const randomNum = Math.floor(Math.random() * 2147483647); // 32位随机数
      const nonce = BigInt(minute) | (BigInt(randomNum) << 32n);
      const nonceStr = nonce.toString();
      console.log('生成nonce:');
      console.log('  minute:', minute);
      console.log('  randomNum:', randomNum);
      console.log('  nonce:', nonce);
      console.log('  nonceStr:', nonceStr);
      
      // 构建需要签名的字符串
      const joinedParams = sortedParams.join('&');
      const needSigned = `POST&${path}&${joinedParams}&${nonceStr}`;
      console.log('需要签名的字符串:', needSigned);
      
      // 解码securityKey
      const key = Buffer.from(securityKey, 'base64');
      console.log('解码后的key长度:', key.length);
      
      // 计算HMAC-SHA256
      const hmac = crypto.createHmac('sha256', key);
      hmac.update(needSigned);
      const hashed = hmac.digest();
      console.log('哈希长度:', hashed.length);
      
      // 构建签名字节 - 使用writeBigInt64BE简化实现
      const nonceBuffer = Buffer.alloc(8);
      nonceBuffer.writeBigInt64BE(nonce);
      console.log('nonceBuffer:', nonceBuffer.toString('hex'));
      
      const signedBytes = Buffer.concat([nonceBuffer, hashed]);
      console.log('合并后字节长度:', signedBytes.length);
      
      // 返回base64RawURL编码
      const clientSign = signedBytes.toString('base64url');
      console.log('生成的签名:', clientSign);
      console.log('=== 签名生成完成 ===');
      
      return clientSign;
      
    } catch (error) {
      console.error('生成客户端签名失败:', error);
      throw new Error(`生成客户端签名失败: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * 验证签名是否有效
   */
  public static validateClientSign(sign: string, options: SignOptions): boolean {
    try {
      const generatedSign = this.generateClientSign(options);
      return sign === generatedSign;
    } catch {
      return false;
    }
  }
}