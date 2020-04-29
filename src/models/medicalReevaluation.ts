import mongoose from 'mongoose';


export interface MedicalReevaluationModel extends mongoose.Document {
    medicalConsultation: string;
    description: string;
    createDate: Date;
}

export const MedicalReevaluationSchema = new mongoose.Schema({
    MedicalReevaluationModel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicalConsultation',
        required: [true, 'Debe describir a que consulta pertenece']
    },
    description: {
        type: String,
        required: [true, 'Es obligatoria una descripción']
    },
    createDate: {
        type: Date,
        default: new Date()
    }
});

export const MedicalReevaluation = mongoose.model<MedicalReevaluationModel>('MedicalReevaluation', MedicalReevaluationSchema);