import { Server } from 'socket.io';
import Message, { MessageSchema } from '@models/Message';
import socketTryCatch from '@middlewares/socketTryCatch';
import { CHAT_EVENT } from 'types/custom';

export default (io: Server) => {
  io.on('connection', socket => {
    const user = socket.request.user;

    io.emit(CHAT_EVENT.HISTORY);

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

        await Message.create(data);

        socket.broadcast.emit(CHAT_EVENT.MESSAGE, data);
      }),
    );
  });
};
