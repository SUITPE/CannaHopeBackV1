"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const medicalTreatment_1 = require("../../models/medicalTreatment");
class MedicalTreatmentController {
    save(medicalTreatment) {
        return new Promise((resolve, reject) => {
            try {
                const newMedicalTreatment = new medicalTreatment_1.MedicalTreatment({
                    patient: medicalTreatment.patient,
                    doctor: medicalTreatment.doctor,
                    disease: medicalTreatment.disease,
                    description: medicalTreatment.description,
                    createDate: medicalTreatment.createDate,
                    viaAdministracion: medicalTreatment.viaAdministracion,
                    ratio: medicalTreatment.ratio,
                    concentracion: medicalTreatment.concentracion,
                });
                newMedicalTreatment.save({}, (error, medicalTeatment) => {
                    if (error) {
                        const errorDetail = {
                            name: 'Error al guardar tratamiento de paciente',
                            description: error
                        };
                        reject(error);
                    }
                    else {
                        resolve(medicalTeatment);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.default = MedicalTreatmentController;
