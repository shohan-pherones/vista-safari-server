import mongoose, { Schema, model } from 'mongoose';
import { Restaurant } from '../types/restaurant.type';

const restaurantSchema = new Schema<Restaurant>(
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

const RestaurantModel = model<Restaurant>('Restaurant', restaurantSchema);

export default RestaurantModel;
