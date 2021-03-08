import User from './user';
import mongoose from 'mongoose';
import { UserModel } from './user';

export interface PatientModel extends UserModel  {
    reasonAdmission: string;
    numberOfAppointment: number;
    patientStatus: string;
    user: UserModel;
    responsibleName: string;
    responsiblePhone: number;
    responsibleEmail: string;
    responsibleComment: string;
}

export const PatientSchema = new mongoose.Schema({
    reasonAdmission: {
        type: String,
        required: [true, 'De ingresar la razon de registro y admision de pasiente']
    },
    numberOfAppointment: {
        type: Number,
        default: 0
    },
    patientStatus: {
        type: String,
        default: 'active'
            //  'inactive'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Debe ingresar un Id de usuario'],
        unique: true,
        ref: 'User'
    },
    responsibleName: {
        type: String,
        //required: [true, 'No se ha asignado un nombre de usuario'],
        minlength: [3, 'debe ser un minimo de 5 caracteres parael nombre']
    },
    responsiblePhone: {
        type: Number,
        //required: [true, 'Debe agregar un telefonoo movil de usuario'],
    },
    responsibleEmail: {
        type: String,
        //required: [true, 'Debe ingresar un email del usuario']
    },
    responsibleComment: {
        type: String
    }
});

const Patient = mongoose.model<PatientModel>('Patient', PatientSchema);
export default Patient;





