import mongoose, { Schema, model } from 'mongoose';
import { Spot } from '../types/spot.type';

const spotSchema = new Schema<Spot>(
  {
    name: { type: String, required: true },
    photoUrl: { type: String, required: true },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
    },
  },
  { timestamps: true }
);

const SpotModel = model<Spot>('Spot', spotSchema);

export default SpotModel;
