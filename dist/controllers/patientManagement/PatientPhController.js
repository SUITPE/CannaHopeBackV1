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
const patientPh_1 = __importDefault(require("../../models/patientPh"));
const jsonResp_1 = require("../../models/jsonResp");
const patientPh_service_1 = require("../../services/patientPh.service");
const varEnvironments_1 = require("../../environments/varEnvironments");
const jsonResp_2 = __importDefault(require("../../models/jsonResp"));
const http_status_1 = __importDefault(require("http-status"));
// PatientPathologicalHistory controller
class PatientPhController {
    constructor(patientPhSrv = new patientPh_service_1.PatientPhService()) {
        this.patientPhSrv = patientPhSrv;
        this.errorDetail = new jsonResp_1.ErrorDetail();
    }
    save(req, res) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const patientPh = req.body;
            const user = req.user;
            try {
                // const dataValidated: boolean = await validatePatientPhData();
                const newPatientPh = yield mapPatientPhData();
                const patientPhSaved = yield this.patientPhSrv.save(newPatientPh);
                resolve(res.status(http_status_1.default.CREATED).send(new jsonResp_2.default(true, 'Historial patologico registrado exitosamene', patientPhSaved)));
            }
            catch (error) {
                res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_2.default(false, 'Error al registrar historial patologico de paciente', error));
            }
            function validatePatientPhData() {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        if (patientPh.diseaseList.length === 0) {
                            throw new Error('Error en validacion - no se ha registrado una lista de antecendeces patologicos');
                        }
                        if (!patientPh.harmfulHabitsList || patientPh.harmfulHabitsList.length === 0) {
                            throw new Error('Error en validacion - no se ha registrado una lista de habitos nocivos');
                        }
                        return true;
                    }
                    catch (error) {
                        const errorDetail = {
                            name: 'Error en validacion de datos',
                            description: error
                        };
                        throw errorDetail;
                    }
                });
            }
            function mapPatientPhData() {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const newPatientPh = new patientPh_1.default({
                            patient: patientPh.patient,
                            diseaseList: patientPh.diseaseList,
                            description: patientPh.description,
                            createdBy: user._id,
                            createDate: varEnvironments_1.environments.currentDate(),
                            harmfulHabitsList: patientPh.harmfulHabitsList,
                            familyPph: patientPh.familyPph,
                            currentMedication: patientPh.currentMedication,
                            surgeries: patientPh.surgeries,
                            fur: patientPh.fur,
                            pregnancies: patientPh.pregnancies,
                            poisonings: patientPh.poisonings,
                            hospitalizations: patientPh.hospitalizations
                        });
                        return newPatientPh;
                    }
                    catch (error) {
                        const errorDetail = {
                            name: 'Error al estructurar información de historial patologico para ser guardado',
                            description: error
                        };
                        throw errorDetail;
                    }
                });
            }
        }));
    }
    findAndUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const patientPh = req.body;
            const user = req.user;
            try {
                const newPatiemtPh = yield mapPatientPhData();
                const updated = yield this.patientPhSrv.update(newPatiemtPh);
                const patientPhResp = yield this.patientPhSrv.findById(patientPh._id);
                return res.status(http_status_1.default.CREATED).send(new jsonResp_2.default(true, 'Historia patologico registrado correctamente', patientPhResp));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_2.default(false, 'Error al actualizar datos de historial patologico', null, error));
            }
            function mapPatientPhData() {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const newPatientPh = new patientPh_1.default({
                            _id: patientPh._id,
                            patient: patientPh.patient,
                            diseaseList: patientPh.diseaseList,
                            description: patientPh.description,
                            updateDate: varEnvironments_1.environments.currentDate(),
                            updatedBy: user._id,
                            harmfulHabitsList: patientPh.harmfulHabitsList,
                            familyPph: patientPh.familyPph,
                            currentMedication: patientPh.currentMedication,
                            surgeries: patientPh.surgeries,
                            fu: patientPh.fu,
                            pregnancies: patientPh.pregnancies,
                            poisonings: patientPh.poisonings,
                            hospitalizations: patientPh.hospitalizations
                        });
                        return newPatientPh;
                    }
                    catch (error) {
                        const errorDetail = {
                            name: 'Error en validacion de datos - mapeo de información de paciente',
                            description: error
                        };
                        throw (errorDetail);
                    }
                });
            }
            // return new Promise((resolve, reject) => {
            //     try {
            //         PatientPh.updateOne({ _id: patientPh._id }, patientPh, async (error, patientPhSaved) => {
            //             if (error) {
            //                 this.errorDetail.name = 'Error en la base de datos al actualizar historial patologico de paciente';
            //                 this.errorDetail.description = error;
            //                 reject(error);
            //             } else {
            //                 const patientUpdated: PatientPhModel = await this.findBypatientId(patientPh.patient);
            //                 resolve(patientUpdated);
            //             }
            //         });
            //     } catch (error) {
            //         reject(error);
            //     }
            // });
        });
    }
    findBypatientId(idPatient) {
        return new Promise((resolve, reject) => {
            try {
                patientPh_1.default.findOne({ patient: idPatient })
                    .populate({
                    path: 'createdBy',
                    select: 'names surenames email mobilePhone'
                })
                    .exec((error, patientFounded) => {
                    if (error) {
                        this.errorDetail.name = 'Error en la base de datos al cargar registro patologico por id de paciente';
                        this.errorDetail.description = error;
                        reject(this.errorDetail);
                    }
                    else {
                        resolve(patientFounded);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.PatientPhController = PatientPhController;
