import mongoose from 'mongoose';
import { IAppointment } from './appointment.interface';
import { UserModel } from './user';

export interface PaymentDataModel extends mongoose.Document {
    appointment: string;
    paymentMethod: string;
    operationCode: string;
    value: number;
    bankAccount: string;
    registerDate: string
    createdBy: string
    createdAt: Date;
    updatedBy: string
    updatedDate: Date;
}


export interface PaymentData  {
    appointment: IAppointment;
    paymentMethod: string;
    operationCode: string;
    value: number;
    bankAccount: string;
    registerDate: string
    createdBy: UserModel
    createdAt: Date;
    updatedBy: UserModel
    updatedDate: Date;
}