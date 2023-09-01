import express, { Router } from 'express';

const paymentRouter: Router = express.Router();

// make a payment for a booking and an user
paymentRouter.post('/bookings/:id/users/:id');

// get all payments for an user
paymentRouter.get('/users/:id');

// get a payment for an user
paymentRouter.get('/:id/users/:id');

// get all payments
paymentRouter.get('/');

export default paymentRouter;
