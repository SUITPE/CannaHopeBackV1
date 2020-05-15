import mongoose from 'mongoose';

export interface IPaymentDetail extends mongoose.Document {
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
