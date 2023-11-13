import { Server } from 'socket.io';
import Message, { MessageSchema } from '@models/Message';
import socketTryCatch from '@middlewares/socketTryCatch';
import PublicChat from '@models/PublicChat';
import { CHAT_EVENT } from '../types/custom';
import StatusManager from './StatusManager';
import User, { Status } from '@models/User';

export default (io: Server) => {
  const publicChat = new PublicChat();

  io.on(
    'connection',
    socketTryCatch(async socket => {
      const user = socket.request.user;
      const userId = user._id;
      const statusManager = new StatusManager(userId);

      await statusManager.setStatus('online');

      // History Event
      socket.emit(CHAT_EVENT.HISTORY, await publicChat.getPopulatedDoc());

      // Users List Event
      socket.emit(CHAT_EVENT.USERS_LIST, await User.find());

      // Broadcast Status Event
      socket.broadcast.emit(CHAT_EVENT.USER_STATUS_UPDATE, {
        userId,
        status: await statusManager.getStatus(),
      });

      // Message Event
      socket.on(CHAT_EVENT.MESSAGE, async (text: string) => {
        if (typeof text !== 'string') {
          throw 'text must be a string';
        }

        const data: MessageSchema = {
          text,
          timestamp: new Date().toISOString(),
          sender: user._id,
        };

        const message = await Message.create(data);

        publicChat.saveMessage(message.id);

        io.emit(CHAT_EVENT.MESSAGE, await message.populate('sender'));
      });

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
