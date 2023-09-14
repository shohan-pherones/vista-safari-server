import { Request, Response } from 'express';
import { handleError } from '../errors/handle.error';
import SpotModel from '../models/spot.model';
import mongoose from 'mongoose';
import LocationModel from '../models/location.model';

export default class SpotController {
  constructor() {}

  public async getAllSpots(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Location not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const spots = await SpotModel.find({ location: id });

        res.status(200).json(spots);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async getASpot(req: Request, res: Response): Promise<void> {
    try {
      const { id, sid } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Location not found' });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(sid)) {
        res.status(404).json({ message: 'Spot not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const spot = await SpotModel.findById(sid);

        res.status(200).json(spot);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async deleteSpot(req: Request, res: Response): Promise<void> {
    try {
      const { id, sid } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Location not found' });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(sid)) {
        res.status(404).json({ message: 'Spot not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const spot = await SpotModel.findByIdAndDelete(sid);

        res.status(200).json(spot);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async createSpot(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, photoUrl } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Location not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const spot = await SpotModel.create({
          name,
          photoUrl,
          location: id,
        });

        await LocationModel.findByIdAndUpdate(id, {
          $addToSet: {
            spots: spot._id,
          },
        });

        res.status(200).json(spot);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async updateSpot(req: Request, res: Response): Promise<void> {
    try {
      const { id, sid } = req.params;
      const { name, photoUrl } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Location not found' });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(sid)) {
        res.status(404).json({ message: 'Spot not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const spot = await SpotModel.findByIdAndUpdate(
          sid,
          {
            name,
            photoUrl,
          },
          { new: true }
        );

        res.status(200).json(spot);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}
