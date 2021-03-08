"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalSpeciality = exports.MedicalSpecialitySchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.MedicalSpecialitySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Debe ingresar el nombre de la especialidad']
    },
    description: {
        type: String,
        required: [true, 'Hay que ingresar una descripción']
    },
    idEnabled: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Debe ingresar quien registra la especialidad medica']
    },
    updatedAt: {
        type: Date,
        default: null
    },
    updatedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, { collection: 'medicalSpecialties' });
exports.MedicalSpeciality = mongoose_1.default.model('MedialSpeciality', exports.MedicalSpecialitySchema);
