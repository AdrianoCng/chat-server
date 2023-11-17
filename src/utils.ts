import { MessageSchema } from '@models/Message';
import { Document } from 'mongoose';

export const populateMessage = async (
  messages: Document<unknown, {}, MessageSchema>,
) => {
  return await (
    await (
      await messages.populate('sender')
    ).populate({
      path: 'groupChat',
      populate: { path: 'participants' },
    })
  ).populate('receiver');
};
