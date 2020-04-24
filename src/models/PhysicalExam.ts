import mongoose from 'mongoose';
import { BodySystemModel, VisionAnalysis, BodySystemSchema } from './bodySystem';



export interface PhysicalExam extends mongoose.Document {
    patient: string;
    doctor: string;
    generalSummary: BodySystemModel[];
    visionAnalysis: VisionAnalysis;
    createDate: Date;
}

export const PhysicalExamSchema = new mongoose.Schema({
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
    generalSummary: {
        type: [BodySystemSchema],
        ref: 'BodySystem',
        required: [true, 'Debe agregar un listado de sustemas del cuerpo examinados']
    },
    visionAnalysis: {
        visionAnalysis: Object,
        required: [true, 'Debe ingresar uin detalle de examen visual']
    },
    createDate: {
        type: Date,
        default: new Date()
    }

});

export const MedicalExam = mongoose.model<PhysicalExam>('MedicalExam', PhysicalExamSchema);