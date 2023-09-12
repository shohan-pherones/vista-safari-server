import { Request, Response } from 'express';
import { handleError } from '../errors/handle.error';
import mongoose from 'mongoose';
import BookingModel from '../models/booking.model';

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
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}
