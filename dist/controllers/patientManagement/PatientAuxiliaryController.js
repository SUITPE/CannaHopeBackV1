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
const patientAuxiliary_1 = __importDefault(require("../../models/patientAuxiliary"));
const jsonResp_1 = require("../../models/jsonResp");
const patientAuxiliary_service_1 = __importDefault(require("../../services/patientAuxiliary.service"));
const jsonResp_2 = __importDefault(require("../../models/jsonResp"));
const http_status_1 = __importDefault(require("http-status"));
// PatientPathologicalHistory controller
class PatientAuxiliaryController {
    constructor(patientAuxiliarySrv = new patientAuxiliary_service_1.default()) {
        this.patientAuxiliarySrv = patientAuxiliarySrv;
        this.errorDetail = new jsonResp_1.ErrorDetail();
    }
    save(req, res) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const patientAuxiliary = req.body;
            try {
                const newPatientAuxiliary = yield mapPatientAuxiliaryData();
                const patientAuxiliarySaved = yield this.patientAuxiliarySrv.save(newPatientAuxiliary);
                resolve(res.status(http_status_1.default.CREATED).send(new jsonResp_2.default(true, 'Exámenes auxiliares e informes registrado exitosamene', patientAuxiliarySaved)));
            }
            catch (error) {
                res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_2.default(false, 'Error al registrar exámenes auxiliares e informes', error));
            }
            function mapPatientAuxiliaryData() {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const newPatientAuxiliary = new patientAuxiliary_1.default({
                            patient: patientAuxiliary.patient,
                            registerDate: patientAuxiliary.registerDate,
                            username: patientAuxiliary.username,
                            examDate: patientAuxiliary.examDate,
                            examReason: patientAuxiliary.examReason,
                            file: patientAuxiliary.file
                        });
                        return newPatientAuxiliary;
                    }
                    catch (error) {
                        const errorDetail = {
                            name: 'Error al estructurar exámenes auxiliares e informes para ser guardado',
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
            const patientAuxiliary = req.body;
            try {
                const newPatientAuxiliary = yield mapPatientAuxiliaryData();
                const oldPatientAuxiliary = yield this.patientAuxiliarySrv.getByIdPatient(patientAuxiliary.patient);
                if (oldPatientAuxiliary.length == 0) {
                    const patientAuxiliarySaved = yield this.patientAuxiliarySrv.save(newPatientAuxiliary);
                    return res.status(http_status_1.default.CREATED).send(new jsonResp_2.default(true, 'Exámenes auxiliares e informes registrado correctamente', patientAuxiliarySaved));
                }
                const patientAuxiliaryResp = yield this.patientAuxiliarySrv.update(patientAuxiliary);
                return res.status(http_status_1.default.CREATED).send(new jsonResp_2.default(true, 'Exámenes auxiliares e informes registrado correctamente', patientAuxiliaryResp));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_2.default(false, 'Error al actualizar datos de exámenes auxiliares e informes', null, error));
            }
            function mapPatientAuxiliaryData() {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const newPatientAuxiliary = new patientAuxiliary_1.default({
                            _id: patientAuxiliary._id,
                            patient: patientAuxiliary.patient,
                            registerDate: patientAuxiliary.registerDate,
                            username: patientAuxiliary.username,
                            examDate: patientAuxiliary.examDate,
                            examReason: patientAuxiliary.examReason,
                            file: patientAuxiliary.file
                        });
                        return newPatientAuxiliary;
                    }
                    catch (error) {
                        const errorDetail = {
                            name: 'Error en validacion de datos - mapeo de exámenes auxiliares e informes',
                            description: error
                        };
                        throw (errorDetail);
                    }
                });
            }
        });
    }
    findByPatientId(idPatient) {
        return new Promise((resolve, reject) => {
            try {
                patientAuxiliary_1.default.find({ patient: idPatient })
                    .populate({
                    path: 'createdBy',
                    select: 'names surenames email mobilePhone'
                })
                    .exec((error, patientFounded) => {
                    if (error) {
                        this.errorDetail.name = 'Error en la base de datos al cargar registro exámenes auxiliares e informes por id de paciente';
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
exports.PatientAuxiliaryController = PatientAuxiliaryController;
