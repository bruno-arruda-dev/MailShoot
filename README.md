
# Título do Projeto

API para disparo de emails.

Boa para implementar em aplicação que necessita automatizar disparo de emails.

[Documentação interativa Swagger](https://mail-shoot.vercel.app/docs/static/index.html)
## Funcionalidades

- Disparo de email mediante senha de administrator
- Rotas para usuários que queiram testar a API



## Stack utilizada

**Back-end:** Node, TypeScript, Fastify, Fastify/swagger, Fastify/swagger-ui, Nodemailer


## Instalação

##### Download dos arquivos do projeto; 
##### ou
Clonar o projeto:
```bash
git clone https://github.com/bruno-arruda-dev/MailShoot
```

##### Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

##### **`ADMIN_KEY`** Defina uma senha para disparo como administrador
##### **`TESTER_KEY`** Defina uma senha para disparo como tester
##### **`HOST`** Host do seu servidor de email
##### **`PORT`** Porta do seu servidor de email
##### **`SECURE`** Servidor exige secure mode? TRUE OU FALSE
##### **`SERVICE`** Nome do seu serviço de email
##### **`USER`** Usuário
**`PASSWORD`** Senha


Depois abra a pasta do projeto e instale as dependências:

```bash
  npm install
```
Crie um arquivo .env e configure da seguinte forma:
```bash
ADMIN_KEY=<SUA SENHA DE ADMIN AQUI>
TESTER_KEY=<SUA SENHA DE TESTER AQUI>
HOST=<HOST DO SEU SERVIDOR DE EMAIL>
PORT=<PORTA>
SECURE=<SERVIDOR EXIGE SECURE MODE? TRUE OU FALSE>
SERVICE=<NOME DO SEU SERVIÇO DE EMAIL>
USER=<USUÁRIO>
PASSWORD=<SENHA>
```
Execute o projeto:
```bash
npm run dev
```


## Documentação
[Acesse a documentação interativa com Swagger aqui.](https://mail-shoot.vercel.app/docs/static/index.html)


#### Retorna documentação em json

```http
  GET /
```

#### Dispara uma mensagem como administrador

```http
  POST /admin
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `password`      | `string` | **Obrigatório**. Senha de admin |
| `title`      | `string` | **Opcional**. Título para o email. Se não for enviado, o email receberá um título padrão |
| `title`      | `string` | **Opcional**. Subtítulo para o email. Se não for enviado, o email receberá um subtítulo padrão | 
| `exibitionNameFrom`      | `string` | **Opcional**. Nome que acompanhará o email do remetente. Se não for informado o remetente receberá um nome padrão | 
| `from`      | `string email` | **Opcional**. Email do remetente. Se não for informado receberá um valor padrão |
| `to`      | `string email` | **Obrigatório**. Email do remetente. |
| `subject`      | `string` | **Obrigatório**. Assunto |
| `message`      | `string` | **Obrigatório**. Mensagem |

#### Dispara uma mensagem como usuário teste

```http
  POST /test
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `password`      | `string` | **Obrigatório**. Senha de usuário teste |
| `title`      | `string` | **Opcional**. Título para o email. Se não for enviado, o email receberá um título padrão |
| `title`      | `string` | **Opcional**. Subtítulo para o email. Se não for enviado, o email receberá um subtítulo padrão | 
| `exibitionNameFrom`      | `string` | **Obrigatório**. Nome que acompanhará o email do remetente | 
| `from`      | `string email` | **Obrigatório**. Email do remetente |
| `to`      | `string email` | **Obrigatório**. Email do remetente |
| `subject`      | `string` | **Obrigatório**. Assunto |
| `message`      | `string` | **Obrigatório**. Mensagem |