"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientProblem = exports.PatientProblemSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.PatientProblemSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        minlength: [2, 'deben ser minimo dos caracteres como nombre en problema de paciente'],
        required: [true, 'El nombre del problema de paciente es requerido'],
    },
    description: {
        type: String,
        minlength: [2, 'deben ser minimo dos caracteres como descripción en problema de paciente'],
    },
    value: {
        type: Boolean,
        default: false
    },
    isEnabled: {
        type: Boolean,
        default: true
    }
});
exports.PatientProblem = mongoose_1.default.model('PatientProblem', exports.PatientProblemSchema);
