import { Router } from 'express';

import passport from 'passport';

import validate from '@middlewares/validate';
import userValidations from '@validations/userValidations';
import authControllers from '@controllers/authControllers';
import tryCatch from '@middlewares/tryCatch';
import protectRoute from '@middlewares/authenticateRoute';

const authRouter = Router();

authRouter.post(
  '/register',
  validate(userValidations),
  tryCatch(authControllers.register),
);
authRouter.post(
  '/login',
  validate(userValidations),
  passport.authenticate('local'),
  tryCatch(authControllers.login),
);
authRouter.post('/logout', tryCatch(authControllers.logout));

authRouter.get('/check', tryCatch(authControllers.check));

export default authRouter;
