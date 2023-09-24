"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handle_error_1 = require("../errors/handle.error");
const spot_model_1 = __importDefault(require("../models/spot.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const location_model_1 = __importDefault(require("../models/location.model"));
class SpotController {
    constructor() { }
    async getAllSpots(req, res) {
        try {
            const { id } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            await Promise.resolve().then(async () => {
                const spots = await spot_model_1.default.find({ location: id });
                res.status(200).json(spots);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async getASpot(req, res) {
        try {
            const { id, sid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            if (!mongoose_1.default.Types.ObjectId.isValid(sid)) {
                res.status(404).json({ message: 'Spot not found' });
                return;
            }
            await Promise.resolve().then(async () => {
                const spot = await spot_model_1.default.findById(sid);
                res.status(200).json(spot);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async deleteSpot(req, res) {
        try {
            const { id, sid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            if (!mongoose_1.default.Types.ObjectId.isValid(sid)) {
                res.status(404).json({ message: 'Spot not found' });
                return;
            }
            await Promise.resolve().then(async () => {
                const spot = await spot_model_1.default.findByIdAndDelete(sid);
                res.status(200).json(spot);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async createSpot(req, res) {
        try {
            const { id } = req.params;
            const { name, photoUrl } = req.body;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            await Promise.resolve().then(async () => {
                const spot = await spot_model_1.default.create({
                    name,
                    photoUrl,
                    location: id,
                });
                await location_model_1.default.findByIdAndUpdate(id, {
                    $addToSet: {
                        spots: spot._id,
                    },
                });
                res.status(200).json(spot);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async updateSpot(req, res) {
        try {
            const { id, sid } = req.params;
            const { name, photoUrl } = req.body;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            if (!mongoose_1.default.Types.ObjectId.isValid(sid)) {
                res.status(404).json({ message: 'Spot not found' });
                return;
            }
            await Promise.resolve().then(async () => {
                const spot = await spot_model_1.default.findByIdAndUpdate(sid, {
                    name,
                    photoUrl,
                }, { new: true });
                res.status(200).json(spot);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
}
exports.default = SpotController;
