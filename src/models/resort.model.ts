import mongoose, { Schema, model } from 'mongoose';
import { Resort } from '../types/resort.type';

const resortSchema = new Schema<Resort>(
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

const ResortModel = model<Resort>('Resort', resortSchema);

export default ResortModel;
