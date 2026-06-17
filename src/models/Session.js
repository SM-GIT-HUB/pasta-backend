import mongoose from "mongoose"

const sessionSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },

    revoked: {
        type: Boolean,
        default: false,
    },
},  { timestamps: true } )

export default mongoose.models.Session || mongoose.model("Session", sessionSchema)