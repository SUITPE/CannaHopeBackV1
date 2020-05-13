import { Request, Response } from 'express';
import httpstatus from 'http-status';
import JsonResp from '../../models/jsonResp';
import { DoctorAvailabilityCreateDto } from '../../dto/DoctorAvailability.dto';
import { DoctorAvailabilityService } from '../../services/doctorAvailability.service';
import { DoctorAvailability } from '../../schema/DoctorAvailability.schema';
import { DoctorAvailabilityModel } from '../../models/doctorAvailability';


export class DoctorAvailabilityController {


    public async createDoctorAvailability(req: Request, res: Response): Promise<Response> {

        const doctorAvailability: DoctorAvailabilityCreateDto = req.body;
        const doctorAvailabilitySrv: DoctorAvailabilityService = new DoctorAvailabilityService();

        try {

            const newDoctorAvailability: DoctorAvailabilityModel = new DoctorAvailability({
                doctor: doctorAvailability.doctor,
                timeSet: doctorAvailability.timeSet,
                duartion: doctorAvailability.duartion
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
}