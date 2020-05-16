import { Request, Response } from 'express';
import httpstatus from 'http-status';
import JsonResp from '../../models/jsonResp';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentCreateDto } from '../../dto/appointment.dto';
import { UserModel } from '../../models/user';
import { IAppointment } from '../../models/appointment.interface';
import { Appointment } from '../../schema/appointment.schema';
import { environments } from '../../environments/varEnvironments';
const moment = require('moment-timezone');

export class AppointmentController {

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
}