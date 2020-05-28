import { ErrorDetail } from '../models/jsonResp';
import { Fitocannabinoides } from '../schema/fitocannabinoides.schema';
import { FitocannabinoidesModel } from '../models/fitocannabinoides.interface';

export class FitocannabinoidesService {

    public async find(): Promise<FitocannabinoidesModel[]> {
        try {
            return await Fitocannabinoides.find({enabled: true});
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en consulta de Fitocannabinoides en la base de datos',
                description: error
            }
            throw errorDetail;
        }
    }
}