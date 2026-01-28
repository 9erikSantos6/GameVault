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
  res.redirect("/login");
});

app.post("/login", (_req, _res) => {});

app.listen(PORT, () => {
  console.log(`\nGameVault está rodando em ==> http://localhost:${PORT}\n`);
});
