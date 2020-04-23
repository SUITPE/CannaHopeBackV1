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
// PatientPathologicalHistory controller
class PatientPhController {
    constructor() {
        this.errorDetail = new jsonResp_1.ErrorDetail();
    }
    save(patientPh) {
        return new Promise((resolve, reject) => {
            try {
                const newPatientPh = new patientPh_1.default({
                    patient: patientPh.patient,
                    diseaseList: patientPh.diseaseList,
                    description: patientPh.description,
                    createdBy: patientPh.createdBy,
                    harmfulHabitsList: patientPh.harmfulHabitsList,
                    familyPph: patientPh.familyPph
                });
                newPatientPh.save({}, (error, patientPhSaved) => {
                    if (error) {
                        this.errorDetail.name = 'Error al registrar Historial patologico de paciente';
                        this.errorDetail.description = error;
                        reject(this.errorDetail);
                    }
                    else {
                        resolve(patientPhSaved);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    findAndUpdate(patientPh) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    patientPh_1.default.updateOne({ _id: patientPh._id }, patientPh, (error, patientPhSaved) => __awaiter(this, void 0, void 0, function* () {
                        if (error) {
                            this.errorDetail.name = 'Error en la base de datos al actualizar historial patologico de paciente';
                            this.errorDetail.description = error;
                            reject(error);
                        }
                        else {
                            const patientUpdated = yield this.findBypatientId(patientPh.patient);
                            resolve(patientUpdated);
                        }
                    }));
                }
                catch (error) {
                    reject(error);
                }
            });
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
