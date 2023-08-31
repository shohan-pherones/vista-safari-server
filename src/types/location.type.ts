import { Document } from 'mongoose';
import { TourPackage } from './tour_package.type';

export type Location = {
  name: string;
  tourPackages: TourPackage[];
} & Document;
