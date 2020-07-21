"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userValidation_middleware_1 = __importDefault(require("../middlewares/userValidation.middleware"));
const appointementStatus_controller_1 = require("../controllers/appointment/appointementStatus.controller");
const appointemnetStatusCtr = new appointementStatus_controller_1.AppointmentStatusController();
const appointmentStatusRoutes = express_1.Router();
appointmentStatusRoutes.get('', userValidation_middleware_1.default.validation, (req, res) => appointemnetStatusCtr.getAll(req, res));
exports.default = appointmentStatusRoutes;
