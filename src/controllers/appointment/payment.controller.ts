import { PaymentService } from '../../services/payment.service';
import { Response, Request } from 'express';
import httpstatus from 'http-status';
import JsonResp from '../../models/jsonResp';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentData } from '../../models/appointment.model';
import { PaymentCreateDto } from '../../dto/payment.dto';
import { PaymentDataModel } from '../../models/paymentDetail.interface';
import { Payment } from '../../schema/paymentData.schema';
import { ErrorDetail } from '../../models/jsonResp';
const moment = require('moment-timezone');



export class PaymentController {

    constructor(
        private paymentSrv: PaymentService,
        private appointmentSrv: AppointmentService
    ) { }

    public async registerPayment(req: Request, res: Response): Promise<Response> {

        const payment: PaymentCreateDto = req.body;
        const user: any = req.params.user;

        try {

            const appointment: AppointmentData = await this.appointmentSrv.findById(payment.appointment);
            const paymentData: PaymentDataModel = await setPaymentData();
            const paymentSaved: PaymentDataModel = await this.paymentSrv.save(paymentData);
            await this.appointmentSrv.updatePaymentData(appointment._id, payment)
            await this.appointmentSrv.updatePaymentStatus(appointment._id, 'PAGADO');
            await this.appointmentSrv.updateStatus(appointment._id, 'CONFIRMADA');


            return res.status(httpstatus.CREATED).send(new JsonResp(
                true,
                'Pago de consulta registrado exitosamente',
                paymentSaved
            ));

        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error al registrar pago de consulta',
                error
            ));
        }

        async function setPaymentData(): Promise<PaymentDataModel> {
            try {
                const newPayment: PaymentDataModel =  new Payment({
                    appointment: payment.appointment,
                    paymentMethod: payment.paymentMethod,
                    operationCode: payment.operationCode,
                    value: payment.value,
                    bankAccount: payment.bankAccount,
                    registerDate: payment.registerDate,
                    createdBy: user._id,
                    createdAt: moment().tz('America/Lima').format('YYYY-MM-DD HH:mm:ss'),
                });

                return newPayment;
            } catch (error) {
                const errorDetail: ErrorDetail = {
                    name: 'Error al mapear informacion de pago'
                }
                throw errorDetail;
            }
        }
    }

}