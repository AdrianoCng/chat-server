import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import tryCatch from '@middlewares/tryCatch';
import ValidateError from 'errors/ValidateError';

export default function validate(validations: ValidationChain[]) {
  return tryCatch(async (req: Request, _res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    return next(new ValidateError(errors));
  });
}
