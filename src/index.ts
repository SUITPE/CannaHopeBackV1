import Server from './server/server';
import DbConnection from './database/connection';
import userRoutes from './routes/user.routes';
import generalRoutes from './routes/general.routes';
import patientRoutes from './routes/patient.routes';
import patientManagementRoutes from './routes/patientManagement.routes';
import doctorRoutes from './routes/doctor.routes';
import appointmentsRoutes from './routes/appointments.routes';
import medicalConsultationsRoutes from './routes/medicalConsultation.routes';


// const port: number = 2745;
const port: any = process.env.PORT || 2745;

const server: Server = Server.init(port);
const connection: DbConnection = new DbConnection();


server.app.use('/api/User/', userRoutes);
server.app.use('/api/General/', generalRoutes);
server.app.use('/api/Patient/', patientRoutes);
server.app.use('/api/patientManagement/', patientManagementRoutes);
server.app.use('/api/doctor/', doctorRoutes);
server.app.use('/api/appointments', appointmentsRoutes);
server.app.use('/api/medicalConsultation', medicalConsultationsRoutes);

server.start(() => console.log(`Servidor en linea en puerto ${port}`));
