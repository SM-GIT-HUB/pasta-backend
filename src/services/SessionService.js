import crypto from "crypto"

import cacheService from "./CacheService.js"
import sessionRepository from "../repositories/SessionRepository.js"

class SessionService {
    generateSessionId()
    {
        return crypto.randomBytes(32).toString("hex");
    }

    hashSessionId(sessionId)
    {
        return crypto.createHash("sha256").update(sessionId).digest("hex");
    }

    async createSession(userId)
    {
        const sessionId = this.generateSessionId();

        const sessionHash = this.hashSessionId(sessionId);

        const session = await sessionRepository.create({
            _id: sessionHash,
            userId
        })

        cacheService.setSession(sessionHash, session);

        return sessionId;
    }

    async getValidSession(sessionId)
    {
        const sessionHash = this.hashSessionId(sessionId);

        let session = cacheService.getSession(sessionHash);

        if(!session)
        {
            session = await sessionRepository.findById(sessionHash);

            if (session) {
                cacheService.setSession(sessionHash, session);
            }
        }

        if (!session) {
            return null;
        }

        if(session.revoked) {
            return null;
        }

        return session;
    }

    async revokeSession(sessionId)
    {
        const sessionHash = this.hashSessionId(sessionId);
        cacheService.deleteSession(sessionHash);

        return sessionRepository.revoke(sessionHash);
    }
}

export default new SessionService()