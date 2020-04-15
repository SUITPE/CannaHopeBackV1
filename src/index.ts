import Server from './server/server';
import DbConnection from './database/connection';
import userRoutes from './routes/user.routes';


// const port: number = 2745;
const port: any = process.env.PORT || 2745;

const server: Server = Server.init(port);
const connection: DbConnection = new DbConnection();


server.app.use('/api/User/', userRoutes);

server.start(() => console.log(`Servidor en linea en puerto ${port}`));
