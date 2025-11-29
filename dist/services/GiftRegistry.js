"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiftRegistry = void 0;
class GiftRegistry {
    constructor(service) {
        this.gifts = new Map();
        this.initialized = false;
        this.initializing = null;
        this.service = service;
    }
    async warmup(liveID) {
        const loader = async () => {
            let resp;
            if (liveID && liveID.trim() !== '') {
                resp = await this.service.getLiveGiftList(liveID);
            }
            else {
                resp = await this.service.getAllGiftList();
            }
            if (resp.success && resp.data) {
                this.gifts.clear();
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
                    });
                }
                this.initialized = true;
            }
        };
        this.initializing = loader();
        await this.initializing;
        this.initializing = null;
    }
    async ensureLoaded(liveID) {
        if (this.initialized && this.gifts.size > 0)
            return;
        if (this.initializing) {
            await this.initializing;
            return;
        }
        await this.warmup(liveID);
    }
    getDetail(giftID) {
        return this.gifts.get(Number(giftID));
    }
    enrich(giftID) {
        const g = this.getDetail(giftID);
        if (g)
            return g;
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
        };
    }
}
exports.GiftRegistry = GiftRegistry;
//# sourceMappingURL=GiftRegistry.js.map