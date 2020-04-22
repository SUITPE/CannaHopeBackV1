import mongoose from 'mongoose';

export interface DiseaseModel extends mongoose.Document {
    name: string;
    description: string;
    isEnabled: boolean;
    createdDate: string;
}


export const DiseaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isEnabled: {
        type: Boolean,
        default: true
    },
    createdDate: {
        type: Date,
        default: new Date()
    },
});

const Disease = mongoose.model<DiseaseModel>('Disease', DiseaseSchema)
export default Disease