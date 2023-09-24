"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const location_controller_1 = __importDefault(require("../controllers/location.controller"));
const locationRouter = express_1.default.Router();
const authMiddleware = new auth_middleware_1.default();
const locationInstance = new location_controller_1.default();
// get all locations
locationRouter.get('/', locationInstance.getAllLocations);
// get a location
locationRouter.get('/:id', locationInstance.getALocation);
// add location
locationRouter.post('/', authMiddleware.verifyUser, authMiddleware.checkAdminRole, locationInstance.createLocation);
// update location
locationRouter.put('/:id', authMiddleware.verifyUser, authMiddleware.checkAdminRole, locationInstance.updateLocation);
// delete location
locationRouter.delete('/:id', authMiddleware.verifyUser, authMiddleware.checkAdminRole, locationInstance.deleteLocation);
exports.default = locationRouter;
