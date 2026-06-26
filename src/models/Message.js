import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },

    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },

    ciphertext: {
        type: String,
        required: true,
    },

    iv: {
        type: String,
        required: true,
    },

    authTag: {
        type: String,
        required: true,
    },

    senderKeyVersion: {
        type: Number,
        required: true,
    },

    recipientKeyVersion: {
        type: Number,
        required: true,
    },

    delivered: {
        type: Boolean,
        default: false,
    },

    deliveredAt: {
        type: Date,
        default: null,
    },

    timestamp: {
        type: Date,
        required: true,
        default: Date.now,
    },
},  { timestamps: true } )

messageSchema.index({ receiverId: 1, delivered: 1 });
messageSchema.index({ senderId: 1, receiverId: 1, timestamp: 1 });

export default mongoose.models.Message || mongoose.model("Message", messageSchema)