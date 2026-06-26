import messageRepository from "../repositories/MessageRepository.js"

class MessageService {
    isValidMessage(message)
    {
        return (
            message &&
            message.id &&
            message.receiverId &&
            message.ciphertext &&
            message.iv &&
            message.authTag &&
            message.senderKeyVersion &&
            message.recipientKeyVersion
        )
    }

    async storeMessage(senderId, messageData)
    {
        if (!this.isValidMessage(messageData)) {
            return null;
        }

        const message = {
            _id: messageData.id,

            senderId,
            receiverId: messageData.receiverId,

            ciphertext: messageData.ciphertext,
            iv: messageData.iv,
            authTag: messageData.authTag,

            senderKeyVersion: messageData.senderKeyVersion,

            recipientKeyVersion: messageData.recipientKeyVersion
        }

        return messageRepository.create(message);
    }

    async storeMessages(senderId, messagesData)
    {
        const messages = [];

        for (const message of messagesData)
        {
            if (!this.isValidMessage(message)) {
                continue;
            }

            messages.push({
                _id: message.id,

                senderId,
                receiverId: message.receiverId,

                ciphertext: message.ciphertext,
                iv: message.iv,
                authTag: message.authTag,

                senderKeyVersion: message.senderKeyVersion,

                recipientKeyVersion: message.recipientKeyVersion
            })
        }

        return messageRepository.createMany(messages);
    }

    async getPendingMessages(receiverId)
    {
        return messageRepository.findPendingForReceiver(receiverId);
    }

    async markDelivered(messageId)
    {
        return messageRepository.markDelivered(messageId);
    }
}

export default new MessageService()