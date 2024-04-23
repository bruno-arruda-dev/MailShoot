import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from 'fastify-type-provider-zod';
import { mailShoot } from "./routes/MailShooter";

const app = fastify();

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
})

app
.register(fastifySwaggerUI, {
    routePrefix: 'docs',
})

app.register(mailShoot);

app
    .listen({ port: 3333 })
    .then(() => {

        console.log("MailShoot is ready to shoot on port 3333! 😎");

    })