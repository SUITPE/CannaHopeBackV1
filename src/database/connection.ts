import mongoose from 'mongoose';
import { environments } from '../environments/varEnvironments';

export default class DbConnection {

    private static _instance: DbConnection;

    public conectado: boolean = false;

    constructor() {
        this.getConnection();
    }

    private getConnection() {
        mongoose.connect(environments.getDbUrl(), {useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true}, (error: any) => {
            if (error) throw error;
            console.log('Base de datos en linea');
        });
    }
}