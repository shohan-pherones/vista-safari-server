import { Request, Response } from 'express';
import { handleError } from '../errors/handle.error';
import LocationModel from '../models/location.model';
import mongoose from 'mongoose';

export default class LocationController {
  constructor() {}

  public async getAllLocations(req: Request, res: Response): Promise<void> {
    try {
      await Promise.resolve().then(async () => {
        const locations = await LocationModel.find({});

        res.status(200).json(locations);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async getALocation(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Location not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const location = await LocationModel.findById(id)
          .populate('resorts')
          .exec();

        res.status(200).json(location);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async createLocation(req: Request, res: Response): Promise<void> {
    try {
      const { name, photoUrl, description } = req.body;

      await Promise.resolve().then(async () => {
        const newLocation = await LocationModel.create({
          name,
          photoUrl,
          description,
        });

        res.status(200).json(newLocation);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async updateLocation(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, photoUrl, description } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Location not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const newLocation = await LocationModel.findByIdAndUpdate(
          id,
          {
            name,
            photoUrl,
            description,
          },
          {
            new: true,
          }
        );

        res.status(200).json(newLocation);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async deleteLocation(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Location not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const location = await LocationModel.findByIdAndDelete(id);

        res.status(200).json(location);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}
