"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server/server"));
const connection_1 = __importDefault(require("./database/connection"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const general_routes_1 = __importDefault(require("./routes/general.routes"));
// const port: number = 2745;
const port = process.env.PORT || 2745;
const server = server_1.default.init(port);
const connection = new connection_1.default();
server.app.use('/api/User/', user_routes_1.default);
server.app.use('/api/General/', general_routes_1.default);
server.start(() => console.log(`Servidor en linea en puerto ${port}`));
