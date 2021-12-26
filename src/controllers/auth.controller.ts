import { NextFunction, Request, Response } from 'express';
import '@handlers/passport.handler';
import { CreateUserDto, LoginDto } from '@/dtos/users.dto';
import AuthService from '@/services/auth.service';
import { User } from '@prisma/client';
import { StatusCodes } from '@/utils/status-code';
import { ok } from '@/utils/response';
import { RequestWithUser } from '@/interfaces/auth.interface';

class AuthController {
  private authService = new AuthService();

  signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const user: User = await this.authService.signup(userData);
      delete user.password;

      res.status(StatusCodes.CREATED).json(ok(user, 'Signup successfully'));
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: LoginDto = req.body;
      const { cookie, user } = await this.authService.login(userData);
      delete user.password;

      res.setHeader('Set-Cookie', [cookie]);
      res.status(StatusCodes.OK).json(ok(user, 'Login successfully'));
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(StatusCodes.OK).json(ok(undefined, 'Logout successfully'));
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
