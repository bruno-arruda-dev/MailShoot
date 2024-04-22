import nodemailer, { SendMailOptions } from 'nodemailer';
import { BodyAdminType } from "../routes/MailShooter";

interface FunctionParams {
    data: BodyAdminType
}

const host = process.env.HOST;
const port = process.env.PORT;
const secure = process.env.SECURE;
const service = process.env.SERVICE;
const user = process.env.USER;
const pass = process.env.PASSWORD;

const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    service,
    auth: {
        user,
        pass
    }
} as nodemailer.TransportOptions);

export async function mailShootAdminService({ data }: FunctionParams) {

    const { from, to, subject, message, exibitionNameFrom, subtitle, title } = data;

    const defaultExibitionNameFrom = exibitionNameFrom ? exibitionNameFrom : "";
    const defaultFrom = from ? `${defaultExibitionNameFrom} - ${from}` : `Projeto MailShooter`;
    const defaultTitle = title ? title : "Projeto MailShooter";
    const defaultSubTitle = subtitle ? subtitle : "Projeto MailShooter";

    const html = `
        <h1>${defaultTitle}</h1>
        <h2>${defaultSubTitle}</h2>

        <p>Rementente: ${defaultFrom}</p>
        <p>Assunto: ${subject}</p>
        <p>Mensagem: </p>
        <p>${message}</p>
    `

    const mailOptions: SendMailOptions = {
        from: defaultFrom,
        to,
        subject,
        html
    }

    try {
        transporter.sendMail(mailOptions);
        return;
    } catch (err: any) {
        throw new Error(err)
    }

}