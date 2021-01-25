import mongoose from 'mongoose';
import Rol from './role';

export interface PatientAuxiliaryModel extends mongoose.Document   {
    patient: string;
    registerDate: string;
    username: string;
    examDate: string;
    examReason: string;
    file: string;
}

export const PatientAuxiliarySchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'Debe registrar un paciente con antecentes patologicos']
    },
    registerDate: {
        type: Date,
        default: new Date(),
    },
    username: {
        type: String,
        required: [true, 'No se ha ingresado nombre de usuario'],
        minlength: [3, 'Debe ser un minimo de 5 caracterespara el nombre']
    },
    examDate: {
        type: Date,
        default: null
    },
    examReason: {
        type: String,
    },
    file: {
        type: String,
        default: null
    }
});

const PatientAuxiliary = mongoose.model<PatientAuxiliaryModel>('PatientAuxiliary', PatientAuxiliarySchema);

export default PatientAuxiliary;