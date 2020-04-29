"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.MedicalTreatmentSchema = new mongoose_1.default.Schema({
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
    disease: {
        type: String,
        required: [true, 'Debe ingresar la lista completa de enfermedades en el diagnostico']
    },
    description: {
        type: String,
        required: [true, 'Debe ingresar una descripcion del diagnostico']
    },
    createDate: {
        type: Date,
        required: [true, 'Debe ingresar la fecha de registro']
    },
    viaAdministracion: {
        type: String,
        required: true
    },
    ratio: {
        type: String,
        required: true
    },
    concentracion: {
        type: String,
        required: true
    }
});
exports.MedicalTreatment = mongoose_1.default.model('MedicalTreatment', exports.MedicalTreatmentSchema);
