"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require('moment-timezone');
exports.currentEnv = 'PROD';
exports.seed = 'PRIVATE-SEED-CANNAHOPE-API';
exports.tokenExpiration = 60 * 60 * 24;
exports.environments = {
    getDbUrl() {
        if (exports.currentEnv === 'PROD') {
            return 'mongodb://cannahopeAdminUser:cm9kYXJ0c2luaW1kYWVwb2hhbm5hYw%3D%3D@138.68.4.1:65033/cannahope-main-db?authSource=admin&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';
        }
        else {
            // return 'mongodb://cannahopeAdminUser:cm9kYXJ0c2luaW1kYWVwb2hhbm5hYw%3D%3D@138.68.4.1:65033/cannahope-dev-db?authSource=admin&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';
            return 'mongodb://localhost:27017/cannahope-dev-db?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
        }
    },
    getFrontUrl() {
        if (exports.currentEnv === 'PROD') {
            return 'http://cannahope.suit.pe/#/login';
        }
        else {
            return 'http://localhost:4201/#/login';
        }
    },
    companyEmail() {
        if (exports.currentEnv === 'PROD') {
            // return 'app@centrocannahope.com'
            return 'centrocannahope@gmail.com';
        }
        else {
            return 'centrocannahope@gmail.com';
        }
    },
    companyPasswordEmail() {
        if (exports.currentEnv === 'PROD') {
            return 'DvfN8hKTB98SDQt';
        }
        else {
            return 'DvfN8hKTB98SDQt';
        }
    },
    currentDate() {
        return moment().tz('America/Lima').format('YYYY-MM-DD HH:mm:ss');
    },
    currentDateString() {
        return moment().tz('America/Lima').format('YYYY-MM-DD');
    },
    signatureImagePath(imageName) {
        if (exports.currentEnv === 'PROD') {
            return `/apis/cannahope-api/docs/doctorSignatures/${imageName}`;
        }
        else {
            return `docs/doctorSignatures/${imageName}`;
        }
    }
};
