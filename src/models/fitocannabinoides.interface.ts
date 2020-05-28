import mongoose from 'mongoose';


export interface FitocannabinoidesModel extends mongoose.Document {
    name: string;
    description: string;
    enabled: boolean;
}