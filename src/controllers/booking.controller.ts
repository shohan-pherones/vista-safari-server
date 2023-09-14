import { Request, Response } from 'express';
import { handleError } from '../errors/handle.error';
import { Booking } from '../types/booking.type';
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
      const { seats } = req.body;

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

      const user = await UserModel.findById(uid).populate('bookings');

      const alreadyBooked = user?.bookings.find(
        (booking: Booking) => tid === booking?.tourPackage.toString()
      );

      if (alreadyBooked) {
        res.status(403).json({ message: 'Tour package already booked' });
        return;
      }

      const tourPackage = await TourPackageModel.findById(tid);

      if (!tourPackage) {
        res.status(404).json({ message: 'Tour Package not found' });
        return;
      }

      const availableSeats = tourPackage.availableSeats;

      if (availableSeats < 1 || seats > availableSeats) {
        res.status(400).json({ message: 'Seat not available' });
        return;
      }

      await Promise.resolve().then(async () => {
        const booking = await BookingModel.create({
          user: uid,
          tourPackage: tid,
          seats,
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
          $inc: {
            availableSeats: -seats,
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

      const isExist = await BookingModel.findById(bid);

      if (!isExist) {
        res.status(404).json({ message: 'Booking not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const booking = await BookingModel.findByIdAndDelete(bid);

        await TourPackageModel.findByIdAndUpdate(booking?.tourPackage, {
          $inc: {
            availableSeats: booking?.seats,
          },
        });

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
