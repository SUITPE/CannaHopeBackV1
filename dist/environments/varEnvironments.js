"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const currentEnv = 'DEV';
exports.seed = 'PRIVATE-SEED-CANNAHOPE-API';
exports.tokenExpiration = 60 * 60 * 24;
exports.environments = {
    getDbUrl() {
        if (currentEnv === 'PROD') {
            return 'mongodb+srv://jhony:7W8PfRWM1Hqn3sAw@cluster0-8i0r3.mongodb.net/test?retryWrites=true&w=majority';
        }
        else {
            return 'mongodb+srv://jhony:7W8PfRWM1Hqn3sAw@cluster0-8i0r3.mongodb.net/test?retryWrites=true&w=majority';
        }
    },
    getFrontUrl() {
        if (currentEnv === 'PROD') {
            return 'http://localhost:4200/#/login';
        }
        else {
            return 'http://localhost:4200/#/login';
        }
    },
    companyEmail() {
        if (currentEnv === 'PROD') {
            return 'igjonatanpadilla@gmail.com';
        }
        else {
            return 'igjonatanpadilla@gmail.com';
        }
    },
    companyPasswordEmail() {
        if (currentEnv === 'PROD') {
            return 'wingardiumleviosa';
        }
        else {
            return 'wingardiumleviosa';
        }
    }
};
