import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import session from 'express-session';
import passport from 'passport';

import router from '@routes/index';
import errorHandler from '@middlewares/errorHandler';
import configPassport from '@configs/passport';
import redisStore from '@configs/redis';

const app = express();

export const sessionMiddleware = session({
  // store: redisStore,
  secret: process.env.SESSION_SECRET ?? '',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24,
  },
});

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', router);

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

app.use(errorHandler);

configPassport();

export default app;
