"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tour_package_controller_1 = __importDefault(require("../controllers/tour_package.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const tourPackageRouter = express_1.default.Router();
const tourPackageInstance = new tour_package_controller_1.default();
const authMiddleware = new auth_middleware_1.default();
// get all tour packages
tourPackageRouter.get('/:id/tour_packages', tourPackageInstance.getAllTourPackages);
// get a tour package
tourPackageRouter.get('/:id/tour_packages/:tid', tourPackageInstance.getATourPackage);
// add tour package
tourPackageRouter.post('/:id/tour_packages', authMiddleware.verifyUser, authMiddleware.checkAdminRole, tourPackageInstance.createTourPackage);
// update tour package
tourPackageRouter.put('/:id/tour_packages/:tid', authMiddleware.verifyUser, authMiddleware.checkAdminRole, tourPackageInstance.updateTourPackage);
// delete tour package
tourPackageRouter.delete('/:id/tour_packages/:tid', authMiddleware.verifyUser, authMiddleware.checkAdminRole, tourPackageInstance.deleteTourPackage);
exports.default = tourPackageRouter;
