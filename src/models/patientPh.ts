import mongoose from 'mongoose';
import Disease, { DiseaseSchema } from './disease';
import HarmfulHabit, { HarmfulHabitsSchema } from './harmfulHabits';
import { HarmfulHabitModel } from './harmfulHabits';
import { DiseaseModel } from './disease';
import { FamilyPphModel } from './familyPph';


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
}

export const PphSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'Debe registrar un paciente con antecentes patologicos'],
        unique: [true, 'Ya se han registrado antecedentes patologicos para este paciente anteriormente']
    },
    diseaseList: {
        type: [DiseaseSchema],
        required: [true, 'Debe registrar las enfermedades del paciente']
    },
    harmfulHabitsList: {
        type:[HarmfulHabitsSchema],
        required: [true, 'debe registrar los habitos nocivos del paciente']
    },
    familyPph: {
        type: Object(),
        required: [true, 'Debe asignar un historial patologico de familia al paciente']
    },
    description: {
        type: String,
        minlength: [2, 'La descripcion debe tener como minimo dos caracteres']
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
    }
});

const PatientPh = mongoose.model<PatientPhModel>('PatientPh', PphSchema)
export default PatientPh;