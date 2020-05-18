import { Router } from 'express';
import GeneralServices from '../controllers/generalControllers/general';



const generalRoutes: Router = Router();

generalRoutes.get('/GeDocuments/:type/:documentPath', GeneralServices.getDocuments);


export default generalRoutes;