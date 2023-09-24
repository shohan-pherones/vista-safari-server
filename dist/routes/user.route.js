"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const userRouter = express_1.default.Router();
const userInstance = new user_controller_1.default();
const authMiddleware = new auth_middleware_1.default();
// register user
userRouter.post('/register', userInstance.register);
// login user
userRouter.post('/login', userInstance.login);
// get an user
userRouter.get('/:id', authMiddleware.verifyUser, userInstance.getAnUser);
// update an user
userRouter.put('/:id', authMiddleware.verifyUser, userInstance.updateAnUser);
// delete an user
userRouter.delete('/:id', authMiddleware.verifyUser, userInstance.deleteAnUser);
// get all users
userRouter.get('/', authMiddleware.verifyUser, authMiddleware.checkAdminRole, userInstance.getAllUsers);
exports.default = userRouter;
