"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require('moment-timezone');
const currentEnv = 'PROD';
exports.seed = 'PRIVATE-SEED-CANNAHOPE-API';
exports.tokenExpiration = 60 * 60 * 24;
exports.environments = {
    getDbUrl() {
        if (currentEnv === 'PROD') {
            return 'mongodb://cannahopeAdminUser:cm9kYXJ0c2luaW1kYWVwb2hhbm5hYw%3D%3D@138.68.4.1:65033/cannahope-main-db?authSource=admin&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';
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
            return 'app@centrocannahope.com';
        }
        else {
            return 'app@centrocannahope.com';
        }
    },
    companyPasswordEmail() {
        if (currentEnv === 'PROD') {
            return 'cannahope2020';
        }
        else {
            return 'cannahope2020';
        }
    },
    currentDate() {
        return moment().tz('America/Lima').format('YYYY-MM-DD HH:mm:ss');
    },
    currentDateString() {
        return moment().tz('America/Lima').format('YYYY-MM-DD');
    }
};
