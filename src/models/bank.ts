import mongoose from 'mongoose';

export interface BankModel extends mongoose.Document {
    name: string;
    description: string;
    value: boolean;
    isEnabled: boolean;
}

export const BankSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [2, 'deben ser minimo dos caracteres como nombre en banca'],
        required: [true, 'El nombre del banca es requerido'],
    },
    description: {
        type: String,
        minlength: [2, 'deben ser minimo dos caracteres como descripción en banka'],
    },
    value: {
        type: Boolean,
        default: false
    },
    isEnabled: {
        type: Boolean,
        default: true
    }
})

export const Bank = mongoose.model<BankModel>('Bank', BankSchema);