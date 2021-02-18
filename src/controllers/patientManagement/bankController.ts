import { BankModel, Bank } from '../../models/bank';
import { ErrorDetail } from '../../models/jsonResp';
import { Request, Response } from 'express';
import BankService from '../../services/bank.service';
import httpstatus from 'http-status';
import JsonResp from '../../models/jsonResp';


export default class BankController {


    public save(bank: BankModel): Promise<BankModel> {
        return new Promise((resolve, reject) => {
            try {
                const errorDetail: ErrorDetail = new ErrorDetail();

                const newBank: BankModel = new Bank({
                    name: bank.name,
                    description: bank.description,
                });

                newBank.save({}, (error, bankSaved) => {
                    if (error) {
                        errorDetail.name = 'Error al guardar banca';
                        errorDetail.description = error;
                        reject(errorDetail);
                    } else {
                        resolve(bankSaved);
                    }
                });

            } catch (error) {

                reject(error);
            }
        });
    }

    public findAll(): Promise<BankModel[]> {
        return new Promise((resolve, reject) => {
            try {

                const errorDetail: ErrorDetail = new ErrorDetail();

                Bank.find({ isEnabled: true }, (error, bankList) => {
                    if (error) {
                        errorDetail.name = 'error al cargar lista de banca';
                        errorDetail.description = error;
                        reject(error);
                    } else {
                        resolve(bankList);
                    }
                }).sort({ name: 1 })
            } catch (error) {
                reject(error);
            }
        });
    }

    public async delete(req: Request, res: Response): Promise<Response> {

        const bankSrv: BankService = new BankService();
        const idBank: string = req.params.id;
        try {
            return res.status(httpstatus.ACCEPTED).send(new JsonResp(
                true,
                'Banca eliminado correctamente',
                await bankSrv.delete(idBank)
            ));
        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error en la base de datos al eliminar banca',
                error
            ));
        }
    }
}