import { FastifyReply, FastifyRequest } from "fastify";
import { BodyInterface } from "../routes/MailShoot";

const admin_key = process.env.ADMIN_KEY;

export async function mailShootAdminController(request: FastifyRequest<BodyInterface>, reply: FastifyReply) {
    const {password, from, to, subject, message } = request.body

    if(password != admin_key) {
        return reply.status(401).send({error: true, message: "Incorrect admin password."});
    }

    return reply.status(200).send({error: false, message: "OK", password})
}