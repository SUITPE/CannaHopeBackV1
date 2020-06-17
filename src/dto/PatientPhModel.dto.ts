import { DiseaseModel } from '../models/disease';
import { HarmfulHabitModel } from '../models/harmfulHabits';
import { FamilyPphModel } from '../models/familyPph';
import { CurrentMedication } from '../models/currentMedication.interface';

export interface PatientPhModelCreateDto {
    patient: string;
    diseaseList: DiseaseModel[];
    description: string;
    harmfulHabitsList: HarmfulHabitModel[];
    familyPph: FamilyPphModel;
    currentMedication: CurrentMedication;
    surgeries: string;
    fur: string;
    pregnancies: string;
    poisonings: string;
    hospitalizations: string;
    healthyHabits: any[]
}


export interface PatientPhUpdateDto {
    _id: string;
    patient: string;
    diseaseList: DiseaseModel[];
    description: string;
    updateDate: string;
    updatedBy: string;
    harmfulHabitsList: HarmfulHabitModel[];
    familyPph: FamilyPphModel;
    currentMedication: CurrentMedication;
    surgeries: string;
    fu: string;
    pregnancies: string;
    poisonings: string;
    hospitalizations: string;
    healthyHabits: any[],

}