import { DiseaseModel } from '../models/disease';
import Disease from '../models/disease';
import { ErrorDetail } from '../models/jsonResp';


export class DiseaseService{

    constructor(){}

    public findAll(): Promise<DiseaseModel[]> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve( await Disease.find({}, {name:1, description:1, value:1, _id:1 }))
            } catch (error) {
                reject(error);
            }
        });
    }

    public save(disease: DiseaseModel): Promise<DiseaseModel> {
        return new Promise(async(resolve, reject) => {
            try {
                resolve(await disease.save());
            } catch (error) {
                reject(error);
            }
        });
    }

    public async delete(idDisease: string): Promise<DiseaseModel> {
        try {
            return await Disease.updateOne({_id: idDisease}, {isEnabled: false});
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error al consulta de base de datos',
                description: error
            }
            throw errorDetail;
        }
    }
}