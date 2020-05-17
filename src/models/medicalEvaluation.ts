import mongoose from 'mongoose';



export interface MedicalEvaluationModel extends mongoose.Document {
    patient: string;
    doctor: string;
    anamnesis: string;
    clinicalExamination: ClinicalExamination;
    ectoscopy: string;
    mentalStatus: string;
    createDate: Date;
}

export interface ClinicalExamination {
    _id: string;
    talla: string,
    peso: string;
    perimetroAbdominal: string;
}

export const MedicalEvaluationSchema = new mongoose.Schema({
    anamnesis: {
        type: String,
        required: [true, 'Debe ingresar la anamnesis']
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'Debe asignar un paciente al examen medico']
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: [true, 'Es oblifatorio ingresar el doctor que hace el examen medico']
    },
    clinicalExamination: {
        type: Object,
    },
    ectoscopy:{
        type: String,
    },
    mentalStatus:{
        type: String,
    },
    createDate: {
        type: Date,
        required: [true, 'Debe ingresar una fecha de registro']
    }
});

export const MedicalEvaluation = mongoose.model<MedicalEvaluationModel>('MedicalEvaluation', MedicalEvaluationSchema);