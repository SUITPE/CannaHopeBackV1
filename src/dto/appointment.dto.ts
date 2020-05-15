

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
