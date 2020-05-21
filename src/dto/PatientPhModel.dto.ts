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
}