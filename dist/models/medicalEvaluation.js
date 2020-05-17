"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.MedicalEvaluationSchema = new mongoose_1.default.Schema({
    anamnesis: {
        type: String,
        required: [true, 'Debe ingresar la anamnesis']
    },
    patient: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'Debe asignar un paciente al examen medico']
    },
    doctor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Es oblifatorio ingresar el doctor que hace el examen medico']
    },
    clinicalExamination: {
        type: Object,
    },
    ectoscopy: {
        type: String,
    },
    mentalStatus: {
        type: String,
    },
    createDate: {
        type: Date,
        required: [true, 'Debe ingresar una fecha de registro']
    }
});
exports.MedicalEvaluation = mongoose_1.default.model('MedicalEvaluation', exports.MedicalEvaluationSchema);
