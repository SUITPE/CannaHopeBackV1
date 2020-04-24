import HarmfulHabit, { HarmfulHabitModel } from '../../models/harmfulHabits';
import { ErrorDetail } from '../../models/jsonResp';


export default class HarmfulHabitController {

    public errorDetail: ErrorDetail = new ErrorDetail();

    public save(harmfulHabit: HarmfulHabitModel): Promise<HarmfulHabitModel> {
        return new Promise((resolve, reject) => {

            try {

                const newHarmfulHabit: HarmfulHabitModel = new HarmfulHabit({
                    name: harmfulHabit.name,
                    description: harmfulHabit.description,
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

    public deleteById(idHarmfulHabit: string): Promise<boolean> {
        return new Promise((resolve, reject) => {

            try {
                HarmfulHabit.updateOne({ _id: idHarmfulHabit }, { isEnabled: false })
                    .exec((error, result) => {
                        if (error) {
                            this.errorDetail.name = 'Se registra error al actualizar habito nocivo';
                            this.errorDetail.description = error;
                            reject(this.errorDetail);
                        } else {
                            resolve(true);
                        }
                    })
            } catch (error) {
                reject(error);
            }
        });
    }
}