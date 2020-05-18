export interface AppointmentCreateDto  {
    patient: string;
    doctor: string;
    date: Date;
    specialty: string;
    patientProblem: string;
    doctorAvailability: string;
    paymentStatus: string;
    paymentData: [];
}

export interface AppointmentUpdateStatusDto {
    status: string;
    idAppointment: string;
}

export interface AppointmentUpdateDto {
    _id: string;
    patient: string;
    doctor: string;
    date: Date;
    specialty: string;
    patientProblem: string;
    doctorAvailability: string;
    paymentStatus: string;
    updatedBy: string;
    updatedDate: Date,
}