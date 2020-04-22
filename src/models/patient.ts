import User from './user';
import mongoose from 'mongoose';
import { UserModel } from './user';




export interface PatientModel extends UserModel  {

    reasonAdmission: string;
    numberOfAppointment: number;
    patientStatus: string;
    user: UserModel;

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
    }
});

const Patient = mongoose.model<PatientModel>('Patient', PatientSchema);
export default Patient;





