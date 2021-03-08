"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorAvailability = exports.DoctorAvailabilitySchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.DoctorAvailabilitySchema = new mongoose_1.default.Schema({
    doctor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Debe asignar un medico a la disponibilidad']
    },
    timeTo: {
        type: String,
        required: [true, 'Debe ingresar el tiempo donde inicia']
    },
    timeFrom: {
        type: String,
        required: [true, 'Debe ingresar el timepo de finalización']
    },
    isEnabled: {
        type: Boolean,
        default: true
    }
}, { collection: 'doctorAvailabilities' });
exports.DoctorAvailability = mongoose_1.default.model('DoctorAvailability', exports.DoctorAvailabilitySchema);
