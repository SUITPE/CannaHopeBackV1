import { ErrorDetail } from '../../models/jsonResp';
import { PhysicalExamModel, PhysicalExam } from '../../models/physicalExam';


export default class PhysicalExamController {


    public save(physicalExam: PhysicalExamModel): Promise<any> {
        return new Promise((resolve, reject) => {
            try {

                const newPhysicalExam: PhysicalExamModel = new PhysicalExam({
                    patient: physicalExam.patient,
                    doctor: physicalExam.doctor,
                    generalSummary: physicalExam.generalSummary,
                    visionAnalysis: physicalExam.visionAnalysis
                });

                newPhysicalExam.save({}, (error, physicalExamSaved) => {
                    if (error) {
                        const errorDetail: ErrorDetail = {
                            name: 'Error al guardar examen fisico de paciente en la base de datos',
                            description: error
                        }
                        reject(errorDetail);
                    } else {
                        resolve(physicalExamSaved);
                    }
                })
            } catch (error) {
                reject(error);
            }

        });
    }

    public findByPatientId(idPatient: string): Promise<PhysicalExamModel[]> {
        return new Promise((resolve, reject) => {
            try {

                PhysicalExam.find({patient: idPatient}, (error, physicalExamsList) => {
                    if (error) {
                        const errorDetail: ErrorDetail = {
                            name: 'Error en la base de datos al consultar lista de examenes medicos por paciente',
                            description: error
                        }
                        reject(errorDetail);
                    } else {
                        resolve(physicalExamsList);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}