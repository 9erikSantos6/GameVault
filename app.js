const express = require("express");
const path = require("node:path");

// const auth = require("./middlewares/auth");

const PORT = process.env.PORT || 3000;

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
app.get("/login", (_req, res) => {
  res.render("login/login");
});

app.get("/registro", (_req, res) => {
  res.render("login/registro");
});

app.get("/dashboard", (_req, res) => {
  res.render("dashboard/dashboard");
});

app.listen(PORT, () => {
  console.log(`\nGameVault está rodando em ==> http://localhost:${PORT}\n`);
});
