import mongoose from 'mongoose';


export interface IDoctorAvailability extends mongoose.Document {
    doctor: string;
    timeSet: number;
    duartion: number;
}


