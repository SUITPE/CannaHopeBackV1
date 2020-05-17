"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const jsonResp_1 = __importDefault(require("../../models/jsonResp"));
const appointment_service_1 = require("../../services/appointment.service");
const appointment_schema_1 = require("../../schema/appointment.schema");
const varEnvironments_1 = require("../../environments/varEnvironments");
const moment = require('moment-timezone');
class AppointmentController {
    constructor() { }
    registerAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointmentSrv = new appointment_service_1.AppointmentService();
            const appointment = req.body;
            const user = req.user;
            try {
                const newAppointment = new appointment_schema_1.Appointment({
                    patient: appointment.patient,
                    doctor: appointment.doctor,
                    date: appointment.date,
                    specialty: appointment.specialty,
                    patientProblem: appointment.patientProblem,
                    doctorAvailability: appointment.doctorAvailability,
                    paymentStatus: appointment.paymentStatus,
                    paymentData: appointment.paymentData,
                    createdBy: user._id,
                    createdAt: varEnvironments_1.environments.currentDate(),
                    status: appointment.paymentStatus === 'PAGADO' ? 'POR ATENDER' : 'PENDIENTE DE PAGO'
                });
                return res.status(http_status_1.default.CREATED).send(new jsonResp_1.default(true, 'Consulta medica registrada correctamente', yield appointmentSrv.save(newAppointment)));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error al regsitrar cita', error));
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(http_status_1.default.OK).send(new jsonResp_1.default(true, 'Lista de citas consutlas cargadas correctamente', yield AppointmentController.appointmentSrv.findAll()));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error al cargar citas registradas', error));
            }
        });
    }
}
exports.AppointmentController = AppointmentController;
AppointmentController.appointmentSrv = new appointment_service_1.AppointmentService();
