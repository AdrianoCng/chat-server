import mongoose, { Schema } from "mongoose";

export interface MessageSchema {
    text: string;
    timestamp?: string;
}

const messageSchema = new Schema<MessageSchema>({
    text: {
        type: String,
        required: true,
    },
    timestamp: Date,
});

export default mongoose.model("Message", messageSchema);
