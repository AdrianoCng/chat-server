import { ValidationError } from 'express-validator';

export interface IAbstractError {
  statusCode: number;
  errors: Partial<ValidationError>[];
}

export default abstract class AbstractError extends Error {
  public abstract readonly statusCode: number;

  constructor(message?: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }

  abstract formatErrors(): IAbstractError;
}
