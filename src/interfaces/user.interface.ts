import { Model } from 'mongoose';
import { User } from '../types/user.type';

export interface UserModelInterface extends Model<User> {
  register(
    name: string,
    photoUrl: string,
    email: string,
    password: string,
    address?: string,
    phoneNumber?: string
  ): Promise<User>;

  login(email: string, password: string): Promise<User>;
}
