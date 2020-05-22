import { Router } from 'express';
import { AppointmentController } from '../controllers/appointment/appointments.controller';
import UserValidation from '../middlewares/userValidation.middleware';
import { AppointmentService } from '../services/appointment.service';
import { AppointmentStatusService } from '../services/appointmentStatus.service';
import { PaymentController } from '../controllers/appointment/payment.controller';
import { PaymentService } from '../services/payment.service';

const appointmentsRoutes: Router = Router();

const appointmentCtr: AppointmentController = new AppointmentController(
    new AppointmentService(),
    new AppointmentStatusService(),
    new PaymentService()
);

const paymentCtr: PaymentController = new PaymentController(
    new PaymentService(),
    new AppointmentService()
)

appointmentsRoutes.post('/save', UserValidation.validation, (req, res) => appointmentCtr.registerAppointment(req, res));
appointmentsRoutes.get('/getAll', UserValidation.validation, (req, res) => appointmentCtr.getAll(req, res));
appointmentsRoutes.post('/updateStatus', UserValidation.validation, (req, res) => appointmentCtr.updateStatus(req, res));
appointmentsRoutes.get('/getById/:id', UserValidation.validation, (req, res) => appointmentCtr.getById(req, res));
appointmentsRoutes.put('/update', UserValidation.validation, (req, res) => appointmentCtr.update(req, res));
appointmentsRoutes.get('/getTodayByIdDoctor/:id', UserValidation.validation, (req, res) => appointmentCtr.getDoctorAppointments(req, res));
appointmentsRoutes.get('/getByIdDoctor/:id', UserValidation.validation, (req, res) => appointmentCtr.getByIdDoctor(req, res));
appointmentsRoutes.delete('/delete/:id', UserValidation.validation, (req, res) => appointmentCtr.cancelAppointment(req, res));
// Payments
appointmentsRoutes.post('/payment/save', UserValidation.validation, (req, res) => paymentCtr.registerPayment(req, res));
appointmentsRoutes.get('/getAppointmentsToday', UserValidation.validation, (req, res) => appointmentCtr.getTodayAppointments(req, res));




export default appointmentsRoutes;