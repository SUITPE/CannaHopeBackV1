"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const patientProblem_1 = require("../../models/patientProblem");
const jsonResp_1 = require("../../models/jsonResp");
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
                patientProblem_1.PatientProblem.find({}, (error, patientProblemList) => {
                    if (error) {
                        errorDetail.name = 'error al cargar lista de problemas de paciente';
                        errorDetail.description = error;
                        reject(error);
                    }
                    else {
                        resolve(patientProblemList);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.default = PatientProblemController;
