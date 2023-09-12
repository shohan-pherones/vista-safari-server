import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import PaymentController from '../controllers/payment.controller';

const paymentRouter: Router = express.Router();

const authMiddleware = new AuthMiddleware();
const paymentInstance = new PaymentController();

paymentRouter.post(
  '/create-checkout-session',
  authMiddleware.verifyUser,
  paymentInstance.createPayment
);

export default paymentRouter;
