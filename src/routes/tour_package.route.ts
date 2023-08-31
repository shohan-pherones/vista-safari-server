import express, { Router } from 'express';
import TourPackageController from '../controllers/tour_package.controller';

const tourPackageRouter: Router = express.Router();

tourPackageRouter.post('/', TourPackageController.createTourPackage);
tourPackageRouter.get('/', TourPackageController.getTourPackages);
tourPackageRouter.get('/:id', TourPackageController.getTourPackage);

export default tourPackageRouter;
