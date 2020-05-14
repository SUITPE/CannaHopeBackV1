import { Router } from 'express';
import UserValidation from '../middlewares/userValidation.middleware';
import { DoctorAvailabilityController } from '../controllers/doctor/doctorAvailability.controller';
import { DoctorController } from '../controllers/doctor/doctor.controller';


const doctorAvailabilityCtr: DoctorAvailabilityController = new DoctorAvailabilityController();
const doctorCtr: DoctorController = new DoctorController();

const doctorRoutes: Router = Router();
doctorRoutes.get('/getAll', UserValidation.validation, doctorCtr.getAllDoctors);
doctorRoutes.post('/doctorAvailability/save', UserValidation.validation, doctorAvailabilityCtr.createDoctorAvailability);
doctorRoutes.get('/doctorAvailability/getAll', UserValidation.validation, doctorAvailabilityCtr.getAllDoctorAvailabilities);
doctorRoutes.get('/doctorAvailability/getByIdDoctor/:idDoctor', UserValidation.validation, doctorAvailabilityCtr.getDoctorAvailabilitiesByIdDoctor);
doctorRoutes.delete('/doctorAvailability/delete/:id', UserValidation.validation, doctorAvailabilityCtr.deleteDoctorAvailabilityById);
export default doctorRoutes;