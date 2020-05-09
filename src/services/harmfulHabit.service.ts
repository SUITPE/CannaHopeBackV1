import HarmfulHabit from '../models/harmfulHabits';
import { ErrorDetail } from '../models/jsonResp';


export default class HarmfulHabitService {


    public async delete(idHarmfulHabit: string): Promise<any> {
        try {
            return await HarmfulHabit.updateOne({_id: idHarmfulHabit}, {isEnabled: false});
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error al consulta base de datos',
                description: error
            }
            throw errorDetail;
        }
    }
}