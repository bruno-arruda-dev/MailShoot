import { FastifyReply, FastifyRequest } from "fastify";
import { BodyAdminInterface } from "../routes/MailShooter";
import { mailShootAdminService } from "../services/mailShooter-admin-service";

const admin_key = process.env.ADMIN_KEY;

export async function mailShootAdminController(request: FastifyRequest<BodyAdminInterface>, reply: FastifyReply) {
    const { password, from, to, subject, message, title, subtitle, exibitionNameFrom } = request.body

    if (password !== admin_key) {
        return reply.status(401).send({ error: true, message: "Incorrect admin password." });
    }

    const data = {
        password, from, to, subject, message, title, subtitle, exibitionNameFrom
    }

    try {
        await mailShootAdminService({ data });
        reply.status(200).send({ error: false, message: `Email enviado para ${to}` });
    } catch (err: any) {
        console.log(err);
        reply.status(500).send({ error: true, message: "Erro ao tentar enviar email.", err });
    }
}

