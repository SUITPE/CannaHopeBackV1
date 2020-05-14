import mongoose from 'mongoose';
import { MedicalSpecialityModel } from '../models/medicalSpeciality.interface';


export const MedicalSpecialitySchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Debe ingresar el nombre de la especialidad']
    },
    description: {
        type: String,
        required: [true, 'Hay que ingresar una descripción']
    },
    idEnabled: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Debe ingresar quien registra la especialidad medica']
    },
    updatedAt: {
        type: Date,
        default: null
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, {collection: 'medicalSpecialties'});

export const MedicalSpeciality = mongoose.model<MedicalSpecialityModel>('MedialSpeciality', MedicalSpecialitySchema);