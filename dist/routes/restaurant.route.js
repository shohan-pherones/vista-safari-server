"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const restaurant_controller_1 = __importDefault(require("../controllers/restaurant.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const restaurantRouter = express_1.default.Router();
const restaurantInstance = new restaurant_controller_1.default();
const authMiddleware = new auth_middleware_1.default();
// get all restaurants
restaurantRouter.get('/:id/restaurants', restaurantInstance.getAllRestaurants);
// get a restaurant
restaurantRouter.get('/:id/restaurants/:rid', restaurantInstance.getARestaurant);
// add restaurant
restaurantRouter.post('/:id/restaurants', authMiddleware.verifyUser, authMiddleware.checkAdminRole, restaurantInstance.createRestaurant);
// update restaurant
restaurantRouter.put('/:id/restaurants/:rid', authMiddleware.verifyUser, authMiddleware.checkAdminRole, restaurantInstance.updateRestaurant);
// delete restaurant
restaurantRouter.delete('/:id/restaurants/:rid', authMiddleware.verifyUser, authMiddleware.checkAdminRole, restaurantInstance.deleteRestaurant);
exports.default = restaurantRouter;
