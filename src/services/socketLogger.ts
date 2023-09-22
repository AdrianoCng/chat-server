import { Server } from 'socket.io';

import logger from '@middlewares/logger';

export default function socketLogger(io: Server) {
  io.on('connection', socket => {
    logger.info(`A client with socket id ${socket.id} connected!`);

    // Log ALL incoming socket events
    socket.on('*', packet => {
      const [eventName, eventData] = packet.data;
      logger.info({
        eventName,
        eventData,
        socketId: socket.id,
      });
    });

    // The original socket emitter
    const _emit = socket.emit;

    // Decorate emit function
    // Log ALL outgoing socket events
    socket.emit = function (eventName: string, ...eventData: any[]) {
      _emit.apply(socket, [eventName, ...eventData]);

      logger.info({
        eventName: `[Emit] ${eventName}`,
        eventData,
        socketId: socket.id,
      });

      return true;
    };

    socket.on('disconnect', socket => {
      logger.info('Socket disconnected!');
    });
  });
}
