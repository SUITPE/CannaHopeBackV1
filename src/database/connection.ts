import mongoose from 'mongoose';

export default class DbConnection {

    private static _instance: DbConnection;

    public conectado: boolean = false;
    private dbLink: string = 'mongodb://localhost:27017/cannahope'

    constructor() {
        this.getConnection();
    }

    private getConnection() {
        mongoose.connect(this.dbLink, {useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true}, (error: any) => {
            if (error) throw error;
            console.log('Base de datos en linea');
        });
    }
}