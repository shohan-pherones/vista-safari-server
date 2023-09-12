import { Request, Response } from 'express';
import { handleError } from '../errors/handle.error';
import mongoose from 'mongoose';
import BookingModel from '../models/booking.model';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY ?? 'N/A';

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-08-16',
});

export default class PaymentController {
  constructor() {}

  public async createPayment(req: Request, res: Response): Promise<void> {
    try {
      const { bookingId, userId } = req.body;
      const authUserId = req.user?._id;

      if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        res.status(404).json({ message: 'Booking not found' });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      if (userId !== authUserId?.toString()) {
        res.status(403).json({ message: 'Forbidden' });
        return;
      }

      const booking = await BookingModel.findById(bookingId)
        .populate('user tourPackage')
        .exec();

      const bookedUserId = booking?.user._id;

      if (userId !== bookedUserId?.toString()) {
        res.status(403).json({ message: 'Forbidden' });
        return;
      }

      const item = {
        quantity: 1,
        price_data: {
          currency: 'BDT',
          unit_amount: booking?.tourPackage.price
            ? +(booking.tourPackage.price * 100).toFixed(2)
            : 0,
          product_data: {
            name: booking?.tourPackage.name || 'Untitled',
          },
        },
      };

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [item],
        mode: 'payment',
        success_url: `${process.env.BASE_URL}/payments/success`,
        cancel_url: `${process.env.BASE_URL}/payments/cancel`,
      });

      res.status(200).json({ id: session.id });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}
