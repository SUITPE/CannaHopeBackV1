import ConsultationAdmition, { ConsultationAdmitionModel } from '../../models/consultationAdmision';
import { ErrorDetail } from '../../models/jsonResp';
import { ConsultationAdmitionService } from '../../services/consultationAdminiton.service';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentData } from '../../models/appointment.model';

export default class ConsultationAdmitionController {

    private consultationAdmitionSrv: ConsultationAdmitionService = new ConsultationAdmitionService();
    private appointmentSrv: AppointmentService = new AppointmentService();
    private error: ErrorDetail = new ErrorDetail();

    constructor() { }

    public saveConsultationAdmition(consultationAdmition: any): Promise<ConsultationAdmitionModel> {
        return new Promise(async (resolve, reject) => {
            const errorDetail: ErrorDetail = new ErrorDetail();
            try {

                const appointment: AppointmentData = await this.appointmentSrv.findById(consultationAdmition.appointment);
                const admitionFounded: ConsultationAdmitionModel = await this.consultationAdmitionSrv.findByIdAppointment(appointment._id);

                if (appointment.status === 'PENDIENTE DE PAGO') {
                    errorDetail.name = 'No se puede registrar una admisión si aun esta pendiente de pago';
                    reject(errorDetail);
                }

                if (admitionFounded) {
                    errorDetail.name = 'Ya se ha registrado una admisión para esta consulta.';
                    reject(errorDetail);
                }


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
                    createdBy: consultationAdmition.createdBy,
                    appointment: consultationAdmition.appointment,
                    imc: consultationAdmition.imc
                });

                await this.appointmentSrv.updateStatus(appointment._id, 'ADMITIDA');
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
        return new Promise(async (resolve, reject) => {
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