import PatientAuxiliary, { PatientAuxiliaryModel } from '../../models/patientAuxiliary';
import { ErrorDetail } from '../../models/jsonResp';
import { PatientAuxiliaryModelCreateDto, PatientAuxiliaryUpdateDto } from '../../dto/PatientAuxiliaryModel.dto';
import { Request, Response } from 'express';
import PatientAuxiliaryService from '../../services/patientAuxiliary.service';
import { environments, seed } from '../../environments/varEnvironments';
import JsonResp from '../../models/jsonResp';
import httpstatus from 'http-status';
import { PatientModel } from '../../models/patient';


// PatientPathologicalHistory controller
export class PatientAuxiliaryController {

    private errorDetail: ErrorDetail = new ErrorDetail();
    constructor(
        private patientAuxiliarySrv: PatientAuxiliaryService = new PatientAuxiliaryService()
    ) { }

    public save(req: any, res: Response): Promise<Response> {
        return new Promise(async (resolve, reject) => {

            const patientAuxiliary: PatientAuxiliaryModelCreateDto = req.body;

            try {
                
                const newPatientAuxiliary: PatientAuxiliaryModel = await mapPatientAuxiliaryData();
                const patientAuxiliarySaved: PatientAuxiliaryModel = await this.patientAuxiliarySrv.save(newPatientAuxiliary);

                resolve(
                    res.status(httpstatus.CREATED).send(new JsonResp(
                        true,
                        'Exámenes auxiliares e informes registrado exitosamene',
                        patientAuxiliarySaved
                    ))
                )
            } catch (error) {
                res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                    false,
                    'Error al registrar exámenes auxiliares e informes',
                    error
                ))
            }

            async function mapPatientAuxiliaryData(): Promise<PatientAuxiliaryModel> {
                try {
                    const newPatientAuxiliary: PatientAuxiliaryModel = new PatientAuxiliary({
                        patient: patientAuxiliary.patient,
                        registerDate: patientAuxiliary.registerDate,
                        username: patientAuxiliary.username,
                        examDate: patientAuxiliary.examDate,
                        examReason: patientAuxiliary.examReason,
                        file: patientAuxiliary.file
                    });

                    return newPatientAuxiliary;

                } catch (error) {
                    const errorDetail: ErrorDetail = {
                        name: 'Error al estructurar exámenes auxiliares e informes para ser guardado',
                        description: error
                    }
                    throw errorDetail;
                }
            }
        });
    }

    public async findAndUpdate(req: any, res: Response): Promise<Response> {

        const patientAuxiliary: PatientAuxiliaryUpdateDto = req.body;

        try {

            const newPatientAuxiliary: PatientAuxiliaryModel = await mapPatientAuxiliaryData();

            const oldPatientAuxiliary: any = await this.patientAuxiliarySrv.getByIdPatient(patientAuxiliary.patient);
            if (oldPatientAuxiliary.length == 0) {
                const patientAuxiliarySaved: PatientAuxiliaryModel = await this.patientAuxiliarySrv.save(newPatientAuxiliary);
                return res.status(httpstatus.CREATED).send(new JsonResp(
                    true,
                    'Exámenes auxiliares e informes registrado correctamente',
                    patientAuxiliarySaved
                ));
            }
            
            const patientAuxiliaryResp: PatientAuxiliaryModel = await this.patientAuxiliarySrv.update(patientAuxiliary);

            return res.status(httpstatus.CREATED).send(new JsonResp(
                true,
                'Exámenes auxiliares e informes registrado correctamente',
                patientAuxiliaryResp
            ));

        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error al actualizar datos de exámenes auxiliares e informes',
                null, error
            ));
        }

        async function mapPatientAuxiliaryData(): Promise<PatientAuxiliaryModel> {
            try {
                const newPatientAuxiliary = new PatientAuxiliary({
                    _id: patientAuxiliary._id,
                    patient: patientAuxiliary.patient,
                    registerDate: patientAuxiliary.registerDate,
                    username: patientAuxiliary.username,
                    examDate: patientAuxiliary.examDate,
                    examReason: patientAuxiliary.examReason,
                    file: patientAuxiliary.file
                });

                return newPatientAuxiliary;
            } catch (error) {
                const errorDetail: ErrorDetail = {
                    name: 'Error en validacion de datos - mapeo de exámenes auxiliares e informes',
                    description: error
                }
                throw (errorDetail);
            }
        }
    }

    public findByPatientId(idPatient: string): Promise<PatientAuxiliaryModel> {
        return new Promise((resolve, reject) => {

            try {
                PatientAuxiliary.find({ patient: idPatient })
                    .populate({
                        path: 'createdBy',
                        select: 'names surenames email mobilePhone'
                    })
                    .exec((error, patientFounded: PatientAuxiliaryModel) => {
                        if (error) {
                            this.errorDetail.name = 'Error en la base de datos al cargar registro exámenes auxiliares e informes por id de paciente';
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

