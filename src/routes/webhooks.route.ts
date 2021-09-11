import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import WebhooksController from '@controllers/webhooks.controller';
import { verifyRequest } from '@middlewares/verify.middleware';

class WebhooksRoute implements Routes {
  public path = '/webhooks';
  public router = Router();
  public webhooksController = new WebhooksController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/github/:id`, verifyRequest, this.webhooksController.github);
  }
}

export default WebhooksRoute;
