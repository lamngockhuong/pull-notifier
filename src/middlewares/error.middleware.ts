import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { logger } from '@utils/logger';
import { MESSAGES } from '@/constants/messages';
import { StatusCodes } from '@utils/status-code';
import { error } from '@utils/response';

const errorMiddleware = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message: string = err.message || MESSAGES.SERVER_ERROR;

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    if (status === StatusCodes.INTERNAL_SERVER_ERROR) {
      console.log(err);
      res.status(status).json(error(undefined, MESSAGES.SERVER_ERROR));
    } else {
      res.status(status).json(error(undefined, message));
    }
  } catch (error) {
    logger.error(err);
    next(error);
  }
};

export default errorMiddleware;
