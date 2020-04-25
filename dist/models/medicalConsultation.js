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
        required: [true, 'Es obligatorio ingresar el doctor que hace el examen medico']
    },
    patientProblems: {
        type: new Array(),
        required: [true, 'Debe ingresar un listado de problemas actuales del paciente'],
    },
    medicalEvaluation: {
        type: Object,
        required: [true, 'Debe ingresar una valuacion medica de paciente']
    },
    physicalExam: {
        type: Object,
        required: 'Debe ingresar un examen medico formulado del paciente'
    },
    complementaryExams: {
        type: String,
        default: 'ninguno'
    },
    medicalDiagnostic: {
        type: String,
        required: [true, 'Es obligatorio ingresar in diagnostico medico del paciente']
    },
    patientStory: {
        type: String,
        required: [true, 'Es obligatorio ingresar el relato del pacientes']
    },
    createDate: {
        type: Date,
        required: [true, 'Debe ingresar una fecha de registro']
    }
});
exports.MedicalConsultation = mongoose_1.default.model('MedicalConsultation', exports.MedicalConsultationSchema);
