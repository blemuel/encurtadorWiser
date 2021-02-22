"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const encurtadorController_1 = __importDefault(require("../controllers/encurtadorController"));
const router = express_1.Router();
const encurtadorController = new encurtadorController_1.default();
router.post('/encurtador', encurtadorController.encurtarUrl);
router.get('/:newUrl', encurtadorController.getUrl);
exports.default = router;
//# sourceMappingURL=encurtadorRouter.js.map