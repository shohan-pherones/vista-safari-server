import { Document, Model } from 'mongoose';
import { Booking } from './booking.type';
import { Payment } from './payment.type';

export type User = {
  name: string;
  photoUrl: string;
  email: string;
  password: string;
  address?: string;
  phoneNumber?: string;
  role: 'user' | 'admin';
  bookings: Booking[];
  payments: Payment[];
} & Document;

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
