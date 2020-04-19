"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JsonResp {
    constructor(success, message, data, error) {
        this.total = 0;
        this.success = success;
        this.message = message;
        this.data = data;
        this.error = error;
    }
}
exports.default = JsonResp;
class ErrorDetail {
    constructor() {
        this.name = '';
        this.status = 500;
    }
}
exports.ErrorDetail = ErrorDetail;
