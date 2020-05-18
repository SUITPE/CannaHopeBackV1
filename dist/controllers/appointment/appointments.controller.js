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
const appointmentStatus_service_1 = require("../../services/appointmentStatus.service");
const moment = require('moment-timezone');
class AppointmentController {
    constructor() {
    }
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
    updateStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointmentStatusSrv = new appointmentStatus_service_1.AppointmentStatusService();
            const appointmentSrv = new appointment_service_1.AppointmentService();
            const data = req.body;
            try {
                const appointment = yield appointmentSrv.findById(data.idAppointment);
                const appointemntStatusList = yield appointmentStatusSrv.findAll();
                const founded = appointemntStatusList.find(item => item.name === data.status);
                if (appointment.paymentStatus === 'PENDIENTE') {
                    const errorDetail = {
                        name: `No se puede confirmar asistencia de consulta si aún está pendiente de pago.`,
                        description: null
                    };
                    throw errorDetail;
                }
                if (appointment.status === data.status) {
                    const errorDetail = {
                        name: `La consulta ya se encuentra  ${data.status}`,
                        description: null
                    };
                    throw errorDetail;
                }
                if (!founded) {
                    const errorDetail = {
                        name: 'El estatus enviado no corresponde a ninguno registrado en la base de datos',
                        description: null
                    };
                    throw errorDetail;
                }
                else {
                    const updated = yield appointmentSrv.updateStatus(data.idAppointment, data.status);
                }
                return res.status(http_status_1.default.ACCEPTED).send(new jsonResp_1.default(true, 'Consulta actualizada correctamente'));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error al actualizar consulta medica', null, error));
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointmentSrv = new appointment_service_1.AppointmentService();
            const idAppointment = req.params.id;
            try {
                return res.status(http_status_1.default.ACCEPTED).send(new jsonResp_1.default(true, 'Consulta actualizada correctamente', yield appointmentSrv.findById(idAppointment)));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error al obtener consulta por id', null, error));
            }
        });
    }
}
exports.AppointmentController = AppointmentController;
AppointmentController.appointmentSrv = new appointment_service_1.AppointmentService();
