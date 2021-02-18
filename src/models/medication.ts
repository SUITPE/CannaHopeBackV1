import mongoose from 'mongoose';

export interface MedicationModel extends mongoose.Document {
    name: string;
    description: string;
    value: boolean;
    isEnabled: boolean;
}

export const MedicationSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [2, 'deben ser minimo dos caracteres como medications'],
        required: [true, 'El nombre del medications es requerido'],
    },
    description: {
        type: String,
        minlength: [2, 'deben ser minimo dos caracteres como descripción en medications'],
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

export const Medication = mongoose.model<MedicationModel>('Medication', MedicationSchema);