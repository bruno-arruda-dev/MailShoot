import { FastifyReply, FastifyRequest } from "fastify";
import { BodyAdminInterface } from "../routes/MailShooter";
import { mailShootAdminService } from "../services/mailShooter-admin-service";
import { Unauthenticated } from "../routes/_errors/unauthenticated";

const admin_key = process.env.ADMIN_KEY;

export async function mailShootAdminController(request: FastifyRequest<BodyAdminInterface>, reply: FastifyReply) {
    const { password, from, to, subject, message, title, subtitle, exibitionNameFrom } = request.body

    if (password !== admin_key) {
        return reply.send(new Unauthenticated(`Senha de administrador não confere.`));
    }

    const data = {
        password, from, to, subject, message, title, subtitle, exibitionNameFrom
    }

    try {
        await mailShootAdminService({ data });
        reply.status(200).send({ error: false, message: `Email enviado para ${to}` });
    } catch (err: any) {
        console.log(err);
        throw new Error("Erro ao tentar enviar email.");
    }
}

