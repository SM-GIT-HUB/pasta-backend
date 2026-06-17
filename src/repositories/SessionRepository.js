import Session from "../models/Session.js"

class SessionRepository
{
    async create(sessionData)
    {
        return Session.create(sessionData);
    }

    async findById(sessionHash)
    {
        return Session.findById(sessionHash);
    }

    async revoke(sessionHash)
    {
        return Session.findByIdAndUpdate(
            sessionHash,
            { revoked: true },
            { new: true }
        )
    }

    async delete(sessionHash)
    {
        return Session.findByIdAndDelete(sessionHash);
    }
}

export default new SessionRepository()