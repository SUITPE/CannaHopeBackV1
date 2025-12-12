"use strict";

const { environments } = require("../../environments/varEnvironments");
const nodemailer = require("nodemailer");

class EmailController {
  constructor(service, message, userReceiver, subject, files) {
    this.transmitter = environments.companyEmail();
    this.transmitterPass = environments.companyPasswordEmail();
    this.files = files || [];
    this.service = service;
    this.message = message;
    this.userReceiver = userReceiver;
    this.subject = subject;
  }

  async sendEmail() {
    try {
      // Lee host/port de env si existen, si no usa el host original
      const host = process.env.SMTP_HOST || "mail.centrocannahope.com";
      const port = Number(process.env.SMTP_PORT || 465);
      const secure =
        process.env.SMTP_SECURE != null
          ? process.env.SMTP_SECURE === "true"
          : port === 465; // por defecto true si 465

      console.log("EmailController.sendEmail - SMTP CONFIG:", {
        host,
        port,
        secure,
        user: this.transmitter ? "OK" : "MISSING",
      });

      const transporter = nodemailer.createTransport({
        host,
        port,
        secure, // true para 465, false para 587
        auth: {
          user: this.transmitter,
          pass: this.transmitterPass,
        },
        tls: {
          rejectUnauthorized: false, // <- ahora bien escrito
        },
      });

      const mailOptions = {
        from: this.transmitter,
        to: this.userReceiver,
        subject: this.subject,
        text: this.message,
      };

      if (this.files && this.files.length > 0) {
        mailOptions.attachments = this.files;
      }

      const info = await transporter.sendMail(mailOptions);
      console.log("EmailController.sendEmail - OK:", info.messageId);
      return true;
    } catch (error) {
      console.error("EmailController.sendEmail - ERROR:", {
        name: error.name,
        code: error.code,
        command: error.command,
        message: error.message,
      });

      const errorDetail = {
        name: "Error al enviar email",
        description: error,
      };

      throw errorDetail;
    }
  }
}

module.exports = EmailController;
