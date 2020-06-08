import Patient, { PatientModel } from '../../models/patient';
import UserController from '../user/userController';
import { UserModel } from '../../models/user';
import { ErrorDetail } from '../../models/jsonResp';
import { Request, Response } from 'express';
import JsonResp from '../../models/jsonResp';
import httpstatus from 'http-status';
import { PatientUpdateDto } from '../../dto/patient.dto';
import PatientService from '../../services/patient.service';

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
                    select: 'image _id names surenames  mobilePhone document email sex',
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
            Patient.countDocuments({},(err: any, total) => {
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
                        path: 'user',
                        select: 'image _id names surenames  mobilePhone document email sex',
                        populate: {
                            path: 'rol',
                            select: 'description name'
                        },
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
                        const param: string = searchParams.toUpperCase();
                        const founded = patients.filter(patient => patient.user.names.toUpperCase().includes(param)  || patient.user.surenames.toUpperCase().includes(param))
                        resolve(founded);
                    });
            } catch (error) {
                reject(JSON.stringify(error));
            }
        });
    }

    public updateAppointmentNumber(idPatient: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const patient: any = await Patient.findById(idPatient);
                const patientUpdated: any = await Patient.updateOne({ _id: idPatient }, { numberOfAppointment: patient.numberOfAppointment + 1 });
                resolve(true);

            } catch (error) {
                reject(error);
            }
        });
    }

    public async updatePatient(req: Request, res: Response): Promise<Response> {

        const patietnSrv: PatientService = new PatientService();
        const userCtr: UserController = new UserController();
        const patient: PatientUpdateDto = req.body;

        try {

            if (patient.image) {
                patient.image = await userCtr.setUserImage(patient.image, patient);
            }

            const patientUpdated = await patietnSrv.update(patient);

            return res.status(httpstatus.ACCEPTED).send(new JsonResp(
                true,
                'Paciente actualizado correctamente',
                patientUpdated
            ));

        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error en la base de datos al editar paciente',
                error
            ));
        }
    }
}