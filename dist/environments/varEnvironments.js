"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require('moment-timezone');
const currentEnv = 'PROD';
exports.seed = 'PRIVATE-SEED-CANNAHOPE-API';
exports.tokenExpiration = 60 * 60 * 24;
exports.environments = {
    getDbUrl() {
        if (currentEnv === 'PROD') {
            return 'mongodb://127.0.0.1:27017';
        }
        else {
            return 'mongodb+srv://jhony:7W8PfRWM1Hqn3sAw@cluster0-8i0r3.mongodb.net/test?retryWrites=true&w=majority';
        }
    },
    getFrontUrl() {
        if (currentEnv === 'PROD') {
            return 'http://cannahope.suit.pe/#/login';
        }
        else {
            return 'http://cannahope.suit.pe/#/login';
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
    },
    currentDate() {
        return moment().tz('America/Lima').format('YYYY-MM-DD HH:mm:ss');
    }
};
