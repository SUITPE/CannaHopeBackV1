import PatientAuxiliary, { PatientAuxiliaryModel } from '../models/patientAuxiliary';
import { ErrorDetail } from '../models/jsonResp';


export default class PatientAuxiliaryService {

    public async update(patientAuxiliary: any): Promise<PatientAuxiliaryModel> {
        try {
            return await PatientAuxiliary.updateOne({ patient: patientAuxiliary.patient }, patientAuxiliary);
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error la hacer consulta en db',
                description: error
            }
            throw (errorDetail);
        }
    }

    public async save(patientAuxiliary: PatientAuxiliaryModel): Promise<PatientAuxiliaryModel> {
        try {
            return await patientAuxiliary.save();
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error al momento de consultar la base de datos',
                description: error
            }
            throw (errorDetail);
        }
    }

    public async findById(idPatientAuxiliary: string): Promise<PatientAuxiliaryModel> {
        try {
            const patientAuxiliary: any = await PatientAuxiliary.findById(idPatientAuxiliary);
            return patientAuxiliary;
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error al hacer consulta a la base de datos',
                description: error
            }
            throw (errorDetail);
        }
    }

    public getByIdPatient(idPatient: string): Promise<PatientAuxiliaryModel[]> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    await PatientAuxiliary.find({ patient: idPatient })
                );
            } catch (error) {
                reject(error);
            }
        });
    }

}