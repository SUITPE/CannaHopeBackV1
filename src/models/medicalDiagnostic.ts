import mongoose from 'mongoose';
import { DiseaseModel } from './disease';
import {  MedicalTreatmentModel } from './medicalTreatment';

export interface MedicalDiagnosticModel extends mongoose.Document {
    patient: string;
    doctor: string;
    disease: DiseaseModel[];
    description: string;
    createDate: Date;
    medicalTreatment: MedicalTreatmentModel[];
}

export const MedicalDiagnosticSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'Debe asignar un paciente al examen medico']
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: [true, 'El doctor que atiende la cita es requerido']
    },
    disease: {
        type: Array,
        required: [true, 'Debe ingresar la lista completa de enfermedades en el diagnostico']
    },
    description: {
        type: String,
        required: [true, 'Debe ingresar una descripcion del diagnostico']
    },
    createDate: {
        type: Date,
        required: [true, 'Debe ingresar la fecha de registro']
    },
    medicalTreatment: {
        type: [],
        required: [true, ' Debe ingresar el tratamiento que se le ha asignado al cliente']
    }
});

export const MedicalDiagnostic = mongoose.model<MedicalDiagnosticModel>('MedicalDiagnostic', MedicalDiagnosticSchema);