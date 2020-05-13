"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userValidation_middleware_1 = __importDefault(require("../middlewares/userValidation.middleware"));
const doctorAvailability_controller_1 = require("../controllers/doctor/doctorAvailability.controller");
const doctor_controller_1 = require("../controllers/doctor/doctor.controller");
const doctorAvailabilityCtr = new doctorAvailability_controller_1.DoctorAvailabilityController();
const doctorCtr = new doctor_controller_1.DoctorController();
const doctorRoutes = express_1.Router();
doctorRoutes.get('/getAll', userValidation_middleware_1.default.validation, doctorCtr.getAllDoctors);
doctorRoutes.post('/doctorAvailability/save', userValidation_middleware_1.default.validation, doctorAvailabilityCtr.createDoctorAvailability);
doctorRoutes.get('/doctorAvailability/getAll', userValidation_middleware_1.default.validation, doctorAvailabilityCtr.getAllDoctorAvailabilities);
doctorRoutes.get('/doctorAvailability/getByIdDoctor/:idDoctor', userValidation_middleware_1.default.validation, doctorAvailabilityCtr.getDoctorAvailabilitiesByIdDoctor);
exports.default = doctorRoutes;
