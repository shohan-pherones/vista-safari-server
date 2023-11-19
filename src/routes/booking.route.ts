import express, { Router } from 'express';
import BookingController from '../controllers/booking.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

const bookingRouter: Router = express.Router();

const authMiddleware = new AuthMiddleware();
const bookingInstance = new BookingController();

// create a booking for an user
bookingRouter.post(
  '/users/:uid/tour_packages/:tid',
  authMiddleware.verifyUser,
  bookingInstance.createABooking
);

// get all bookings for an user
bookingRouter.get(
  '/users/:uid',
  authMiddleware.verifyUser,
  bookingInstance.getAllBookingsForAnUser
);

// get a booking for an user
bookingRouter.get(
  '/:bid/users/:uid',
  authMiddleware.verifyUser,
  bookingInstance.getABookingForAnUser
);

// delete a booking for an user
bookingRouter.delete(
  '/:bid/users/:uid',
  authMiddleware.verifyUser,
  bookingInstance.deleteABooking
);

// get all bookings
bookingRouter.get(
  '/',
  authMiddleware.verifyUser,
  authMiddleware.checkAdminRole,
  bookingInstance.getAllBookings
);

export default bookingRouter;
