import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export default class JWTTokenManager {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor() {
    this.secret = process.env.JWT_SECRET as string;
    this.expiresIn = '7d';
  }

  createToken(id: string): string {
    const token = jwt.sign({ id }, this.secret, {
      expiresIn: this.expiresIn,
    });

    return token;
  }
}
