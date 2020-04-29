"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const medicalReevaluation_1 = require("../../models/medicalReevaluation");
class MedicalReevaluationController {
    save(medicalReevaluation) {
        return new Promise((resolve, reject) => {
            try {
                const newMedicalReevaluation = new medicalReevaluation_1.MedicalReevaluation({
                    medicalConsultation: medicalReevaluation.medicalConsultation,
                    description: medicalReevaluation.description,
                    createDate: medicalReevaluation.createDate
                });
                newMedicalReevaluation.save({}, (error, medicalRevaluiationSaved) => {
                    if (error) {
                        const errorDetail = {
                            name: 'Error al guardar reevaluacion medica',
                            description: error
                        };
                        reject(errorDetail);
                    }
                    else {
                        resolve(medicalRevaluiationSaved);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.default = MedicalReevaluationController;
