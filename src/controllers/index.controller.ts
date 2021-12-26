import { NextFunction, Request, Response } from 'express';
import SlackService from '@services/slack.service';

class IndexController {
  private slackService = new SlackService();

  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      this.slackService.sendMessage();
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
