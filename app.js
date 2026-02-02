const express = require("express");
const path = require("node:path");
require("dotenv").config();

const { AuthController } = require("./controllers");

const PORT = process.env.PORT || 3000;
console.log(`ENV PORT: ${PORT}`);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.render("index");
});

//paloma, teste
app.get("/auth/login", (_req, res) => {
  res.render("login/login");
});

app.get("/auth/registrar", (_req, res) => {
  res.render("login/registrar");
});

app.get("/dashboard", (_req, res) => {
  res.render("dashboard/dashboard");
});

//Nicole, Jogos

app.get("/usuario/index", (_req, res) => {
  res.render("usuario/index");
});

app.get("/usuario/cadastrar-jogo", (_req, res) => {
  res.render("usuario/cadastro-jogo");
});

app.get("/usuario/editar-jogo", (_req, res) => {
  res.render("usuario/editar-jogo");
});

// =========================================================
// ROTAS TEMPORÁRIAS PARA VISUALIZAR O FRONT-END (AMIZADE)
// =========================================================

// 1. Tela Principal de Amigos (Lista e Solicitações)
app.get("/amizade", (req, res) => {
  res.render("amizade/index", {
    // Dados falsos para testar o visual
    solicitacoes: [
      { id: 1, usuario: { nome: "Lucas Silva", email: "lucas@email.com" } }
    ],
    amigos: [
      { id: 10, nome: "Maria Oliveira", email: "maria@email.com" },
      { id: 11, nome: "João Pedro", email: "joao@email.com" }
    ]
  });
});

// 2. Tela de Adicionar Amigo
app.get("/amizade/novo", (req, res) => {
  res.render("amizade/novo");
});

// 3. Tela de Gerenciar Amigo (Editar)
app.get("/amizade/editar/:id", (req, res) => {
  res.render("amizade/editar", {
    amigo: { id: 10, nome: "Maria Oliveira", email: "maria@email.com" },
    amizade: { createdAt: "2025-10-15" }
  });
});


// =========================================================
// ROTAS TEMPORÁRIAS PARA VISUALIZAR O FRONT-END (EMPRÉSTIMOS)
// =========================================================

// 1. Tela Principal de Empréstimos (Abas Emprestei/Peguei)
app.get("/emprestimos", (req, res) => {
  res.render("emprestimos/index", {
    emprestimosFeitos: [
      { 
        id: 1, 
        game: { titulo: "God of War" }, 
        mutuario: { nome: "Maria Oliveira" }, 
        data_inicio: "2026-02-01", 
        retornou_em: null 
      },
      { 
        id: 2, 
        game: { titulo: "The Last of Us" }, 
        mutuario: { nome: "João Pedro" }, 
        data_inicio: "2026-01-10", 
        retornou_em: "2026-01-20" 
      }
    ],
    emprestimosRecebidos: [
      { 
        id: 3, 
        game: { titulo: "FIFA 24" }, 
        mutuante: { nome: "Lucas Silva" }, 
        data_fim: "2026-02-15" 
      }
    ]
  });
});

// 2. Tela de Novo Empréstimo (Simulando clique num jogo)
app.get("/emprestimos/novo", (req, res) => {
  res.render("emprestimos/novo", {
    jogo: { id: 5, titulo: "Horizon Zero Dawn", plataforma: "PS5" },
    amigos: [
      { id: 10, nome: "Maria Oliveira" },
      { id: 11, nome: "João Pedro" }
    ]
  });
});

// 3. Tela de Editar Empréstimo
app.get("/emprestimos/editar/:id", (req, res) => {
  res.render("emprestimos/editar", {
    emprestimo: {
      id: 1,
      game: { titulo: "God of War" },
      mutuario: { nome: "Maria Oliveira" },
      data_fim: "2026-02-10"
    }
  });
});

app.post("/auth/registrar", AuthController.registrar);
app.post("/auth/login", AuthController.login);
app.post("/auth/refresh", AuthController.refresh);

app.listen(PORT, () => {
  console.log(`\nGameVault está rodando em ==> http://localhost:${PORT}\n`);
});
