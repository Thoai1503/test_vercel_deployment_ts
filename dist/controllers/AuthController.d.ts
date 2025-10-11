import UserRepository from "../repository/user.js";
import User from "../models/User.js";
import express, { type Request, type Response } from "express";
export default class AuthController {
    private userRepository;
    private passwordService;
    private jwtService;
    constructor(userRepository: UserRepository);
    login: (req: Request, res: Response, next: express.NextFunction) => Promise<express.Response<any, Record<string, any>> | undefined>;
    register: (req: Request, res: Response, next: express.NextFunction) => Promise<express.Response<any, Record<string, any>> | undefined>;
    sendTokenResponse: (user: User, statusCode: number, res: any) => void;
    refreshToken: (req: Request, res: Response, next: express.NextFunction) => Promise<express.Response<any, Record<string, any>> | undefined>;
    logout: (req: Request, res: Response, next: any) => Promise<void>;
    getProfile: (req: any, res: Response, next: any) => Promise<express.Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=AuthController.d.ts.map