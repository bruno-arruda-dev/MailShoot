import { FastifyInstance, FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { devResponse } from "../constants/dev-response-constant";
import { mailShootAdminController } from "../controllers/mailShooter-admin-controller";
import z from "zod";
import { mailShootTesterController } from "../controllers/mailShooter-tester-controller";

export const bodyAdminSchema = z.object({
    password: z.string(),
    title: z.string().nullish(),
    subtitle: z.string().nullish(),
    exibitionNameFrom: z.string().nullish(),
    from: z.string().email().nullish(),
    to: z.string().email(),
    subject: z.string().min(4),
    message: z.string().min(4),
});

export const bodyTesterSchema = z.object({
    password: z.string(),
    title: z.string().nullish(),
    subtitle: z.string().nullish(),
    exibitionNameFrom: z.string(),
    from: z.string().email(),
    to: z.string().email(),
    subject: z.string().min(4),
    message: z.string().min(4),
});

export type BodyAdminType = z.infer<typeof bodyAdminSchema>;
export type BodyTesterType = z.infer<typeof bodyAdminSchema>;

export interface BodyAdminInterface extends RouteGenericInterface {
    Body: BodyAdminType,
}
export interface BodyTesterInterface extends RouteGenericInterface {
    Body: BodyAdminType,
}

export async function mailShoot(app: FastifyInstance) {

    app
        .get('/', async (request, reply) => {
            return reply.status(200).send(devResponse);
        })

    app
        .withTypeProvider<ZodTypeProvider>()
        .post<{ Body: BodyAdminType }>('/admin', {
            schema: {
                body: bodyAdminSchema,
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
        }, async (request: FastifyRequest<BodyAdminInterface>, reply: FastifyReply) => {
            mailShootAdminController(request, reply)
        })

    app
        .withTypeProvider<ZodTypeProvider>()
        .post<{ Body: BodyAdminType }>('/test', {
            schema: {
                body: bodyAdminSchema,
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
        }, async (request: FastifyRequest<BodyAdminInterface>, reply: FastifyReply) => {
            mailShootTesterController(request, reply)
        })
}