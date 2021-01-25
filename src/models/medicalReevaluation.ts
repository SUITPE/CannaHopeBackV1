import mongoose from 'mongoose';

export interface MedicalReevaluationModel extends mongoose.Document {
    medicalConsultation: string;
    description: string;
    createDate: Date;
    painScale: string;
    blesseDementiaScale: BlesseDementiaScale;
    anxietyScale: AnxietyScale;
    depressionScale: DepressionScale;
    edmontonScale: EdmontonScale;
    treatment: any[];
    recomendations: string;
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

export const MedicalReevaluationSchema = new mongoose.Schema({
    medicalConsultation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicalConsultation',
        required: [true, 'Debe describir a que consulta pertenece']
    },
    description: {
        type: String,
        required: [true, 'Es obligatoria una descripción']
    },
    createDate: {
        type: Date,
        default: new Date()
    },
    treatment: {
        type: [],
        default:[]
    },
    painScale: {
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
    recomendations: {
        type: String
    }
});

export const MedicalReevaluation = mongoose.model<MedicalReevaluationModel>('MedicalReevaluation', MedicalReevaluationSchema);