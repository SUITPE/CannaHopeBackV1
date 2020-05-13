import mongoose from 'mongoose';
import { DoctorAvailabilityModel } from '../models/doctorAvailability';

export const DoctorAvailabilitySchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Debe asignar un medico a la disponibilidad']
    },
    timeSet: {
        type: String,
        required: [true, 'Debe asginar una hora de atención']
    },
    duaration: {
        type: Number,
        default: 30
    },
    isEnabled: {
        type: Boolean,
        default: true
    }
}, {collection: 'DoctorAvailabilities' });

export const DoctorAvailability = mongoose.model<DoctorAvailabilityModel>('DoctorAvailability', DoctorAvailabilitySchema);