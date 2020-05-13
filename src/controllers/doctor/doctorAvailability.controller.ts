import { Request, Response } from 'express';
import httpstatus from 'http-status';
import JsonResp from '../../models/jsonResp';
import { DoctorAvailabilityCreateDto } from '../../dto/DoctorAvailability.dto';
import { DoctorAvailabilityService } from '../../services/doctorAvailability.service';
import { IDoctorAvailability } from '../../models/doctorAvailability';
import { DoctorAvailability } from '../../schema/DoctorAvailability.schema';


export class DoctorAvailabilityController {


    public async createDoctorAvailability(req: Request, res: Response): Promise<Response> {

        const doctorAvailability: DoctorAvailabilityCreateDto = req.body;
        const doctorAvailabilitySrv: DoctorAvailabilityService = new DoctorAvailabilityService();

        try {

            const newDoctorAvailability: IDoctorAvailability = new DoctorAvailability({
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
}