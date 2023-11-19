"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_controller_1 = __importDefault(require("../controllers/booking.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const bookingRouter = express_1.default.Router();
const authMiddleware = new auth_middleware_1.default();
const bookingInstance = new booking_controller_1.default();
// create a booking for an user
bookingRouter.post('/users/:uid/tour_packages/:tid', authMiddleware.verifyUser, bookingInstance.createABooking);
// get all bookings for an user
bookingRouter.get('/users/:uid', authMiddleware.verifyUser, bookingInstance.getAllBookingsForAnUser);
// get a booking for an user
bookingRouter.get('/:bid/users/:uid', authMiddleware.verifyUser, bookingInstance.getABookingForAnUser);
// delete a booking for an user
bookingRouter.delete('/:bid/users/:uid', authMiddleware.verifyUser, bookingInstance.deleteABooking);
// get all bookings
bookingRouter.get('/', authMiddleware.verifyUser, authMiddleware.checkAdminRole, bookingInstance.getAllBookings);
exports.default = bookingRouter;
