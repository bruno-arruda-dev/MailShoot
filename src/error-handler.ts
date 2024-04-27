import { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { Unauthenticated } from "./routes/_errors/unauthenticated";

type FastifyErrorHandler = FastifyInstance['errorHandler'];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
        
    if (error instanceof Unauthenticated) {
        return reply.status(401).send({ error: true, message: error.message });
    }

    if (error instanceof ZodError) {
        return reply.status(400).send({
            error: true,
            message: `Error during validation`,
            errors: error.flatten().fieldErrors
        })
    }


    return reply.status(500).send({ error: true, message: "Internal server error" });
}