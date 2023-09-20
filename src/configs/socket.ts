import { Server } from 'socket.io';
import http from 'http';
import helmet from 'helmet';
import passport from 'passport';

import initializeSockets from '@services/index';
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

io.engine.use(helmet());

io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));
io.use(authenticateSocket);

io.on('connection', socket => {
  console.log(`${socket.request.user.username} connected`);

  socket.on('disconnect', () => {
    console.log(`${socket.request.user.username} disconnected`);
  });
});

initializeSockets(io);

export default server;
