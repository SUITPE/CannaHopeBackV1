"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientAuxiliarySchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.PatientAuxiliarySchema = new mongoose_1.default.Schema({
    patient: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'Debe registrar un paciente con antecentes patologicos']
    },
    registerDate: {
        type: Date,
        default: new Date(),
    },
    username: {
        type: String,
        required: [true, 'No se ha ingresado nombre de usuario'],
        minlength: [3, 'Debe ser un minimo de 5 caracterespara el nombre']
    },
    examDate: {
        type: Date,
        default: null
    },
    examReason: {
        type: String,
    },
    file: {
        type: String,
        default: null
    }
});
const PatientAuxiliary = mongoose_1.default.model('PatientAuxiliary', exports.PatientAuxiliarySchema);
exports.default = PatientAuxiliary;
