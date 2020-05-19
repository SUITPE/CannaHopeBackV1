"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const jsonResp_1 = __importDefault(require("../../models/jsonResp"));
const paymentData_schema_1 = require("../../schema/paymentData.schema");
const moment = require('moment-timezone');
class PaymentController {
    constructor(paymentSrv, appointmentSrv) {
        this.paymentSrv = paymentSrv;
        this.appointmentSrv = appointmentSrv;
    }
    registerPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payment = req.body;
            const user = req.params.user;
            try {
                const appointment = yield this.appointmentSrv.findById(payment.appointment);
                const paymentData = yield setPaymentData();
                const paymentSaved = yield this.paymentSrv.save(paymentData);
                yield this.appointmentSrv.updatePaymentData(appointment._id, payment);
                yield this.appointmentSrv.updatePaymentStatus(appointment._id, 'PAGADO');
                return res.status(http_status_1.default.CREATED).send(new jsonResp_1.default(true, 'Pago de consulta registrado exitosamente', paymentSaved));
            }
            catch (error) {
                return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send(new jsonResp_1.default(false, 'Error al registrar pago de consulta', error));
            }
            function setPaymentData() {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const newPayment = new paymentData_schema_1.Payment({
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
                    }
                    catch (error) {
                        const errorDetail = {
                            name: 'Error al mapear informacion de pago'
                        };
                        throw errorDetail;
                    }
                });
            }
        });
    }
}
exports.PaymentController = PaymentController;
