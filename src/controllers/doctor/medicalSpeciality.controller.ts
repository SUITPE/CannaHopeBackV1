import { Request, Response } from 'express';
import httpstatus from 'http-status';
import JsonResp from '../../models/jsonResp';
import { MedicalSpeciality } from '../../schema/medicalSpeciality.schema';
import { MedicalSpecialityService } from '../../services/medicalSpeciality.service';
import { MedicalSpecialityCreateDto } from '../../dto/medialSpeciality.dto';
import { MedicalSpecialityModel } from '../../models/medicalSpeciality.interface';


export class MedicalSpecialityController {

    public async createMedicalSpeciality(req: Request, res: Response): Promise<Response> {

        const medicalSpecialitySrv: MedicalSpecialityService = new MedicalSpecialityService();
        const medicalSpeciality: MedicalSpecialityCreateDto = req.body;

        try {
            const newMedicalSpeciality: MedicalSpecialityModel = new MedicalSpeciality(medicalSpeciality);
            return res.status(httpstatus.CREATED).send(new JsonResp(
                true,
                'especialidad registrada correctamente',
                await medicalSpecialitySrv.save(newMedicalSpeciality)
            ));
        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error al registrar especialidad en sistema',
                error
            ));
        }
    }
}