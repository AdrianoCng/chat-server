import User from '@models/User';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomError from 'src/errors/CustomError';

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (!username) {
    next(new CustomError(StatusCodes.BAD_REQUEST));
    return;
  }

  const userExists = await User.findOne({ username });

  if (userExists) {
    next(new CustomError(StatusCodes.BAD_REQUEST, 'User already exists'));
    return;
  }

  const user = await User.create({ username, password });

  res.status(StatusCodes.CREATED).json({ username, userId: user.id });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?._id) {
    next(new CustomError(StatusCodes.BAD_REQUEST));
    return;
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    next(new CustomError(StatusCodes.NOT_FOUND));
    return;
  }

  user.save();

  res.json(user);
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  let userId = req.user?._id || '';

  if (!userId) {
    next(new CustomError(StatusCodes.BAD_REQUEST, 'No user ID found'));
    return;
  }

  req.logOut(async err => {
    if (err) {
      next(err);
      return;
    }

    await User.findByIdAndUpdate(userId, {
      $set: { connected: false },
    });

    res.send('logout');
  });
};

const check = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    next(new CustomError(StatusCodes.UNAUTHORIZED));
    return;
  }

  res.json(req.user);
};

export default {
  register,
  login,
  logout,
  check,
};
