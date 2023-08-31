import { Document } from 'mongoose';
import { User } from './user.type';
import { Booking } from './booking.type';

export type Payment = {
  user: User;
  booking: Booking;
} & Document;
