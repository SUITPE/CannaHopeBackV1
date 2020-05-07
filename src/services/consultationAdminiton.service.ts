import { ConsultationAdmitionModel } from '../models/consultationAdmision';
import ConsultationAdmition from '../models/consultationAdmision';

export class ConsultationAdmitionService {

    constructor() { }

    public save(consultationAdmition: ConsultationAdmitionModel): Promise<ConsultationAdmitionModel> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await consultationAdmition.save());
            } catch (error) {
                reject(error);
            }
        });
    }

    public getByIdPatient(idPatient: string): Promise<ConsultationAdmitionModel[]> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    await ConsultationAdmition.find({ patient: idPatient, isEnabled: true })
                    .populate({
                        path:'patient',
                        select: 'patientStatus names surenames',
                        populate: {
                            path: 'user',
                            select: 'names surenames sex'
                        }
                    })
                    .populate({
                        path: 'createdBy',
                        select:'names surenames email sex mobilePhone'
                    })
                );
            } catch (error) {
                reject(error);
            }
        });
    }

    public updateIsEnabled(idConsultationAdmition: string, newIsenabledVale: boolean): Promise<ConsultationAdmitionModel> {
        return new Promise(async(resolve, reject) => {
            try {
                resolve(ConsultationAdmition.updateOne({_id: idConsultationAdmition}, {isEnabled: newIsenabledVale}));
            } catch (error) {
                reject(error);
            }
        });
    }

}