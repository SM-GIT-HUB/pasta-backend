import { cache } from "../cache/CacheManager.js"

class CacheService
{
    getSession(sessionHash)
    {
        return cache.sessions.get(sessionHash);
    }

    setSession(sessionHash, session)
    {
        cache.sessions.set(sessionHash, session);
    }

    deleteSession(sessionHash)
    {
        cache.sessions.delete(sessionHash);
    }

    getOtp(email)
    {
        return cache.otps.get(email.toLowerCase());
    }

    setOtp(email, otpData)
    {
        cache.otps.set(email.toLowerCase(), otpData);
    }

    deleteOtp(email)
    {
        cache.otps.delete(email.toLowerCase());
    }

    getUserById(userId)
    {
        return cache.usersById.get(userId.toString());
    }

    getUserByEmail(email)
    {
        return cache.usersByEmail.get(email.toLowerCase());
    }

    getUserByPhone(phoneNumber)
    {
        return cache.usersByPhone.get(phoneNumber);
    }

    setUser(user)
    {
        cache.usersById.set(
            user._id.toString(),
            user
        )

        cache.usersByEmail.set(
            user.email.toLowerCase(),
            user
        )

        cache.usersByPhone.set(
            user.phoneNumber,
            user
        )
    }

    deleteUser(user)
    {
        cache.usersByEmail.delete(user.email.toLowerCase());
        cache.usersByPhone.delete(user.phoneNumber);
        cache.usersById.delete(user._id.toString());
    }
}

export default new CacheService()