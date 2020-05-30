import { MedicalReevaluationModel, MedicalReevaluation } from '../models/medicalReevaluation';
import { ErrorDetail } from '../models/jsonResp';

export class MedicalReevaluationService {

    constructor () {}

    public async findById(id: string): Promise<MedicalReevaluationModel> {
        try {
            const founded: any = await MedicalReevaluation.findById(id)
            return founded;
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error el consulta a la base de datos para obtener reevaluacion por id',
                description: error
            }
            throw errorDetail;
        }
    }

    public async save(medicalReevaluation: MedicalReevaluationModel): Promise<MedicalReevaluationModel> {
        try {
            return await medicalReevaluation.save();
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error el consulta a la base de datos para guardar reevaluacion',
                description: error
            }
            throw errorDetail;
        }
    }

    public async findByMedicalConsultation(idMedicalConsultation: string): Promise<MedicalReevaluationModel[]> {
        try {
            const founded: any = await MedicalReevaluation.find({medicalConsultation: idMedicalConsultation});
            return founded;
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error el consulta a la base de datos para obtener reevaluaciones por id de consulta realizada',
                description: error
            }
            throw errorDetail;
        }
    }

}