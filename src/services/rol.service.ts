import { RolModel } from '../models/role';
import { ErrorDetail } from '../models/jsonResp';
import Rol from '../models/role';


export default class RolService {

    public async findByNane(rolName: string): Promise<RolModel> {
        try {
            const rolFounded: any = await Rol.findOne({name: rolName});
            return rolFounded;
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error al consulta rol por nombre en la base de datos',
                description: error
            }
            throw errorDetail;
        }
    }
}