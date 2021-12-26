import { NextFunction, Response } from 'express';
import { DataStoredInToken, RequestWithUser } from '@/interfaces/auth.interface';
import { HttpException } from '@/exceptions/HttpException';
import { StatusCodes } from '@/utils/status-code';
import { verify } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

    if (authorization) {
      const secretKey = process.env.JWT_SECRET;
      const verificationResponse = verify(authorization, secretKey) as DataStoredInToken;
      const userId = verificationResponse.id;

      const users = new PrismaClient().user;
      const user = await users.findUnique({ where: { id: Number(userId) } });

      if (user) {
        req.user = user;
        next();
      } else {
        next(new HttpException(StatusCodes.UNAUTHORIZED, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(StatusCodes.UNAUTHORIZED, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(StatusCodes.UNAUTHORIZED, 'Wrong authentication token'));
  }
};

export default authMiddleware;
