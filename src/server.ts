import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from 'fastify-type-provider-zod';
import { mailShoot } from "./routes/MailShooter";
import { errorHandler } from "./error-handler";
import fastifyCors from "@fastify/cors";

const app = fastify();

app.register(fastifyCors, {
    origin: '*',
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);


app.register(fastifySwagger, {
    swagger: {
        consumes: ['application/json'],
        produces: ['application/json'],
        info: {
            title: 'MailShooter',
            description: 'Especificações para utilização desta API para disparo de emails.',
            version: '1.0.0'
        }
    },
    transform: jsonSchemaTransform,
});

app
.register(fastifySwaggerUI, {
    routePrefix: 'docs',
});


app.register(mailShoot);

app.setErrorHandler(errorHandler);

app
.listen({ port: 3333, host: '0.0.0.0' })
.then(() => {
    
        console.log("MailShoot is ready to shoot on port 3333! 😎");

    })