import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

import router from '@routes/index';
import errorHandler from '@middlewares/errorHandler';
import session from 'express-session';
import passport from 'passport';
import initializePassportConfig from '@configs/passport';

const app = express();
export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET ?? '',
  resave: false,
  saveUninitialized: false,
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

initializePassportConfig();

export default app;
