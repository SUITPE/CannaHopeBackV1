const moment = require('moment-timezone');

export const currentEnv: string =  'PROD';
export const seed: string = 'PRIVATE-SEED-CANNAHOPE-API'
export const tokenExpiration: number = 60*60*24;

export const environments = {
    getDbUrl(): string {
        if (currentEnv === 'PROD') {
            return 'mongodb://cannahopeAdminUser:cm9kYXJ0c2luaW1kYWVwb2hhbm5hYw%3D%3D@138.68.4.1:65033/cannahope-main-db?authSource=admin&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';
        } else {
            return 'mongodb+srv://jhony:7W8PfRWM1Hqn3sAw@cluster0-8i0r3.mongodb.net/test?retryWrites=true&w=majority';

        }
    },

    getFrontUrl(): string{
        if (currentEnv === 'PROD'){
            return 'http://cannahope.suit.pe/#/login';
        } else {
            return 'http://cannahope.suit.pe/#/login';
        }
    },

    companyEmail(): string {
        if (currentEnv === 'PROD'){
            // return 'app@centrocannahope.com'
            return 'centrocannahope@gmail.com'

        } else {
            return 'centrocannahope@gmail.com'
        }
    },

    companyPasswordEmail(): string {
        if (currentEnv === 'PROD'){
            return 'centrocannahope2020'
        } else {
            return 'centrocannahope2020'
        }
    },

    currentDate(): any {
        return  moment().tz('America/Lima').format('YYYY-MM-DD HH:mm:ss')
    },

    currentDateString(): string {
        return  moment().tz('America/Lima').format('YYYY-MM-DD')
    }
}

