import mongoose from 'mongoose';
import { IPaymentDetail } from '../models/paymentDetail.interface';


export const PaymentDetailSchema  = new mongoose.Schema({
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Se debe ingresar el usuario que registra el metodo de pago']
    },
    createdAt: {
        type: Date,
        required: [true, 'Es obligatorio ingresar la fecha de registro']
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedDate: {
        type: Date
    }
}, {collection: 'paymentDetails'})

export const PaymentDetail = mongoose.model<IPaymentDetail>('PaymentDetail', PaymentDetailSchema);