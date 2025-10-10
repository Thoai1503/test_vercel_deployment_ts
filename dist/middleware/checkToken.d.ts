import express, { type Response } from "express";
export default class AuthMiddleware {
    private jwtService;
    constructor();
    authenticateToken: (req: any, res: Response, next: express.NextFunction) => Promise<void | express.Response<any, Record<string, any>>>;
    optionalAuth: (req: any, res: Response, next: express.NextFunction) => Promise<void>;
    requireRole: (roles: any) => (req: any, res: Response, next: express.NextFunction) => express.Response<any, Record<string, any>> | undefined;
    requireAdmin: (req: any, res: Response, next: express.NextFunction) => express.Response<any, Record<string, any>> | undefined;
    requireUser: (req: any, res: Response, next: express.NextFunction) => express.Response<any, Record<string, any>> | undefined;
    authRateLimit: (req: any, res: Response, next: express.NextFunction) => void;
    validateRefreshToken: (req: any, res: Response, next: express.NextFunction) => Promise<express.Response<any, Record<string, any>> | undefined>;
    logAuthAttempt: (req: any, res: Response, next: express.NextFunction) => void;
    requireActiveAccount: (req: any, res: Response, next: express.NextFunction) => Promise<express.Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=checkToken.d.ts.map