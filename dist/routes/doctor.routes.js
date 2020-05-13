"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userValidation_middleware_1 = __importDefault(require("../middlewares/userValidation.middleware"));
const doctorAvailability_controller_1 = require("../controllers/doctor/doctorAvailability.controller");
const doctorAvailabilityCtr = new doctorAvailability_controller_1.DoctorAvailabilityController();
const doctorRoutes = express_1.Router();
doctorRoutes.post('/doctorAvailability/save', userValidation_middleware_1.default.validation, doctorAvailabilityCtr.createDoctorAvailability);
exports.default = doctorRoutes;
