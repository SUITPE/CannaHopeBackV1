import { PatientModel } from './patient';
import { UserModel } from './user';
import { MedicalSpeciality } from '../schema/medicalSpeciality.schema';
import { MedicalSpecialityModel } from './medicalSpeciality.interface';
import { DoctorAvailabilityModel } from './doctorAvailability';
import { PaymentDataModel } from './paymentDetail.interface';


export interface AppointmentData {
    _id: string;
    patient: PatientModel;
    doctor: UserModel;
    date: Date;
    specialty: MedicalSpecialityModel;
    patientProblem: string;
    doctorAvailability: DoctorAvailabilityModel;
    paymentStatus: string;
    paymentData: PaymentDataModel;
    createdBy: UserModel
    createdAt: UserModel;
    updatedBy: UserModel;
    updatedDate: Date,
    status: string
}