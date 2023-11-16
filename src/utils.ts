import { Document } from 'mongoose';

export const populateMessage = async (messages: Document) => {
  return await (
    await messages.populate('sender')
  ).populate({
    path: 'groupChat',
    populate: { path: 'participants' },
  });
};
