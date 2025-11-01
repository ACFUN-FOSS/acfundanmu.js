import { HttpClient } from '../core/HttpClient';
import { ApiResponse } from '../types';
export declare class GiftService {
    private httpClient;
    constructor(httpClient: HttpClient);
    /**
     * 获取全部礼物列表
     */
    getAllGiftList(): Promise<ApiResponse<Array<{
        giftID: number;
        giftName: string;
        arLiveName: string;
        payWalletType: number;
        price: number;
        webpPic: string;
        pngPic: string;
        smallPngPic: string;
        allowBatchSendSizeList: number[];
        canCombo: boolean;
        canDraw: boolean;
        magicFaceID: number;
        vupArID: number;
        description: string;
        redpackPrice: number;
        cornerMarkerText: string;
    }>>>;
    /**
     * 获取直播间礼物列表
     */
    getLiveGiftList(liveID: string): Promise<ApiResponse<Array<{
        giftID: number;
        giftName: string;
        arLiveName: string;
        payWalletType: number;
        price: number;
        webpPic: string;
        pngPic: string;
        smallPngPic: string;
        allowBatchSendSizeList: number[];
        canCombo: boolean;
        canDraw: boolean;
        magicFaceID: number;
        vupArID: number;
        description: string;
        redpackPrice: number;
        cornerMarkerText: string;
    }>>>;
}
