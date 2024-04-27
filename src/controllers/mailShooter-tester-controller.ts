import { FastifyReply, FastifyRequest } from "fastify";
import { BodyAdminInterface } from "../routes/MailShooter";
import { mailShootTesterService } from "../services/mailShooter-tester-service";
import { Unauthenticated } from "../routes/_errors/unauthenticated";

const tester_key = process.env.TESTER_KEY;

export async function mailShootTesterController(request: FastifyRequest<BodyAdminInterface>, reply: FastifyReply) {
    const { password, from, to, subject, message, title, subtitle, exibitionNameFrom } = request.body

    if (password !== tester_key) {
        return reply.send(new Unauthenticated("Senha de tester não confere."));
    }

    const data = {
        password, from, to, subject, message, title, subtitle, exibitionNameFrom
    }

    try {
        await mailShootTesterService({ data });
        reply.status(200).send({ error: false, message: `Email teste enviado para ${to}` });
    } catch (err: any) {
        console.log(err);
        throw new Error("Erro ao tentar enviar email.");
    }
}

