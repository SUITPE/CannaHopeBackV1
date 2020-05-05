import mongoose from 'mongoose';

export interface PatientHarmfulHabitModal extends mongoose.Document {
    patient: string,
    createdBy: string,
    harmfulHabit: string;
    createDate: string;
    isEnabled: boolean
}

const PatientHarmfulHabitSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'De asignar un paciente']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'De asignar un usuario']
    },
    harmfulHabit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HarmfulHabit',
        required: [true, 'Debe asignar un habito nocibo']
    },
    createDate: {
        type: Date,
        default: new Date()
    },
    isEnabled: {
        type: Boolean,
        default: true
    }
})

const PatientHarmfulHabit = mongoose.model<PatientHarmfulHabitModal>('PatientHarmfulHabit', PatientHarmfulHabitSchema);
export default PatientHarmfulHabit;