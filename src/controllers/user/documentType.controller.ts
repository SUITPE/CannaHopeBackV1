import { Request, Response } from 'express';
import httpstatus from 'http-status';
import JsonResp from '../../models/jsonResp';
import { DocumentTypeSrevice } from '../../services/documentType.service';
import { DocuemtnTypeCreateDto } from '../../dto/documentType.dt';
import { DocumentTypeModel } from '../../models/documentType.interface';
import { DocumentType } from '../../schema/documentType.schema';

export default class DocumentTypeController {

    constructor(
        private documentTypeSrv: DocumentTypeSrevice = new DocumentTypeSrevice()
    ) { }


    public async saveNewDocumentType(req: Request, res: Response): Promise<Response> {

        const documentType: DocuemtnTypeCreateDto = req.body;

        try {
            const newDocumentType: DocumentTypeModel = new DocumentType(documentType);
            return res.status(httpstatus.CREATED).send(new JsonResp(
                true,
                'Tipo de documento registrado exitosamente',
                await this.documentTypeSrv.save(newDocumentType)
            ));
        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error en la base de datos al registrar tipo de documento',
                error
            ));
        }
    }

    public async getAll(req: Request, res: Response): Promise<Response> {
        try {
            return res.status(httpstatus.CREATED).send(new JsonResp(
                true,
                'Tipo de documento registrado exitosamente',
                await this.documentTypeSrv.find()
            ));
        } catch (error) {
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).send(new JsonResp(
                false,
                'Error en la base de datos al Cargar lista de tipos de documento',
                error
            ));
        }
    }
}