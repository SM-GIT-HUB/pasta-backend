
class OnlineUsers {
    constructor()
    {
        this.users = new Map();
    }

    add(userId, socketId)
    {
        userId = userId.toString();

        if(!this.users.has(userId)) {
            this.users.set(userId, new Set());
        }

        this.users.get(userId).add(socketId);
    }

    remove(userId, socketId)
    {
        userId = userId.toString();

        const sockets = this.users.get(userId);

        if(!sockets) {
            return;
        }

        sockets.delete(socketId);

        if(sockets.size === 0) {
            this.users.delete(userId);
        }
    }

    getUserSockets(userId)
    {
        return this.users.get(userId.toString()) || new Set();
    }

    isOnline(userId)
    {
        return this.users.has(userId.toString());
    }
}

export default new OnlineUsers()