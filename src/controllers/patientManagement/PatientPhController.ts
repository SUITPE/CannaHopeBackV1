import { PatientPhModel } from '../../models/patientPh';
import PatientPh from '../../models/patientPh';
import { ErrorDetail } from '../../models/jsonResp';


// PatientPathologicalHistory controller
export class PatientPhController {

    private errorDetail: ErrorDetail = new ErrorDetail();

    public save(patientPh: PatientPhModel): Promise<PatientPhModel> {
        return new Promise((resolve, reject) => {

            try {

                const newPatientPh: PatientPhModel = new PatientPh({
                    patient: patientPh.patient,
                    diseaseList: patientPh.diseaseList,
                    description: patientPh.description,
                    createdBy: patientPh.createdBy,
                    harmfulHabitsList: patientPh.harmfulHabitsList,
                    familyPph: patientPh.familyPph
                });

                newPatientPh.save({}, (error, patientPhSaved) => {

                    if (error) {
                        this.errorDetail.name = 'Error al registrar Historial patologico de paciente';
                        this.errorDetail.description = error;
                        reject(this.errorDetail);
                    } else {
                        resolve(patientPhSaved);
                    }
                })

            } catch (error) {
                reject(error);
            }
        });
    }

    public async findAndUpdate(patientPh: PatientPhModel): Promise<PatientPhModel> {
        return new Promise((resolve, reject) => {

            try {

                PatientPh.updateOne({ _id: patientPh._id }, patientPh, async (error, patientPhSaved) => {
                    if (error) {
                        this.errorDetail.name = 'Error en la base de datos al actualizar historial patologico de paciente';
                        this.errorDetail.description = error;
                        reject(error);
                    } else {
                        const patientUpdated: PatientPhModel = await this.findBypatientId(patientPh.patient);
                        resolve(patientUpdated);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    public findBypatientId(idPatient: string): Promise<PatientPhModel> {
        return new Promise((resolve, reject) => {

            try {
                PatientPh.findOne({ patient: idPatient })
                    .populate({
                        path: 'createdBy',
                        select: 'names surenames email mobilePhone'
                    })
                    .exec((error, patientFounded: PatientPhModel ) => {
                        if (error) {
                            this.errorDetail.name = 'Error en la base de datos al cargar registro patologico por id de paciente';
                            this.errorDetail.description = error;
                            reject(this.errorDetail);
                        } else {
                            resolve(patientFounded)
                        }
                    });
            } catch (error) {
                reject(error);
            }

        });
    }

}

