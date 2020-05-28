"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.MedicalReevaluationSchema = new mongoose_1.default.Schema({
    medicalConsultation: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'MedicalConsultation',
        required: [true, 'Debe describir a que consulta pertenece']
    },
    description: {
        type: String,
        required: [true, 'Es obligatoria una descripción']
    },
    createDate: {
        type: Date,
        default: new Date()
    },
    treatment: {
        type: [],
        default: []
    },
    painScale: {
        type: String
    }
});
exports.MedicalReevaluation = mongoose_1.default.model('MedicalReevaluation', exports.MedicalReevaluationSchema);
