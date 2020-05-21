import { ErrorDetail } from '../models/jsonResp';
import { PaymentDataModel } from '../models/paymentDetail.interface';


export class PaymentService {

    constructor () {}

    public async save(payment: PaymentDataModel): Promise<PaymentDataModel> {
        try {

            console.log(payment);
            
            return await payment.save();
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en consulta de base de datos al registrar pago de consulta',
                description: error
            }
            throw errorDetail;
        }
    }
}