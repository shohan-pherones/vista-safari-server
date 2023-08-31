import { Document } from 'mongoose';
import { User } from './user.type';
import { TourPackage } from './tour_package.type';
import { Payment } from './payment.type';

export type Booking = {
  user: User;
  tourPackage: TourPackage;
  payment: Payment;
} & Document;
