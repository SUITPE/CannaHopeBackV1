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
const jsonResp_1 = __importDefault(require("../../models/jsonResp"));
const http_status_1 = __importDefault(require("http-status"));
const patient_service_1 = __importDefault(require("../../services/patient.service"));
class PatientController {
    constructor() { }
    insert(patient) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userCtr = new userController_1.default();
                const userSaved = yield userCtr.save(patient);
                const newPatient = new patient_1.default({
                    reasonAdmission: patient.reasonAdmission,
                    numberOfAppointment: 0,
                    patientStatus: null,
                    user: userSaved._id
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
            patient_1.default.find()
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
            patient_1.default.countDocuments({ patientStatus: 'active' }, (err, total) => {
                resolve(total);
            });
        });
    }
    findByParams(searchParams) {
        return new Promise((resolve, reject) => {
            const regex = new RegExp(searchParams, 'i');
            try {
                patient_1.default.find()
                    .populate({
                    match: {
                        names: regex
                    },
                    path: 'user',
                    select: 'image _id names surenames  mobilePhone document email',
                    populate: {
                        path: 'rol',
                        select: 'description name'
                    }
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
                    resolve(patients);
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
                return res.status(http_status_1.default.ACCEPTED).send(new jsonResp_1.default(true, 'Paciente actualizado correctamente', patientUpdated));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error en la base de datos al editar paciente', error));
            }
        });
    }
}
exports.default = PatientController;
