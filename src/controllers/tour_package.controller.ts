import { Request, Response } from 'express';
import TourPackageModel from '../models/tour_package.model';
import mongoose from 'mongoose';

class TourPackageController {
  public static async createTourPackage(
    req: Request,
    res: Response
  ): Promise<void> {
    const { name, price, date, location } = req.body;

    try {
      const newTourPackage = await TourPackageModel.create({
        name,
        price,
        date,
        location,
      });

      res.status(200).json(newTourPackage);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'An error occurred' });
      }
    }
  }

  public static async getTourPackages(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const tourPackages = await TourPackageModel.find();

      res.status(200).json(tourPackages);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'An error occurred' });
      }
    }
  }

  public static async getTourPackage(
    req: Request,
    res: Response
  ): Promise<void> {
    const { id } = req.params;

    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new Error('Invalid tour package ID');
      }

      const tourPackage = await TourPackageModel.findById(id);

      if (!tourPackage) {
        throw new Error('No tour package found');
      }

      res.status(200).json(tourPackage);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'An error occurred' });
      }
    }
  }
}

export default TourPackageController;
