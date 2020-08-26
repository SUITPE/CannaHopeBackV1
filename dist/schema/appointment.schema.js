"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = exports.AppointmentSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.AppointmentSchema = new mongoose_1.default.Schema({
    patient: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'Debe asignar un paciente a la consulta']
    },
    doctor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Debe asignar un doctor a la consulta']
    },
    date: {
        type: Date,
        required: [true, 'Debe ingresar la fecha de consulta'],
    },
    specialty: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'MedialSpeciality',
    },
    patientProblem: {
        type: String,
        required: [true, 'Es necesario ingresar el problema que presenta el paciente'],
    },
    doctorAvailability: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'DoctorAvailability',
        required: [true, ' Debe ingresar en que franja de atencion de registra la consulta']
    },
    paymentStatus: {
        type: String,
        required: [true, 'Debe ingresar el estado de pago actual de la consulta']
    },
    paymentData: {
        type: Object
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Se debe ingresar el usuario que registra la consulta']
    },
    createdAt: {
        type: Date,
        required: [true, 'Es obligatorio ingresar la fecha de registro']
    },
    updatedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedDate: {
        type: Date
    },
    status: {
        type: String,
        default: 'POR ATENDER'
    },
    dateString: {
        type: String
    },
    type: {
        type: String,
        required: [true, 'Debe ingresar un tipo de consulta']
    }
}, { collection: 'appointments' });
exports.Appointment = mongoose_1.default.model('Appointment', exports.AppointmentSchema);
