import mongoose, { ObjectId, Schema } from 'mongoose';

interface ChatSchema {
  messages?: ObjectId[];
  partecipants?: ObjectId[];
}

const chatSchema = new Schema<ChatSchema>({
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
  partecipants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

export default mongoose.model('Chat', chatSchema);
