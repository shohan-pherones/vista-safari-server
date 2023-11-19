"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const handle_error_1 = require("../errors/handle.error");
const location_model_1 = __importDefault(require("../models/location.model"));
const resort_model_1 = __importDefault(require("../models/resort.model"));
class ResortController {
    constructor() { }
    async getAllResorts(req, res) {
        try {
            const { id } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            await Promise.resolve().then(async () => {
                const resorts = await resort_model_1.default.find({ location: id });
                res.status(200).json(resorts);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async getAResort(req, res) {
        try {
            const { id, rid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            if (!mongoose_1.default.Types.ObjectId.isValid(rid)) {
                res.status(404).json({ message: 'Resort not found' });
                return;
            }
            await Promise.resolve().then(async () => {
                const resort = await resort_model_1.default.findById(rid);
                res.status(200).json(resort);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async deleteResort(req, res) {
        try {
            const { id, rid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            if (!mongoose_1.default.Types.ObjectId.isValid(rid)) {
                res.status(404).json({ message: 'Resort not found' });
                return;
            }
            await Promise.resolve().then(async () => {
                const resort = await resort_model_1.default.findByIdAndDelete(rid);
                res.status(200).json(resort);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async createResort(req, res) {
        try {
            const { id } = req.params;
            const { name, photoUrl } = req.body;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            await Promise.resolve().then(async () => {
                const resort = await resort_model_1.default.create({
                    name,
                    photoUrl,
                    location: id,
                });
                await location_model_1.default.findByIdAndUpdate(id, {
                    $addToSet: {
                        resorts: resort._id,
                    },
                });
                res.status(200).json(resort);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async updateResort(req, res) {
        try {
            const { id, rid } = req.params;
            const { name, photoUrl } = req.body;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            if (!mongoose_1.default.Types.ObjectId.isValid(rid)) {
                res.status(404).json({ message: 'Resort not found' });
                return;
            }
            await Promise.resolve().then(async () => {
                const resort = await resort_model_1.default.findByIdAndUpdate(rid, {
                    name,
                    photoUrl,
                }, { new: true });
                res.status(200).json(resort);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
}
exports.default = ResortController;
