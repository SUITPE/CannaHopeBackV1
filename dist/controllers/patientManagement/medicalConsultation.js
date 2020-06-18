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
const consultationAdminiton_service_1 = require("../../services/consultationAdminiton.service");
const http_status_1 = __importDefault(require("http-status"));
const jsonResp_2 = __importDefault(require("../../models/jsonResp"));
const medicalConsultation_service_1 = __importDefault(require("../../services/medicalConsultation.service"));
const appointment_service_1 = require("../../services/appointment.service");
class MedicalConsultationController {
    constructor() {
        this.consultationAdmitionSrv = new consultationAdminiton_service_1.ConsultationAdmitionService();
    }
    save(medicalConsultation) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const errorDetail = new jsonResp_1.ErrorDetail();
            const medicalEvaluationCtr = new medicalEvaluation_1.default();
            const physicalExamCtr = new physicalExamController_1.default();
            const patientCtr = new patientsController_1.default();
            const medicalDiagnosticCtr = new medicalDiagnosticController_1.MedicalDiagnosticController();
            const medicalTreatmentCtr = new medicalTreatment_1.default();
            const appointmentSrv = new appointment_service_1.AppointmentService();
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
                    consultationReason: medicalConsultation.consultationReason,
                    recomendations: medicalConsultation.recomendations
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
                yield medicalEvaluationCtr.save(newMedicalEvaluation);
                yield medicalDiagnosticCtr.save(newMedicalDiagnostic);
                yield patientCtr.updateAppointmentNumber(medicalConsultation.patient);
                // Udpate consultation admition  admition to false
                yield this.consultationAdmitionSrv.updateIsEnabled(medicalConsultation.medicalEvaluation.clinicalExamination._id, false);
                appointmentSrv.updateStatus(medicalConsultation.idAppointment, 'ATENDIDA');
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
                const medicalCOnsultations = yield medicalConsultation_1.MedicalConsultation.find({ patient: idPatient })
                    .populate({
                    path: 'doctor',
                    select: 'names surenames'
                });
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
    findById(idMedicalConsultation) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const medicalConsultation = yield medicalConsultation_1.MedicalConsultation.findById(idMedicalConsultation);
                resolve(medicalConsultation);
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error en la base de datos al consultar consulta medica registrada por id',
                    description: error
                };
                reject(errorDetail);
            }
        }));
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                return res.status(http_status_1.default.ACCEPTED).send(new jsonResp_2.default(true, 'Consulta medica por id cargada exitosamente', yield MedicalConsultationController.medicalConsultationSrv.findById(id)));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_2.default(false, 'Error al cargar consulta medica por id', error));
            }
        });
    }
    updateReevaluation(reevaluations, idMedicalCOnsultation) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updated = yield medicalConsultation_1.MedicalConsultation.updateOne({ _id: idMedicalCOnsultation }, { reevaluations });
                resolve(true);
            }
            catch (error) {
                const errorDetail = {
                    name: 'Error al acutalizar reevaluacion medica de consulta',
                    description: error
                };
                reject(errorDetail);
            }
        }));
    }
}
exports.default = MedicalConsultationController;
MedicalConsultationController.medicalConsultationSrv = new medicalConsultation_service_1.default();
