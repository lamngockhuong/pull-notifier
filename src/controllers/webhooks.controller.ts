import { NextFunction, Request, Response } from 'express';
import WebhookService from '@services/webhook.service';
import { StatusCodes } from '@utils/status-code';
import { MESSAGES } from '@/constants/messages';
import { GithubDto } from '@dtos/github.dto';
import { ok } from '@utils/response';

class WebhooksController {
  public webhooksService = new WebhookService();

  public github = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const key = req.params.key;
      const eventData: GithubDto = req.body;
      res.status(StatusCodes.OK).json(ok(await this.webhooksService.github(key, eventData), MESSAGES.CALL_GITHUB_WEBHOOK_SUCCESS));
    } catch (error) {
      next(error);
    }
  };
}

export default WebhooksController;
