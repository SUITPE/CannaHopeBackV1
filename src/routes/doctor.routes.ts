import { Router } from 'express';
import UserValidation from '../middlewares/userValidation.middleware';
import { DoctorAvailabilityController } from '../controllers/doctor/doctorAvailability.controller';
import { DoctorController } from '../controllers/doctor/doctor.controller';
import { MedicalSpecialityController } from '../controllers/doctor/medicalSpeciality.controller';

const doctorCtr: DoctorController = new DoctorController();
const doctorAvailabilityCtr: DoctorAvailabilityController = new DoctorAvailabilityController();
const medicalSpecialityCtr: MedicalSpecialityController = new MedicalSpecialityController();
const doctorRoutes: Router = Router();

doctorRoutes.get('/getAll', UserValidation.validation, doctorCtr.getAllDoctors);
doctorRoutes.post('/save', UserValidation.validation, doctorCtr.createDoctor);
doctorRoutes.put('/update', UserValidation.validation, doctorCtr.updateDoctor);
doctorRoutes.get('/getById/:id', UserValidation.validation, doctorCtr.getById);
doctorRoutes.delete('/delete/:id', UserValidation.validation,  doctorCtr.deleteById);
doctorRoutes.get('/findBySpecialty/:idSpecialty', UserValidation.validation, doctorCtr.getByIdSpecialty);
doctorRoutes.post('/doctorAvailability/save', UserValidation.validation, doctorAvailabilityCtr.createDoctorAvailability);
doctorRoutes.get('/doctorAvailability/getAll', UserValidation.validation, doctorAvailabilityCtr.getAllDoctorAvailabilities);
doctorRoutes.get('/doctorAvailability/getByIdDoctor/:idDoctor', UserValidation.validation, doctorAvailabilityCtr.getDoctorAvailabilitiesByIdDoctor);
doctorRoutes.delete('/doctorAvailability/delete/:id', UserValidation.validation, doctorAvailabilityCtr.deleteDoctorAvailabilityById);
doctorRoutes.post('/medicalSpeciality/save', UserValidation.validation, medicalSpecialityCtr.createMedicalSpeciality);
doctorRoutes.get('/medicalSpeciality/getAll', UserValidation.validation, medicalSpecialityCtr.getAllmedicalSpecialities);
doctorRoutes.put('/medicalSpeciality/update/:id', UserValidation.validation, medicalSpecialityCtr.UpdatemedicalSpeciality);
doctorRoutes.delete('/medicalSpeciality/delete/:id', UserValidation.validation, medicalSpecialityCtr.deleteMedicalSpeciality);
doctorRoutes.post('/doctorAvailability/getCurrent', UserValidation.validation, doctorAvailabilityCtr.getCurrentDoctorAvailability);

export default doctorRoutes;