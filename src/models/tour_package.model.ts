import mongoose, { Schema, model } from 'mongoose';
import { TourPackage } from '../types/tour_package.type';

const tourPackageSchema = new Schema<TourPackage>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: String, required: true },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
    },
  },
  { timestamps: true }
);

const TourPackageModel = model<TourPackage>('TourPackage', tourPackageSchema);

export default TourPackageModel;
