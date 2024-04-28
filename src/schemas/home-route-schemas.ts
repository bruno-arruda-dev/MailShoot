import z from "zod";

export const responseStatusOkSchema = z.object({
    error: z.boolean().default(false),
    message: z.string().default("Bem vindo a API MailShoot: API rápida para disparo de emails"),
    repo: z.string().default("https://github.com/bruno-arruda-dev/MailShoot"),
    documentation: z.string().default(""),
    github: z.string().default("https://github.com/bruno-arruda-dev"),
    linkedin: z.string().default("https://www.linkedin.com/in/bruno-arruda-dev/"),
})