import { Router } from 'express';
import { FitocannabinoidesController } from '../controllers/medicalConsultation/fitocannabinoides.controller';
import UserValidation from '../middlewares/userValidation.middleware';


const medicalConsultationsRoutes = Router();
const fitocannabinoidesCtr: FitocannabinoidesController = new FitocannabinoidesController();

medicalConsultationsRoutes.get('/fitocannabinoides/getAll', UserValidation.validation, (req, res)=> fitocannabinoidesCtr.getAll(req, res));

export default medicalConsultationsRoutes;