import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { StatusCodes } from '@utils/status-code';
import { GITHUB_HEADER } from '@/constants/headers';
import { logger } from '@utils/logger';
import * as crypto from 'crypto';
import { RequestWithRawBody } from '@interfaces/request.interface';

const getSignature = buf => {
  const hmac = crypto.createHmac('sha256', process.env.SECRET_TOKEN);
  hmac.update(buf, 'utf-8');
  return 'sha256=' + hmac.digest('hex');
};

export const verifyRequest = (req: RequestWithRawBody, res: Response, next: NextFunction) => {
  try {
    const expected = req.header(GITHUB_HEADER.X_HUB_SIGNATURE_256);
    const payload = req.rawBody;
    const calculated = getSignature(payload);
    console.log(calculated);
    logger.info(`${GITHUB_HEADER.X_HUB_SIGNATURE_256}:`, expected, 'Content:', '-' + payload.toString('utf8') + '-');
    if (expected !== calculated) {
      next(new HttpException(StatusCodes.UNAUTHORIZED, 'Invalid github webhook signature'));
    } else {
      logger.info('Valid signature!');
      next();
    }
  } catch (err) {
    console.log(err);
    next(new HttpException(StatusCodes.UNAUTHORIZED, 'Invalid github webhook signature'));
  }
};
