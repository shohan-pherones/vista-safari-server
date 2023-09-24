"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const spot_controller_1 = __importDefault(require("../controllers/spot.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const spotRouter = express_1.default.Router();
const spotInstance = new spot_controller_1.default();
const authMiddleware = new auth_middleware_1.default();
// get all spots
spotRouter.get('/:id/spots', spotInstance.getAllSpots);
// get a spot
spotRouter.get('/:id/spots/:sid', spotInstance.getASpot);
// add spot
spotRouter.post('/:id/spots', authMiddleware.verifyUser, authMiddleware.checkAdminRole, spotInstance.createSpot);
// update spot
spotRouter.put('/:id/spots/:sid', authMiddleware.verifyUser, authMiddleware.checkAdminRole, spotInstance.updateSpot);
// delete spot
spotRouter.delete('/:id/spots/:sid', authMiddleware.verifyUser, authMiddleware.checkAdminRole, spotInstance.deleteSpot);
exports.default = spotRouter;
