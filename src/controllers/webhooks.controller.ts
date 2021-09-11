import { NextFunction, Request, Response } from 'express';
import WebhooksService from '@services/webhooks.service';
import { StatusCodes } from '@utils/status-code';
import { GITHUB_EVENT, GITHUB_HEADER } from '@/constants/headers';
import { MESSAGES } from '@/constants/messages';
import { GithubEventDto } from '@dtos/GithubEvent.dto';
import { ok } from '@utils/response';

class WebhooksController {
  public webhooksService = new WebhooksService();

  public github = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const event = req.header(GITHUB_HEADER.X_GITHUB_EVENT);
      if (event !== GITHUB_EVENT.PULL_REQUEST && event !== GITHUB_EVENT.PULL_REQUEST_REVIEW && event !== GITHUB_EVENT.PULL_REQUEST_REVIEW_COMMENT) {
        res.status(StatusCodes.OK).json(ok(undefined, MESSAGES.CALL_GITHUB_WEBHOOK_NO_ACTION));
        return;
      }
      const eventData: GithubEventDto = req.body;
      const data = await this.webhooksService.github(eventData);
      res.status(StatusCodes.OK).json(ok(data, MESSAGES.CALL_GITHUB_WEBHOOK_SUCCESS));
    } catch (error) {
      next(error);
    }
  };
}

export default WebhooksController;
