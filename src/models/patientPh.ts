import mongoose from 'mongoose';
import { HarmfulHabitModel } from './harmfulHabits';
import { DiseaseModel } from './disease';
import { FamilyPphModel } from './familyPph';
import { CurrentMedication } from './currentMedication.interface';


// PatientPathologicalHistoryModel
export interface PatientPhModel extends mongoose.Document {
    patient: string;
    diseaseList: DiseaseModel[];
    description: string;
    createdBy: string;
    createDate: string;
    updateDate: string;
    updatedBy: string;
    harmfulHabitsList: HarmfulHabitModel[];
    familyPph: FamilyPphModel;
    currentMedication: CurrentMedication;
    surgeries: string;
    fu: string;
    pregnancies: string;
    poisonings: string;
    hospitalizations: string;
    healthyHabits: any[];
}

export const PphSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'Debe registrar un paciente con antecentes patologicos'],
        unique: [true, 'Ya se han registrado antecedentes patologicos para este paciente anteriormente']
    },
    diseaseList: {
        type: [],
        required: [true, 'Debe registrar las enfermedades del paciente']
    },
    harmfulHabitsList: {
        type:[],
        required: [true, 'debe registrar los habitos nocivos del paciente']
    },
    familyPph: {
        type: Object,
        required: [true, 'Debe asignar un historial patologico de familia al paciente']
    },
    description: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createDate: {
        type: Date,
        default: new Date()
    },
    updateDate:  {
        type: Date
    },
    updatedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    isEnabled: {
        type: Boolean,
        default: true
    },
    currentMedication: {
        type: []
    },
    surgeries: {
        type: String,
        default: 'Sin registrar'
    },
    fur: {
        type: String,
        default: 'Sin registrar'
    },
    pregnancies: {
        type: String,
        default: 'Sin registrar'
    },
    poisonings: {
        type: String,
        default: 'Sin registrar'
    },
    hospitalizations: {
        type: String,
        default: 'Sin registrar'
    },
    healthyHabits: {
        type: Array
    }
});

const PatientPh = mongoose.model<PatientPhModel>('PatientPh', PphSchema)
export default PatientPh;