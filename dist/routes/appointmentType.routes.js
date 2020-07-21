"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userValidation_middleware_1 = __importDefault(require("../middlewares/userValidation.middleware"));
const appointmentType_controller_1 = require("../controllers/appointment/appointmentType.controller");
const appointmentType_service_1 = require("../services/appointmentType.service");
const appointmetnTypeSrv = new appointmentType_service_1.AppointmentTypeService();
const appointmentTypeCtr = new appointmentType_controller_1.AppointmentTypesController(appointmetnTypeSrv);
const appointmentTypeRoutes = express_1.Router();
appointmentTypeRoutes.get('', userValidation_middleware_1.default.validation, (req, res) => appointmentTypeCtr.getAll(req, res));
exports.default = appointmentTypeRoutes;
