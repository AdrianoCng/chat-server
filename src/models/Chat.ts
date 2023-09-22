import mongoose, { ObjectId, Schema } from 'mongoose';

export interface ChatSchema {
  chatId: string;
  messages?: ObjectId[];
}

const chatSchema = new Schema<ChatSchema>({
  chatId: {
    type: String,
    required: true,
    unique: true,
  },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

export default mongoose.model('Chat', chatSchema);
