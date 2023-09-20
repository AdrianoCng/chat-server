import { Result, ValidationError } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import AbstractError, { IAbstractError } from './AbstractError';

export default class ValidateError extends AbstractError {
  public readonly statusCode = StatusCodes.BAD_REQUEST;
  public readonly errors: Result<ValidationError>;

  constructor(errors: Result<ValidationError>) {
    super();

    this.errors = errors;
  }

  formatErrors() {
    return { statusCode: this.statusCode, errors: this.errors.array() };
  }
}
