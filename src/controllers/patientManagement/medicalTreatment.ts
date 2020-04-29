import { MedicalTreatmentModel, MedicalTreatment } from '../../models/medicalTreatment';
import { ErrorDetail } from '../../models/jsonResp';

export default class MedicalTreatmentController {

    public save(medicalTreatment: MedicalTreatmentModel): Promise<MedicalTreatmentModel> {
        return new Promise((resolve, reject) => {
            try {
                const newMedicalTreatment: MedicalTreatmentModel = new MedicalTreatment({
                    patient: medicalTreatment.patient,
                    doctor: medicalTreatment.doctor,
                    disease: medicalTreatment.disease,
                    description: medicalTreatment.description,
                    createDate: medicalTreatment.createDate,
                    viaAdministracion: medicalTreatment.viaAdministracion,
                    ratio: medicalTreatment.ratio,
                    concentracion: medicalTreatment.concentracion,
                });

                newMedicalTreatment.save({}, (error, medicalTeatment) => {
                    if (error) {
                        const errorDetail: ErrorDetail = {
                            name: 'Error al guardar tratamiento de paciente',
                            description: error
                        }
                        reject(error);
                    } else {
                        resolve(medicalTeatment);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}