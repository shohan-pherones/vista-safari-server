import mongoose, { Schema, model } from 'mongoose';
import { User } from '../types/user.type';

export const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    role: {
      enum: ['user', 'admin'],
      default: 'user',
      type: String,
      required: true,
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
      },
    ],
    payments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel = model<User>('User', userSchema);

export default UserModel;
