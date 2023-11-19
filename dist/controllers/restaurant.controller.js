"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const handle_error_1 = require("../errors/handle.error");
const location_model_1 = __importDefault(require("../models/location.model"));
const restaurant_model_1 = __importDefault(require("../models/restaurant.model"));
class RestaurantController {
    constructor() { }
    async getAllRestaurants(req, res) {
        try {
            const { id } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            await Promise.resolve().then(async () => {
                const restaurants = await restaurant_model_1.default.find({ location: id });
                res.status(200).json(restaurants);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async getARestaurant(req, res) {
        try {
            const { id, rid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            if (!mongoose_1.default.Types.ObjectId.isValid(rid)) {
                res.status(404).json({ message: 'Restaurant not found' });
                return;
            }
            await Promise.resolve().then(async () => {
                const restaurant = await restaurant_model_1.default.findById(rid);
                res.status(200).json(restaurant);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async deleteRestaurant(req, res) {
        try {
            const { id, rid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            if (!mongoose_1.default.Types.ObjectId.isValid(rid)) {
                res.status(404).json({ message: 'Restaurant not found' });
                return;
            }
            await Promise.resolve().then(async () => {
                const restaurant = await restaurant_model_1.default.findByIdAndDelete(rid);
                res.status(200).json(restaurant);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async createRestaurant(req, res) {
        try {
            const { id } = req.params;
            const { name, photoUrl } = req.body;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            await Promise.resolve().then(async () => {
                const restaurant = await restaurant_model_1.default.create({
                    name,
                    photoUrl,
                    location: id,
                });
                await location_model_1.default.findByIdAndUpdate(id, {
                    $addToSet: {
                        restaurants: restaurant._id,
                    },
                });
                res.status(200).json(restaurant);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async updateRestaurant(req, res) {
        try {
            const { id, rid } = req.params;
            const { name, photoUrl } = req.body;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            if (!mongoose_1.default.Types.ObjectId.isValid(rid)) {
                res.status(404).json({ message: 'Restaurant not found' });
                return;
            }
            await Promise.resolve().then(async () => {
                const restaurant = await restaurant_model_1.default.findByIdAndUpdate(rid, {
                    name,
                    photoUrl,
                }, { new: true });
                res.status(200).json(restaurant);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
}
exports.default = RestaurantController;
