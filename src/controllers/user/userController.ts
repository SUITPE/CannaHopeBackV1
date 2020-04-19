import { UserModel } from '../../models/user';
import User from '../../models/user';
import bcrypt from 'bcrypt';
import { ErrorDetail } from '../../models/jsonResp';
import buffer from 'buffer';
import path from 'path';
import fs from 'fs';




export default class UserController {

    public save(userData: UserModel): Promise<UserModel> {
        return new Promise(async (resolve, reject) => {


            if (userData.image) {
                userData.image = await this.setUserImage(userData.image, userData);
            }

            const user: UserModel = new User({
                _id: userData._id,
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
                password: bcrypt.hashSync((userData.password).toString(), 10),
                rol: userData.rol,
                createDate: userData.createDate,
                createdBy: userData.createdBy,
                updateDate: userData.updateDate,
                updatedBy: userData.updatedBy,
                image: userData.image
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

                User.findByIdAndUpdate(idUser, user, (error: any, userUpdated: any) => {
                    if (error) {
                        const errorDetail: ErrorDetail = {
                            name: 'Error en la consulta al actualizar usuario',
                            description: error
                        }

                        throw errorDetail;
                    }

                    userUpdated.image = userImage
                    resolve(userUpdated);

                });

            } catch (error) {
                reject(error);
            }


        });
    }

    public getAll(from: number, limit: number): Promise<any> {
        return new Promise((resolve, reject) => {

            try {
                User.find({}, {
                    password: 0
                })
                    .skip(from)
                    .limit(limit)
                    .populate('rol', 'name description')
                    .populate('createdBy', 'names surenames nickName')
                    .exec((error, users) => {

                        if (error) {
                            const errorDetail: ErrorDetail = {
                                name: 'Error al cargar lista de usuarios',
                                description: error
                            }
                            throw ErrorDetail;
                        }

                        User.countDocuments({}, (err: any, total) => {

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

    public getById(): Promise<UserModel> {
        return new Promise((resolve, reject) => {

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
                                description: `Usuario con ${params} no se encuentra registrado en sistema`
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
            User.countDocuments({}, (err: any, total) => {
                resolve(total);
            });
        });
    }

    private setUserImage(base64Imgae: string, user: UserModel): Promise<string> {
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
}
