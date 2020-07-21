
import { ErrorDetail } from '../models/jsonResp';
import e from 'express';
import { AppointmentTypeModel } from '../models/appointmenttype.model';
import { AppointmentType } from '../schema/appointmentType.schema';


interface AppointmenttypeInterface {
    findAll(): Promise<AppointmentTypeModel[]>
}


export class AppointmentTypeService implements AppointmenttypeInterface {

    constructor() {}

    public async findAll(): Promise<AppointmentTypeModel[]> {
        try {
            return await AppointmentType.find({ enabled: true });
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en consulta a la base de datos',
                description: error
            }
            throw errorDetail;
        }
    }


}