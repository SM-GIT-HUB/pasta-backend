import { Server } from "socket.io"

import userService from "../services/UserService.js"

import socketAuth from "./SocketAuth.js"
import onlineUsers from "./OnlineUsers.js"
import { sendMessage } from "./MessageHandler.js"
import { contactsSync } from "./ContactsHandler.js"
import { messageDelivered } from "./ReceiptHandler.js"

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

            console.log("User:", socket.user.email, "connected:", socket.id);

            socket.on("contacts_sync", (phoneNumbers) => contactsSync(socket, phoneNumbers));

            socket.on("send_message", (messageData) => sendMessage(this.io, socket, messageData));

            socket.on("message_delivered", (data) => messageDelivered(this.io, socket, data));

            socket.on("disconnect", (reason) => {
                onlineUsers.remove(socket.user._id, socket.id);
            })
        })
    }
}

export default SocketServer