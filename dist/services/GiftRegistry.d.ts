import { GiftService } from './GiftService';
import { GiftDetail } from '../types';
export declare class GiftRegistry {
    private service;
    private gifts;
    private initialized;
    private initializing;
    constructor(service: GiftService);
    warmup(liveID?: string): Promise<void>;
    ensureLoaded(liveID?: string): Promise<void>;
    getDetail(giftID: number): GiftDetail | undefined;
    enrich(giftID: number): GiftDetail;
}
