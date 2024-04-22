import { FastifyInstance, FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { devResponse } from "../constants/dev-response-constant";
import { mailShootAdminController } from "../controllers/MailShootAdminController";
import z from "zod";

const bodySchema = z.object({
    password: z.string(),
    from: z.string().email().nullish(),
    to: z.string().email(),
    subject: z.string().min(4),
    message: z.string().min(4),
});

type BodyType = z.infer<typeof bodySchema>;

export interface BodyInterface extends RouteGenericInterface {
    Body: BodyType,
}

export async function mailShoot(app: FastifyInstance) {

    app
        .get('/', async (request, reply) => {
            return reply.status(200).send(devResponse);
        })

    app
        .withTypeProvider<ZodTypeProvider>()
        .post<{ Body: BodyType}>('/admin', {
            schema: {
                body: bodySchema,
                response: {
                    200: z.object({
                        error: z.boolean(),
                        message: z.string()
                    }),
                    401: z.object({
                        error: z.boolean(),
                        message: z.string()
                    })
                },
                
            }
        }, async (request: FastifyRequest<BodyInterface>, reply: FastifyReply) => {
            mailShootAdminController(request, reply)
        })
}