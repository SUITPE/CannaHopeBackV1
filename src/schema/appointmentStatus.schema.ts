import mongoose from 'mongoose';


export interface AppointmentStatusInterface extends mongoose.Document {
    name: string,
    description: string
}

export const appointmentStatusSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String
    }
}, {collection: 'appointmentStatus'});

export const AppointmentStatus = mongoose.model<AppointmentStatusInterface>('AppointmentStatus', appointmentStatusSchema);
