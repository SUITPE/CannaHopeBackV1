"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const body_parser_1 = __importDefault(require("body-parser"));
class Server {
    constructor(portNumber) {
        this.port = portNumber;
        this.app = express_1.default();
        // tslint:disable-next-line: deprecation
        this.app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
        // tslint:disable-next-line: deprecation
        this.app.use(body_parser_1.default.json({ limit: '50mb' }));
        this.app.use(cors_1.default());
        this.app.use(express_fileupload_1.default({ useTempFiles: true }));
    }
    static init(port) {
        return new Server(port);
    }
    start(callback) {
        this.app.listen(this.port, callback());
    }
}
exports.default = Server;
