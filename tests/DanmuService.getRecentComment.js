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

    let tokenPath = path.join(__dirname, 'token.json')
    if (!fs.existsSync(tokenPath)) {
      const altPath = path.join(__dirname, '..', 'tests', 'token.json')
      if (fs.existsSync(altPath)) {
        tokenPath = altPath
      } else {
        console.error('token.json不存在，请先生成token，或运行: node tests/manual_qr_test.js')
        process.exit(1)
      }
    }
    const tokenFileData = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'))
    const token = tokenFileData.token
    api.setAuthToken(token)
    try {
      const tokenData = JSON.parse(token)
      console.log('已加载token:', tokenData.userID)
    } catch {}

    const liverUID = '173620'
    console.log('\n采集主播UID历史弹幕:', liverUID)

    let sessionId = ''
    let stopped = false

    const result = await api.danmu.startDanmu(liverUID, (event) => {
      if (event && event.isHistory) {
        const sendTime = new Date(Number(event.sendTime || Date.now())).toLocaleString('zh-CN')
        const nickname = (event.userInfo || {}).nickname || ''
        const uid = (event.userInfo || {}).userID || 0
        const content = String(event.content || '')
        console.log(event.userInfo)
      } else if (event && event.type === 'recentComment' && Array.isArray(event.data)) {
        for (const c of event.data) {
          const sendTime = new Date(Number(c.sendTime || Date.now())).toLocaleString('zh-CN')
          const nickname = (c.userInfo || {}).nickname || ''
          const uid = (c.userInfo || {}).userID || 0
          const content = String(c.content || '')
          // console.log(event.userInfo)
        }
        if (!stopped && sessionId) {
          stopped = true
          setTimeout(async () => {
            const stopRes = await api.danmu.stopDanmu(sessionId)
            console.log('\n关闭连接:')
            console.log('响应状态:', stopRes.success)
            console.log('返回数据:', stopRes.data || null)
            process.exit(0)
          }, 500)
        }
      }
    }, true)

    console.log('请求参数:', { liverUID })
    console.log('响应状态:', result.success)
    console.log('返回数据:', result.data || null)

    if (!result.success || !result.data) {
      console.error('启动失败:', result.error || '未知错误')
      process.exit(1)
    }

    sessionId = result.data.sessionId
  } catch (err) {
    console.error('运行失败:', err && err.message ? err.message : String(err))
    process.exit(1)
  }
}

main()
