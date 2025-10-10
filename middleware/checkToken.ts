// const jwtService = require("../service/jwtService");
// const User = require("../model/User");

import jwtService from "../service/jwtService.js";

import User from "../models/User.js";

import express, { type Request, type Response } from "express";
export default class AuthMiddleware {
  private jwtService: jwtService;
  constructor() {
    this.jwtService = new jwtService();
  }
  // Verify JWT token and attach user to request
  authenticateToken = async (
    req: any,
    res: Response,
    next: express.NextFunction
  ) => {
    try {
      // handle either Authorization header (Bearer ...) or cookie named accessToken
      const authHeader =
        req.get("Authorization") || req.get("authorization") || "";
      let token = null;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
      if (!token && req.cookies?.accessToken) {
        token = req.cookies.accessToken;
      }

      console.log("Auth Header:", authHeader);
      console.log("Cookies:", req.cookies);
      console.log("Extracted Token:", token);

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Access token is required",
          code: "MISSING_TOKEN",
        });
      }

      const decoded = this.jwtService.verifyAccessToken(token) as any;
      req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
      return next();
    } catch (error: any) {
      console.error("Token verification error:", error.message);

      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token has expired",
          code: "TOKEN_EXPIRED",
        });
      }

      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          success: false,
          message: "Invalid or malformed token",
          code: "INVALID_TOKEN",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Internal server error during authentication",
        code: "AUTH_ERROR",
      });
    }
  };

  // Optional authentication - doesn't fail if no token
  optionalAuth = async (
    req: any,
    res: Response,
    next: express.NextFunction
  ) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];

      if (token) {
        try {
          const decoded = this.jwtService.verifyAccessToken(token) as any;
          req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
          };
        } catch (error: any) {
          // Token is invalid but we don't fail the request
          console.warn("Invalid token in optional auth:", error.message);
        }
      }

      next();
    } catch (error) {
      next();
    }
  };

  // Check if user has required role
  requireRole = (roles: any) => {
    return (req: any, res: Response, next: express.NextFunction) => {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
          code: "AUTH_REQUIRED",
        });
      }

      const userRole = req.user.role;
      const allowedRoles = Array.isArray(roles) ? roles : [roles];

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: "Insufficient permissions",
          code: "INSUFFICIENT_PERMISSIONS",
        });
      }

      next();
    };
  };

  // Check if user is admin
  requireAdmin = (req: any, res: Response, next: express.NextFunction) => {
    return this.requireRole(1)(req, res, next); // Assuming role 1 is admin
  };

  // Check if user is regular user
  requireUser = (req: any, res: Response, next: express.NextFunction) => {
    return this.requireRole([1, 2])(req, res, next); // Admin or regular user
  };
  authRateLimit = (req: any, res: Response, next: express.NextFunction) => {
    const clientIP = req.ip || req.connection.remoteAddress;
    next();
  };

  // Validate refresh token
  validateRefreshToken = async (
    req: any,
    res: Response,
    next: express.NextFunction
  ) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: "Refresh token is required",
          code: "MISSING_REFRESH_TOKEN",
        });
      }

      const decoded = this.jwtService.verifyRefreshToken(refreshToken);

      // Check if token is expired
      if (this.jwtService.isTokenExpired(refreshToken)) {
        return res.status(401).json({
          success: false,
          message: "Refresh token has expired",
          code: "REFRESH_TOKEN_EXPIRED",
        });
      }

      req.refreshTokenData = decoded;
      next();
    } catch (error: any) {
      console.error("Refresh token validation error:", error.message);

      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
        code: "INVALID_REFRESH_TOKEN",
      });
    }
  };

  // Log authentication attempts
  logAuthAttempt = (req: any, res: Response, next: express.NextFunction) => {
    const clientIP = req.ip || req.connection.remoteAddress;
    const userAgent = req.get("User-Agent");
    const timestamp = new Date().toISOString();

    console.log(
      `[AUTH] ${timestamp} - IP: ${clientIP} - User-Agent: ${userAgent} - Endpoint: ${req.method} ${req.path}`
    );

    next();
  };

  // Check if user account is active
  requireActiveAccount = async (
    req: any,
    res: Response,
    next: express.NextFunction
  ) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
          code: "AUTH_REQUIRED",
        });
      }

      // You would typically fetch the user from database to check status
      // For now, we'll assume the user is active if they have a valid token

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error checking account status",
        code: "ACCOUNT_STATUS_ERROR",
      });
    }
  };
}
