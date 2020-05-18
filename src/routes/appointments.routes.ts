import { Router } from 'express';
import { AppointmentController } from '../controllers/appointment/appointments.controller';
import UserValidation from '../middlewares/userValidation.middleware';


const appointmentsRoutes: Router = Router();
const appointmentCtr: AppointmentController = new AppointmentController();


appointmentsRoutes.post('/save', UserValidation.validation, appointmentCtr.registerAppointment);
appointmentsRoutes.get('/getAll', UserValidation.validation, appointmentCtr.getAll);
appointmentsRoutes.post('/updateStatus', UserValidation.validation, appointmentCtr.updateStatus);
appointmentsRoutes.get('/getById/:id', UserValidation.validation, appointmentCtr.getById);

export default appointmentsRoutes;