import { PatientProblem } from '../models/patientProblem';
import { ErrorDetail } from '../models/jsonResp';


export default class PatientProblemService {

    public async delete(idPatientProblem: string): Promise<any> {
        try {
            return PatientProblem.updateOne({_id: idPatientProblem},{isEnabled: false});
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en la consulta de base de datos',
                description: error
            }
            throw(errorDetail);
        }
    }
}