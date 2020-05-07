import mongoose from 'mongoose';

export interface ConsultationAdmitionModel extends mongoose.Document {
    talla: number,
    peso: number,
    perimetroabdominal: number,
    satO2: number,
    fr: number,
    fc: number,
    pa: string
    patient: string;
    createdAt: Date;
    createdBy: string;
    isEnabled: boolean;
}

export const ConsultationAdmitionSchema = new mongoose.Schema({
    talla: {
        type: Number,
        required: [true, 'La talla actual del paciente es requerida']
    },
    peso: {
        type: Number,
        required: [true, 'El peso actual del paciente es requerida']
    },
    perimetroabdominal: {
        type: Number,
        required: [true, 'El perimetro abdominal actual del paciente es requerida']
    },
    satO2: {
        type: Number,
        required: [true, 'La satO2 del paciente es requerida']
    },
    fr: {
        type: Number,
        required: [true, 'La fr actual del paciente es requerida']
    },
    fc: {
        type: Number,
        required: [true, 'La fc actual del paciente es requerida']
    },
    pa: {
        type: String,
        required: [true, 'La pa actual del paciente es requerida']
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'En necesario asignar un paciente']
    },
    createdAt: {
        type: Date,
        required: [true, 'Es necesario la fecha actual']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Es necesario indicar quien hace el registro']
    },
    isEnabled: {
        type: Boolean,
        default: true
    }
});

const ConsultationAdmition = mongoose.model<ConsultationAdmitionModel>('ConsultationAdmition', ConsultationAdmitionSchema);
export default ConsultationAdmition;