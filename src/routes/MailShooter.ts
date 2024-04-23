import z from "zod";
import { FastifyInstance, FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { mailShootAdminController } from "../controllers/mailShooter-admin-controller";
import { mailShootTesterController } from "../controllers/mailShooter-tester-controller";
import { responseStatusOkSchema } from "../schemas/home-route-schemas";
import { bodyAdminSchema } from "../schemas/admin-route-schemas";
import { bodyTesterSchema } from "../schemas/test-route-schema";

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
        .withTypeProvider<ZodTypeProvider>()
        .get('/', {
            schema: {
                summary: "Returns usage examples for this API endpoint.",
                tags: ['Public Endpoints'],
                response: {
                    200: responseStatusOkSchema,
                },
            }
        }, async (request, reply) => {
            const response = responseStatusOkSchema.parse({})
            return reply.status(200).send(response);
        })

    app
        .withTypeProvider<ZodTypeProvider>()
        .post<{ Body: BodyAdminType }>('/admin', {
            schema: {
                summary: "Endpoint reserved for administrators.",
                tags: ['Private Endpoints'],
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
                summary: "Endpoint reserved for tester users.",
                tags: ['Private Endpoints'],
                body: bodyTesterSchema,
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