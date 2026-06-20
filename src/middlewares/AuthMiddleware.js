import { StatusCodes } from "http-status-codes"

import AppError from "../core/AppError.js"

import userService from "../services/UserService.js"
import sessionService from "../services/SessionService.js"

async function authMiddleware(req, res, next)
{
    try {
        const authorization = req.headers.authorization;

        if(!authorization) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "Authorization header missing");
        }

        const [type, sessionId] = authorization.split(" ");

        if(type !== "Bearer" || !sessionId) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid authorization header");
        }

        const session = await sessionService.getValidSession(sessionId);

        if(!session) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid session");
        }

        const user = await userService.getUserById(session.userId);

        if(!user) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "User not found");
        }

        req.user = user;
        req.session = session;
        req.sessionId = sessionId;

        next();
    }
    catch(err) {
        next(err);
    }
}

export default authMiddleware