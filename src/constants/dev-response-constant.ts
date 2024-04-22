export const devResponse = {
    error: false,
    message: "Bem vindo a API MailShoot: API rápida para disparo de emails",
    repo: "",
    github: "https://github.com/bruno-arruda-dev",
    linkedin: "https://www.linkedin.com/in/bruno-arruda-dev/",
    examples: {
        admin: {
            details: ["Se você tiver uma chave de admin, poderá disparar um email como admin.", "1 - Não será incluída, no corpo do email, a mensagem do desenvolvedor.", "2 - Não é obrigatório informar um valor para a propriedade 'from' (remetente)"],
            endpoint: "/admin",
            body: {
                password: "Senha de administrador aqui. Enviar como String",
                from: "(OPCIONAL) email do remetente aqui",
                to: "email do destinatário aqui",
                subject: "Assunto do email aqui",
                message: "Texto da mensagem aqui"
            },
            tester: {
                details: ["Se você tiver uma chave de teste, poderá disparar um email como tester.", "1 - Será incluída, no corpo do email, a mensagem do desenvolvedor.", "2 - É obrigatório a informar um valor para a propriedade 'from' (remetente)"],
                endpoint: "/tester",
                body: {
                    password: "Senha de usuário teste aqui. Enviar como String",
                    from: "(OBRIGATÓRIO) email do remetente aqui",
                    to: "email do destinatário aqui",
                    subject: "Assunto do email aqui",
                    message: "Texto da mensagem aqui"
                },
            }
        }
    }
}