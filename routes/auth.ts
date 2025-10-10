import express from "express";
var router = express.Router();

import AuthController from "../controllers/AuthController.js";
import UserRepository from "../repository/user.js";

// const authMiddleware = require("../middleware/checkToken");
import AuthMiddleware from "../middleware/checkToken.js";

const userRepository = new UserRepository();
const authMiddleware = new AuthMiddleware();
const authController = new AuthController(userRepository);

// Public routes
router.post("/login", authMiddleware.logAuthAttempt, authController.login);
router.post(
  "/register",
  authMiddleware.logAuthAttempt,
  authController.register
);
router.post(
  "/refresh_token",
  authMiddleware.validateRefreshToken,
  authController.refreshToken
);

// Protected routes
router.post("/logout", authMiddleware.authenticateToken, authController.logout);
router.get(
  "/profile",
  authMiddleware.authenticateToken,
  authController.getProfile
);

export default router;
