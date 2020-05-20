const moment = require('moment-timezone');



const currentEnv: string =  'DEV';
export const seed: string = 'PRIVATE-SEED-CANNAHOPE-API'
export const tokenExpiration: number = 60*60*24;


export const environments = {


    getDbUrl(): string {

        if (currentEnv === 'PROD') {
            return 'mongodb://167.71.119.143:27017/cannahope';
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
            return 'igjonatanpadilla@gmail.com'
        } else {
            return 'igjonatanpadilla@gmail.com'
        }
    },

    companyPasswordEmail(): string {
        if (currentEnv === 'PROD'){
            return 'wingardiumleviosa'
        } else {
            return 'wingardiumleviosa'
        }
    },

    currentDate(): any {
        return  moment().tz('America/Lima').format('YYYY-MM-DD HH:mm:ss')
    }
}

