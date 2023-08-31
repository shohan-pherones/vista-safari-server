import mongoose, { Schema, model } from 'mongoose';
import { Payment } from '../types/payment.type';

const paymentScheme = new Schema<Payment>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
    },
  },
  {
    timestamps: true,
  }
);

const PaymentModel = model<Payment>('Payment', paymentScheme);

export default PaymentModel;
