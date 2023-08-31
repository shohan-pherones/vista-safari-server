import { Document } from 'mongoose';

export type Resort = {
  name: string;
  photoUrl: string;
  location: Location;
} & Document;
