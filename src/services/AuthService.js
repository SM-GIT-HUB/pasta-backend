import sessionService from "./SessionService.js"
import { cache } from "../cache/CacheManager.js"
import userRepository from "../repositories/UserRepository.js"

class AuthService {
    async signup({ email, phoneNumber, publicKey })
    {
        const existingUser = await userRepository.findByEmail(email);

        if(existingUser) {
            throw new Error("Email already exists");
        }

        const user = await userRepository.create({
            email,
            phoneNumber,
            publicKey
        })

        cache.usersById.set(user._id.toString(), user);
        cache.usersByEmail.set(email, user);

        const sessionId = await sessionService.createSession(user._id);

        return { userId: user._id, sessionId };
    }

    async login(email)
    {
        const user = await userRepository.findByEmail(email);

        if(!user) {
            throw new Error("User not found");
        }

        const sessionId = await sessionService.createSession(user._id);

        return { userId: user._id, sessionId };
    }

    async logout(sessionId)
    {
        cache.users.delete()
        await sessionService.revokeSession(sessionId);
    }
}

export default new AuthService()