import { Server } from 'socket.io';
import Message, { MessageSchema } from '@models/Message';
import socketTryCatch from '@middlewares/socketTryCatch';
import { CHAT_EVENT } from '../types/custom';
import StatusManager from './StatusManager';
import User, { Status } from '@models/User';
import GroupChat from '@models/GroupChat';
import { ObjectId, isValidObjectId } from 'mongoose';
import { populateMessage } from 'src/utils';

export default (io: Server) => {
  io.on(
    'connection',
    socketTryCatch(async socket => {
      const user = socket.request.user;
      const userId = user._id;
      const statusManager = new StatusManager(userId);

      await statusManager.setStatus('online');

      let publicChat = await GroupChat.findOne({ name: 'public' });

      if (!publicChat) {
        publicChat = await GroupChat.create({ name: 'public' });
      }

      // Join Private Channel for private messages
      socket.join(userId);

      // History Event
      socket.emit(
        CHAT_EVENT.HISTORY,
        await Message.find({ groupChat: publicChat.id })
          .populate('sender')
          .populate({
            path: 'groupChat',
            populate: { path: 'participants' },
          }),
      );

      // Users List Event
      socket.emit(CHAT_EVENT.USERS_LIST, await User.find());

      // Broadcast Status Event
      socket.broadcast.emit(CHAT_EVENT.USER_STATUS_UPDATE, {
        userId,
        status: await statusManager.getStatus(),
      });

      // Public Message Event
      socket.on(CHAT_EVENT.MESSAGE, async (text: string) => {
        if (typeof text !== 'string') {
          throw 'text must be a string';
        }

        const data: MessageSchema = {
          text,
          timestamp: new Date(),
          sender: user._id,
          groupChat: publicChat?.id,
        };

        const message = await Message.create(data);

        await publicChat?.updateOne({
          $addToSet: { participants: userId },
        });

        io.emit(CHAT_EVENT.MESSAGE, await populateMessage(message));
      });

      // Private Message Event
      socket.on(
        CHAT_EVENT.PRIVATE_MESSAGE,
        async ({ text, to }: { text: string; to: string & ObjectId }) => {
          if (!text) {
            throw new Error('text is required');
          }

          if (!isValidObjectId(to)) {
            throw new Error('to is not a valid ObjectId');
          }

          const recipient = await User.findById(to);

          if (!recipient) {
            throw new Error('recipient does not exist');
          }

          const data: MessageSchema = {
            text,
            timestamp: new Date(),
            sender: user._id,
            receiver: recipient.id,
          };

          const message = await Message.create(data);

          socket
            .to(to)
            .emit(CHAT_EVENT.PRIVATE_MESSAGE, await populateMessage(message));
        },
      );

      // Typing Event
      socket.on(
        CHAT_EVENT.PUBLIC_TYPING,
        async (data: { username: string; isTyping: boolean }) => {
          socket.broadcast.emit(CHAT_EVENT.PUBLIC_TYPING, data);
        },
      );

      // User Status Update Event
      socket.on(CHAT_EVENT.USER_STATUS_UPDATE, async (status: string) => {
        function isStatus(status: string): status is Status {
          const allowedStatuses = ['online', 'away'];

          return allowedStatuses.includes(status);
        }

        if (!isStatus(status)) {
          return;
        }

        await statusManager.setStatus(status);

        socket.broadcast.emit(CHAT_EVENT.USER_STATUS_UPDATE, {
          userId,
          status: await statusManager.getStatus(),
        });
      });

      socket.on('disconnect', async () => {
        await statusManager.setStatus('offline');

        socket.broadcast.emit(CHAT_EVENT.USER_STATUS_UPDATE, {
          userId,
          status: await statusManager.getStatus(),
        });
      });
    }),
  );
};
