import mongoose, { Schema, model } from 'mongoose';
import { Booking } from '../types/booking.type';

const bookingScheme = new Schema<Booking>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    tourPackage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TourPackage',
    },
    seats: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const BookingModel = model<Booking>('Booking', bookingScheme);

export default BookingModel;
