import HarmfulHabit, { HarmfulHabitModel } from '../../../models/harmfulHabits';
import { ErrorDetail } from '../../../models/jsonResp';
import { Response, Request } from 'express';
import HarmfulHabitService from '../../../services/harmfulHabit.service';
import httpstatus from 'http-status';
import JsonResp from '../../../models/jsonResp';

export default class HarmfulHabitController {

    public errorDetail: ErrorDetail = new ErrorDetail();

    constructor() { }

    public save(harmfulHabit: HarmfulHabitModel): Promise<HarmfulHabitModel> {
        return new Promise((resolve, reject) => {

            try {
                const newHarmfulHabit: HarmfulHabitModel = new HarmfulHabit({
                    name: harmfulHabit.name,
                    description: harmfulHabit.description,
                    type: harmfulHabit.type
                });

                newHarmfulHabit.save({}, (error, harmfulHabitSaved) => {

                    if (error) {
                        const errorDetail: ErrorDetail = {
                            name: 'Error al momento de guardar habito nocivo',
                            description: error
                        }
                        reject(errorDetail);
                    } else {
                        resolve(harmfulHabitSaved);
                    }
                });

            } catch (error) {
                reject(error);
            }
        });
    }

    public findAlll(): Promise<HarmfulHabitModel[]> {
        return new Promise((resolve, reject) => {
            try {
                HarmfulHabit.find({ isEnabled: true }, {
                    name: 1,
                    description: 1,
                    value: 1,
                    quantity: 1,
                    frequency: 1,
                    type: 1,
                    _id: 1
                }, (error, HarmfulHabitList) => {

                    if (error) {
                        this.errorDetail.name = 'Error al consultar lista de habitos nocivos';
                        this.errorDetail.description = error;
                        reject(this.errorDetail);
                    } else {
                        resolve(HarmfulHabitList);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const harmfulHabitSrv: HarmfulHabitService = new HarmfulHabitService();
        const idHarmfulHabit: string = req.params.id;
        try {

            return res.status(httpstatus.ACCEPTED).send(new JsonResp(
                true,
                'Habito nocivo eliminado correctamente',
                await harmfulHabitSrv.delete(idHarmfulHabit)
            ));
        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error al eliminar habito nocivo',
                error
            ));
        }
    }


}