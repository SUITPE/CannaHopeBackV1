import mongoose from 'mongoose';

export interface AppointmentTypeModel extends mongoose.Document {
    name: string;
    description: string;
    enabled: true;
}