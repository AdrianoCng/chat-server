import mongoose, { Schema } from "mongoose";

export interface MessageSchema {
    text: string;
    date?: string;
}

const messageSchema = new Schema<MessageSchema>({
    text: {
        type: String,
        required: true,
    },
    date: Date,
});

export default mongoose.model("Message", messageSchema);
