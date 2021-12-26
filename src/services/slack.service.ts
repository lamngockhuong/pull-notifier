import { MESSAGES } from '@/constants/messages';
import { HttpException } from '@/exceptions/HttpException';
import { StatusCodes } from '@/utils/status-code';
import { isEmpty } from '@/utils/util';
import { Prisma, Webhook } from '@prisma/client';
import { WebClient } from '@slack/web-api';

class SlackService {
  private web = new WebClient();

  sendMessage() {
    try {
      this.web.chat.postMessage({
        text: 'Hihi',
        channel: 'C02RY5FKS91',
        token: 'xoxb-1597143248117-2882130794690-R3fUDEd7J0UVWNtnyU9bP3W3',
      });
    } catch (e) {
      console.log(e);
    }
  }

  getSlackToken(webhook: Webhook): string {
    if (isEmpty(webhook)) throw new HttpException(StatusCodes.CONFLICT, MESSAGES.WEBHOOK_NOT_FOUND);
    if (webhook?.bot && typeof webhook?.bot === 'object') {
      const bot = webhook.bot as Prisma.JsonObject;
      return bot.slack_token as string;
    }

    return null;
  }
}

export default SlackService;
