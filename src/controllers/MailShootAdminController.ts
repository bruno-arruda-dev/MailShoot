import { FastifyReply, FastifyRequest } from "fastify";
import { BodyInterface } from "../routes/MailShoot";

export async function mailShootAdminController(request: FastifyRequest<BodyInterface>, reply: FastifyReply) {
    const body = request.body
    const admin_key = process.env.ADMIN_KEY
    return reply.status(200).send({error: false, message: "OK", body})
}