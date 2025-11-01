"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
class ImageService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    /**
     * 上传图片
     */
    async uploadImage(imageFile) {
        // TODO: 实现上传图片逻辑
        return {
            success: false,
            error: '未实现'
        };
    }
}
exports.ImageService = ImageService;
//# sourceMappingURL=ImageService.js.map