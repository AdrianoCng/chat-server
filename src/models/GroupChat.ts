import mongoose, { Model, ObjectId, Schema } from 'mongoose';
import Message, { MessageSchema } from './Message';

export interface GroupChatSchema {
  name: string;
  participants?: ObjectId[];
  isPrivate?: boolean;
}

export interface GroupChatMethods {
  getMessages: () => MessageSchema[];
}

const groupChat = new Schema<
  GroupChatSchema,
  Model<GroupChatSchema>,
  GroupChatMethods
>({
  name: {
    type: String,
    required: true,
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  isPrivate: {
    type: Boolean,
    default: false,
  },
});

groupChat.method('getMessages', async function getMessages() {
  try {
    const messages: MessageSchema[] = await Message.find({
      groupChat: this.id,
    }).populate('sender');

    return messages;
  } catch (error) {
    return [];
  }
});

export default mongoose.model('GroupChat', groupChat);
