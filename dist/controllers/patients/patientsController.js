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
const patient_1 = __importDefault(require("../../models/patient"));
const userController_1 = __importDefault(require("../user/userController"));
const user_1 = __importDefault(require("../../models/user"));
const jsonResp_1 = require("../../models/jsonResp");
const jsonResp_2 = __importDefault(require("../../models/jsonResp"));
const http_status_1 = __importDefault(require("http-status"));
const patient_service_1 = __importDefault(require("../../services/patient.service"));
const appointment_service_1 = require("../../services/appointment.service");
const medicalConsultation_service_1 = __importDefault(require("../../services/medicalConsultation.service"));
const moment_1 = __importDefault(require("moment"));
class PatientController {
    constructor() {
    }
    insert(patient) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userCtr = new userController_1.default();
                const userSaved = yield userCtr.save(patient);
                const newPatient = new patient_1.default({
                    reasonAdmission: patient.reasonAdmission,
                    numberOfAppointment: 0,
                    patientStatus: null,
                    user: userSaved._id,
                    responsibleName: patient.responsibleName,
                    responsiblePhone: patient.responsiblePhone,
                    responsibleEmail: patient.responsibleEmail,
                    responsibleComment: patient.responsibleComment
                });
                newPatient.save({}, (error, patientSaved) => __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        const erroDetail = {
                            name: 'Error al guardar paciente',
                            description: error
                        };
                        reject(error);
                    }
                    const patiendRes = yield this.findById(patientSaved.id);
                    resolve(patiendRes);
                }));
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    findById(idPatient) {
        return new Promise((resolve, reject) => {
            try {
                patient_1.default.findById(idPatient)
                    .populate({
                    path: 'user',
                    select: '-password',
                    populate: [
                        {
                            path: 'rol ',
                            select: 'description',
                        },
                        {
                            path: 'createdBy ',
                            select: 'nickName',
                        },
                    ]
                })
                    .exec((error, patient) => {
                    if (error) {
                        const errorDetail = {
                            name: `Error cargar paciente con id ${idPatient}`,
                            description: error
                        };
                        reject(errorDetail);
                    }
                    resolve(patient);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    getAll(from, limit) {
        return new Promise((resolve, reject) => {
            patient_1.default.find({ patientStatus: { $ne: 'inactive' } })
                .populate({
                path: 'user',
                select: 'image _id names surenames  mobilePhone document email sex',
                populate: {
                    path: 'rol',
                    select: 'description'
                }
            })
                .skip(from)
                .limit(limit)
                .exec((error, patients) => {
                if (error) {
                    const errorDetail = {
                        name: `Error al cargar pacienttes`,
                        description: error
                    };
                    reject(errorDetail);
                }
                resolve(patients);
            });
        });
    }
    getTotalRegistered() {
        return new Promise((resolve, reject) => {
            patient_1.default.countDocuments({}, (err, total) => {
                resolve(total);
            });
        });
    }
    findByParams(searchParams) {
        return new Promise((resolve, reject) => {
            const regex = new RegExp(searchParams, 'i');
            try {
                patient_1.default.find({ patientStatus: { $ne: 'inactive' } })
                    .populate({
                    path: 'user',
                    select: 'image _id names surenames  mobilePhone document email sex',
                    populate: {
                        path: 'rol',
                        select: 'description name'
                    },
                })
                    .exec((error, patients) => {
                    if (error) {
                        const errorDetail = {
                            name: 'Error al consultar pacientes por parametro establecido',
                            description: error
                        };
                        reject(error);
                    }
                    if (patients.length > 0) {
                        patients = patients.filter(patient => patient.user !== null);
                    }
                    const param = searchParams.toUpperCase();
                    const founded = patients.filter(patient => patient.user.names.toUpperCase().includes(param) || patient.user.surenames.toUpperCase().includes(param));
                    resolve(founded);
                });
            }
            catch (error) {
                reject(JSON.stringify(error));
            }
        });
    }
    updateAppointmentNumber(idPatient) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const patient = yield patient_1.default.findById(idPatient);
                const patientUpdated = yield patient_1.default.updateOne({ _id: idPatient }, { numberOfAppointment: patient.numberOfAppointment + 1 });
                resolve(true);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    updatePatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const patietnSrv = new patient_service_1.default();
            const userCtr = new userController_1.default();
            const patient = req.body;
            try {
                if (patient.image) {
                    patient.image = yield userCtr.setUserImage(patient.image, patient);
                }
                const patientUpdated = yield patietnSrv.update(patient);
                return res.status(http_status_1.default.ACCEPTED).send(new jsonResp_2.default(true, 'Paciente actualizado correctamente', patientUpdated));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_2.default(false, 'Error en la base de datos al editar paciente', error));
            }
        });
    }
    delete(idPatient) {
        return new Promise((resolve, reject) => {
            try {
                patient_1.default.updateOne({ _id: idPatient }, { patientStatus: 'inactive' })
                    .exec((error, patient) => {
                    if (error) {
                        const errorDetail = {
                            name: `Error al eliminar paciente con id ${idPatient} `,
                            description: error
                        };
                        reject(errorDetail);
                    }
                    resolve(patient);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    getPatientsNotEvaluated(idDoctor) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const appointmentSrv = new appointment_service_1.AppointmentService();
            const date30ago = moment_1.default().add(-30, 'd').format(`YYYY-MM-DD`);
            try {
                user_1.default.findById(idDoctor)
                    .populate('rol', 'name description')
                    .populate('createdBy', 'names surenames nickName')
                    .exec((error, user) => __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        const errorDetail = {
                            name: `Error al cargar usuario con id ${idDoctor}`,
                            description: error
                        };
                        throw jsonResp_1.ErrorDetail;
                    }
                    const appointmentsRegistered = yield appointmentSrv.findPatientsNotEvaluated(idDoctor, date30ago, user.rol.name);
                    const medicalConsulationSrv = new medicalConsultation_service_1.default();
                    let patientsNotEvaluated = [];
                    for (const appointment of appointmentsRegistered) {
                        let founded = yield medicalConsulationSrv.findByPatientId(appointment.patient._id);
                        if (founded.length > 0) {
                            let founded = patientsNotEvaluated.findIndex(patient => patient._id == appointment.patient._id);
                            if (founded == -1) {
                                patientsNotEvaluated.push(appointment.patient);
                            }
                        }
                    }
                    resolve(patientsNotEvaluated);
                }));
            }
            catch (error) {
                resolve(error);
            }
        }));
    }
}
exports.default = PatientController;
