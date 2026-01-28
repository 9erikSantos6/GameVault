const AuthService = require("../services/authService");

const AuthController = {
  async registrar(req, res) {
    const { nome, email, senha } = req.body;
    const dadosUsuario = { nome, email, senha };

    try {
      const autenticacaoDados = await AuthService.registrar(dadosUsuario);

      return res.status(201).render("user", {
        usuario: autenticacaoDados.usuario,
        accessToken: autenticacaoDados.accessToken,
        refreshToken: autenticacaoDados.refreshToken,
      });
    } catch (err) {
      return res.status(400).render("registrar", {
        error: err.message,
      });
    }
  },

  async login(req, res) {
    const { email, senha } = req.body;

    try {
      const autenticacaoDados = await AuthService.login(email, senha);

      return res.status(200).render("user", {
        usuario: autenticacaoDados.usuario,
        accessToken: autenticacaoDados.accessToken,
        refreshToken: autenticacaoDados.refreshToken,
      });
    } catch (err) {
      return res.status(401).render("login", {
        error: err.message,
      });
    }
  },
};

module.exports = AuthController;
