import mongoose from 'mongoose';
import { IAppointment } from '../models/appointment.interface';


export const AppointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'Debe asignar un paciente a la consulta']
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Debe asignar un doctor a la consulta']
    },
    date: {
        type: Date,
        required: [true, 'Debe ingresar la fecha de consulta'],
    },
    specialty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedialSpeciality',
    },
    patientProblem: {
        type: String,
        required: [true, 'Es necesario ingresar el problema que presenta el paciente'],
    },
    doctorAvailability: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DoctorAvailability',
        required: [true, ' Debe ingresar en que franja de atencion de registra la consulta']
    },
    paymentStatus: {
        type: String,
        required: [true, 'Debe ingresar el estado de pago actual de la consulta']
    },
    paymentData: {
        type: Object
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Se debe ingresar el usuario que registra la consulta']
    },
    createdAt: {
        type: Date,
        required: [true, 'Es obligatorio ingresar la fecha de registro']
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedDate: {
        type: Date
    },
    status: {
        type: String,
        default: 'POR ATENDER'
    },
    dateString: {
        type: String
    }
}, {collection: 'appointments'});

export const Appointment = mongoose.model<IAppointment>('Appointment', AppointmentSchema);