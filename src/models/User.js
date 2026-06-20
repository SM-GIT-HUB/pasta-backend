import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    publicKey: {
        type: String,
        required: true,
    },

    keyVersion: {
        type: Number,
        required: true,
        default: 1,
    },

    fcmToken: {
        type: String,
        default: null,
    },
},  { timestamps: true } )

export default mongoose.models.User || mongoose.model("User", userSchema)