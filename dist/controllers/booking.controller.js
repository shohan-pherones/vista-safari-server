"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handle_error_1 = require("../errors/handle.error");
const mongoose_1 = __importDefault(require("mongoose"));
const booking_model_1 = __importDefault(require("../models/booking.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const tour_package_model_1 = __importDefault(require("../models/tour_package.model"));
class BookingController {
    constructor() { }
    async createABooking(req, res) {
        var _a;
        try {
            const { uid, tid } = req.params;
            const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { seats } = req.body;
            if (!mongoose_1.default.Types.ObjectId.isValid(uid)) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            if (!mongoose_1.default.Types.ObjectId.isValid(tid)) {
                res.status(404).json({ message: 'Tour Package not found' });
                return;
            }
            if (uid !== (userId === null || userId === void 0 ? void 0 : userId.toString())) {
                res.status(403).json({ message: 'Forbidden' });
                return;
            }
            const user = await user_model_1.default.findById(uid).populate('bookings');
            const alreadyBooked = user === null || user === void 0 ? void 0 : user.bookings.find((booking) => tid === (booking === null || booking === void 0 ? void 0 : booking.tourPackage.toString()));
            if (alreadyBooked) {
                res.status(403).json({ message: 'Tour package already booked' });
                return;
            }
            const tourPackage = await tour_package_model_1.default.findById(tid);
            if (!tourPackage) {
                res.status(404).json({ message: 'Tour Package not found' });
                return;
            }
            const availableSeats = tourPackage.availableSeats;
            if (availableSeats < 1 || seats > availableSeats) {
                res.status(400).json({ message: 'Seat not available' });
                return;
            }
            await Promise.resolve().then(async () => {
                const booking = await booking_model_1.default.create({
                    user: uid,
                    tourPackage: tid,
                    seats,
                });
                await user_model_1.default.findByIdAndUpdate(uid, {
                    $addToSet: {
                        bookings: booking._id,
                    },
                });
                await tour_package_model_1.default.findByIdAndUpdate(tid, {
                    $addToSet: {
                        bookings: booking._id,
                    },
                    $inc: {
                        availableSeats: -seats,
                    },
                });
                res.status(200).json(booking);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async getAllBookingsForAnUser(req, res) {
        var _a;
        try {
            const { uid } = req.params;
            const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
            if (!mongoose_1.default.Types.ObjectId.isValid(uid)) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            if (uid !== (userId === null || userId === void 0 ? void 0 : userId.toString())) {
                res.status(403).json({ message: 'Forbidden' });
                return;
            }
            await Promise.resolve().then(async () => {
                const bookings = await booking_model_1.default.find({ user: uid });
                res.status(200).json(bookings);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async getABookingForAnUser(req, res) {
        var _a;
        try {
            const { bid, uid } = req.params;
            const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
            if (!mongoose_1.default.Types.ObjectId.isValid(uid)) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            if (!mongoose_1.default.Types.ObjectId.isValid(bid)) {
                res.status(404).json({ message: 'Booking not found' });
                return;
            }
            if (uid !== (userId === null || userId === void 0 ? void 0 : userId.toString())) {
                res.status(403).json({ message: 'Forbidden' });
                return;
            }
            await Promise.resolve().then(async () => {
                const booking = await booking_model_1.default.findById(bid);
                res.status(200).json(booking);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async deleteABooking(req, res) {
        var _a;
        try {
            const { bid, uid } = req.params;
            const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
            if (!mongoose_1.default.Types.ObjectId.isValid(uid)) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            if (!mongoose_1.default.Types.ObjectId.isValid(bid)) {
                res.status(404).json({ message: 'Booking not found' });
                return;
            }
            if (uid !== (userId === null || userId === void 0 ? void 0 : userId.toString())) {
                res.status(403).json({ message: 'Forbidden' });
                return;
            }
            const isExist = await booking_model_1.default.findById(bid);
            if (!isExist) {
                res.status(404).json({ message: 'Booking not found' });
                return;
            }
            await Promise.resolve().then(async () => {
                const booking = await booking_model_1.default.findByIdAndDelete(bid);
                await tour_package_model_1.default.findByIdAndUpdate(booking === null || booking === void 0 ? void 0 : booking.tourPackage, {
                    $inc: {
                        availableSeats: booking === null || booking === void 0 ? void 0 : booking.seats,
                    },
                });
                res.status(200).json(booking);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async getAllBookings(req, res) {
        try {
            await Promise.resolve().then(async () => {
                const bookings = await booking_model_1.default.find();
                res.status(200).json(bookings);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
}
exports.default = BookingController;
