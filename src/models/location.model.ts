import mongoose, { Schema, model } from 'mongoose';
import { Location } from '../types/location.type';

const locationSchema = new Schema<Location>(
  {
    name: { type: String, required: true },
    tourPackages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TourPackage',
      },
    ],
  },
  { timestamps: true }
);

const LocationModel = model<Location>('Location', locationSchema);

export default LocationModel;
