import { FastifyReply, FastifyRequest } from "fastify";
import { BodyAdminInterface } from "../routes/MailShooter";
import { mailShootTesterService } from "../services/mailShooter-tester-service";

const tester_key = process.env.TESTER_KEY;

export async function mailShootTesterController(request: FastifyRequest<BodyAdminInterface>, reply: FastifyReply) {
    const { password, from, to, subject, message, title, subtitle, exibitionNameFrom } = request.body

    if (password !== tester_key) {
        return reply.status(401).send({ error: true, message: "Incorrect tester password." });
    }

    const data = {
        password, from, to, subject, message, title, subtitle, exibitionNameFrom
    }

    try {
        await mailShootTesterService({ data });
        reply.status(200).send({ error: false, message: `Email teste enviado para ${to}` });
    } catch (err: any) {
        console.log(err);
        reply.status(500).send({ error: true, message: "Erro ao tentar enviar email.", err });
    }
}

