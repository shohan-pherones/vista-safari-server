"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const handle_error_1 = require("../errors/handle.error");
const location_model_1 = __importDefault(require("../models/location.model"));
const tour_package_model_1 = __importDefault(require("../models/tour_package.model"));
class TourPackageController {
    constructor() { }
    async getAllTourPackages(req, res) {
        try {
            const { id } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            await Promise.resolve().then(async () => {
                const tourPackages = await tour_package_model_1.default.find({ location: id });
                res.status(200).json(tourPackages);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async getATourPackage(req, res) {
        try {
            const { id, tid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            if (!mongoose_1.default.Types.ObjectId.isValid(tid)) {
                res.status(404).json({ message: 'Tour Package not found' });
                return;
            }
            await Promise.resolve().then(async () => {
                const tourPackage = await tour_package_model_1.default.findById(tid);
                res.status(200).json(tourPackage);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async deleteTourPackage(req, res) {
        try {
            const { id, tid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            if (!mongoose_1.default.Types.ObjectId.isValid(tid)) {
                res.status(404).json({ message: 'Tour Package not found' });
                return;
            }
            await Promise.resolve().then(async () => {
                const tourPackage = await tour_package_model_1.default.findByIdAndDelete(tid);
                res.status(200).json(tourPackage);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async createTourPackage(req, res) {
        try {
            const { id } = req.params;
            const { name, price, date, limit, transport } = req.body;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            await Promise.resolve().then(async () => {
                const tourPackage = await tour_package_model_1.default.create({
                    name,
                    price,
                    date,
                    limit,
                    location: id,
                    availableSeats: limit,
                    transport,
                });
                await location_model_1.default.findByIdAndUpdate(id, {
                    $addToSet: {
                        tourPackages: tourPackage._id,
                    },
                });
                res.status(200).json(tourPackage);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async updateTourPackage(req, res) {
        try {
            const { id, tid } = req.params;
            const { name, photoUrl, date, limit, transport } = req.body;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            if (!mongoose_1.default.Types.ObjectId.isValid(tid)) {
                res.status(404).json({ message: 'Tour Package not found' });
                return;
            }
            const prevTourPackage = await tour_package_model_1.default.findById(tid);
            const prevLimit = (prevTourPackage === null || prevTourPackage === void 0 ? void 0 : prevTourPackage.limit) || 0;
            const prevAvailableSeats = (prevTourPackage === null || prevTourPackage === void 0 ? void 0 : prevTourPackage.availableSeats) || 0;
            const prevBookedSeats = prevLimit - prevAvailableSeats;
            await Promise.resolve().then(async () => {
                const tourPackage = await tour_package_model_1.default.findByIdAndUpdate(tid, {
                    name,
                    photoUrl,
                    date,
                    limit,
                    availableSeats: limit - prevBookedSeats < 0 ? 0 : limit - prevBookedSeats,
                    transport,
                }, { new: true });
                res.status(200).json(tourPackage);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
}
exports.default = TourPackageController;
