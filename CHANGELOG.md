# Changelog

## [1.0.0] - 2025-11-30
### Changed
- 移除内置 HTTP 服务器与所有 `/api/*` 路由
- 移除导出 `ApiServer` 与 `createServer(...)`
- 文档统一改为 SDK 使用指南，新增迁移文档 `docs/migration-1.0.md`

### Added
- 保留并推荐使用 `AcFunLiveApi` 与 `createApi(...)`
- 构建产物更新：新增 `dist/services/GiftRegistry.*`

### Removed
- 旧服务文件：`EventSourceService.*`、`ImageService.*` 等过时产物

