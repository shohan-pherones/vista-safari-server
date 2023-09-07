import { Request, Response } from 'express';
import ResortModel from '../models/resort.model';
import { handleError } from '../errors/handle.error';
import mongoose from 'mongoose';
import LocationModel from '../models/location.model';

export default class ResortController {
  constructor() {}

  public async getAllResorts(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Location not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const resorts = await ResortModel.find({ location: id });

        res.status(200).json(resorts);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async getAResort(req: Request, res: Response): Promise<void> {
    try {
      const { id, rid } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Location not found' });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(rid)) {
        res.status(404).json({ message: 'Resort not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const resort = await ResortModel.findById(rid);

        res.status(200).json(resort);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async deleteResort(req: Request, res: Response): Promise<void> {
    try {
      const { id, rid } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Location not found' });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(rid)) {
        res.status(404).json({ message: 'Resort not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const resort = await ResortModel.findByIdAndDelete(rid);

        res.status(200).json(resort);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async createResort(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, photoUrl } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Location not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const resort = await ResortModel.create({
          name,
          photoUrl,
          location: id,
        });

        await LocationModel.findByIdAndUpdate(id, {
          $addToSet: {
            resorts: resort._id,
          },
        });

        res.status(200).json(resort);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async updateResort(req: Request, res: Response): Promise<void> {
    try {
      const { id, rid } = req.params;
      const { name, photoUrl } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Location not found' });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(rid)) {
        res.status(404).json({ message: 'Resort not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const resort = await ResortModel.findByIdAndUpdate(
          rid,
          {
            name,
            photoUrl,
          },
          { new: true }
        );

        res.status(200).json(resort);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}
