import { StatusCodes } from "http-status-codes"

import otpService from "./OtpService.js"
import mailService from "./MailService.js"
import userService from "./UserService.js"
import AppError from "../core/AppError.js"
import sessionService from "./SessionService.js"
import cacheService from "./CacheService.js"

class AuthService {
    async sendOtp(email)
    {
        const otp = otpService.createOtp(email);

        const success = await mailService.sendOtpMail(email, otp);

        if(!success) {
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to send OTP");
        }

        return { success: true };
    }

    async verifyOtpAndAuthenticate({ email, phoneNumber, publicKey, otp })
    {
        const isValid = otpService.validateOtp(email, otp);

        if(!isValid) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid OTP or OTP expired. Please try again later");
        }

        let user = await userService.getUserByEmail(email);

        if(!user)
        {
            const phoneUser = await userService.getUserByPhoneNumber(phoneNumber);

            if(phoneUser) {
                throw new AppError(StatusCodes.CONFLICT, "Phone number already registered");
            }

            user = await userService.createUser({
                email,
                phoneNumber,
                publicKey
            })
        }
        else
        {
            if(user.phoneNumber !== phoneNumber) {
                throw new AppError(StatusCodes.CONFLICT, "Phone number does not match");
            }

            user = await userService.updatePublicKey(
                user._id,
                publicKey,
                user.keyVersion + 1
            )
        }

        const sessionId = await sessionService.createSession(user._id);

        return { userId: user._id, sessionId };
    }

    async authorize(sessionId)
    {
        const session = await sessionService.getValidSession(sessionId);

        if(!session) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid session");
        }

        const user = await userService.getUserById(session.userId);

        if(!user) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "User not found");
        }

        return { user, session };
    }

    async logout(sessionId)
    {
        await sessionService.revokeSession(sessionId);

        return { success: true };
    }
}

export default new AuthService()