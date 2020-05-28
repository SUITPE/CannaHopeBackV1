"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointments_controller_1 = require("../controllers/appointment/appointments.controller");
const userValidation_middleware_1 = __importDefault(require("../middlewares/userValidation.middleware"));
const appointment_service_1 = require("../services/appointment.service");
const appointmentStatus_service_1 = require("../services/appointmentStatus.service");
const payment_controller_1 = require("../controllers/appointment/payment.controller");
const payment_service_1 = require("../services/payment.service");
const appointmentsRoutes = express_1.Router();
const appointmentCtr = new appointments_controller_1.AppointmentController(new appointment_service_1.AppointmentService(), new appointmentStatus_service_1.AppointmentStatusService(), new payment_service_1.PaymentService());
const paymentCtr = new payment_controller_1.PaymentController(new payment_service_1.PaymentService(), new appointment_service_1.AppointmentService());
appointmentsRoutes.post('/save', userValidation_middleware_1.default.validation, (req, res) => appointmentCtr.registerAppointment(req, res));
appointmentsRoutes.get('/getAll', userValidation_middleware_1.default.validation, (req, res) => appointmentCtr.getAll(req, res));
appointmentsRoutes.post('/updateStatus', userValidation_middleware_1.default.validation, (req, res) => appointmentCtr.updateStatus(req, res));
appointmentsRoutes.get('/getById/:id', userValidation_middleware_1.default.validation, (req, res) => appointmentCtr.getById(req, res));
appointmentsRoutes.put('/update', userValidation_middleware_1.default.validation, (req, res) => appointmentCtr.update(req, res));
appointmentsRoutes.get('/getTodayByIdDoctor/:id', userValidation_middleware_1.default.validation, (req, res) => appointmentCtr.getDoctorAppointments(req, res));
appointmentsRoutes.get('/getByIdDoctor/:id', userValidation_middleware_1.default.validation, (req, res) => appointmentCtr.getByIdDoctor(req, res));
appointmentsRoutes.delete('/delete/:id', userValidation_middleware_1.default.validation, (req, res) => appointmentCtr.cancelAppointment(req, res));
// Payments
appointmentsRoutes.post('/payment/save', userValidation_middleware_1.default.validation, (req, res) => paymentCtr.registerPayment(req, res));
appointmentsRoutes.get('/getAppointmentsToday', userValidation_middleware_1.default.validation, (req, res) => appointmentCtr.getTodayAppointments(req, res));
exports.default = appointmentsRoutes;
