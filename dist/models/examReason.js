"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamReason = exports.ExamReasonSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.ExamReasonSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        minlength: [2, 'deben ser minimo dos caracteres como nombre en motivo de exámenes'],
        required: [true, 'El nombre del motivo de exámenes es requerido'],
    },
    description: {
        type: String,
        minlength: [2, 'deben ser minimo dos caracteres como descripción en motivo de exámenes'],
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
exports.ExamReason = mongoose_1.default.model('ExamReason', exports.ExamReasonSchema);
