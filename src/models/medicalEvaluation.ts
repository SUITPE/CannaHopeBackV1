import mongoose from 'mongoose';



export interface MedicalEvaluationModel extends mongoose.Document {
    patient: string;
    doctor: string;
    anamnesis: string;
    clinicalExamination: ClinicalExamination;
    ectoscopy: string;
    mentalStatus: string;
    createDate: Date;
    painScale: string;
    solicitudeScale: string;
    blesseDementiaScale: BlesseDementiaScale;
    anxietyScale: AnxietyScale;
    depressionScale: DepressionScale;
    edmontonScale: EdmontonScale;
    seizuresQuantity: string;
    seizuresFrequency: string;
    comment: string;
}

export interface ClinicalExamination {
    _id: string;
    talla: string,
    peso: string;
    perimetroAbdominal: string;
}

export interface BlesseDementiaScale {
    _id: string;
    housework?: number;
    smallAmount?: number;
    rememberItems?: number;
    orientSelf?: number;
    navigateStreet?: number;
    valueEnvironment?: number;
    recallEvents?: number;
    recallPast?: number;
    eat?: number;
    wear?: number;
    toiletTraining?: number;
    withdrawal?: number;
    egocentrism?: number;
    interestOthers?: number;
    dullActivity?: number;
    emotionalControl?: number;
    inappropriateHilarity?: number;
    emotionalResponse?: number;
    sexualIndiscretions?: number;
    interestHobbies?: number;
    progressiveApathy?: number;
    unjustifiedHyperactivity?: number;
    sum: string;
}

export class AnxietyScale {
    feelingExcited?: boolean;
    worried?: boolean;
    feelingIrritable?: boolean;
    troubleRelaxing?: boolean;
    difficultySleeping?: boolean;
    headaches?: boolean;
    symptoms?: boolean;
    concernedHealth?: boolean;
    fallingAsleep?: boolean;
    lowEnergy?: boolean;
    count?: number;
}

export class DepressionScale {
    lostInterest?: boolean;
    lostConfidence?: boolean;
    feelHopeless?: boolean;
    difficultyConcentrating?: boolean;
    lostWeight?: boolean;
    wakeupEarly?: boolean;
    feelSluggish?: boolean;
    feelWorse?: boolean;
    count?: number;
}

export class EdmontonScale {
    _id?: string;
    pain?: number;
    exhausted?: number;
    somnolent?: number;
    nausea?: number;
    apetito?: number;
    breathe?: number;
    discouraged?: number;
    nervous?: number;
    sleep?: number;
    feel?: number;
    anotherProblem?: number;
}

export const MedicalEvaluationSchema = new mongoose.Schema({
    anamnesis: {
        type: String,
        required: [true, 'Debe ingresar la anamnesis']
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'Debe asignar un paciente al examen medico']
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: [true, 'Es oblifatorio ingresar el doctor que hace el examen medico']
    },
    clinicalExamination: {
        type: Object,
    },
    ectoscopy:{
        type: String,
    },
    mentalStatus:{
        type: String,
    },
    createDate: {
        type: Date,
        required: [true, 'Debe ingresar una fecha de registro']
    },
    painScale: {
        type: String
    },
    solicitudeScale: {
        type: String
    },
    blesseDementiaScale: {
        type: Object
    },
    anxietyDepressionScale: {
        type: Object
    },
    edmontonScale: {
        type: Object
    },
    seizuresQuantity: {
        type: String
    },
    seizuresFrequency: {
        type: String
    },
    comment: {
        type: String
    }
});

export const MedicalEvaluation = mongoose.model<MedicalEvaluationModel>('MedicalEvaluation', MedicalEvaluationSchema);