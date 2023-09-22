import { Server } from 'socket.io';
import http from 'http';
import passport from 'passport';
import wildcard from 'socketio-wildcard';

import initializeIo from '@services/index';
import app, { sessionMiddleware } from 'app';
import authenticateSocket from '@middlewares/authenticateSocket';

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const wrap = (middleware: Function) => (socket: any, next: any) =>
  middleware(socket.request, {}, next);

io.use(wildcard());
io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));
io.use(authenticateSocket);

initializeIo(io);

export default server;
