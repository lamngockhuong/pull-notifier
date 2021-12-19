import { RequestHandler } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { StatusCodes } from '@utils/status-code';
import { GITHUB_EVENT, GITHUB_HEADER } from '@/constants/headers';
import { MESSAGES } from '@/constants/messages';
import config from 'config';
import { getSignature } from '@/utils/util';
import { logger } from '@utils/logger';
import WebhookService from '@/services/webhook.service';

const webhooksService = new WebhookService();

export const githubEventValidation = (req, res, next): RequestHandler => {
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

  next();
};

export const processGithubData = (req, res, next) => {
  if (req.is('application/x-www-form-urlencoded')) {
    req.body = JSON.parse(req.body.payload);
  }

  // Set github event for body payload
  req.body.event = req.header(GITHUB_HEADER.X_GITHUB_EVENT);

  next();
};

export const githubSignatureValidation = async (req, res, next) => {
  try {
    if (config.get('env') === 'development') {
      next();
      return;
    }

    const bodyBuffer = res['locals'].bodyBuffer;

    // Get webhook secret token
    const secretToken = await webhooksService.findSecretTokenByKey(req.params.key);
    const calculated = getSignature(bodyBuffer, secretToken);
    const expected = req.header(GITHUB_HEADER.X_HUB_SIGNATURE_256);

    logger.info(`${GITHUB_HEADER.X_HUB_SIGNATURE_256} expected: ${expected}, calculated: ${calculated}`);
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
