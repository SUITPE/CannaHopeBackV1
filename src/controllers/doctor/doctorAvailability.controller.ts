import { Request, Response } from 'express';
import httpstatus from 'http-status';
import JsonResp from '../../models/jsonResp';
import { DoctorAvailabilityCreateDto, GetCurrentDoctorAvailabilityDto } from '../../dto/DoctorAvailability.dto';
import { DoctorAvailabilityService } from '../../services/doctorAvailability.service';
import { DoctorAvailability } from '../../schema/DoctorAvailability.schema';
import { DoctorAvailabilityModel } from '../../models/doctorAvailability';
import { AppointmentService } from '../../services/appointment.service';
import { IAppointment } from '../../models/appointment.interface';


export class DoctorAvailabilityController {

    public async createDoctorAvailability(req: Request, res: Response): Promise<Response> {

        const doctorAvailability: DoctorAvailabilityCreateDto = req.body;
        const doctorAvailabilitySrv: DoctorAvailabilityService = new DoctorAvailabilityService();

        try {

            const newDoctorAvailability: DoctorAvailabilityModel = new DoctorAvailability({
                doctor: doctorAvailability.doctor,
                timeTo: doctorAvailability.timeTo,
                timeFrom: doctorAvailability.timeFrom
            });

            return res.status(httpstatus.ACCEPTED).send(new JsonResp(
                true,
                'Disponibilidad de doctor guardada correctamente',
                await doctorAvailabilitySrv.save(newDoctorAvailability)
            ));
        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error al registrar disponibilidad de doctor',
                error
            ));
        }
    }

    public async getAllDoctorAvailabilities(req: Request, res: Response): Promise<Response> {
        const doctorAvailabilitySrv: DoctorAvailabilityService = new DoctorAvailabilityService();
        try {
            return res.status(httpstatus.ACCEPTED).send(new JsonResp(
                true,
                'Franja de disponibilidad de doctor cargada correctamente',
                await doctorAvailabilitySrv.findAll()
            ));
        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error al cargar franja de disponibilidad de doctor',
                error
            ));
        }
    }

    public async getDoctorAvailabilitiesByIdDoctor(req: Request, res: Response): Promise<Response> {

        const doctorAvailabilitySrv: DoctorAvailabilityService = new DoctorAvailabilityService();
        const idDoctor: string = req.params.idDoctor;

        try {
            return res.status(httpstatus.ACCEPTED).send(new JsonResp(
                true,
                'Franja de disponibilidades de doctor cargadas correctamente',
                await doctorAvailabilitySrv.findByDoctorId(idDoctor)
            ));
        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error al cargar franja de disponibilidad de doctor',
                error
            ));
        }
    }

    public async deleteDoctorAvailabilityById(req: Request, res: Response): Promise<Response> {

        const doctorAvailabilitySrv: DoctorAvailabilityService = new DoctorAvailabilityService();
        const IdDoctorAvailability: string = req.params.id;

        try {
            return res.status(httpstatus.ACCEPTED).send(new JsonResp(
                true,
                'Franja de disponibilidad de doctor eliminada correctamente',
                await doctorAvailabilitySrv.delete(IdDoctorAvailability)
            ));
        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error emn la eliminación',
                error
            ));
        }
    }

    public async getCurrentDoctorAvailability(req: Request, res: Response): Promise<Response> {

        const userData: GetCurrentDoctorAvailabilityDto = req.body;
        const appointmentSrv: AppointmentService = new AppointmentService();
        const doctorAvailabilitySrv: DoctorAvailabilityService = new DoctorAvailabilityService();

        try {


            const appointmentsRegistered: IAppointment[] = await appointmentSrv.findByDateAndDoctor(userData.idDoctor, new Date(userData.date));
            const doctorAvailabilityList: DoctorAvailabilityModel[] = await doctorAvailabilitySrv.findByDoctorId(userData.idDoctor);

            const currentDoctorAvailability: any[] = [];
            for (const item of doctorAvailabilityList) {
                // tslint:disable-next-line: triple-equals
                const founded = appointmentsRegistered.find(appointment => appointment.doctorAvailability._id == item.id);
                if (!founded) {
                    currentDoctorAvailability.push(item);
                }
            }

            return res.status(httpstatus.ACCEPTED).send(new JsonResp(
                true,
                currentDoctorAvailability.length > 0 ? 'Disponibilidad de doctor cargada correctamente' : 'No hay dispinibilidad de doctor para la fecha establecida',
                currentDoctorAvailability
            ));

        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error al cargar disponibilidad de doctor',
                error
            ));
        }
    }
}