import { Request, Response } from 'express';
import { handleError } from '../errors/handle.error';
import mongoose from 'mongoose';
import BookingModel from '../models/booking.model';
import UserModel from '../models/user.model';
import TourPackageModel from '../models/tour_package.model';

export default class BookingController {
  constructor() {}

  public async createABooking(req: Request, res: Response): Promise<void> {
    try {
      const { uid, tid } = req.params;
      const userId = req?.user?._id;

      if (!mongoose.Types.ObjectId.isValid(uid)) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(tid)) {
        res.status(404).json({ message: 'Tour Package not found' });
        return;
      }

      if (uid !== userId?.toString()) {
        res.status(403).json({ message: 'Forbidden' });
        return;
      }

      await Promise.resolve().then(async () => {
        const booking = await BookingModel.create({
          user: uid,
          tourPackage: tid,
        });

        await UserModel.findByIdAndUpdate(uid, {
          $addToSet: {
            bookings: booking._id,
          },
        });

        await TourPackageModel.findByIdAndUpdate(tid, {
          $addToSet: {
            bookings: booking._id,
          },
        });

        res.status(200).json(booking);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async getAllBookingsForAnUser(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { uid } = req.params;
      const userId = req?.user?._id;

      if (!mongoose.Types.ObjectId.isValid(uid)) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      if (uid !== userId?.toString()) {
        res.status(403).json({ message: 'Forbidden' });
        return;
      }

      await Promise.resolve().then(async () => {
        const bookings = await BookingModel.find({ user: uid });

        res.status(200).json(bookings);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async getABookingForAnUser(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { bid, uid } = req.params;
      const userId = req?.user?._id;

      if (!mongoose.Types.ObjectId.isValid(uid)) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(bid)) {
        res.status(404).json({ message: 'Booking not found' });
        return;
      }

      if (uid !== userId?.toString()) {
        res.status(403).json({ message: 'Forbidden' });
        return;
      }

      await Promise.resolve().then(async () => {
        const booking = await BookingModel.findById(bid);

        res.status(200).json(booking);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async deleteABooking(req: Request, res: Response): Promise<void> {
    try {
      const { bid, uid } = req.params;
      const userId = req?.user?._id;

      if (!mongoose.Types.ObjectId.isValid(uid)) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(bid)) {
        res.status(404).json({ message: 'Booking not found' });
        return;
      }

      if (uid !== userId?.toString()) {
        res.status(403).json({ message: 'Forbidden' });
        return;
      }

      await Promise.resolve().then(async () => {
        const booking = await BookingModel.findByIdAndDelete(bid);

        res.status(200).json(booking);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async getAllBookings(req: Request, res: Response): Promise<void> {
    try {
      await Promise.resolve().then(async () => {
        const bookings = await BookingModel.find();

        res.status(200).json(bookings);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}
