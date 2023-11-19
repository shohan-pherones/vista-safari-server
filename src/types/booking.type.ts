import { Document } from 'mongoose';
import { TourPackage } from './tour_package.type';
import { User } from './user.type';

export type Booking = {
  user: User;
  tourPackage: TourPackage;
  seats: number;
} & Document;
