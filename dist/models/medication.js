"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Medication = exports.MedicationSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.MedicationSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        minlength: [2, 'deben ser minimo dos caracteres como medications'],
        required: [true, 'El nombre del medications es requerido'],
    },
    description: {
        type: String,
        minlength: [2, 'deben ser minimo dos caracteres como descripción en medications'],
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
exports.Medication = mongoose_1.default.model('Medication', exports.MedicationSchema);
