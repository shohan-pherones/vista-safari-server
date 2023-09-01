import express, { Router } from 'express';

const bookingRouter: Router = express.Router();

// get all bookings
bookingRouter.get('/');

// get all bookings for an user
bookingRouter.get('/users/:id');

// create a booking for an user
bookingRouter.post('/users/:id/tour_packages/:id');

// delete a booking for an user
bookingRouter.delete('/users/:id/tour_packages/:id');

// get a booking for an user
bookingRouter.get('/:id/users/:id');

export default bookingRouter;
