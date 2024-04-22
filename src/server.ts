import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { mailShoot } from "./routes/MailShooter";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(mailShoot);

app
    .listen({ port: 3333 })
    .then(() => {

        console.log("MailShoot is ready to shoot! 😎");

    })