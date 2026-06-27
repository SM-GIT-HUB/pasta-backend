import { Server } from "socket.io"

import socketAuth from "./SocketAuth.js"
import onlineUsers from "./OnlineUsers.js"
import userService from "../services/UserService.js"
import { contactsSync } from "./ContactsHandler.js"

class SocketServer {
    constructor(httpServer)
    {
        this.io = new Server(httpServer, {
            cors: {
                origin: "*"
            }
        })

        this.io.use(socketAuth);

        this.io.on("connection", (socket) => {
            onlineUsers.add(socket.user._id, socket.id);

            console.log("Connected:", socket.user.email, ":", socket.id);

            socket.on("contacts_sync", (phoneNumbers) => contactsSync(socket, phoneNumbers));

            socket.on("disconnect", (reason) => {
                onlineUsers.remove(socket.user._id, socket.id);
            })
        })
    }
}

export default SocketServer