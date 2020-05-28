"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fitocannabinoides_controller_1 = require("../controllers/medicalConsultation/fitocannabinoides.controller");
const userValidation_middleware_1 = __importDefault(require("../middlewares/userValidation.middleware"));
const medicalConsultationsRoutes = express_1.Router();
const fitocannabinoidesCtr = new fitocannabinoides_controller_1.FitocannabinoidesController();
medicalConsultationsRoutes.get('/fitocannabinoides/getAll', userValidation_middleware_1.default.validation, (req, res) => fitocannabinoidesCtr.getAll(req, res));
exports.default = medicalConsultationsRoutes;
