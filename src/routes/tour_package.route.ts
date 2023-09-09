import express, { Router } from 'express';
import TourPackageController from '../controllers/tour_package.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

const tourPackageRouter: Router = express.Router();

const tourPackageInstance = new TourPackageController();
const authMiddleware = new AuthMiddleware();

// get all tour packages
tourPackageRouter.get(
  '/:id/tour_packages',
  tourPackageInstance.getAllTourPackages
);

// get a tour package
tourPackageRouter.get(
  '/:id/tour_packages/:tid',
  tourPackageInstance.getATourPackage
);

// add tour package
tourPackageRouter.post(
  '/:id/tour_packages',
  authMiddleware.verifyUser,
  authMiddleware.checkAdminRole,
  tourPackageInstance.createTourPackage
);

// update tour package
tourPackageRouter.put(
  '/:id/tour_packages/:tid',
  authMiddleware.verifyUser,
  authMiddleware.checkAdminRole,
  tourPackageInstance.updateTourPackage
);

// delete tour package
tourPackageRouter.delete(
  '/:id/tour_packages/:tid',
  authMiddleware.verifyUser,
  authMiddleware.checkAdminRole,
  tourPackageInstance.deleteTourPackage
);

export default tourPackageRouter;
