import express, { Router } from 'express';
import ResortController from '../controllers/resort.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

const resortRouter: Router = express.Router();

const resortInstance = new ResortController();
const authMiddleware = new AuthMiddleware();

// get all resorts
resortRouter.get('/:id/resorts', resortInstance.getAllResorts);

// get a resort
resortRouter.get('/:id/resorts/:rid', resortInstance.getAResort);

// add resort
resortRouter.post(
  '/:id/resorts',
  authMiddleware.verifyUser,
  authMiddleware.checkAdminRole,
  resortInstance.createResort
);

// update resort
resortRouter.put(
  '/:id/resorts/:rid',
  authMiddleware.verifyUser,
  authMiddleware.checkAdminRole,
  resortInstance.updateResort
);

// delete resort
resortRouter.delete(
  '/:id/resorts/:rid',
  authMiddleware.verifyUser,
  authMiddleware.checkAdminRole,
  resortInstance.deleteResort
);

export default resortRouter;
