import Chat, { ChatSchema } from '@models/Chat';
import { Document, ObjectId, Types } from 'mongoose';

export default class PublicChat {
  private publicChat:
    | (Document<unknown, {}, ChatSchema> &
        ChatSchema & {
          _id: Types.ObjectId;
        })
    | null = null;

  constructor() {
    this.initializeChat();
  }

  private async initializeChat() {
    try {
      this.publicChat = await Chat.findOne({ chatId: 'public' });

      if (!this.publicChat) {
        this.publicChat = await Chat.create({
          chatId: 'public',
        });
      }
    } catch (error) {
      throw error;
    }
  }

  saveMessage(messageId: ObjectId) {
    this.publicChat?.messages?.push(messageId);
    this.publicChat?.save();
  }

  getPopulatedDoc() {
    return this.publicChat?.populate({
      path: 'messages',
      populate: { path: 'sender' },
    });
  }
}
