"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const varEnvironments_1 = require("../environments/varEnvironments");
class DbConnection {
    constructor() {
        this.conectado = false;
        this.getConnection();
    }
    getConnection() {
        mongoose_1.default.connect(varEnvironments_1.environments.getDbUrl(), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }, (error) => {
            if (error)
                throw error;
            console.log('Base de datos en linea');
        });
    }
}
exports.default = DbConnection;
