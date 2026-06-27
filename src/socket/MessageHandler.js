import messageService from "../services/MessageService.js"
import onlineUsers from "./OnlineUsers.js"

export async function sendMessage(io, socket, messageData)
{
    const message = await messageService.storeMessage(socket.user._id, messageData);

    if(!message) {
        return;
    }

    socket.emit("message_sent", {
        messageId: message._id
    })

    if(!onlineUsers.isOnline(message.receiverId)) {
        return;
    }

    const socketIds = onlineUsers.getUserSockets(message.receiverId);

    for(const socketId of socketIds)
    {
        io.to(socketId).emit("new_message", message);
    }
}