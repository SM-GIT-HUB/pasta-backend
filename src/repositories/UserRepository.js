import User from "../models/User.js"

class UserRepository {
    async create(userData)
    {
        return User.create(userData);
    }

    async findById(userId)
    {
        return User.findById(userId);
    }

    async findByEmail(email)
    {
        return User.findOne({ email });
    }

    async findByPhoneNumber(phoneNumber)
    {
        return User.findOne({ phoneNumber });
    }

    async updateFCMToken(userId, fcmToken)
    {
        return User.findByIdAndUpdate(
            userId,
            { fcmToken },
            { new: true }
        )
    }

    async updatePublicKey(userId, publicKey, keyVersion)
    {
        return User.findByIdAndUpdate(
            userId,
            {
                publicKey,
                keyVersion
            },
            { new: true }
        )
    }
}

export default new UserRepository()