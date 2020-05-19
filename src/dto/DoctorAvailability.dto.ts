import mongoose from 'mongoose';

export interface DoctorAvailabilityCreateDto extends mongoose.Document {
    doctor: any;
    timeTo: string;
    timeFrom: number;
}

export interface GetCurrentDoctorAvailabilityDto {
    idDoctor: string;
    date: string;
}
