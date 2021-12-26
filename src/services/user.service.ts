import { PrismaClient, User } from '@prisma/client';

class UserService {
  private user = new PrismaClient().user;

  async findByEmail(email: string): Promise<User> {
    const item = await this.user.findUnique({
      where: {
        email: email,
      },
    });

    return item;
  }
}

export default UserService;
