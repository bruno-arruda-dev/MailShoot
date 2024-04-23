import z from "zod";

export const responseStatusOkSchema = z.object({
    error: z.boolean().default(false),
    message: z.string().default("Bem vindo a API MailShoot: API rápida para disparo de emails"),
    repo: z.string().default("https://github.com/bruno-arruda-dev/MailShoot"),
    documentation: z.string().default(""),
    github: z.string().default("https://github.com/bruno-arruda-dev"),
    linkedin: z.string().default("https://www.linkedin.com/in/bruno-arruda-dev/"),
    examples: z.object({
        admin: z.object({
            details: z.array(z.string()).default(["Se você tiver uma chave de admin, poderá disparar um email como admin.", "1 - Não será incluída, no corpo do email, a mensagem do desenvolvedor.", "2 - Não é obrigatório informar um valor para a propriedade 'from' (remetente)"]),
            endpoint: z.string().default("/admin"),
            body: z.object({
                password: z.string().default("Senha de administrador aqui. Enviar como String"),
                title: z.string().default("(OPCIONAL) título para o email"),
                subtitle: z.string().default("(OPCIONAL) subtítulo para o email"),
                exibitionNameFrom: z.string().default("(OPCIONAL) nome que irá acompanhar o email do remetente, ex.: 'Bruno Arruda - <bruno.arrm@gmail.com>'"),
                from: z.string().default("(OPCIONAL) email do remetente aqui"),
                to: z.string().default("email do destinatário aqui"),
                subject: z.string().default("assunto do email aqui"),
                message: z.string().default("texto da mensagem aqui"),
            })
        }),
        tester: z.object({
            details: z.array(z.string()).default(["Se você tiver uma chave de teste, poderá disparar um email como tester.", "1 - Será incluída, no corpo do email, a mensagem do desenvolvedor.", "2 - É obrigatório a informar um valor para a propriedade 'from' (remetente)"]),
            endpoint: z.string().default("/test"),
            body: z.object({
                password: z.string().default("Senha de administrador aqui. Enviar como String"),
                title: z.string().default("(OPCIONAL) título para o email"),
                subtitle: z.string().default("(OPCIONAL) subtítulo para o email"),
                exibitionNameFrom: z.string().default("nome que irá acompanhar o email do remetente, ex.: 'Bruno Arruda - <bruno.arrm@gmail.com>'"),
                from: z.string().default("email do remetente aqui"),
                to: z.string().default("email do destinatário aqui"),
                subject: z.string().default("assunto do email aqui"),
                message: z.string().default("texto da mensagem aqui"),
            })

        })
    })
    ,
})
