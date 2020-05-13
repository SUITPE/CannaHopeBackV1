"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.DoctorAvailabilitySchema = new mongoose_1.default.Schema({
    doctor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Debe asignar un medico a la disponibilidad']
    },
    timeSet: {
        type: String,
        required: [true, 'Debe asginar una hora de atención']
    },
    duaration: {
        type: Number,
        default: 30
    },
    isEnabled: {
        type: Boolean,
        default: true
    }
}, { collection: 'DoctorAvailabilities' });
exports.DoctorAvailability = mongoose_1.default.model('DoctorAvailability', exports.DoctorAvailabilitySchema);
