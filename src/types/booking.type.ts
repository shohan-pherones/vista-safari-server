import { Document } from 'mongoose';
import { User } from './user.type';
import { TourPackage } from './tour_package.type';

export type Booking = {
  user: User;
  tourPackage: TourPackage;
} & Document;
