import { Socket } from 'socket.io';

export default function socketTryCatch(fn: (socket: Socket) => void) {
  return (socket: Socket) =>
    Promise.resolve(fn(socket)).catch(error => socket.emit('error', error));
}
