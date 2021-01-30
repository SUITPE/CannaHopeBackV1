"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.PatientSchema = new mongoose_1.default.Schema({
    reasonAdmission: {
        type: String,
        required: [true, 'De ingresar la razon de registro y admision de pasiente']
    },
    numberOfAppointment: {
        type: Number,
        default: 0
    },
    patientStatus: {
        type: String,
        default: 'active'
        //  'inactive'
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, 'Debe ingresar un Id de usuario'],
        unique: true,
        ref: 'User'
    },
    responsibleName: {
        type: String,
        required: [true, 'No se ha asignado un nombre de usuario'],
        minlength: [3, 'debe ser un minimo de 5 caracteres parael nombre']
    },
    responsiblePhone: {
        type: Number,
        required: [true, 'Debe agregar un telefonoo movil de usuario'],
    },
    responsibleEmail: {
        type: String,
        required: [true, 'Debe ingresar un email del usuario']
    },
    responsibleComment: {
        type: String
    }
});
const Patient = mongoose_1.default.model('Patient', exports.PatientSchema);
exports.default = Patient;
