import { PatientModel } from '../models/patient';
import Patient from '../models/patient';
import { ErrorDetail } from '../models/jsonResp';
import User from '../models/user';


export default class PatientService {


    public async update(patient: any): Promise<PatientModel> {
        try {
            return await User.updateOne({_id: patient.user},patient)
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error la hacer consulta en db',
                description: error
            }
            throw (errorDetail);
        }

    }
}