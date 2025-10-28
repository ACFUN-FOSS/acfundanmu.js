const { AuthService } = require("../dist/services/AuthService");
const { HttpClient } = require("../dist/core/HttpClient");
const fs = require("fs");
const path = require("path");

// 创建HttpClient实例，增加超时时间到30秒
const httpClient = new HttpClient({
  baseUrl: "",
  timeout: 30000, // 增加到30秒
});

// 创建AuthService实例
const authService = new AuthService(httpClient);

// 生成二维码图片URL并显示给用户
const displayQrCode = (qrCodeData) => {
  const qrCodeUrl = `data:image/png;base64,${qrCodeData}`;
  console.log("\n📱 请使用AcFun App扫描以下二维码进行登录：");
  console.log(" 二维码图片URL:", qrCodeUrl);
  console.log("💡 提示：您可以将此URL复制到浏览器中查看二维码图片");
  console.log("⏰ 二维码有效期为2分钟，请尽快扫描\n");

  return qrCodeUrl;
};

// 模拟二维码扫描和确认的函数
const mockQrCodeScan = async (timeoutMs = 30000) => {
  const startTime = Date.now();
  const maxAttempts = Math.floor(timeoutMs / 2000);
  let attempts = 0;

  console.log(`⏳ 开始轮询检查二维码状态，超时时间: ${timeoutMs / 1000}秒`);

  while (attempts < maxAttempts && Date.now() - startTime < timeoutMs) {
    try {
      const statusResult = await authService.checkQrLoginStatus();

      if (statusResult.success) {
        console.log("✅ 二维码登录成功！");
        console.log(statusResult);
        // 保存token到文件
        if (statusResult.data) {
          const tokenData = {
            token: statusResult.data.token,
            userId: statusResult.data.userId,
            expiresAt: statusResult.data.expiresAt,
            timestamp: Date.now(),
          };

          const tokenPath = path.join(__dirname, "token.json");
          fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2));
          console.log(`✅ Token已保存到: ${tokenPath}`);

          // 打印token信息（脱敏处理）
          console.log(`🔑 用户ID: ${tokenData.userId}`);
          console.log(
            `⏰ Token过期时间: ${new Date(
              tokenData.expiresAt
            ).toLocaleString()}`
          );
          if (tokenData.token) {
            console.log(`🔐 Token: ${tokenData.token.substring(0, 20)}...`);
          }
        }

        return true;
      }

      if (statusResult.error?.includes("二维码已过期")) {
        console.log("❌ 二维码已过期，需要重新获取...");
        return false;
      }

      if (statusResult.error?.includes("用户取消了登录")) {
        console.log("❌ 用户取消了登录");
        return false;
      }

      if (statusResult.error?.includes("token expired")) {
        console.log("❌ 二维码令牌已过期");
        return false;
      }

      // 其他错误
      if (
        statusResult.error &&
        !statusResult.error.includes("请等待用户扫描")
      ) {
        console.log(`❌ 检查二维码状态失败: ${statusResult.error}`);
        return false;
      }

      // 等待用户扫描
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      const remainingSeconds = Math.floor(
        (timeoutMs - (Date.now() - startTime)) / 1000
      );
      console.log(
        `⏳ 等待用户扫描二维码... (${
          attempts + 1
        }/${maxAttempts}) - 已等待: ${elapsedSeconds}s, 剩余: ${remainingSeconds}s`
      );
    } catch (error) {
      console.log(`❌ 检查二维码状态异常: ${error}`);
      return false;
    }

    // 等待2秒后重试
    await new Promise((resolve) => setTimeout(resolve, 2000));
    attempts++;
  }

  console.log(`❌ 二维码登录超时 (${timeoutMs / 1000}秒内未完成)`);
  return false;
};

// 主测试函数
const main = async () => {
  console.log("🚀 开始人机配合二维码登录测试...");

  try {
    // 获取二维码
    let qrResult = await authService.qrLogin();

    if (qrResult.success && qrResult.data) {
      console.log("✅ 二维码获取成功");

      // 显示二维码给用户
      const qrCodeUrl = displayQrCode(qrResult.data.qrCode);
      console.log(`🔑 QR Login Token: ${qrResult.data.qrLoginToken}`);
      console.log(
        `🔒 QR Login Signature: ${qrResult.data.qrLoginSignature.substring(
          0,
          20
        )}...`
      );
      console.log(`⏰ 二维码有效期: ${qrResult.data.expiresIn}秒`);

      // 开始轮询检查二维码状态（30秒超时）
      const scanSuccess = await mockQrCodeScan(30000);
    } else {
      console.log("❌ 二维码获取失败:", qrResult.error);
    }

    // 验证token文件是否创建
    const tokenPath = path.join(__dirname, "token.json");
    if (fs.existsSync(tokenPath)) {
      const tokenData = JSON.parse(fs.readFileSync(tokenPath, "utf-8"));
      console.log("✅ Token文件验证通过");
      console.log(`🔑 用户ID: ${tokenData.userId}`);
      console.log(
        `⏰ Token过期时间: ${new Date(tokenData.expiresAt).toLocaleString()}`
      );
    } else {
      console.log("❌ Token文件未创建");
    }
  } catch (error) {
    console.log("❌ 测试过程中发生错误:", error);
  }

  console.log("🏁 人机配合测试完成");
};

// 运行测试
main();
