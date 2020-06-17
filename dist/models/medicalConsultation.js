"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.MedicalConsultationSchema = new mongoose_1.default.Schema({
    patient: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'Debe asignar un paciente al examen medico']
    },
    doctor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El doctor que atiende la cita es requerido']
    },
    patientProblems: {
        type: [],
        required: [true, 'Debe especificar la lista de problemas del paciente']
    },
    medicalEvaluation: {
        type: Object,
        required: [true, 'Debe ingresar una valuacion medica de paciente']
    },
    physicalExam: {
        type: Object,
    },
    complementaryExams: {
        type: [],
        default: 'ninguno'
    },
    medicalDiagnostic: {
        type: Object,
        required: [true, 'Debe relacionarse un diagnostico medico a esta consulta']
    },
    patientStory: {
        type: String,
        required: [true, 'Es obligatorio ingresar el relato del pacientes']
    },
    createDate: {
        type: Date,
        required: [true, 'Debe ingresar una fecha de registro']
    },
    reevaluations: {
        type: [],
        default: []
    },
    consultationReason: {
        type: String,
    },
    recomendations: {
        type: String
    }
});
exports.MedicalConsultation = mongoose_1.default.model('MedicalConsultation', exports.MedicalConsultationSchema);
