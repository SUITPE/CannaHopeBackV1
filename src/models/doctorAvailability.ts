import mongoose from 'mongoose';


export interface DoctorAvailabilityModel extends mongoose.Document {
    doctor: string;
    timeSet: number;
    duartion: number;
    isEnabled: boolean;
}
