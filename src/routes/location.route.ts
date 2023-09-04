import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import LocationController from '../controllers/location.controller';

const locationRouter: Router = express.Router();

const authMiddleware = new AuthMiddleware();
const locationInstance = new LocationController();

// get all locations
locationRouter.get('/', locationInstance.getAllLocations);

// get a location
locationRouter.get('/:id', locationInstance.getALocation);

// add location
locationRouter.post(
  '/',
  authMiddleware.verifyUser,
  authMiddleware.checkAdminRole,
  locationInstance.createLocation
);

// update location
locationRouter.put(
  '/:id',
  authMiddleware.verifyUser,
  authMiddleware.checkAdminRole,
  locationInstance.updateLocation
);

// delete location
locationRouter.delete(
  '/:id',
  authMiddleware.verifyUser,
  authMiddleware.checkAdminRole,
  locationInstance.deleteLocation
);

export default locationRouter;
