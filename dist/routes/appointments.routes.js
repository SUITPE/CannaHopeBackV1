"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointments_controller_1 = require("../controllers/appointment/appointments.controller");
const userValidation_middleware_1 = __importDefault(require("../middlewares/userValidation.middleware"));
const appointmentsRoutes = express_1.Router();
const appointmentCtr = new appointments_controller_1.AppointmentController();
appointmentsRoutes.post('/save', userValidation_middleware_1.default.validation, appointmentCtr.registerAppointment);
appointmentsRoutes.get('/getAll', userValidation_middleware_1.default.validation, appointmentCtr.getAll);
exports.default = appointmentsRoutes;
