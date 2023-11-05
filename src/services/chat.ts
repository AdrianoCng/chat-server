import { Server } from 'socket.io';
import Message, { MessageSchema } from '@models/Message';
import socketTryCatch from '@middlewares/socketTryCatch';
import PublicChat from '@models/PublicChat';
import { CHAT_EVENT } from '../types/custom';
import StatusManager from './StatusManager';

export default (io: Server) => {
  const publicChat = new PublicChat();
  const statusManager = new StatusManager();

  io.on('connection', async socket => {
    const user = socket.request.user;
    const userId = user._id;
    const username = user.username;

    // History Event
    socket.emit(CHAT_EVENT.HISTORY, await publicChat.getPopulatedDoc());

    // Connected Users List Event
    statusManager.setStatus(userId, { username, status: 'online' });
    socket.emit(
      CHAT_EVENT.CONNECTED_USERS_LIST,
      statusManager.getUsersStatus(),
    );

    // Message Event
    socket.on(
      CHAT_EVENT.MESSAGE,
      socketTryCatch(socket, async (text: string) => {
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
      }),
    );

    // Typing Event
    socket.on(
      CHAT_EVENT.PUBLIC_TYPING,
      socketTryCatch(
        socket,
        async (data: { username: string; isTyping: boolean }) => {
          socket.broadcast.emit(CHAT_EVENT.PUBLIC_TYPING, data);
        },
      ),
    );

    socket.on(
      'disconnect',
      socketTryCatch(socket, async () => {
        statusManager.removeStatus(user._id);

        io.emit(
          CHAT_EVENT.CONNECTED_USERS_LIST,
          statusManager.getUsersStatus(),
        );
      }),
    );
  });
};
