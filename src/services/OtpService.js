import crypto from "crypto"

import cacheService from "./CacheService.js"

const digs = "0123456789";
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const str = digs + chars;

class OTPService {
    generateOtp()
    {
        let otp = "";

        for(let i = 0; i < 8; i++)
        {
            const idx = crypto.randomInt(0, str.length);
            otp += str[idx];
        }

        return otp;
    }

    createOtp(email)
    {
        email = email.toLowerCase();
        const otp = this.generateOtp();

        cacheService.setOtp(email, {
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000,
            tries: 3
        })

        return otp;
    }

    validateOtp(email, otp)
    {
        email = email.toLowerCase();
        const otpData = cacheService.getOtp(email);

        if(!otpData) {
            return false;
        }

        if(Date.now() > otpData.expiresAt)
        {
            cacheService.deleteOtp(email);
            return false;
        }

        if(otpData.otp !== otp)
        {
            if (otpData.tries == 1) {
                cacheService.deleteOtp(email);
            }
            else
                cacheService.setOtp(email, { ...otpData, tries: otpData.tries - 1 });
            
            return false;
        }

        cacheService.deleteOtp(email);

        return true;
    }
}

export default new OTPService()