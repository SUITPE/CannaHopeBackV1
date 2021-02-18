import mongoose from 'mongoose';
import { PatientModel } from './patient';

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
    updatedDate: Date,
    status: string;
    dateString: string;
    type: string;
}

export interface EAppointment extends mongoose.Document {
    patient: any;
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
    updatedDate: Date,
    status: string;
    dateString: string;
    type: string;
}