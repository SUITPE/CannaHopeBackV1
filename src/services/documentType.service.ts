import { DocumentTypeModel } from '../models/documentType.interface';
import { ErrorDetail } from '../models/jsonResp';
import { DocumentType } from '../schema/documentType.schema';

export  class DocumentTypeSrevice {

    constructor() {}

    public async save(documentType: DocumentTypeModel): Promise<DocumentTypeModel> {
        try {
            return await documentType.save();
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error en la base de datos al insertar tipo de documento',
                description: error
            }
            throw errorDetail;
        }
    }

    public async find(): Promise<DocumentTypeModel[]> {
        try {
            return await DocumentType.find({isEnabled: true});
        } catch (error) {
            const errorDetail: ErrorDetail = {
                name: 'Error al consultar tipo de documento',
                description: error
            }
            throw errorDetail;
        }
    }
}