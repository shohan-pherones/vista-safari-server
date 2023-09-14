import { Request, Response } from 'express';
import { handleError } from '../errors/handle.error';
import mongoose from 'mongoose';
import LocationModel from '../models/location.model';
import TourPackageModel from '../models/tour_package.model';

export default class TourPackageController {
  constructor() {}

  public async getAllTourPackages(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Location not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const tourPackages = await TourPackageModel.find({ location: id });

        res.status(200).json(tourPackages);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async getATourPackage(req: Request, res: Response): Promise<void> {
    try {
      const { id, tid } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Location not found' });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(tid)) {
        res.status(404).json({ message: 'Tour Package not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const tourPackage = await TourPackageModel.findById(tid);

        res.status(200).json(tourPackage);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async deleteTourPackage(req: Request, res: Response): Promise<void> {
    try {
      const { id, tid } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Location not found' });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(tid)) {
        res.status(404).json({ message: 'Tour Package not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const tourPackage = await TourPackageModel.findByIdAndDelete(tid);

        res.status(200).json(tourPackage);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async createTourPackage(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, price, date, limit, transport } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Location not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const tourPackage = await TourPackageModel.create({
          name,
          price,
          date,
          limit,
          location: id,
          availableSeats: limit,
          transport,
        });

        await LocationModel.findByIdAndUpdate(id, {
          $addToSet: {
            tourPackages: tourPackage._id,
          },
        });

        res.status(200).json(tourPackage);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async updateTourPackage(req: Request, res: Response): Promise<void> {
    try {
      const { id, tid } = req.params;
      const { name, photoUrl, date, limit, transport } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Location not found' });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(tid)) {
        res.status(404).json({ message: 'Tour Package not found' });
        return;
      }

      const prevTourPackage = await TourPackageModel.findById(tid);
      const prevLimit = prevTourPackage?.limit || 0;
      const prevAvailableSeats = prevTourPackage?.availableSeats || 0;
      const prevBookedSeats = prevLimit - prevAvailableSeats;

      await Promise.resolve().then(async () => {
        const tourPackage = await TourPackageModel.findByIdAndUpdate(
          tid,
          {
            name,
            photoUrl,
            date,
            limit,
            availableSeats:
              limit - prevBookedSeats < 0 ? 0 : limit - prevBookedSeats,
            transport,
          },
          { new: true }
        );

        res.status(200).json(tourPackage);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}
