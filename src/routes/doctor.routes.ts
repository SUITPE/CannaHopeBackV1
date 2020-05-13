import { Router } from 'express';
import UserValidation from '../middlewares/userValidation.middleware';
import { DoctorAvailabilityController } from '../controllers/doctor/doctorAvailability.controller';
import { DoctorAvailability } from '../schema/DoctorAvailability.schema';


const doctorAvailabilityCtr: DoctorAvailabilityController = new DoctorAvailabilityController();
const doctorRoutes: Router = Router();


doctorRoutes.post('/doctorAvailability/save', UserValidation.validation, doctorAvailabilityCtr.createDoctorAvailability);


export default doctorRoutes;