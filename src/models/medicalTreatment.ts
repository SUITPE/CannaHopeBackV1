import mongoose from 'mongoose';

export interface MedicalTreatmentModel extends mongoose.Document {
    patient?: string;
    doctor?: string;
    disease?: string;
    description?: string;
    createDate?: Date;
    viaAdministracion?: string;
    ratio?: string;
    concentracion?: string;
    frequency: string;
    amountPerDose: string;
}


export const MedicalTreatmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'Debe asignar un paciente al examen medico']
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: [true, 'El doctor que atiende la cita es requerido']
    },
    disease: {
        type: String,
        required: [true, 'Debe ingresar la lista completa de enfermedades en el diagnostico']
    },
    description: {
        type: String,
        required: [true, 'Debe ingresar una descripcion del diagnostico']
    },
    createDate: {
        type: Date,
        required: [true, 'Debe ingresar la fecha de registro']
    },
    viaAdministracion: {
        type: String,
        required: true
    },
    ratio: {
        type: String,
        required: true
    },
    concentracion: {
        type: String,
        required: true
    },
    frequency: {
        type: String,
        required: true
    },
    amountPerDose: {
        type: String
    }
});

export const MedicalTreatment = mongoose.model<MedicalTreatmentModel>('MedicalTreatment', MedicalTreatmentSchema);