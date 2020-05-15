"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.PaymentDetailSchema = new mongoose_1.default.Schema({
    appointment: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: [true, 'Debe ingresar a aque cita pertenece']
    },
    paymentMethod: {
        type: String,
        required: [true, 'Debe ingresar un metodo de pago']
    },
    operationCode: {
        type: String
    },
    value: {
        type: Number,
        required: [true, 'Es necesario que se ingrese el avalor pagado']
    },
    bankAccount: {
        type: String
    },
    registerDate: {
        type: Date,
        required: [true, 'Debe ingresar la fehca en la que se realizó el pago']
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Se debe ingresar el usuario que registra el metodo de pago']
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
    }
}, { collection: 'paymentDetails' });
exports.PaymentDetail = mongoose_1.default.model('PaymentDetail', exports.PaymentDetailSchema);
