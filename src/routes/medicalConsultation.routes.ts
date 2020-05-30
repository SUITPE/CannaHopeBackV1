import { Router } from 'express';
import { FitocannabinoidesController } from '../controllers/medicalConsultation/fitocannabinoides.controller';
import UserValidation from '../middlewares/userValidation.middleware';
import { MedicalRecipeController } from '../controllers/medicalConsultation/medicalRecipe.controller';


const medicalConsultationsRoutes = Router();
const fitocannabinoidesCtr: FitocannabinoidesController = new FitocannabinoidesController();
const medicalRecipeCtr: MedicalRecipeController = new MedicalRecipeController();

medicalConsultationsRoutes.get('/fitocannabinoides/getAll', UserValidation.validation, (req, res) => fitocannabinoidesCtr.getAll(req, res));
medicalConsultationsRoutes.get('/getRecipe/:type/:id',
    (req, res) => medicalRecipeCtr.generateAnSendMedicalRecipe(req, res));

export default medicalConsultationsRoutes;