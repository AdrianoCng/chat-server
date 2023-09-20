import { Server } from 'socket.io';
import Message from '@models/Message';
import socketTryCatch from '@middlewares/socketTryCatch';

export default (io: Server) => {
  io.on('connection', socket => {
    io.emit('chat:history');

    socket.on(
      'chat:message',
      socketTryCatch(socket, async (text: string) => {
        if (typeof text !== 'string') {
          throw 'text must be a string';
        }

        const data = {
          text,
          timestamp: new Date().toISOString(),
        };

        await Message.create(data);

        socket.broadcast.emit('message', data);
      }),
    );
  });
};
