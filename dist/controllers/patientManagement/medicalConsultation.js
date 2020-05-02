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
const jsonResp_1 = require("../../models/jsonResp");
const patientsController_1 = __importDefault(require("../patients/patientsController"));
const medicalDiagnosticController_1 = require("./medicalDiagnosticController");
const medicalTreatment_1 = __importDefault(require("./medicalTreatment"));
class MedicalConsultationController {
    save(medicalConsultation) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const errorDetail = new jsonResp_1.ErrorDetail();
            const medicalEvaluationCtr = new medicalEvaluation_1.default();
            const physicalExamCtr = new physicalExamController_1.default();
            const patientCtr = new patientsController_1.default();
            const medicalDiagnosticCtr = new medicalDiagnosticController_1.MedicalDiagnosticController();
            const medicalTreatmentCtr = new medicalTreatment_1.default();
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
                    createDate: medicalConsultation.createDate,
                    consultationReason: medicalConsultation.consultationReason
                });
                const medicalConsultationSaved = yield newMedicalConsultation.save();
                const newMedicalEvaluation = medicalConsultation.medicalEvaluation;
                newMedicalEvaluation.patient = medicalConsultation.patient;
                newMedicalEvaluation.doctor = medicalConsultation.doctor;
                newMedicalEvaluation.createDate = medicalConsultation.createDate;
                const newPhysicalExam = medicalConsultation.physicalExam;
                newPhysicalExam.patient = medicalConsultation.patient;
                newPhysicalExam.doctor = medicalConsultation.doctor;
                newPhysicalExam.createDate = medicalConsultation.createDate;
                const newMedicalDiagnostic = medicalConsultation.medicalDiagnostic;
                newMedicalDiagnostic.patient = medicalConsultation.patient;
                newMedicalDiagnostic.doctor = medicalConsultation.doctor;
                newMedicalDiagnostic.createDate = medicalConsultation.createDate;
                medicalConsultation.medicalDiagnostic.disease.forEach((item, i) => __awaiter(this, void 0, void 0, function* () {
                    const medicalTreatment = new Object();
                    medicalTreatment.patient = medicalConsultation.patient;
                    medicalTreatment.doctor = medicalConsultation.doctor;
                    medicalTreatment.disease = item.name;
                    medicalTreatment.description = item.description;
                    medicalTreatment.createDate = medicalConsultation.createDate;
                    medicalTreatment.viaAdministracion = medicalConsultation.medicalDiagnostic.medicalTreatment.viaAdministracion;
                    medicalTreatment.ratio = medicalConsultation.medicalDiagnostic.medicalTreatment.ratio;
                    medicalTreatment.concentracion = medicalConsultation.medicalDiagnostic.medicalTreatment.concentracion;
                    const medicalTreatmentSaved = yield medicalTreatmentCtr.save(medicalTreatment);
                }));
                const medicalEvaluationSaved = yield medicalEvaluationCtr.save(newMedicalEvaluation);
                const medicalDiagnostic = yield medicalDiagnosticCtr.save(newMedicalDiagnostic);
                const appointmentUpdated = yield patientCtr.updateAppointmentNumber(medicalConsultation.patient);
                resolve(medicalConsultationSaved);
            }
            catch (error) {
                errorDetail.name = 'Error la guardar registro de consulta';
                errorDetail.description = error;
                reject(errorDetail);
            }
        }));
    }
    findByPatientId(idPatient) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const medicalCOnsultations = yield medicalConsultation_1.MedicalConsultation.find({ patient: idPatient });
                resolve(medicalCOnsultations);
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error al consultar consultas medicas registradas',
                    description: error
                };
                reject(errorDetail);
            }
        }));
    }
}
exports.default = MedicalConsultationController;
