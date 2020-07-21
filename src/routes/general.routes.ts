import { Router } from 'express';
import GeneralServices from '../controllers/generalControllers/general';
import DocumentTypeController from '../controllers/user/documentType.controller';
import UserValidation from '../middlewares/userValidation.middleware';

const generalRoutes: Router = Router();
const docuemtTypeCtr: DocumentTypeController = new DocumentTypeController();

generalRoutes.get('/GeDocuments/:type/:documentPath', GeneralServices.getDocuments);
generalRoutes.get('/getDashboardData', GeneralServices.getDashboardData);
generalRoutes.post('/documentType/save', UserValidation.validation, (req, res) =>  docuemtTypeCtr.saveNewDocumentType(req, res));
generalRoutes.get('/documentType/find', UserValidation.validation, (req, res) =>  docuemtTypeCtr.getAll(req, res));

export default generalRoutes;