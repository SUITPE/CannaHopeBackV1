"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const varEnvironments_1 = require("../../environments/varEnvironments");
const nodemailer_1 = __importDefault(require("nodemailer"));
class EmailController {
    constructor(service, message, userReceiver, subject, files) {
        this.transmitter = varEnvironments_1.environments.companyEmail();
        this.transmitterPass = varEnvironments_1.environments.companyPasswordEmail();
        this.files = [];
        this.service = service;
        this.message = message;
        this.userReceiver = userReceiver;
        this.subject = subject;
        if (files) {
            this.files = files;
        }
    }
    sendEmail() {
        return new Promise((resolve, reject) => {
            try {
                const trasnporter = nodemailer_1.default.createTransport({
                    host: 'gmail',
                    port: 25,
                    service: this.service,
                    auth: {
                        user: this.transmitter,
                        pass: this.transmitterPass
                    }
                });
                const mailOptions = {
                    from: this.transmitter,
                    to: this.userReceiver,
                    subject: this.subject,
                    text: this.message
                };
                if (this.files) {
                    mailOptions.attachments = this.files;
                }
                trasnporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        const errorDetail = {
                            name: 'Error al enviar email',
                            description: error
                        };
                        reject(errorDetail);
                    }
                    else {
                        resolve(true);
                    }
                });
            }
            catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }
}
exports.default = EmailController;
