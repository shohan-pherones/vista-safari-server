import express, { Router } from 'express';
import LocationController from '../controllers/location.controller';

const locationRouter: Router = express.Router();

locationRouter.post('/', LocationController.createLocation);
locationRouter.get('/', LocationController.getLocations);
locationRouter.get('/:id', LocationController.getLocation);

export default locationRouter;
