import { AcFunLiveApi } from '../src/index'
import * as fs from 'fs'
import * as path from 'path'

describe('DanmuService.getDanmu.response', () => {
  let api: AcFunLiveApi
  const liverUID = '173620'

  beforeAll(() => {
    api = new AcFunLiveApi()
    const tokenPath = path.join(__dirname, 'token.json')
    const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'))
    api.setAuthToken(tokenData.token)
  })

  it('获取弹幕并打印响应后关闭', async () => {
    const params = { liverUID }
    console.log('请求参数:', params)

    const result = await api.danmu.startDanmu(liverUID, () => {}, false)
    console.log('响应状态:', result.success ? 200 : 500)
    console.log(JSON.stringify(result.data))

    expect(result).toBeDefined()
    expect(typeof result.success).toBe('boolean')

    if (result.success && result.data?.sessionId) {
      const stop = await api.danmu.stopDanmu(result.data.sessionId)
      console.log('已关闭会话:', stop.success ? 'success' : stop.error)
      expect(stop.success).toBe(true)
    }
  }, 30000)
})

