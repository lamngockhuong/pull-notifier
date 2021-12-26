import { CreateUserDto, LoginDto } from '@/dtos/users.dto';
import { HttpException } from '@/exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@/interfaces/auth.interface';
import { StatusCodes } from '@/utils/status-code';
import { isEmpty } from '@/utils/util';
import { PrismaClient, Role, User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

class AuthService {
  private users = new PrismaClient().user;

  async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(StatusCodes.BAD_REQUEST, 'You are not userData');

    const user = await this.users.findUnique({ where: { email: userData.email } });
    if (user) throw new HttpException(StatusCodes.CONFLICT, `You're email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData = this.users.create({ data: { ...userData, password: hashedPassword, role: Role.MEMBER } });

    return createUserData;
  }

  async login(userData: LoginDto): Promise<{ cookie: any; user: User }> {
    if (isEmpty(userData)) throw new HttpException(StatusCodes.BAD_REQUEST, 'You are not userData');

    const user = await this.users.findUnique({ where: { email: userData.email } });
    if (!user) throw new HttpException(StatusCodes.CONFLICT, `You're email ${userData.email} not found`);

    const isPasswordMatching = await compare(userData.password, user.password);
    if (!isPasswordMatching) throw new HttpException(StatusCodes.CONFLICT, "You're password not matching");

    const tokenData = this.createToken(user);
    const cookie = this.createCookie(tokenData);

    return { cookie, user };
  }

  async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(StatusCodes.BAD_REQUEST, "You're not userData");

    const user: User = await this.users.findFirst({ where: { email: userData.email, password: userData.password } });
    if (!user) throw new HttpException(StatusCodes.CONFLICT, "You're not user");

    return user;
  }

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  private createToken(user: User) {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = process.env.JWT_SECRET;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }
}

export default AuthService;
