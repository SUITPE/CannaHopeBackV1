export default class JsonResp {

    public success: boolean;
    public message: string;
    public data?: any;
    public error?: ErrorDetail;
    constructor(success: boolean, message: string, data?: any, error?: ErrorDetail) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.error = error;
    }

}

export class ErrorDetail {
    name: string = '';
    description?: any;
    status?: number | any = 500;
}