import { Server } from 'socket.io';
import Message, { MessageSchema } from '@models/Message';
import socketTryCatch from '@middlewares/socketTryCatch';
import { CHAT_EVENT } from 'types/custom';
import PublicChat from '@models/PublicChat';

export default (io: Server) => {
  let publicChat = new PublicChat();

  io.on('connection', async socket => {
    const user = socket.request.user;

    // History Event
    socket.emit(CHAT_EVENT.HISTORY, await publicChat.getPopulatedDoc());

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

        socket.broadcast.emit(
          CHAT_EVENT.MESSAGE,
          await message.populate('sender'),
        );
      }),
    );
  });
};
