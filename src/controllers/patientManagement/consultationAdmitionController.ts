import ConsultationAdmition, { ConsultationAdmitionModel } from '../../models/consultationAdmision';
import { ErrorDetail } from '../../models/jsonResp';
import { ConsultationAdmitionService } from '../../services/consultationAdminiton.service';


export default class ConsultationAdmitionController {

    private consultationAdmitionSrv: ConsultationAdmitionService = new ConsultationAdmitionService();
    private error: ErrorDetail = new ErrorDetail();

    constructor(){}

    public saveConsultationAdmition(consultationAdmition: any): Promise<ConsultationAdmitionModel> {
        return new Promise(async(resolve, reject) => {
            const errorDetail:ErrorDetail = new ErrorDetail();
            try {
                const newConsultationAdmition: ConsultationAdmitionModel = new ConsultationAdmition({
                    talla: consultationAdmition.talla,
                    peso: consultationAdmition.peso,
                    perimetroabdominal: consultationAdmition.perimetroabdominal,
                    satO2: consultationAdmition.satO2,
                    fr: consultationAdmition.fr,
                    fc: consultationAdmition.fc,
                    pa: consultationAdmition.pa,
                    patient: consultationAdmition.patient,
                    createdAt: consultationAdmition.createdAt,
                    createdBy: consultationAdmition.createdBy
                });

                resolve(await this.consultationAdmitionSrv.save(newConsultationAdmition));
            } catch (error) {
                errorDetail.name = 'Error al registrar admision de paciente para consulta',
                errorDetail.description = error;
                errorDetail.status = 500;
                reject(errorDetail);
            }
        });
    }

    public getConsultationAdmitionByPatientId(idPatient: string): Promise<ConsultationAdmitionModel[]> {
        return new Promise(async(resolve, reject) => {
            try {
                resolve(await this.consultationAdmitionSrv.getByIdPatient(idPatient))
            } catch (error) {
                this.error.name = 'Error al consultar admisiones para consulta de paciente registradas';
                this.error.description = error;
                this.error.status = 500;
                reject(this.error);
            }
        });
    }
}