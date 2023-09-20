import CustomError from 'errors/CustomError';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export default function protectRoute(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  if (!req.isAuthenticated()) {
    next(new CustomError(StatusCodes.UNAUTHORIZED));
    return;
  }

  next();
}
