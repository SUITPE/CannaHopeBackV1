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
const moment = require('moment-timezone');

export class AppointmentController {

    constructor() {
    }

    public async registerAppointment(req: any, res: Response): Promise<Response> {

        const appointmentSrv: AppointmentService = new AppointmentService();
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
                status: appointment.paymentStatus === 'PAGADO' ? 'POR ATENDER' : 'PENDIENTE DE PAGO'
            });

            return res.status(httpstatus.CREATED).send(new JsonResp(
                true,
                'Consulta medica registrada correctamente',
                await appointmentSrv.save(newAppointment)
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

        const appointmentSrv: AppointmentService = new AppointmentService();

        try {
            return res.status(httpstatus.OK).send(new JsonResp(
                true,
                'Lista de citas consutlas cargadas correctamente',
                await appointmentSrv.findAll()
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

        const appointmentStatusSrv: AppointmentStatusService = new AppointmentStatusService();
        const appointmentSrv: AppointmentService = new AppointmentService();
        const data: AppointmentUpdateStatusDto = req.body;

        try {

            const appointment: IAppointment = await appointmentSrv.findById(data.idAppointment);
            const appointemntStatusList: AppointmentStatusInterface[] = await appointmentStatusSrv.findAll();

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
                const updated: any = await appointmentSrv.updateStatus(data.idAppointment, data.status);
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

        const appointmentSrv: AppointmentService = new AppointmentService();
        const idAppointment: string = req.params.id;

        try {
            return res.status(httpstatus.ACCEPTED).send(new JsonResp(
                true,
                'Consulta actualizada correctamente',
                await appointmentSrv.findById(idAppointment)
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

        const appointmentSrv: AppointmentService = new AppointmentService();
        const appointmentData: AppointmentUpdateDto = req.body;
        const user: any = req.params.user;

        try {

            const updated: any = await appointmentSrv.update(appointmentData._id, await setProperties());
            const appointment: IAppointment = await appointmentSrv.findById(appointmentData._id);

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

        async function setProperties(): Promise<AppointmentUpdateDto>  {
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
}