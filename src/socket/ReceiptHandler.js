import onlineUsers from "./OnlineUsers.js"
import messageService from "../services/MessageService.js"

export async function messageDelivered(io, socket, data)
{
    const message = await messageService.markDelivered(data.messageId);

    if(!message) {
        return;
    }

    const socketIds = onlineUsers.getUserSockets(message.senderId);

    for(const socketId of socketIds)
    {
        io.to(socketId).emit("message_delivered", {
            messageId: message._id
        })
    }
}