import { ExamReason } from '../models/examReason';
import { ErrorDetail } from '../models/jsonResp';


export default class ExamReasonService {

    public async delete(idExamReason: string): Promise<any> {
        try {
            return ExamReason.updateOne({_id: idExamReason},{isEnabled: false});
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en la consulta de base de datos',
                description: error
            }
            throw(errorDetail);
        }
    }
}