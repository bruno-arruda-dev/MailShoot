import nodemailer, { SendMailOptions } from 'nodemailer';
import { BodyTesterType } from "../routes/MailShooter";

interface FunctionParams {
    data: BodyTesterType
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

export async function mailShootTesterService({ data }: FunctionParams) {

    const { from, to, subject, message, exibitionNameFrom, subtitle, title } = data;

    const defaultFrom = `${from} - ${exibitionNameFrom}`;
    const defaultTitle = title ? title : "Projeto MailShooter";
    const defaultSubTitle = subtitle ? subtitle : "Projeto MailShooter";

    const html = `
        <h1>${defaultTitle}</h1>
        <h2>${defaultSubTitle}</h2>

        <p>Rementente: ${defaultFrom}</p>
        <p>Assunto: ${subject}</p>
        <p>Mensagem: </p>
        <p>${message}</p>
        <p>${`IMPORTANTE`}</p>
        <p>${`1 - Você está recebendo um email do destinatário remetente ${from}.`}</p>
        <p>${`2 - Este é um projeto de API de código aberto para disparo de email automático, e está sendo utilizado por um terceiro.`}</p>
        <p>${`3 - Não responda a esta mensagem, o autor não será notificado dela. `}</p>
        <p>${`Conheça o meu trabalho: Bruno Arruda Dev: https://www.linkedin.com/in/bruno-arruda-dev/`}</p>
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