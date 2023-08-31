import { Document } from 'mongoose';
import { Location } from './location.type';
import { Booking } from './booking.type';

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
