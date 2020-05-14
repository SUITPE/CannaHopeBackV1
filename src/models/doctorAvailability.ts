import mongoose from 'mongoose';


export interface DoctorAvailabilityModel extends mongoose.Document {
    doctor: string;
    timeSet: string;
    duartion: number;
    isEnabled: boolean;
}
