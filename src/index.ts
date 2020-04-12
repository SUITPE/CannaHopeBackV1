import Server from './server/server';
import DbConnection from './database/connection';


const port: number = 2745;
const server: Server = Server.init(port);
const connection: DbConnection = new DbConnection();



server.start(() => console.log(`Servidor en linea en puerto ${port}`));

