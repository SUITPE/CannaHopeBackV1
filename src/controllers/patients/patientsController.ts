import Patient, { PatientModel } from '../../models/patient';
import UserController from '../user/userController';
import { UserModel } from '../../models/user';
import { ErrorDetail } from '../../models/jsonResp';
import path from 'path';



export default class PatientController {

    constructor() { }

    public insert(patient: PatientModel): Promise<PatientModel> {
        return new Promise(async (resolve, reject) => {
            try {

                const userCtr: UserController = new UserController();
                const userSaved: UserModel = await userCtr.save(patient);

                const newPatient: PatientModel = new Patient({
                    reasonAdmission: patient.reasonAdmission,
                    numberOfAppointment: 0,
                    patientStatus: null,
                    user: userSaved._id
                });


                newPatient.save({}, async (error, patientSaved) => {

                    if (error) {
                        const erroDetail: ErrorDetail = {
                            name: 'Error al guardar paciente',
                            description: error
                        }

                        reject(error);
                    }

                    const patiendRes: PatientModel = await this.findById(patientSaved.id);
                    resolve(patiendRes);
                });

            } catch (error) {
                reject(error);
            }
        });
    }

    public findById(idPatient: string): Promise<PatientModel> {
        return new Promise((resolve, reject) => {

            try {

                Patient.findById(idPatient)
                    .populate({
                        path: 'user',
                        select: '-password',
                        populate: [
                            {
                                path: 'rol ',
                                select: 'description',
                            },
                            {
                                path: 'createdBy ',
                                select: 'nickName',
                            },
                        ]

                    })
                    .exec((error: any, patient: PatientModel) => {

                        if (error) {
                            const errorDetail: ErrorDetail = {
                                name: `Error cargar paciente con id ${idPatient}`,
                                description: error
                            }
                            reject(errorDetail);
                        }

                        resolve(patient);

                    });

            } catch (error) {
                reject(error);
            }
        });
    }

    public getAll(from: number, limit: number): Promise<PatientModel[]> {
        return new Promise((resolve, reject) => {


            Patient.find()
                .populate({
                    path: 'user',
                    select: 'image _id names surenames  mobilePhone document email',
                    populate: {
                        path: 'rol',
                        select: 'description'
                    }
                })
                .skip(from)
                .limit(limit)
                .exec((error, patients) => {
                    if (error) {
                        const errorDetail: ErrorDetail = {
                            name: `Error al cargar pacienttes`,
                            description: error
                        }
                        reject(errorDetail);
                    }

                    resolve(patients);
                });
        });
    }

    public getTotalRegistered(): Promise<number> {
        return new Promise((resolve, reject) => {
            Patient.countDocuments({ patientStatus: 'active' }, (err: any, total) => {
                resolve(total);
            });
        });
    }

    public findByParams(searchParams: string): Promise<PatientModel[]> {
        return new Promise((resolve, reject) => {

            const regex = new RegExp(searchParams, 'i');
            try {

                Patient.find()
                    .populate({
                        match: {
                            names: regex
                        },
                        path: 'user',
                        select: 'image _id names surenames  mobilePhone document email',
                        populate: {
                            path: 'rol',
                            select: 'description name'
                        }
                    })
                    .exec((error: any, patients) => {

                        if (error) {
                            const errorDetail: ErrorDetail = {
                                name: 'Error al consultar pacientes por parametro establecido',
                                description: error
                            }
                            reject(error);
                        }

                        if (patients.length > 0) {
                            patients = patients.filter(patient => patient.user !== null);
                        }

                        resolve(patients);
                    });
            } catch (error) {
                reject(JSON.stringify(error));
            }
        });
    }
}