import { Server } from 'socket.io';

import chat from './chat';
import socketLogger from './socketLogger';
// import authentication from "./authentication";

export default function initializeIo(io: Server) {
  chat(io);
  // socketLogger(io);
  // authentication(io);
}
