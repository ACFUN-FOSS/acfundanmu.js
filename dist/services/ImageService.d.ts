import { HttpClient } from '../core/HttpClient';
import { ApiResponse } from '../types';
export declare class ImageService {
    private httpClient;
    constructor(httpClient: HttpClient);
    /**
     * 上传图片
     */
    uploadImage(imageFile: string): Promise<ApiResponse<{
        imageURL: string;
    }>>;
}
