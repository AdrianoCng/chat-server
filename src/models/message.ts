import mongoose, { ObjectId, Schema } from 'mongoose';

export interface MessageSchema {
  text: string;
  timestamp: Date;
  sender: ObjectId;
  receiver?: ObjectId;
  groupChat?: ObjectId;
}

const messageSchema = new Schema<MessageSchema>({
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  groupChat: {
    type: Schema.Types.ObjectId,
    ref: 'GroupChat',
  },
});

export default mongoose.model('Message', messageSchema);
