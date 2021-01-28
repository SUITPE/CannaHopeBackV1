"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.PphSchema = new mongoose_1.default.Schema({
    patient: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'Debe registrar un paciente con antecentes patologicos'],
        unique: [true, 'Ya se han registrado antecedentes patologicos para este paciente anteriormente']
    },
    diseaseList: {
        type: [],
        required: [true, 'Debe registrar las enfermedades del paciente']
    },
    harmfulHabitsList: {
        type: [],
        required: [true, 'debe registrar los habitos nocivos del paciente']
    },
    familyPph: {
        type: Object,
        required: [true, 'Debe asignar un historial patologico de familia al paciente']
    },
    description: {
        type: String
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createDate: {
        type: Date,
        default: new Date()
    },
    updateDate: {
        type: Date
    },
    updatedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    isEnabled: {
        type: Boolean,
        default: true
    },
    currentMedication: {
        type: []
    },
    surgeries: {
        type: String,
        default: 'Sin registrar'
    },
    fur: {
        type: String,
        default: 'Sin registrar'
    },
    pregnancies: {
        type: String,
        default: 'Sin registrar'
    },
    poisonings: {
        type: String,
        default: 'Sin registrar'
    },
    hospitalizations: {
        type: String,
        default: 'Sin registrar'
    },
    healthyHabits: {
        type: Array
    }
});
const PatientPh = mongoose_1.default.model('PatientPh', exports.PphSchema);
exports.default = PatientPh;
