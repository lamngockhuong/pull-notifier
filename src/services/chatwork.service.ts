import { MESSAGES } from '@/constants/messages';
import { HttpException } from '@/exceptions/HttpException';
import { StatusCodes } from '@/utils/status-code';
import { isEmpty } from '@/utils/util';
import { Prisma, Webhook } from '@prisma/client';

class ChatworkService {
  getChatworkToken(webhook: Webhook): string {
    if (isEmpty(webhook)) throw new HttpException(StatusCodes.CONFLICT, MESSAGES.WEBHOOK_NOT_FOUND);
    if (webhook?.bot && typeof webhook?.bot === 'object') {
      const bot = webhook.bot as Prisma.JsonObject;
      return bot.chatwork_token as string;
    }

    return null;
  }
}

export default ChatworkService;
