import mongoose from "mongoose";

const  SessionSchema = new mongoose.Schema({
    identifyStr: {
        type: String,
        required: true,
    }
}, {timestamps: true});

export const SessionModel = mongoose.model('Session_MEARN_App', SessionSchema);