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
const medicalConsultation_1 = require("../../models/medicalConsultation");
const medicalEvaluation_1 = __importDefault(require("./medicalEvaluation"));
const physicalExamController_1 = __importDefault(require("./physicalExamController"));
const patientsController_1 = __importDefault(require("../patients/patientsController"));
class MedicalConsultationController {
    save(medicalConsultation) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const medicalEvaluationCtr = new medicalEvaluation_1.default();
            const physicalExamCtr = new physicalExamController_1.default();
            const patientCtr = new patientsController_1.default();
            try {
                const newMedicalConsultation = new medicalConsultation_1.MedicalConsultation({
                    patient: medicalConsultation.patient,
                    doctor: medicalConsultation.doctor,
                    patientProblems: medicalConsultation.patientProblems,
                    medicalEvaluation: medicalConsultation.medicalEvaluation,
                    physicalExam: medicalConsultation.physicalExam,
                    complementaryExams: medicalConsultation.complementaryExams,
                    medicalDiagnostic: medicalConsultation.medicalDiagnostic,
                    patientStory: medicalConsultation.patientStory,
                    createDate: medicalConsultation.createDate
                });
                let medicaltConsultationSaved = new Object();
                newMedicalConsultation.save({}, (error, medicaltConsultation) => {
                    if (error) {
                        const errorDetail = {
                            name: 'Error al guardar atencion de consulta de paciente',
                            description: error
                        };
                        reject(errorDetail);
                    }
                    else {
                        medicaltConsultationSaved = medicaltConsultation;
                    }
                });
                const newMedicalEvaluation = medicalConsultation.medicalEvaluation;
                newMedicalEvaluation.patient = medicalConsultation.patient;
                newMedicalEvaluation.doctor = medicalConsultation.doctor;
                newMedicalEvaluation.createDate = medicalConsultation.createDate;
                const medicalEvaluationSaved = yield medicalEvaluationCtr.save(newMedicalEvaluation);
                const newPhysicalExam = medicalConsultation.physicalExam;
                newPhysicalExam.patient = medicalConsultation.patient;
                newPhysicalExam.doctor = medicalConsultation.doctor;
                newPhysicalExam.createDate = medicalConsultation.createDate;
                const physicalExamSaved = yield physicalExamCtr.save(newPhysicalExam);
                const appointmentUpdated = yield patientCtr.updateAppointmentNumber(medicalConsultation.patient);
                resolve(medicaltConsultationSaved);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
}
exports.default = MedicalConsultationController;
