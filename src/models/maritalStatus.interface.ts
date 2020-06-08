import mongoose from 'mongoose';
export interface MaritalStatusModel extends mongoose.Document {
    name: string;
    description: string;
    enabled: boolean;
}