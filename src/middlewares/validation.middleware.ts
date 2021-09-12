import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { GITHUB_EVENT, GITHUB_HEADER } from '@/constants/headers';
import { StatusCodes } from '@utils/status-code';
import { ok } from '@utils/response';
import { MESSAGES } from '@/constants/messages';

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return (req, res, next) => {
    validate(plainToClass(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
        next(new HttpException(400, message));
      } else {
        next();
      }
    });
  };
};

export const validationGithubHeaderMiddleware = (): RequestHandler => {
  return (req, res, next) => {
    const event = req.header(GITHUB_HEADER.X_GITHUB_EVENT);
    if (event !== GITHUB_EVENT.PULL_REQUEST && event !== GITHUB_EVENT.PULL_REQUEST_REVIEW && event !== GITHUB_EVENT.PULL_REQUEST_REVIEW_COMMENT) {
      res.status(StatusCodes.OK).json(ok(undefined, MESSAGES.CALL_GITHUB_WEBHOOK_NO_ACTION));
      return;
    }
    next();
  };
};

export default validationMiddleware;
