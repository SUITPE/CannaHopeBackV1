

export interface MedicalReevaluationCreateDto {
    medicalConsultation: string;
    description: string;
    createDate: string;
    painScale: string;
    medicalTreatment: any[];
}