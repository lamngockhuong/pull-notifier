import { PrismaClient, User } from '@prisma/client';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { StatusCodes } from '@utils/status-code';
import { MESSAGES } from '@/constants/messages';

class UserService {
  public users = new PrismaClient().user;

  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(StatusCodes.BAD_REQUEST, MESSAGES.USER_ID_EMPTY);

    const findUser: User = await this.users.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(StatusCodes.CONFLICT, MESSAGES.USER_NOT_FOUND);

    return findUser;
  }
}

export default UserService;
