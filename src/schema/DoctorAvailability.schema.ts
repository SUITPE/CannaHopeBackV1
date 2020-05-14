import mongoose from 'mongoose';
import { DoctorAvailabilityModel } from '../models/doctorAvailability';

export const DoctorAvailabilitySchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Debe asignar un medico a la disponibilidad']
    },
    timeTo: {
        type: String,
        required: [true, 'Debe ingresar el tiempo donde inicia']
    },
    timeFrom: {
        type: String,
        required: [true, 'Debe ingresar el timepo de finalización']
    },
    isEnabled: {
        type: Boolean,
        default: true
    }
}, {collection: 'doctorAvailabilities' });

export const DoctorAvailability = mongoose.model<DoctorAvailabilityModel>('DoctorAvailability', DoctorAvailabilitySchema);