import { Router } from 'express';
import UserValidation from '../middlewares/userValidation.middleware';
import { AppointmentStatusController } from '../controllers/appointment/appointementStatus.controller';


const appointemnetStatusCtr: AppointmentStatusController = new AppointmentStatusController()
const appointmentStatusRoutes = Router();

appointmentStatusRoutes.get('', UserValidation.validation, (req, res) => appointemnetStatusCtr.getAll(req, res));

export default appointmentStatusRoutes;