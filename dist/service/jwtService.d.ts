import jwt from "jsonwebtoken";
export default class JWTService {
    private accessTokenSecret;
    private refreshTokenSecret;
    private accessTokenExpiry;
    private refreshTokenExpiry;
    constructor();
    generateAccessToken(payload: any): string;
    generateRefreshToken(payload: any): string;
    generateTokens(payload: any): {
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    };
    verifyAccessToken(token: string): string | jwt.JwtPayload;
    verifyRefreshToken(token: string): string | jwt.JwtPayload;
    decodeToken(token: string): string | jwt.JwtPayload | null;
    getTokenExpiryTime(expiryString: string): number;
    generatePasswordResetToken(): string;
    generateEmailVerificationToken(payload: any): string;
    isTokenExpired(token: string): boolean;
    getTokenPayload(token: string): string | jwt.JwtPayload | null;
}
//# sourceMappingURL=jwtService.d.ts.map