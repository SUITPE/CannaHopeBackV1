import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';

export default class Server {

    public app: express.Application;
    public port: number;

    constructor(portNumber: number) {
        this.port = portNumber;
        this.app = express();

        // tslint:disable-next-line: deprecation
        this.app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
        // tslint:disable-next-line: deprecation
        this.app.use(bodyParser.json({limit: '50mb'}));
        this.app.use(cors());
        this.app.use( fileUpload({ useTempFiles: true }) );
    }

    public static init(port: any) {
        return new Server(port);
    }

    public start (callback: any) {
        this.app.listen(this.port, callback());
    }
}