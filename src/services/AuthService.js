import { StatusCodes } from "http-status-codes"

import otpService from "./OtpService.js"
import mailService from "./MailService.js"
import userService from "./UserService.js"
import AppError from "../core/AppError.js"
import sessionService from "./SessionService.js"

class AuthService {
    async sendOtp(email)
    {
        const otp = otpService.createOtp(email);

        const success = await mailService.sendOtpMail(email, otp);

        if(!success) {
            throw new AppError("Failed to send OTP", StatusCodes.INTERNAL_SERVER_ERROR);
        }

        return { success: true };
    }

    async verifyOtpAndAuthenticate({ email, phoneNumber, publicKey, otp })
    {
        const isValid = otpService.validateOtp(email, otp);

        if(!isValid) {
            throw new AppError("Invalid OTP or OTP expired. Please try again later", StatusCodes.UNAUTHORIZED);
        }

        let user = await userService.getUserByEmail(email);

        if(!user)
        {
            user = await userService.createUser({
                email,
                phoneNumber,
                publicKey
            })
        }

        const sessionId = await sessionService.createSession(user._id);

        return { userId: user._id, sessionId };
    }

    async logout(sessionId)
    {
        await sessionService.revokeSession(sessionId);

        return { success: true };
    }
}

export default new AuthService()