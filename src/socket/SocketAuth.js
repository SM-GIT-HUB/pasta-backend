import authService from "../services/AuthService.js"

async function socketAuth(socket, next)
{
    try {
        const { sessionId } = socket.handshake.auth;

        const { user, session } = await authService.authorize(sessionId);

        socket.user = user;
        socket.session = session;

        next();
    }
    catch(err) {
        next(err);
    }
}

export default socketAuth