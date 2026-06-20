import { Router } from "express"

import authController from "../controllers/AuthController.js"
import authMiddleware from "../middlewares/AuthMiddleware.js"

const router = Router()

router.post("/send-otp", authController.sendOtp);

router.post("/verify-otp", authController.verifyOtp);

router.get("/me", authMiddleware, authController.me);

router.post("/logout", authMiddleware, authController.logout);

export default router