import mongoose from 'mongoose';


// PatientPathologicalHistoryModel
export interface PatientPhModel extends mongoose.Document {
    patient: string;
    disease: string;
    description: string;
    createdBy: string;
    createDate: string;
    updateDate: string;
    updatedBy: string;
}

export const PphSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    disease: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disease',
        required: true
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
        required: true
    },
    isEnabled: {
        type: Boolean,
        default: true
    }
});

const PatientPh = mongoose.model<PatientPhModel>('PatientPh', PphSchema)
export default PatientPh;