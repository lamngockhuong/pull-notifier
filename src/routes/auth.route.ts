import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import AuthController from '@/controllers/auth.controller';
import { CreateUserDto, LoginDto } from '@/dtos/users.dto';
import validationMiddleware from '@/middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signup);
    this.router.post(`${this.path}/login`, validationMiddleware(LoginDto, 'body'), this.authController.login);
    this.router.post(`${this.path}/logout`, authMiddleware, this.authController.logout);
  }
}

export default AuthRoute;
