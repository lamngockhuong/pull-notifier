import { NextFunction, Request, Response } from 'express';
import WebhooksService from '@services/webhooks.service';
import { StatusCodes } from '@utils/status-code';

class WebhooksController {
  public webhooksService = new WebhooksService();

  public github = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.webhooksService.github();
      console.log(data);
      res.status(StatusCodes.OK).json({ data: data, message: 'github' });
    } catch (error) {
      next(error);
    }
  };
}

export default WebhooksController;
