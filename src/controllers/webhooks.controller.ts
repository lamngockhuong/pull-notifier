import { NextFunction, Request, Response } from 'express';
import WebhookService from '@services/webhook.service';
import { StatusCodes } from '@utils/status-code';
import { MESSAGES } from '@/constants/messages';
import { GithubDto } from '@dtos/github.dto';
import { ok } from '@utils/response';

class WebhooksController {
  private webhooksService = new WebhookService();

  public createWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('createWebhook');
      res.status(StatusCodes.CREATED).json({});
    } catch (error) {
      next(error);
    }
  };

  public updateWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('updateWebhook');
      res.status(StatusCodes.OK).json({});
    } catch (error) {
      next(error);
    }
  };

  public deleteWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('deleteWebhook');
      res.status(StatusCodes.OK).json({});
    } catch (error) {
      next(error);
    }
  };

  public getWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('getWebhook');
      res.status(StatusCodes.OK).json({});
    } catch (error) {
      next(error);
    }
  };

  public listWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = 1;
      const webhooks = await this.webhooksService.listWebhooks(userId);
      res.status(StatusCodes.OK).json({ data: webhooks });
    } catch (error) {
      next(error);
    }
  };

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
