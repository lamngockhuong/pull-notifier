import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import WebhooksController from '@controllers/webhooks.controller';
import { githubEventValidation, githubSignatureValidation, processGithubData } from '@middlewares/webhook.middleware';

class WebhooksRoute implements Routes {
  public path = '/webhooks';
  public router = Router();
  public webhooksController = new WebhooksController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.webhooksController.getWebhook);
    this.router.get(`${this.path}`, this.webhooksController.listWebhook);
    this.router.post(`${this.path}`, this.webhooksController.createWebhook);
    this.router.post(`${this.path}/:id`, this.webhooksController.updateWebhook);
    this.router.delete(`${this.path}/:id`, this.webhooksController.deleteWebhook);
    this.router.post(`${this.path}/github/:key`, githubEventValidation, processGithubData, githubSignatureValidation, this.webhooksController.github);
  }
}

export default WebhooksRoute;
