"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environments = exports.tokenExpiration = exports.seed = exports.currentEnv = void 0;
const moment = require('moment-timezone');
exports.currentEnv = 'PROD';
exports.seed = 'PRIVATE-SEED-CANNAHOPE-API';
exports.tokenExpiration = 60 * 60 * 24;
exports.environments = {
    getDbUrl() {
        if (exports.currentEnv === 'PROD') {
		return 'mongodb+srv://canna_db:CannaCanna@cannacluster.oqua9vd.mongodb.net/cannahope-main-db?retryWrites=true&w=majority&ssl=true&appName=CannaCluster';
            //return 'mongodb://cannahopeAdminUser:cm9kYXJ0c2luaW1kYWVwb2hhbm5hYw%3D%3D@147.182.128.249:65033/cannahope-main-db?authSource=admin&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';
        }
        else {
            return 'mongodb://cannahopeAdminUser:cm9kYXJ0c2luaW1kYWVwb2hhbm5hYw%3D%3D@147.182.128.249:65033/cannahope-main-db?authSource=admin&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';
            // return 'mongodb://cannahopeAdminUser:cm9kYXJ0c2luaW1kYWVwb2hhbm5hYw%3D%3D@138.68.4.1:65033/cannahope-dev-db?authSource=admin&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';
            // return 'mongodb://localhost:27017/cannahope-dev-db?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
        }
    },
    getFrontUrl() {
        if (exports.currentEnv === 'PROD') {
            return 'http://cannahope.suit.pe/#/login';
        }
        else {
            return 'http://cannahope.suit.pe/#/login';
        }
    },
    companyEmail() {
        if (exports.currentEnv === 'PROD') {
            // return 'app@centrocannahope.com'
            return 'app@centrocannahope.com';
        }
        else {
            return 'app@centrocannahope.com';
        }
    },
    companyPasswordEmail() {
        if (exports.currentEnv === 'PROD') {
            return 'Cann@hope22';
        }
        else {
            return 'Cann@hope22';
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
