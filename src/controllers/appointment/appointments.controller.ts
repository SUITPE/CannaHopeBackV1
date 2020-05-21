import { Request, Response } from 'express';
import httpstatus from 'http-status';
import JsonResp from '../../models/jsonResp';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentCreateDto, AppointmentUpdateStatusDto, AppointmentUpdateDto } from '../../dto/appointment.dto';
import { UserModel } from '../../models/user';
import { IAppointment } from '../../models/appointment.interface';
import { Appointment } from '../../schema/appointment.schema';
import { environments } from '../../environments/varEnvironments';
import { AppointmentStatusInterface } from '../../schema/appointmentStatus.schema';
import { AppointmentStatusService } from '../../services/appointmentStatus.service';
import { ErrorDetail } from '../../models/jsonResp';
import { AppointmentData } from '../../models/appointment.model';
import { DoctorAvailabilityService } from '../../services/doctorAvailability.service';
const moment = require('moment-timezone');

export class AppointmentController {

    constructor(
        private appointmentSrv: AppointmentService,
        private appointmentStatusSrv: AppointmentStatusService
    ) {
    }

    public async registerAppointment(req: any, res: Response): Promise<Response> {

        const appointment: AppointmentCreateDto = req.body;
        const user: UserModel = req.user;
        try {

            const newAppointment: IAppointment = new Appointment({
                patient: appointment.patient,
                doctor: appointment.doctor,
                date: appointment.date,
                specialty: appointment.specialty,
                patientProblem: appointment.patientProblem,
                doctorAvailability: appointment.doctorAvailability,
                paymentStatus: appointment.paymentStatus,
                paymentData: appointment.paymentData,
                createdBy: user._id,
                createdAt: environments.currentDate(),
                status: appointment.paymentStatus === 'PAGADO' ? 'CONFIRMADA' : 'PENDIENTE DE PAGO',
                dateString: appointment.dateString
            });

            return res.status(httpstatus.CREATED).send(new JsonResp(
                true,
                'Consulta medica registrada correctamente',
                await this.appointmentSrv.save(newAppointment)
            ));

        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error al regsitrar cita',
                error
            ));
        }
    }

    public async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const validated: boolean = await this.validateAppointmentsData();
            const appointmentList: IAppointment[] = await this.appointmentSrv.findAll();

            return res.status(httpstatus.OK).send(new JsonResp(
                true,
                'Lista de citas consutlas cargadas correctamente',
                appointmentList
            ))
        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error al cargar citas registradas',
                error
            ));
        }
    }

    public async updateStatus(req: Request, res: Response): Promise<Response> {

        const data: AppointmentUpdateStatusDto = req.body;

        try {

            const appointment: AppointmentData = await this.appointmentSrv.findById(data.idAppointment);
            const appointemntStatusList: AppointmentStatusInterface[] = await this.appointmentStatusSrv.findAll();

            const founded: any = appointemntStatusList.find(item => item.name === data.status);

            if (appointment.paymentStatus === 'PENDIENTE') {
                const errorDetail: ErrorDetail = {
                    name: `No se puede confirmar asistencia de consulta si aún está pendiente de pago.`,
                    description: null
                }
                throw errorDetail;
            }

            if (appointment.status === data.status) {
                const errorDetail: ErrorDetail = {
                    name: `La consulta ya se encuentra  ${data.status}`,
                    description: null
                }
                throw errorDetail;
            }

            if (!founded) {
                const errorDetail: ErrorDetail = {
                    name: 'El estatus enviado no corresponde a ninguno registrado en la base de datos',
                    description: null
                }
                throw errorDetail;
            } else {
                const updated: any = await this.appointmentSrv.updateStatus(data.idAppointment, data.status);
            }
            return res.status(httpstatus.ACCEPTED).send(new JsonResp(
                true,
                'Consulta actualizada correctamente',
            ));
        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error al actualizar consulta medica',
                null, error
            ));
        }
    }

    public async getById(req: Request, res: Response): Promise<Response> {

        const idAppointment: string = req.params.id;

        try {
            return res.status(httpstatus.ACCEPTED).send(new JsonResp(
                true,
                'Consulta actualizada correctamente',
                await this.appointmentSrv.findById(idAppointment)
            ));
        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error al obtener consulta por id',
                null, error
            ));
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {

        const appointmentData: AppointmentUpdateDto = req.body;
        const user: any = req.params.user;

        try {

            const updated: any = await this.appointmentSrv.update(appointmentData._id, await setProperties());
            const appointment: AppointmentData = await this.appointmentSrv.findById(appointmentData._id);

            return res.status(httpstatus.CREATED).send(new JsonResp(
                true,
                'Consulta actualizada correctamente',
                appointment
            ));

        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error al actualizar consulta medica',
                null, error
            ));
        }

        async function setProperties(): Promise<AppointmentUpdateDto> {
            try {
                appointmentData.updatedBy = user._id;
                appointmentData.updatedDate = environments.currentDate();
                return appointmentData;
            } catch (error) {
                const errorDetail: ErrorDetail = {
                    name: 'Error al mapear información de consulta para insertar a la base de datos',
                    description: error
                }
                throw errorDetail;
            }
        }
    }

    public async getDoctorAppointments(req: Request, res: Response): Promise<Response> {

        const idDoctor: string = req.params.id;

        try {

            const dateToday = moment(environments.currentDate()).format(`YYYY-MM-DD`);
            const appointments: IAppointment[] = await this.appointmentSrv.findByDateAndDoctor(idDoctor, dateToday);
            return res.status(httpstatus.ACCEPTED).send(new JsonResp(
                true,
                appointments.length > 0 ? `Consultas por doctor cargadas correctamente` : `No hay consultas registradas con el doctor y la fecha indicados`,
                appointments
            ));


        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                `Error al cargar consultas registradas para doctor`,
                null, error
            ));
        }
    }

    public async validateAppointmentsData(): Promise<boolean> {

        const appointmentSrv: AppointmentService = new AppointmentService();
        const doctorAvailabilitySrv: DoctorAvailabilityService = new DoctorAvailabilityService();

        try {
            const appointmnentList: IAppointment[] = await appointmentSrv.findAll();
            const currentDate: Date = new Date(environments.currentDate());

            for (const appointment of appointmnentList) {
                try {
                    if (appointment.status !== 'VENCIDA') {

                        const appointmentDate = moment(moment(appointment.date).format('YYYY-MM-DD') + ' ' + appointment.doctorAvailability.timeFrom).format('YYYY-MM-DD HH:mm:ss');


                        if (moment(new Date(appointmentDate)).diff(currentDate, 'minutes') < 0) {
                            const updated: any = await appointmentSrv.updateStatus(appointment._id, 'VENCIDA');
                        }
                    }
                } catch (error) {
                    throw error
                }
            }

            return true;
        } catch (error) {
            console.log(error);

            const errorDetail: ErrorDetail = {
                name: 'Error al validar datos de vencimiento de fecha',
                description: error
            }
            throw errorDetail
        }
    }

    public async getByIdDoctor(req: Request, res: Response): Promise<Response> {

        try {
            return res.status(httpstatus.ACCEPTED).send(new JsonResp(
                false,
                'Consultas por doctor cargadas correctamente',
                await this.appointmentSrv.findByDoctor(req.params.id)
            ))
        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                `Error al cargar consultas registradas por doctor establecido`,
                null, error
            ));
        }
    }

    public async cancelAppointment(req: Request, res: Response): Promise<Response> {
        try {
            return res.status(httpstatus.ACCEPTED).send(new JsonResp(
                true,
                'Consulta eliminada correctamente',
                await this.appointmentSrv.deleteById(req.params.id)
            ));
        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error al cancelar consulta medica',
                null, error
            ));
        }
    }

}