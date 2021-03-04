import { environments } from '../../environments/varEnvironments';
import nodemailer from 'nodemailer';
import { ErrorDetail } from '../../models/jsonResp';


export default class EmailController {
    private transmitter: string = environments.companyEmail();
    private transmitterPass: string = environments.companyPasswordEmail();
    private service: string;
    private message: string;
    private userReceiver: string;
    private subject: string;
    private files?: any[] = [];

    constructor(service: string, message: string, userReceiver: string, subject: string, files?: any) {
        this.service = service;
        this.message = message;
        this.userReceiver = userReceiver;
        this.subject = subject;

        if (files) {
            this.files = files;
        }
    }

    public sendEmail(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {

                const trasnporter = nodemailer.createTransport({
                    host: 'gmail',
                    port: 25,
                    service: this.service,
                    auth: {
                        user: this.transmitter,
                        pass: this.transmitterPass
                    }
                });

                const mailOptions: nodemailer.SendMailOptions = {
                    from: this.transmitter,
                    to: this.userReceiver,
                    subject: this.subject,
                    text: this.message//,
                  //  replyTo: this.userReceiver
                };

                if (this.files) {
                    mailOptions.attachments = this.files;
                }

                trasnporter.sendMail(mailOptions, (error: any, info: any) => {
                    if (error) {
                        const errorDetail: ErrorDetail = {
                            name: 'Error al enviar email',
                            description: error
                        }
                        reject(errorDetail);
                    } else {
                        resolve(true);
                    }
                });
            } catch (error) {

                reject(error);
            }
        });
    }

}