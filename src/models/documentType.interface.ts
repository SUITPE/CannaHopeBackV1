import mongoose from 'mongoose';


export interface DocumentTypeModel extends mongoose.Document {
    name: string;
    description: string;
    isEnabled: boolean;
}