import { MaritalStatusModel } from '../models/maritalStatus.interface';
import { ErrorDetail } from '../models/jsonResp';
import { MaritalStatus } from '../schema/maritalStatus.schema';

export class MaritalStatusService {

    public async find(): Promise<MaritalStatusModel[]> {
        try {
            return MaritalStatus.find({enabled: true})
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en consulta a la base de datos',
                description: error
            }
            throw errorDetail;
        }
    }
}