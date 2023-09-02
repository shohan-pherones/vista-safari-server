import { Request, Response } from 'express';
import { handleError } from '../errors/handle.error';
import UserModel from '../models/user.model';
import JWTTokenManager from '../manager/jwt_token.manager';

const jwtTokenManager = new JWTTokenManager();

export default class UserController {
  constructor() {}

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, photoUrl, email, password, address, phoneNumber } =
        req.body;

      await Promise.resolve().then(async () => {
        const user = await UserModel.register(
          name,
          photoUrl,
          email,
          password,
          address,
          phoneNumber
        );

        const token = jwtTokenManager.createToken(user._id);

        res.status(200).json({ user, token });
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      await Promise.resolve().then(async () => {
        const user = await UserModel.login(email, password);

        const token = jwtTokenManager.createToken(user._id);

        res.status(200).json({ user, token });
      });
    } catch (error) {
      await handleError(error, res);
    }
  }
}
