import { Document } from 'mongoose';
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
