import { Document } from 'mongoose';
import { Booking } from './booking.type';
import { Location } from './location.type';

export type TourPackage = {
  name: string;
  price: number;
  date: string;
  limit: number;
  transport: string;
  availableSeats: number;
  location: Location;
  bookings: Booking[];
} & Document;
