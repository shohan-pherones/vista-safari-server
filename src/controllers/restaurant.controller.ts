import { Request, Response } from 'express';
import RestaurantModel from '../models/restaurant.model';
import { handleError } from '../errors/handle.error';
import mongoose from 'mongoose';
import LocationModel from '../models/location.model';

export default class RestaurantController {
  constructor() {}

  public async getAllRestaurants(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Location not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const restaurants = await RestaurantModel.find({ location: id });

        res.status(200).json(restaurants);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async getARestaurant(req: Request, res: Response): Promise<void> {
    try {
      const { id, rid } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Location not found' });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(rid)) {
        res.status(404).json({ message: 'Restaurant not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const restaurant = await RestaurantModel.findById(rid);

        res.status(200).json(restaurant);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async deleteRestaurant(req: Request, res: Response): Promise<void> {
    try {
      const { id, rid } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Location not found' });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(rid)) {
        res.status(404).json({ message: 'Restaurant not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const restaurant = await RestaurantModel.findByIdAndDelete(rid);

        res.status(200).json(restaurant);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async createRestaurant(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, photoUrl } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Location not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const restaurant = await RestaurantModel.create({
          name,
          photoUrl,
          location: id,
        });

        await LocationModel.findByIdAndUpdate(id, {
          $addToSet: {
            restaurants: restaurant._id,
          },
        });

        res.status(200).json(restaurant);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async updateRestaurant(req: Request, res: Response): Promise<void> {
    try {
      const { id, rid } = req.params;
      const { name, photoUrl } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Location not found' });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(rid)) {
        res.status(404).json({ message: 'Restaurant not found' });
        return;
      }

      await Promise.resolve().then(async () => {
        const restaurant = await RestaurantModel.findByIdAndUpdate(
          rid,
          {
            name,
            photoUrl,
          },
          { new: true }
        );

        res.status(200).json(restaurant);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}
