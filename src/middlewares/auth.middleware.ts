import { Request, Response, NextFunction } from 'express';
import { User } from '../types/user.type';
import JWTTokenManager from '../manager/jwt_token.manager';
import UserModel from '../models/user.model';

interface JwtPayload {
  id: string;
}

declare module 'express' {
  interface Request {
    user?: User;
  }
}

const jwtTokenManager = new JWTTokenManager();

export default class AuthMiddleware {
  constructor() {}

  public async verifyUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    try {
      const payload = jwtTokenManager.verifyToken(token) as JwtPayload;
      const user = await UserModel.findById(payload.id);

      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
  }

  public checkAdminRole(req: Request, res: Response, next: NextFunction): void {
    const user = req.user;

    if (user && user?.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }
  }
}
