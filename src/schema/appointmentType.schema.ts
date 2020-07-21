import mongoose from 'mongoose';
import { AppointmentTypeModel } from '../models/appointmenttype.model';

export const AppointmentTypeSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    enabled: { type: Boolean, default: true }
}, { collection: 'appointmenttype' });

export const AppointmentType = mongoose.model<AppointmentTypeModel>('Appointmenttype', AppointmentTypeSchema)
