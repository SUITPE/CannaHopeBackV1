import { Medication } from '../models/medication';
import { ErrorDetail } from '../models/jsonResp';


export default class MedicationService {

    public async delete(idMedication: string): Promise<any> {
        try {
            return Medication.updateOne({_id: idMedication},{isEnabled: false});
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en la consulta de base de datos',
                description: error
            }
            throw(errorDetail);
        }
    }
}