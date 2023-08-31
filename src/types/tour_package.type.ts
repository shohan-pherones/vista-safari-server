import { Document } from 'mongoose';
import { Location } from './location.type';

export type TourPackage = {
  name: string;
  price: number;
  date: string;
  location: Location;
} & Document;
