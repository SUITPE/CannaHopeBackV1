import { MedicalDiagnostic, MedicalDiagnosticModel } from '../../models/medicalDiagnostic';
import { ErrorDetail } from '../../models/jsonResp';

export class MedicalDiagnosticController {

    public save(medicalDiagnostic: MedicalDiagnosticModel): Promise<MedicalDiagnosticModel> {
        return new Promise(async (resolve, reject) => {

            try {

                const newMedicalDiagnostic: MedicalDiagnosticModel = new MedicalDiagnostic({
                    patient: medicalDiagnostic.patient,
                    doctor: medicalDiagnostic.doctor,
                    disease: medicalDiagnostic.disease,
                    description: medicalDiagnostic.description,
                    createDate: medicalDiagnostic.createDate,
                    medicalTreatment: medicalDiagnostic.medicalTreatment,
                });

                const medicalDiagnosticSaved: MedicalDiagnosticModel = await newMedicalDiagnostic.save();
                resolve(newMedicalDiagnostic);

            } catch (error) {
                reject(error);
            }
        })
    }
}