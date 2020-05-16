import mongoose from 'mongoose';


export interface IAppointment extends mongoose.Document {
    patient: string;
    doctor: string;
    date: Date;
    specialty: string;
    patientProblem: string;
    doctorAvailability: any;
    paymentStatus: string;
    paymentData: [];
    createdBy: string
    createdAt: Date;
    updatedBy: string;
    updatedDate: Date
}