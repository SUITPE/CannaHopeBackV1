import mongoose from 'mongoose';


export interface MedicalSpecialityModel extends mongoose.Document {
    name: string;
    description: string;
    idEnabled: boolean,
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
}
