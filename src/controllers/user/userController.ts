import { UserModel } from '../../models/user';
import User from '../../models/user';
import bcrypt from 'bcrypt';
import { ErrorDetail } from '../../models/jsonResp';
import fs from 'fs';
import UserService from '../../services/user.service';


export default class UserController {

    public save(userData: UserModel): Promise<UserModel> {
        return new Promise(async (resolve, reject) => {
            const userSrv: UserService = new UserService();
            try {
                const userFounded: UserModel = await userSrv.findByEmail(userData.email);
                if (userFounded) {
                    const errorDetail: ErrorDetail = {
                        name: `El ${userData.names} usuario ya se encuentra registrado en sistema`,
                        description: null
                    }
                    reject(errorDetail);
                }

                if (userData.image) {
                    userData.image = await this.setUserImage(userData.image, userData);
                }

                if (userData.password) {
                    userData.password = bcrypt.hashSync((userData.password).toString(), 10);
                }

                const user: UserModel = new User({
                    names: userData.names,
                    surenames: userData.surenames,
                    nickName: userData.nickName,
                    age: userData.age,
                    birthDate: userData.birthDate,
                    sex: userData.sex,
                    document: userData.document,
                    documentType: userData.documentType,
                    maritalStatus: userData.maritalStatus,
                    ocupation: userData.ocupation,
                    address: userData.address,
                    email: userData.email,
                    mobilePhone: userData.mobilePhone,
                    landLine: userData.landLine,
                    healthyEntity: userData.healthyEntity,
                    password: userData.password,
                    rol: userData.rol,
                    createDate: userData.createDate,
                    createdBy: userData.createdBy,
                    updateDate: userData.updateDate,
                    updatedBy: userData.updatedBy,
                    image: userData.image,
                    specialty: userData.specialty,
                    children: userData.children
                });

                user.save({}, (error: any, userSaved) => {
                    if (error) {
                        const errorDetail: ErrorDetail = {
                            name: 'Error al momento de registrar usuario',
                            description: error,
                            status: 500
                        }
                        reject(errorDetail);
                    } else {
                        resolve(userSaved);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    public update(idUser: string, user: UserModel): Promise<any> {
        return new Promise(async (resolve, reject) => {

            let userImage: string;
            try {

                if (user.image && user.image.length > 50) {
                    userImage = await this.setUserImage(user.image, user);
                    user.image = userImage;
                }

                if (user.password !== null) {
                    user.password = bcrypt.hashSync((user.password).toString(), 10)
                } else {
                    delete user.password;
                }

                User.findByIdAndUpdate(idUser, user)
                    .populate('rol')
                    .populate('createdBy', 'names surenames nickName')
                    .exec((error, userUpdated) => {
                        if (error) {
                            const errorDetail: ErrorDetail = {
                                name: 'Error en la consulta al actualizar usuario',
                                description: error
                            }
                            throw errorDetail;
                        }
                    });

                const newUser: UserModel = await this.getById(user._id);

                resolve(newUser);


            } catch (error) {
                reject(error);
            }


        });
    }

    public getAll(from: number, limit: number): Promise<any> {
        return new Promise((resolve, reject) => {

            try {
                User.find({ status: true }, {
                    password: 0
                })
                    .skip(from)
                    .limit(limit)
                    .populate('rol', 'name description')
                    .populate('createdBy', 'names surenames nickName')
                    .sort({createDate: -1})
                    .exec((error, users) => {

                        if (error) {
                            const errorDetail: ErrorDetail = {
                                name: 'Error al cargar lista de usuarios',
                                description: error
                            }
                            throw errorDetail;
                        }

                        User.countDocuments({ status: true }, (err: any, total) => {

                            const data: any = {
                                total,
                                users
                            }
                            resolve(data);
                        });

                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    public getById(idUser: string): Promise<UserModel> {
        return new Promise((resolve, reject) => {

            User.findById(idUser)
                .populate('rol', 'name description')
                .populate('createdBy', 'names surenames nickName')
                .exec((error, user: UserModel) => {
                    if (error) {
                        const errorDetail: ErrorDetail = {
                            name: `Error al cargar usuario con id ${idUser}`,
                            description: error
                        }
                        throw ErrorDetail;
                    }

                    resolve(user);
                });
        });
    }

    public getByParam(params: object): Promise<UserModel> {
        return new Promise((resolve, reject) => {

            let errorDetil: ErrorDetail = new ErrorDetail();

            try {

                User.findOne(params)
                    .populate('rol', 'name description')
                    .populate('createdBy', 'names surenames nickName')
                    .exec((error: any, user: UserModel) => {

                        if (error) {
                            errorDetil = {
                                name: `Error al consultar usuario con el parametro ${params}`,
                                description: error
                            }
                            reject(errorDetil);
                        }
                        if (!user) {
                            errorDetil = {
                                name: 'Usuario no encontrado',
                                description: `El usuario no nestá registrado en sistema`
                            }
                            reject(errorDetil);
                        }
                        resolve(user);
                    });
            } catch (error) {
                reject(error);
            }

        });
    }

    public findByParams(searchParam: string): Promise<UserModel> {
        return new Promise((resolve, reject) => {

            const regex = new RegExp(searchParam, 'i');

            try {

                User.find({ names: regex })
                    .limit(10)
                    .populate('rol')
                    .populate('createdBy', 'names surenames nickName')
                    .exec((error: any, users: UserModel) => {

                        if (error) {
                            const errorDetail: ErrorDetail = {
                                name: `Fallo al buscar usuarios con parametro ${searchParam}`,
                                description: error
                            }

                            throw errorDetail;
                        }

                        resolve(users);
                    });

            } catch (error) {
                reject(error);
            }


        });
    }

    public getTotalRegistered(): Promise<number> {
        return new Promise((resolve, reject) => {
            User.countDocuments({ status: true }, (err: any, total) => {
                resolve(total);
            });
        });
    }

    public setUserImage(base64Imgae: string, user: any): Promise<string> {
        return new Promise((resolve, reject) => {

            const date = new Date();

            try {

                const extention = base64Imgae.split(';')[0].split('/')[1];
                const imageName = `image-${user._id}-${date.getMilliseconds()}.${extention}`;

                const finalImageName: string = base64Imgae.split(';base64,').pop() || '';

                const buf = Buffer.from(finalImageName, 'base64');

                fs.writeFileSync(`docs/userImages/${imageName}`, buf);

                resolve(imageName);
            } catch (error) {
                reject(error);
            }

        });
    }

    public delete(idUser: string): Promise<UserModel> {
        return new Promise((resolve, reject) => {

            try {
                User.updateOne({ _id: idUser }, { status: false })
                    .exec((error, user) => {

                        if (error) {
                            const errorDetail: ErrorDetail = {
                                name: `Error al eliminar paciente con id ${idUser} `,
                                description: error
                            }

                            reject(errorDetail)
                        }
                        resolve(user);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    public resetPassword(user: UserModel): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {

                const newPassword: string = bcrypt.hashSync((user.password).toString(), 10);
                const dbResp: any = await User.findOneAndUpdate({ _id: user._id }, { password: newPassword });
                resolve(true);

            } catch (error) {
                const errorDetail: ErrorDetail = {
                    name: 'Error al actualizar contraseña de usuario',
                    description: error
                }
                reject(errorDetail);
            }
        });
    }

    public setSignatureImage(base64Imgae: string, user: any): Promise<string> {
        return new Promise((resolve, reject) => {
            const date = new Date();
            try {
                const extention = base64Imgae.split(';')[0].split('/')[1];
                const imageName = `signature-${user._id}-${date.getMilliseconds()}.${extention}`;

                const finalImageName: string = base64Imgae.split(';base64,').pop() || '';

                const buf = Buffer.from(finalImageName, 'base64');

                fs.writeFileSync(`docs/doctorSignatures/${imageName}`, buf);

                resolve(imageName);
            } catch (error) {
                reject(error);
            }

        });
    }
}

