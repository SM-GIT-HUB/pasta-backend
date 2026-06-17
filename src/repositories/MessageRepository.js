import Message from "../models/Message.js"

class MessageRepository
{
    async create(messageData)
    {
        return Message.create(messageData);
    }

    async findPendingForReceiver(receiverId)
    {
        return Message.find({
            receiverId,
            delivered: false
        }).sort({ timestamp: 1 })
    }

    async markDelivered(messageId)
    {
        return Message.findByIdAndUpdate(
            messageId,
            {
                delivered: true,
                deliveredAt: new Date()
            },
            { new: true }
        )
    }

    async deleteDeliveredMessages(receiverId)
    {
        return Message.deleteMany({
            receiverId,
            delivered: true
        })
    }
}

export default new MessageRepository()