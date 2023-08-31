import { Document } from 'mongoose';
import { Location } from './location.type';

export type Spot = {
  name: string;
  photoUrl: string;
  location: Location;
} & Document;
