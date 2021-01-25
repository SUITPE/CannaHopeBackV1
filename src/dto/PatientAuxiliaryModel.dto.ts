import { DiseaseModel } from '../models/disease';
import { HarmfulHabitModel } from '../models/harmfulHabits';
import { FamilyPphModel } from '../models/familyPph';
import { CurrentMedication } from '../models/currentMedication.interface';

export interface PatientAuxiliaryModelCreateDto {
    patient: string;
    registerDate: Date;
    username: string;
    examDate: Date;
    examReason: string;
    file: string;
}


export interface PatientAuxiliaryUpdateDto {
    _id: string;
    patient: string;
    registerDate: Date;
    username: string;
    examDate: Date;
    examReason: string;
    file: string;
}