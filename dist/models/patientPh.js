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
        required: true
    },
    disease: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Disease',
        required: true
    },
    description: {
        type: String,
        minlength: [2, 'La descripcion debe tener como minimo dos caracteres']
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
        required: true
    },
    isEnabled: {
        type: Boolean,
        default: true
    }
});
const PatientPh = mongoose_1.default.model('PatientPh', exports.PphSchema);
exports.default = PatientPh;
