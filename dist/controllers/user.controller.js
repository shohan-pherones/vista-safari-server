"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handle_error_1 = require("../errors/handle.error");
const user_model_1 = __importDefault(require("../models/user.model"));
const jwt_token_manager_1 = __importDefault(require("../manager/jwt_token.manager"));
const mongoose_1 = __importDefault(require("mongoose"));
const jwtTokenManager = new jwt_token_manager_1.default();
class UserController {
    constructor() { }
    async register(req, res) {
        try {
            const { name, photoUrl, email, password, address, phoneNumber } = req.body;
            await Promise.resolve().then(async () => {
                const user = await user_model_1.default.register(name, photoUrl, email, password, address, phoneNumber);
                const token = jwtTokenManager.createToken(user._id);
                res.status(200).json({ user, token });
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            await Promise.resolve().then(async () => {
                const user = await user_model_1.default.login(email, password);
                const token = jwtTokenManager.createToken(user._id);
                res.status(200).json({ user, token });
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async getAnUser(req, res) {
        var _a;
        try {
            const { id } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            if (id !== (userId === null || userId === void 0 ? void 0 : userId.toString())) {
                res.status(403).json({ message: 'Forbidden' });
                return;
            }
            await Promise.resolve().then(async () => {
                const user = await user_model_1.default.findById(id);
                res.status(200).json(user);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async updateAnUser(req, res) {
        var _a;
        try {
            const { id } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { name, photoUrl, address, phoneNumber } = req.body;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            if (id !== (userId === null || userId === void 0 ? void 0 : userId.toString())) {
                res.status(403).json({ message: 'Forbidden' });
                return;
            }
            await Promise.resolve().then(async () => {
                const user = await user_model_1.default.findByIdAndUpdate(id, { name, photoUrl, address, phoneNumber }, { new: true });
                res.status(200).json(user);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async deleteAnUser(req, res) {
        var _a;
        try {
            const { id } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            if (id !== (userId === null || userId === void 0 ? void 0 : userId.toString())) {
                res.status(403).json({ message: 'Forbidden' });
                return;
            }
            await Promise.resolve().then(async () => {
                const user = await user_model_1.default.findByIdAndDelete(id);
                res.status(200).json(user);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async getAllUsers(req, res) {
        try {
            await Promise.resolve().then(async () => {
                const users = await user_model_1.default.find({});
                res.status(200).json(users);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
}
exports.default = UserController;
