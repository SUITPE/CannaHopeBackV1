import { UserModel } from '../models/user';
import { ErrorDetail } from '../models/jsonResp';
import User from '../models/user';


export default class UserService {


    public async update(user: any): Promise<UserModel> {
        try {
            return await User.updateOne({ _id: user._id }, user);
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error la hacer consulta en db',
                description: error
            }
            throw (errorDetail);
        }
    }
}