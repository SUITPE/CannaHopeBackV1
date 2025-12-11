"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.PhysicalExamSchema = new mongoose_1.default.Schema({
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
    generalSummary: {
        type: [],
        required: [true, 'Debe agregar un listado de sustemas del cuerpo examinados']
    },
    visionAnalysis: {
        type: Object,
        required: [true, 'Debe ingresar uin detalle de examen visual']
    },
    createDate: {
        type: Date,
        default: new Date()
    }
});
exports.PhysicalExam = mongoose_1.default.model('MedicalExam', exports.PhysicalExamSchema);
