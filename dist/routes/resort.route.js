"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resort_controller_1 = __importDefault(require("../controllers/resort.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const resortRouter = express_1.default.Router();
const resortInstance = new resort_controller_1.default();
const authMiddleware = new auth_middleware_1.default();
// get all resorts
resortRouter.get('/:id/resorts', resortInstance.getAllResorts);
// get a resort
resortRouter.get('/:id/resorts/:rid', resortInstance.getAResort);
// add resort
resortRouter.post('/:id/resorts', authMiddleware.verifyUser, authMiddleware.checkAdminRole, resortInstance.createResort);
// update resort
resortRouter.put('/:id/resorts/:rid', authMiddleware.verifyUser, authMiddleware.checkAdminRole, resortInstance.updateResort);
// delete resort
resortRouter.delete('/:id/resorts/:rid', authMiddleware.verifyUser, authMiddleware.checkAdminRole, resortInstance.deleteResort);
exports.default = resortRouter;
