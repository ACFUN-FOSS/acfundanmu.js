import express from 'express';
import { AcFunLiveApi } from '../AcFunLiveApi';
import { ServerConfig } from '../types';
export declare class ApiServer {
    private app;
    private api;
    private config;
    constructor(config: ServerConfig, api: AcFunLiveApi);
    private setupMiddleware;
    private authMiddleware;
    private setupRoutes;
    private setupAuthRoutes;
    private setupDanmuRoutes;
    private setupLiveRoutes;
    private setupUserRoutes;
    private errorHandler;
    start(): void;
    getApp(): express.Application;
}
