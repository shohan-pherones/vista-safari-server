import { Request, Response } from 'express';
import LocationModel from '../models/location.model';
import mongoose from 'mongoose';

class LocationController {
  public static async createLocation(
    req: Request,
    res: Response
  ): Promise<void> {
    const { name } = req.body;

    try {
      const newLocation = await LocationModel.create({ name });

      res.status(200).json(newLocation);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'An error occurred' });
      }
    }
  }

  public static async getLocations(req: Request, res: Response): Promise<void> {
    try {
      const locations = await LocationModel.find();

      res.status(200).json(locations);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'An error occurred' });
      }
    }
  }

  public static async getLocation(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new Error('Invalid location ID');
      }

      const location = await LocationModel.findById(id);

      if (!location) {
        throw new Error('No location found');
      }

      res.status(200).json(location);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'An error occurred' });
      }
    }
  }
}

export default LocationController;
