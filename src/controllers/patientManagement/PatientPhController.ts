import { PatientPhModel } from '../../models/patientPh';
import PatientPh from '../../models/patientPh';
import { ErrorDetail } from '../../models/jsonResp';
import { PatientPhModelCreateDto, PatientPhUpdateDto } from '../../dto/PatientPhModel.dto';
import { Request, Response } from 'express';
import { PatientPhService } from '../../services/patientPh.service';
import { environments, seed } from '../../environments/varEnvironments';
import JsonResp from '../../models/jsonResp';
import httpstatus from 'http-status';
import { PatientModel } from '../../models/patient';


// PatientPathologicalHistory controller
export class PatientPhController {

    private errorDetail: ErrorDetail = new ErrorDetail();
    constructor(
        private patientPhSrv: PatientPhService = new PatientPhService()
    ) { }

    public save(req: any, res: Response): Promise<Response> {
        return new Promise(async (resolve, reject) => {

            const patientPh: PatientPhModelCreateDto = req.body;
            const user: any = req.user;

            try {
                const newPatientPh: PatientPhModel = await mapPatientPhData();
                const patientPhSaved: PatientPhModel = await this.patientPhSrv.save(newPatientPh);

                resolve(
                    res.status(httpstatus.CREATED).send(new JsonResp(
                        true,
                        'Historial patologico registrado exitosamene',
                        patientPhSaved
                    ))
                )
            } catch (error) {
                res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                    false,
                    'Error al registrar historial patologico de paciente',
                    error
                ))
            }

            async function validatePatientPhData(): Promise<boolean> {
                try {
                    if (patientPh.diseaseList.length === 0) {
                        throw new Error('Error en validacion - no se ha registrado una lista de antecendeces patologicos');
                    }

                    if (!patientPh.harmfulHabitsList || patientPh.harmfulHabitsList.length === 0) {
                        throw new Error('Error en validacion - no se ha registrado una lista de habitos nocivos');
                    }

                    return true;
                } catch (error) {
                    const errorDetail: ErrorDetail = {
                        name: 'Error en validacion de datos',
                        description: error
                    }
                    throw errorDetail;
                }
            }

            async function mapPatientPhData(): Promise<PatientPhModel> {
                try {
                    const newPatientPh: PatientPhModel = new PatientPh({
                        patient: patientPh.patient,
                        diseaseList: patientPh.diseaseList,
                        description: patientPh.description,
                        createdBy: user._id,
                        createDate: environments.currentDate(),
                        harmfulHabitsList: patientPh.harmfulHabitsList,
                        familyPph: patientPh.familyPph,
                        currentMedication: patientPh.currentMedication,
                        surgeries: patientPh.surgeries,
                        fur: patientPh.fur,
                        pregnancies: patientPh.pregnancies,
                        poisonings: patientPh.poisonings,
                        hospitalizations: patientPh.hospitalizations,
                        healthyHabits: patientPh.healthyHabits
                    });

                    return newPatientPh;

                } catch (error) {
                    const errorDetail: ErrorDetail = {
                        name: 'Error al estructurar información de historial patologico para ser guardado',
                        description: error
                    }
                    throw errorDetail;
                }
            }
        });
    }

    public async findAndUpdate(req: any, res: Response): Promise<Response> {

        const patientPh: PatientPhUpdateDto = req.body;
        const user: any = req.user;

        try {

            const newPatiemtPh: PatientPhModel = await mapPatientPhData();
            const updated: PatientPhModel = await this.patientPhSrv.update(newPatiemtPh);
            const patientPhResp: PatientPhModel = await this.patientPhSrv.findById(patientPh._id);

            return res.status(httpstatus.CREATED).send(new JsonResp(
                true,
                'Historia patologico registrado correctamente',
                patientPhResp
            ));

        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error al actualizar datos de historial patologico',
                null, error
            ));
        }

        async function mapPatientPhData(): Promise<PatientPhModel> {
            try {
                const newPatientPh = new PatientPh({
                    _id: patientPh._id,
                    patient: patientPh.patient,
                    diseaseList: patientPh.diseaseList,
                    description: patientPh.description,
                    updateDate: environments.currentDate(),
                    updatedBy: user._id,
                    harmfulHabitsList: patientPh.harmfulHabitsList,
                    familyPph: patientPh.familyPph,
                    currentMedication: patientPh.currentMedication,
                    surgeries: patientPh.surgeries,
                    fu: patientPh.fu,
                    pregnancies: patientPh.pregnancies,
                    poisonings: patientPh.poisonings,
                    hospitalizations: patientPh.hospitalizations
                });

                return newPatientPh;
            } catch (error) {
                const errorDetail: ErrorDetail = {
                    name: 'Error en validacion de datos - mapeo de información de paciente',
                    description: error
                }
                throw (errorDetail);
            }
        }
        // return new Promise((resolve, reject) => {

        //     try {

        //         PatientPh.updateOne({ _id: patientPh._id }, patientPh, async (error, patientPhSaved) => {
        //             if (error) {
        //                 this.errorDetail.name = 'Error en la base de datos al actualizar historial patologico de paciente';
        //                 this.errorDetail.description = error;
        //                 reject(error);
        //             } else {
        //                 const patientUpdated: PatientPhModel = await this.findBypatientId(patientPh.patient);
        //                 resolve(patientUpdated);
        //             }
        //         });
        //     } catch (error) {
        //         reject(error);
        //     }
        // });
    }

    public findBypatientId(idPatient: string): Promise<PatientPhModel> {
        return new Promise((resolve, reject) => {

            try {
                PatientPh.findOne({ patient: idPatient })
                    .populate({
                        path: 'createdBy',
                        select: 'names surenames email mobilePhone'
                    })
                    .exec((error, patientFounded: PatientPhModel) => {
                        if (error) {
                            this.errorDetail.name = 'Error en la base de datos al cargar registro patologico por id de paciente';
                            this.errorDetail.description = error;
                            reject(this.errorDetail);
                        } else {
                            resolve(patientFounded)
                        }
                    });
            } catch (error) {
                reject(error);
            }

        });
    }

}

