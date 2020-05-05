import { DiseaseModel } from '../../models/disease';
import Disease from '../../models/disease';
import { ErrorDetail } from '../../models/jsonResp';
import { DiseaseService } from '../../services/disease.service';

export class DiseaseController {

    constructor(private diseaseSrv: DiseaseService) { }

    public saveNewDisease(diseaseData: DiseaseModel): Promise<DiseaseModel> {
        return new Promise((resolve, reject) => {
            try {
                const newDisease: DiseaseModel = new Disease({
                    name: diseaseData.name,
                    description: diseaseData.description
                });

                resolve(this.diseaseSrv.save(newDisease));

            } catch (error) {
                reject(JSON.stringify(error));
            }

        });
    }

    public getDiseaseList(): Promise<DiseaseModel[]> {
        return new Promise(async (resolve, reject) => {
            const diseaseSrv: DiseaseService = new DiseaseService();
            try {
                resolve(await diseaseSrv.findAll());
            } catch (error) {
                reject(error);
            }
        });
    }
}