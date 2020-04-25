import mongoose from 'mongoose';
import { PatientProblemModel, PatientProblemSchema } from './patientProblem';
import { MedicalEvaluationModel, MedicalEvaluationSchema } from './medicalEvaluation';
import { PhysicalExamModel, PhysicalExamSchema } from './physicalExam';


export interface MedicalConsultationModel extends mongoose.Document {
    patient: string;
    doctor: string;
    patientProblems: PatientProblemModel[];
    medicalEvaluation: MedicalEvaluationModel;
    physicalExam: PhysicalExamModel;
    complementaryExams: string;
    medicalDiagnostic: string;
    patientStory: string;
    createDate: Date;
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
        required: [true, 'Es obligatorio ingresar el doctor que hace el examen medico']
    },
    patientProblems: {
        type: new Array(),
        required: [true, 'Debe ingresar un listado de problemas actuales del paciente'],
    },
    medicalEvaluation:{
        type: Object,
        required: [true, 'Debe ingresar una valuacion medica de paciente']
    },
    physicalExam: {
        type: Object,
        required: 'Debe ingresar un examen medico formulado del paciente'
    },
    complementaryExams: {
        type: String,
        default: 'ninguno'
    },
    medicalDiagnostic: {
        type: String,
        required: [true, 'Es obligatorio ingresar in diagnostico medico del paciente']
    },
    patientStory: {
        type: String,
        required: [true, 'Es obligatorio ingresar el relato del pacientes']
    },
    createDate: {
        type: Date,
        required: [true, 'Debe ingresar una fecha de registro']
    }
});

export const MedicalConsultation = mongoose.model<MedicalConsultationModel>('MedicalConsultation', MedicalConsultationSchema);