import mongoose from 'mongoose';
import { PatientProblemModel } from './patientProblem';
import { MedicalEvaluationModel } from './medicalEvaluation';
import { PhysicalExamModel } from './physicalExam';
import { MedicalDiagnosticModel } from './medicalDiagnostic';
import { MedicalReevaluationModel } from './medicalReevaluation';
import { ComplementaryExam } from './complementaryExam.interface';

export interface MedicalConsultationModel extends mongoose.Document {
    patient: string;
    doctor: string;
    consultationReason: string;
    patientProblems: PatientProblemModel[];
    medicalEvaluation: MedicalEvaluationModel;
    physicalExam: PhysicalExamModel;
    medicalDiagnostic: MedicalDiagnosticModel;
    patientStory: string;
    complementaryExams: ComplementaryExam[];
    createDate: Date;
    reevaluations: MedicalReevaluationModel[] | any[];
}

export const MedicalConsultationSchema = new mongoose.Schema({
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
    patientProblems: {
        type: [],
        required: [true, 'Debe especificar la lista de problemas del paciente']
    },
    medicalEvaluation:{
        type: Object,
        required: [true, 'Debe ingresar una valuacion medica de paciente']
    },
    physicalExam: {
        type: Object,
    },
    complementaryExams: {
        type: [],
        default: 'ninguno'
    },
    medicalDiagnostic: {
        type: Object,
        required: [true, 'Debe relacionarse un diagnostico medico a esta consulta']
    },
    patientStory: {
        type: String,
        required: [true, 'Es obligatorio ingresar el relato del pacientes']
    },
    createDate: {
        type: Date,
        required: [true, 'Debe ingresar una fecha de registro']
    },
    reevaluations: {
        type: [],
        default: []
    },
    consultationReason:{
        type: String,
    }
});

export const MedicalConsultation = mongoose.model<MedicalConsultationModel>('MedicalConsultation', MedicalConsultationSchema);