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
const patientProblem_1 = require("../../models/patientProblem");
const jsonResp_1 = require("../../models/jsonResp");
const patientProblem_service_1 = __importDefault(require("../../services/patientProblem.service"));
const http_status_1 = __importDefault(require("http-status"));
const jsonResp_2 = __importDefault(require("../../models/jsonResp"));
class PatientProblemController {
    save(patientProblem) {
        return new Promise((resolve, reject) => {
            try {
                const errorDetail = new jsonResp_1.ErrorDetail();
                const newPatientPromblem = new patientProblem_1.PatientProblem({
                    name: patientProblem.name,
                    description: patientProblem.description,
                });
                newPatientPromblem.save({}, (error, patientProblemSaved) => {
                    if (error) {
                        errorDetail.name = 'Error al guardar problema de paciente';
                        errorDetail.description = error;
                        reject(errorDetail);
                    }
                    else {
                        resolve(patientProblemSaved);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    findAll() {
        return new Promise((resolve, reject) => {
            try {
                const errorDetail = new jsonResp_1.ErrorDetail();
                patientProblem_1.PatientProblem.find({ isEnabled: true }, (error, patientProblemList) => {
                    if (error) {
                        errorDetail.name = 'error al cargar lista de problemas de paciente';
                        errorDetail.description = error;
                        reject(error);
                    }
                    else {
                        resolve(patientProblemList);
                    }
                }).sort({ name: 1 });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const patientProblemSrv = new patientProblem_service_1.default();
            const idPatientProblem = req.params.id;
            try {
                return res.status(http_status_1.default.ACCEPTED).send(new jsonResp_2.default(true, 'Problema de paciente eliminado correctamente', yield patientProblemSrv.delete(idPatientProblem)));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_2.default(false, 'Error en la base de datos al eliminar problema de pacientes', error));
            }
        });
    }
}
exports.default = PatientProblemController;
