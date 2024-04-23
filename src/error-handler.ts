import { FastifyInstance } from "fastify";
import { Unautenticated } from "./routes/_errors/unauthenticated";
import { ZodError } from "zod";

type FastifyErrorHandler = FastifyInstance['errorHandler'];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {

    const { validation, validationContext } = error;

    if (error instanceof ZodError) {
        return reply.status(400).send({
            error: true,
            message: `Error during validation`,
            errors: error.flatten().fieldErrors
        })
    }

    if (error instanceof Unautenticated) {
        return reply.status(401).send({ error: true, message: error.message });
    }

    return reply.status(500).send({ error: true, message: "Internal server error" })
}