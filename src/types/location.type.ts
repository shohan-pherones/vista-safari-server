import { Document } from 'mongoose';
import { TourPackage } from './tour_package.type';
import { Spot } from './spot.type';
import { Resort } from './resort.type';
import { Restaurant } from './restaurant.type';

export type Location = {
  name: string;
  photoUrl: string;
  description: string;
  spots: Spot[];
  resorts: Resort[];
  restaurants: Restaurant[];
  tourPackages: TourPackage[];
} & Document;
