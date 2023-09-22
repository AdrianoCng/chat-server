import mongoose, { ObjectId, Schema } from 'mongoose';

export interface ChatSchema {
  chatId: string;
  messages?: ObjectId[];
  participants?: ObjectId[];
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
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

export default mongoose.model('Chat', chatSchema);
