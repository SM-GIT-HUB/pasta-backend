import { StatusCodes } from "http-status-codes"

import ApiResponse from "../core/ApiResponse.js"

import authService from "../services/AuthService.js"

class AuthController {
    async sendOtp(req, res, next)
    {
        try {
            const { email } = req.body;

            await authService.sendOtp(email);

            return res.status(StatusCodes.OK).json(new ApiResponse("OTP sent successfully"));
        }
        catch(err) {
            next(err);
        }
    }

    async verifyOtp(req, res, next)
    {
        try {
            const data = await authService.verifyOtpAndAuthenticate(req.body);
            return res.status(StatusCodes.OK).json(new ApiResponse("Authenticated successfully", data));
        }
        catch(err) {
            next(err);
        }
    }

    async me(req, res, next)
    {
        try {
            return res.status(StatusCodes.OK).json(new ApiResponse("User fetched successfully", req.user));
        }
        catch(err) {
            next(err)
        }
    }

    async logout(req, res, next)
    {
        try {
            const sessionId = req.sessionId;
            await authService.logout(sessionId);

            return res.status(StatusCodes.OK).json(new ApiResponse("Logged out successfully"));
        }
        catch(err) {
            next(err);
        }
    }
}

export default new AuthController()