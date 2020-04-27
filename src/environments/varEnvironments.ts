const currentEnv: string =  'DEV';


export const seed: string = 'PRIVATE-SEED-CANNAHOPE-API'
export const tokenExpiration: number = 60*60*24;


export const environments = {


    getDbUrl(): string {

        if (currentEnv === 'PROD') {
            return 'mongodb+srv://jhony:7W8PfRWM1Hqn3sAw@cluster0-8i0r3.mongodb.net/test?retryWrites=true&w=majority';
        } else {
            return 'mongodb+srv://jhony:7W8PfRWM1Hqn3sAw@cluster0-8i0r3.mongodb.net/test?retryWrites=true&w=majority';
        }
    },

    getFrontUrl(): string{
        if (currentEnv === 'PROD'){
            return 'http://localhost:4200/#/login';
        } else {
            return 'http://localhost:4200/#/login';
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
    }
}

