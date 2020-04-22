import mongoose from 'mongoose';

// famili patient pathological history
export interface FamilyPphModel extends mongoose.Document {
    patient: string;
    createdBy: string;
    createDate: string;
    father: string;
    mother: string;
    spouse: string;
    children: string;
    siblings: string;
    isEnabled: boolean;
}


const FamilyPphSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
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
    father: {
        type: String,
        default: 'no'
    },
    mother:{
        type: String,
        default: 'no'
    },
    spouse: {
        type: String,
        default: 'no'
    },
    children: {
        type: String,
        default: 'no'
    },
    siblings: {
        type: String,
        default: 'no'
    },
    isEnabled:{
        type: Boolean,
        default: true
    }
})

const FamilyPph = mongoose.model<FamilyPphModel>('FamilyPph', FamilyPphSchema);
export default FamilyPph