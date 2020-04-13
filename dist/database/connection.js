"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class DbConnection {
    constructor() {
        this.conectado = false;
        this.dbLink = 'mongodb://localhost:27017/cannahope';
        this.getConnection();
    }
    getConnection() {
        mongoose_1.default.connect(this.dbLink, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (error) => {
            if (error)
                throw error;
            console.log('Base de datos en linea');
        });
    }
}
exports.default = DbConnection;
