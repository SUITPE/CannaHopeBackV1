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
    constructor(appointmentSrv, appointmentStatusSrv) {
        this.appointmentSrv = appointmentSrv;
        this.appointmentStatusSrv = appointmentStatusSrv;
    }
    registerAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                return res.status(http_status_1.default.CREATED).send(new jsonResp_1.default(true, 'Consulta medica registrada correctamente', yield this.appointmentSrv.save(newAppointment)));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error al regsitrar cita', error));
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validated = yield this.validateAppointmentsData();
                const appointmentList = yield this.appointmentSrv.findAll();
                return res.status(http_status_1.default.OK).send(new jsonResp_1.default(true, 'Lista de citas consutlas cargadas correctamente', appointmentList));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error al cargar citas registradas', error));
            }
        });
    }
    updateStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const appointment = yield this.appointmentSrv.findById(data.idAppointment);
                const appointemntStatusList = yield this.appointmentStatusSrv.findAll();
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
                    const updated = yield this.appointmentSrv.updateStatus(data.idAppointment, data.status);
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
            const idAppointment = req.params.id;
            try {
                return res.status(http_status_1.default.ACCEPTED).send(new jsonResp_1.default(true, 'Consulta actualizada correctamente', yield this.appointmentSrv.findById(idAppointment)));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error al obtener consulta por id', null, error));
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointmentData = req.body;
            const user = req.params.user;
            try {
                const updated = yield this.appointmentSrv.update(appointmentData._id, yield setProperties());
                const appointment = yield this.appointmentSrv.findById(appointmentData._id);
                return res.status(http_status_1.default.CREATED).send(new jsonResp_1.default(true, 'Consulta actualizada correctamente', appointment));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error al actualizar consulta medica', null, error));
            }
            function setProperties() {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        appointmentData.updatedBy = user._id;
                        appointmentData.updatedDate = varEnvironments_1.environments.currentDate();
                        return appointmentData;
                    }
                    catch (error) {
                        const errorDetail = {
                            name: 'Error al mapear información de consulta para insertar a la base de datos',
                            description: error
                        };
                        throw errorDetail;
                    }
                });
            }
        });
    }
    getDoctorAppointments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idDoctor = req.params.id;
            try {
                const dateToday = moment(varEnvironments_1.environments.currentDate()).format(`YYYY-MM-DD`);
                const finalDate = moment(dateToday).format(`YYYY-MM-DD HH:mm:ss`);
                const appointments = yield this.appointmentSrv.findByDateAndDoctor(idDoctor, new Date(finalDate));
                return res.status(http_status_1.default.ACCEPTED).send(new jsonResp_1.default(true, appointments.length > 0 ? `Consultas por doctor cargadas correctamente` : `No hay consultas registradas con el doctor y la fecha indicados`, appointments));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, `Error al cargar consultas registradas para doctor`, null, error));
            }
        });
    }
    validateAppointmentsData() {
        return __awaiter(this, void 0, void 0, function* () {
            const appointmentSrv = new appointment_service_1.AppointmentService();
            try {
                const appointmnentList = yield appointmentSrv.findAll();
                const currentDate = new Date(varEnvironments_1.environments.currentDate());
                for (const appointment of appointmnentList) {
                    try {
                        if (appointment.status !== 'VENCIDA') {
                            const appointmentDate = moment(moment(appointment.date).format('YYYY-MM-DD') + ' ' + appointment.doctorAvailability.timeFrom).format('YYYY-MM-DD HH:mm:ss');
                            if (moment(new Date(appointmentDate)).diff(currentDate, 'minutes') < 0) {
                                const updated = yield appointmentSrv.updateStatus(appointment._id, 'VENCIDA');
                            }
                        }
                    }
                    catch (error) {
                        throw error;
                    }
                }
                return true;
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error al validar datos de vencimiento de fecha',
                    description: error
                };
                throw errorDetail;
            }
        });
    }
    getByIdDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(http_status_1.default.ACCEPTED).send(new jsonResp_1.default(false, 'Consultas por doctor cargadas correctamente', yield this.appointmentSrv.findByDoctor(req.params.id)));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, `Error al cargar consultas registradas por doctor establecido`, null, error));
            }
        });
    }
    cancelAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(http_status_1.default.ACCEPTED).send(new jsonResp_1.default(true, 'Consulta eliminada correctamente', yield this.appointmentSrv.deleteById(req.params.id)));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error al cancelar consulta medica', null, error));
            }
        });
    }
}
exports.AppointmentController = AppointmentController;
