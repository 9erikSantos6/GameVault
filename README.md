# GameVault
Um CRUD simples para genrenciar jogos 

- Gerencie seus jogos favoritos
- Faça amizades
- Empreste jogos aos seus amigos

## Dependências
- Node v25.2.1
- Yarn v1.22.22




## Desenvolvimento
**Crie as veriáveis de ambiente**

Crie um aqurivo .env, copie o conteúdo de .env.example para ele
Sseu aquivo .env deve ficar parecido com isso, por exemplo:
```text
PORT=3000
NODE_ENV=DEVELOPMENT
```


**Instale as dependências**
```bash
yarn install
```

**Execute as migrações**
```bash
npx sequelize-cli db:migrate
```

## Estrutura:
```text
GameVault/
├── config/             # Configurações de banco de dados, variáveis de ambiente
├── controllers/        # Controladores: lógica de requisição/resposta (intermédio)
├── models/             # Models: esquemas de banco de dados e manipulação de dados
├── routes/             # Definição das rotas da aplicação
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
