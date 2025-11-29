import { GiftService } from './GiftService'
import { GiftDetail, ApiResponse } from '../types'

export class GiftRegistry {
  private service: GiftService
  private gifts: Map<number, GiftDetail> = new Map()
  private initialized: boolean = false
  private initializing: Promise<void> | null = null

  constructor(service: GiftService) {
    this.service = service
  }

  public async warmup(liveID?: string): Promise<void> {
    const loader = async () => {
      let resp: ApiResponse<Array<GiftDetail>>
      if (liveID && liveID.trim() !== '') {
        resp = await this.service.getLiveGiftList(liveID)
      } else {
        resp = await this.service.getAllGiftList()
      }
      if (resp.success && resp.data) {
        this.gifts.clear()
        for (const g of resp.data) {
          this.gifts.set(Number(g.giftID || 0), {
            giftID: Number(g.giftID || 0),
            giftName: g.giftName || '',
            arLiveName: g.arLiveName || '',
            payWalletType: Number(g.payWalletType || 0),
            price: Number(g.price || 0),
            webpPic: g.webpPic || '',
            pngPic: g.pngPic || '',
            smallPngPic: g.smallPngPic || '',
            allowBatchSendSizeList: Array.isArray(g.allowBatchSendSizeList) ? g.allowBatchSendSizeList : [],
            canCombo: Boolean(g.canCombo),
            canDraw: Boolean(g.canDraw),
            magicFaceID: Number(g.magicFaceID || 0),
            vupArID: Number(g.vupArID || 0),
            description: g.description || '',
            redpackPrice: Number(g.redpackPrice || 0),
            cornerMarkerText: g.cornerMarkerText || ''
          })
        }
        this.initialized = true
      }
    }
    this.initializing = loader()
    await this.initializing
    this.initializing = null
  }

  public async ensureLoaded(liveID?: string): Promise<void> {
    if (this.initialized && this.gifts.size > 0) return
    if (this.initializing) {
      await this.initializing
      return
    }
    await this.warmup(liveID)
  }

  public getDetail(giftID: number): GiftDetail | undefined {
    return this.gifts.get(Number(giftID))
  }

  public enrich(giftID: number): GiftDetail {
    const g = this.getDetail(giftID)
    if (g) return g
    return {
      giftID: Number(giftID || 0),
      giftName: '未知礼物',
      arLiveName: '',
      payWalletType: 0,
      price: 0,
      webpPic: '',
      pngPic: '',
      smallPngPic: '',
      allowBatchSendSizeList: [],
      canCombo: false,
      canDraw: false,
      magicFaceID: 0,
      vupArID: 0,
      description: '',
      redpackPrice: 0,
      cornerMarkerText: ''
    }
  }
}

