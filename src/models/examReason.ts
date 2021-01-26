import mongoose from 'mongoose';

export interface ExamReasonModel extends mongoose.Document {
    name: string;
    description: string;
    value: boolean;
    isEnabled: boolean;
}

export const ExamReasonSchema = new mongoose.Schema({
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
})

export const ExamReason = mongoose.model<ExamReasonModel>('ExamReason', ExamReasonSchema);