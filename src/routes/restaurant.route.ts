import express, { Router } from 'express';
import RestaurantController from '../controllers/restaurant.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

const restaurantRouter: Router = express.Router();

const restaurantInstance = new RestaurantController();
const authMiddleware = new AuthMiddleware();

// get all restaurants
restaurantRouter.get('/:id/restaurants', restaurantInstance.getAllRestaurants);

// get a restaurant
restaurantRouter.get(
  '/:id/restaurants/:rid',
  restaurantInstance.getARestaurant
);

// add restaurant
restaurantRouter.post(
  '/:id/restaurants',
  authMiddleware.verifyUser,
  authMiddleware.checkAdminRole,
  restaurantInstance.createRestaurant
);

// update restaurant
restaurantRouter.put(
  '/:id/restaurants/:rid',
  authMiddleware.verifyUser,
  authMiddleware.checkAdminRole,
  restaurantInstance.updateRestaurant
);

// delete restaurant
restaurantRouter.delete(
  '/:id/restaurants/:rid',
  authMiddleware.verifyUser,
  authMiddleware.checkAdminRole,
  restaurantInstance.deleteRestaurant
);

export default restaurantRouter;
