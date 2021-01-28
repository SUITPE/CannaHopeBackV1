"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PhysicalExam_1 = require("../../models/PhysicalExam");
class PhysicalExamController {
    save(physicalExam) {
        return new Promise((resolve, reject) => {
            try {
                const newPhysicalExam = new PhysicalExam_1.PhysicalExam({
                    patient: physicalExam.patient,
                    doctor: physicalExam.doctor,
                    generalSummary: physicalExam.generalSummary,
                    visionAnalysis: physicalExam.visionAnalysis
                });
                newPhysicalExam.save({}, (error, physicalExamSaved) => {
                    if (error) {
                        const errorDetail = {
                            name: 'Error al guardar examen fisico de paciente en la base de datos',
                            description: error
                        };
                        reject(errorDetail);
                    }
                    else {
                        resolve(physicalExamSaved);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    findByPatientId(idPatient) {
        return new Promise((resolve, reject) => {
            try {
                PhysicalExam_1.PhysicalExam.find({ patient: idPatient }, (error, physicalExamsList) => {
                    if (error) {
                        const errorDetail = {
                            name: 'Error en la base de datos al consultar lista de examenes medicos por paciente',
                            description: error
                        };
                        reject(errorDetail);
                    }
                    else {
                        resolve(physicalExamsList);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.default = PhysicalExamController;
