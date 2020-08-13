import { ConsultationAdmitionModel } from '../models/consultationAdmision';
import ConsultationAdmition from '../models/consultationAdmision';
import { ErrorDetail } from '../models/jsonResp';

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
                    .populate({
                        path: 'appointment',
                        select: 'doctor createdBy patientProblem type',
                        populate: {
                            path: 'createdBy doctor',
                            select: 'names surenames email mobilePhone'
                        }
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


    public async findByIdAppointment(idAppointment: string): Promise<ConsultationAdmitionModel> {
        try {
            const founded: any = await ConsultationAdmition.findOne({appointment: idAppointment})
            return founded;
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en la consulta a la base de datos para obtener admision por id de consulta',
                description: error
            }
            throw errorDetail;
        }
    }

}
