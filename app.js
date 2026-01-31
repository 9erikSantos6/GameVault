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

app.post("/auth/registrar", AuthController.registrar);
app.post("/auth/login", AuthController.login);
app.post("/auth/refresh", AuthController.refresh);

app.listen(PORT, () => {
  console.log(`\nGameVault está rodando em ==> http://localhost:${PORT}\n`);
});
