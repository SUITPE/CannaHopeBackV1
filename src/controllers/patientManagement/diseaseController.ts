import { DiseaseModel } from '../../models/disease';
import Disease from '../../models/disease';
import { ErrorDetail } from '../../models/jsonResp';

export class DiseaseController {



    public save(diseaseData: DiseaseModel): Promise<DiseaseModel> {
        return new Promise((resolve, reject) => {

            try {

                const newDisease: DiseaseModel = new Disease({
                    name: diseaseData.name,
                    description: diseaseData.description
                });

                newDisease.save({}, (error, diseaseSaved) => {

                    if (error) {
                        const errorDetail: ErrorDetail = {
                            name: 'Error al guardar enfermedad',
                            description: error
                        }
                        reject(errorDetail);
                    } else {
                        resolve(diseaseSaved);
                    }

                });
            } catch (error) {
                reject(error);
            }






        });
    }

    public findAll(): Promise<DiseaseModel[]> {
        return new Promise((resolve, reject) => {

            try {
                Disease.find({}, {name:1, description:1, value:1, _id:1 }, (error, diseaseList) => {
                    if (error) {
                        const errorDetail: ErrorDetail = {
                            name: 'Error en consulta de enfermedades por parametros establecidos',
                            description: error
                        }
                        reject(errorDetail);
                    } else {
                        resolve(diseaseList);
                    }
                })
            } catch (error) {
                reject(error);
            }
        });
    }
}