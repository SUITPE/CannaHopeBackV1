import { Bank } from '../models/bank';
import { ErrorDetail } from '../models/jsonResp';


export default class BankService {

    public async delete(idBank: string): Promise<any> {
        try {
            return Bank.updateOne({_id: idBank},{isEnabled: false});
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en la consulta de base de datos',
                description: error
            }
            throw(errorDetail);
        }
    }
}