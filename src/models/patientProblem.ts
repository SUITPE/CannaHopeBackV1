import mongoose from 'mongoose';

export interface PatientProblemModel extends mongoose.Document {
    name: string;
    description: string;
    value: boolean;
    isEnabled: boolean;
}

export const PatientProblemSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [2, 'deben ser minimo dos caracteres como nombre en problema de paciente'],
        required: [true, 'El nombre del problema de paciente es requerido'],
    },
    description: {
        type: String,
        minlength: [2, 'deben ser minimo dos caracteres como descripción en problema de paciente'],
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

export const PatientProblem = mongoose.model<PatientProblemModel>('PatientProblem', PatientProblemSchema);