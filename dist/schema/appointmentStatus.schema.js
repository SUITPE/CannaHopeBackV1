"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentStatus = exports.appointmentStatusSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.appointmentStatusSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
    },
    description: {
        type: String
    }
}, { collection: 'appointmentStatus' });
exports.AppointmentStatus = mongoose_1.default.model('AppointmentStatus', exports.appointmentStatusSchema);
