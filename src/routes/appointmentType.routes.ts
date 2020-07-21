import { Router } from 'express';
import appointmentsRoutes from './appointments.routes';
import UserValidation from '../middlewares/userValidation.middleware';
import { AppointmentTypesController } from '../controllers/appointment/appointmentType.controller';
import { AppointmentTypeService } from '../services/appointmentType.service';


const appointmetnTypeSrv: AppointmentTypeService = new AppointmentTypeService()
const appointmentTypeCtr: AppointmentTypesController = new AppointmentTypesController(appointmetnTypeSrv);
const appointmentTypeRoutes = Router();

appointmentTypeRoutes.get('', UserValidation.validation, (req, res) => appointmentTypeCtr.getAll(req, res));

export default appointmentTypeRoutes;