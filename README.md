# GameVault
Um CRUD para gerenciar jogos

``text
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
``
