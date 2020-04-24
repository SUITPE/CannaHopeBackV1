import { PatientProblemModel, PatientProblem } from '../../models/patientProblem';
import { ErrorDetail } from '../../models/jsonResp';


export default class PatientProblemController {


    public save(patientProblem: PatientProblemModel): Promise<PatientProblemModel> {
        return new Promise((resolve, reject) => {
            try {
                const errorDetail: ErrorDetail = new ErrorDetail();

                const newPatientPromblem: PatientProblemModel = new PatientProblem({
                    name: patientProblem.name,
                    description: patientProblem.description,
                });

                newPatientPromblem.save({}, (error, patientProblemSaved) => {
                    if (error) {
                        errorDetail.name = 'Error al guardar problema de paciente';
                        errorDetail.description = error;
                        reject(errorDetail);
                    } else {
                        resolve(patientProblemSaved);
                    }
                });

            } catch (error) {
                reject(error);
            }
        });
    }

    public findAll(): Promise<PatientProblemModel[]> {
        return new Promise((resolve, reject) => {
            try {

                const errorDetail: ErrorDetail = new ErrorDetail();

                PatientProblem.find({}, (error, patientProblemList) => {
                    if (error) {
                        errorDetail.name = 'error al cargar lista de problemas de paciente';
                        errorDetail.description = error;
                        reject(error);
                    } else {
                        resolve(patientProblemList);
                    }
                })
            } catch (error) {
                reject(error);
            }
        });
    }
}