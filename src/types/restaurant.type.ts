import { Document } from 'mongoose';
import { Location } from './location.type';

export type Restaurant = {
  name: string;
  photoUrl: string;
  location: Location;
} & Document;
