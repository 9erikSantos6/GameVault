# GameVault
Um CRUD simples para genrenciar jogos 

- Gerencie seus jogos favoritos
- Faça amizades
- Empreste jogos aos seus amigos

## Dependências
- Node v24.13.0
- Yarn 




## Desenvolvimento
**Crie as veriáveis de ambiente**

Crie um arquivo ```.env```, copie o conteúdo de ```.env.example``` para ele. Observe com atenção as orientações do ```.env.example```!

O Seu aquivo .env deve ficar parecido com isso, por exemplo:
```text
PORT=3000
NODE_ENV=DEVELOPMENT
JWT_SECRET=s3nhainqueBrave12L
JWT_INSPIRATION=1
BCRYPTJS_SALT=10
```


**Instale as dependências:**
```bash
yarn install
```

**Execute as migrações:**
```bash
npx sequelize-cli db:migrate
```

**Inicie o servidor:**
```bash
node app.js
```

## Estrutura:
```text
GameVault/
├── config/             # Configurações de banco de dados, variáveis de ambiente
├── controllers/        # Controladores: lógica de requisição/resposta (intermédio)
├── models/             # Models: esquemas de banco de dados e manipulação de dados
├── routes/             # Definição das rotas da aplicação
├── services/           # Logicas de interação com banco de dados
├── views/              # Arquivos EJS (HTML dinâmico)
│   ├── partials/       # Componentes reutilizáveis (header, footer, nav)
│   └── index.ejs
├── public/             # Arquivos estáticos (CSS, JS cliente, imagens)
├── middlewares/        # Middlewares personalizados (autenticação, logs)
├── .env                # Variáveis de ambiente (credenciais, porta)
├── .gitignore          # Arquivos a ignorar pelo Git
├── app.js / index.js   # Arquivo principal de inicialização
└── package.json        # Dependências e scripts
```
