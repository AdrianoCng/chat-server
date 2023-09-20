import mongoose, { ObjectId, Schema } from 'mongoose';

export interface MessageSchema {
  text: string;
  timestamp?: string;
  sender: ObjectId;
}

const messageSchema = new Schema<MessageSchema>({
  text: {
    type: String,
    required: true,
  },
  timestamp: Date,
  sender: {},
});

export default mongoose.model('Message', messageSchema);
