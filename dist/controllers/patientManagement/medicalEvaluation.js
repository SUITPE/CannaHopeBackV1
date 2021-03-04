"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const medicalEvaluation_1 = require("../../models/medicalEvaluation");
class MedicalEvaluationController {
    constructor() { }
    save(medialEvaluation) {
        return new Promise((resolve, reject) => {
            try {
                const newMedicalEvaluation = new medicalEvaluation_1.MedicalEvaluation({
                    patient: medialEvaluation.patient,
                    doctor: medialEvaluation.doctor,
                    anamnesis: medialEvaluation.anamnesis,
                    clinicalExamination: medialEvaluation.clinicalExamination,
                    ectoscopy: medialEvaluation.ectoscopy,
                    mentalStatus: medialEvaluation.mentalStatus,
                    createDate: medialEvaluation.createDate,
                    painScale: medialEvaluation.painScale,
                    solicitudeScale: medialEvaluation.solicitudeScale,
                    blesseDementiaScale: medialEvaluation.blesseDementiaScale,
                    anxietyScale: medialEvaluation.anxietyScale,
                    depressionScale: medialEvaluation.depressionScale,
                    edmontonScale: medialEvaluation.edmontonScale,
                    seizuresQuantity: medialEvaluation.seizuresQuantity,
                    seizuresFrequency: medialEvaluation.seizuresQuantity,
                    comment: medialEvaluation.seizuresQuantity
                });
                newMedicalEvaluation.save({}, (error, medicalEvaluationSaved) => {
                    if (error) {
                        const errorDetail = {
                            name: 'Error en registro de evaluacion medica',
                            description: error
                        };
                        reject(errorDetail);
                    }
                    else {
                        resolve(medicalEvaluationSaved);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.default = MedicalEvaluationController;
