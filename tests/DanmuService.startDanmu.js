const fs = require('fs')
const path = require('path')

async function main() {
  try {
    const distApi = path.join(__dirname, '..', 'dist', 'AcFunLiveApi.js')
    if (!fs.existsSync(distApi)) {
      console.error('[构建缺失] 未找到 dist/AcFunLiveApi.js，请先运行: npm run build')
      process.exit(1)
    }
    const { AcFunLiveApi } = require(distApi)

    const api = new AcFunLiveApi()

    const tokenPath = path.join(__dirname, 'token.json')
    if (!fs.existsSync(tokenPath)) {
      console.error('token.json不存在，请先生成token')
      process.exit(1)
    }
    const tokenFileData = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'))
    const token = tokenFileData.token
    api.setAuthToken(token)
    try {
      const tokenData = JSON.parse(token)
      console.log('已加载token:', tokenData.userID)
    } catch {}

    const liverUID = '173620'
    console.log('\n使用指定的主播UID进行采集:', liverUID)

    const receivedDanmus = []
    const targetCount = 5
    let sessionId = ''

    const result = await api.danmu.startDanmu(liverUID, (event) => {
      const plainEvent = {
        liverUID: Number(liverUID),
        data: event
      }
      receivedDanmus.push(plainEvent)

      console.log('\n========================================')
      const danmuInfo = (event || {}).danmuInfo || { sendTime: Date.now(), userInfo: { nickname: '', userID: 0 } }
      console.log('发送时间:', new Date(danmuInfo.sendTime).toLocaleString('zh-CN'))
      console.log('用户昵称:', danmuInfo.userInfo.nickname)
      console.log('用户ID:', danmuInfo.userInfo.userID)
      if ('content' in event) {
        console.log('>>> 弹幕内容:', event.content)
      } else if ('giftDetail' in event) {
        const gift = event
        console.log('>>> 礼物名称:', gift.giftDetail?.giftName)
        console.log('>>> 礼物数量:', gift.count)
        console.log('>>> 礼物价值:', gift.value)
      } else if ('bananaCount' in event) {
        console.log('>>> 投蕉数量:', event.bananaCount)
      } else if ('segments' in event) {
        console.log('>>> 富文本内容: [富文本消息]')
      }
      console.log('========================================\n')
    }, true)
  } catch (err) {
    console.error('运行失败:', err && err.message ? err.message : String(err))
    process.exit(1)
  }
}




main()

