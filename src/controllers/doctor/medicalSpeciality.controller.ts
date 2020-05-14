import { Request, Response } from 'express';
import httpstatus from 'http-status';
import JsonResp from '../../models/jsonResp';
import { MedicalSpeciality } from '../../schema/medicalSpeciality.schema';
import { MedicalSpecialityService } from '../../services/medicalSpeciality.service';
import { MedicalSpecialityCreateDto, MedicalSpecialityUpdateDto } from '../../dto/medialSpeciality.dto';
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


    public async getAllmedicalSpecialities(req: Request, res: Response): Promise<Response> {

        const medicalSpecialitySrv: MedicalSpecialityService = new MedicalSpecialityService();

        try {
            return res.status(httpstatus.ACCEPTED).send(new JsonResp(
                true,
                'Lista de especialidades medicas cargada correctamente',
                await medicalSpecialitySrv.find()
            ));
        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error al cargar especialidades medicas registradas',
                error
            ));
        }
    }

    public async UpdatemedicalSpeciality(req: Request, res: Response): Promise<Response> {

        const medicalSpecialitySrv: MedicalSpecialityService = new MedicalSpecialityService();
        const medicalSpeciality: MedicalSpecialityUpdateDto = req.body;
        const idMedicalSpeciality: string = req.params.id;

        try {
            return res.status(httpstatus.CREATED).send(new JsonResp(
                true,
                `Especialidad medica ${medicalSpeciality.name} actualizada correctamente`,
                await medicalSpecialitySrv.update(idMedicalSpeciality, medicalSpeciality)
            ));
        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error en lña base de datos al actualizar especialidad',
                error
            ));
        }
    }

}