"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PatientHarmfulHabitSchema = new mongoose_1.default.Schema({
    patient: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'De asignar un paciente']
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'De asignar un usuario']
    },
    harmfulHabit: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'HarmfulHabit',
        required: [true, 'Debe asignar un habito nocibo']
    },
    createDate: {
        type: Date,
        default: new Date()
    },
    isEnabled: {
        type: Boolean,
        default: true
    }
});
const PatientHarmfulHabit = mongoose_1.default.model('PatientHarmfulHabit', PatientHarmfulHabitSchema);
exports.default = PatientHarmfulHabit;
