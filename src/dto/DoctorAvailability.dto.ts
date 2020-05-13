import mongoose from 'mongoose';



export interface DoctorAvailabilityCreateDto extends mongoose.Document {
    doctor: any;
    timeSet: number;
    duartion: number;
}

