import { RequestHandler } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { StatusCodes } from '@utils/status-code';
import { GITHUB_EVENT, GITHUB_HEADER } from '@/constants/headers';
import { logger } from '@utils/logger';
import * as crypto from 'crypto';
import { MESSAGES } from '@/constants/messages';
import config from 'config';

const getSignature = buf => {
  const hmac = crypto.createHmac('sha256', process.env.SECRET_TOKEN);
  hmac.update(buf, 'utf-8');
  return 'sha256=' + hmac.digest('hex');
};

export const githubHeaderValidation = (req, res, next): RequestHandler => {
  try {
    const event = req.header(GITHUB_HEADER.X_GITHUB_EVENT);
    if (
      event !== GITHUB_EVENT.PULL_REQUEST &&
      event !== GITHUB_EVENT.PULL_REQUEST_REVIEW &&
      event !== GITHUB_EVENT.PULL_REQUEST_REVIEW_COMMENT &&
      event !== GITHUB_EVENT.ISSUE_COMMENT
    ) {
      next(new HttpException(StatusCodes.OK, MESSAGES.CALL_GITHUB_WEBHOOK_NO_ACTION));
      return;
    }

    // Set github event for body payload
    req.body.event = event;

    if (config.get('env') === 'development' || config.get('env') === 'production') {
      next();
      return;
    }
    const expected = req.header(GITHUB_HEADER.X_HUB_SIGNATURE_256);
    const payload = req.body.rawBody;
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
