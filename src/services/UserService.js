import cacheService from "./CacheService.js"
import userRepository from "../repositories/UserRepository.js"

class UserService {
    async getUserById(userId)
    {
        let user = cacheService.getUserById(userId);

        if(user) {
            return user;
        }

        user = await userRepository.findById(userId);

        if(user) {
            cacheService.setUser(user);
        }

        return user;
    }

    async getUserByEmail(email)
    {
        email = email.toLowerCase();

        let user = cacheService.getUserByEmail(email);

        if(user) {
            return user;
        }

        user = await userRepository.findByEmail(email);

        if(user) {
            cacheService.setUser(user);
        }

        return user;
    }

    async getUserByPhoneNumber(phoneNumber)
    {
        let user = cacheService.getUserByPhone(phoneNumber);

        if(user) {
            return user;
        }

        user = await userRepository.findByPhoneNumber(phoneNumber);

        if(user) {
            cacheService.setUser(user);
        }

        return user;
    }

    async createUser({ email, phoneNumber, publicKey })
    {
        email = email.toLowerCase();

        const user = await userRepository.create({ email, phoneNumber, publicKey });

        cacheService.setUser(user);

        return user;
    }

    async updatePublicKey(userId, publicKey, keyVersion)
    {
        const user = await userRepository.updatePublicKey(
            userId,
            publicKey,
            keyVersion
        )

        if(user) {
            cacheService.setUser(user);
        }

        return user;
    }

    removeUser(user)
    {
        cacheService.deleteUser(user);
    }
}

export default new UserService()