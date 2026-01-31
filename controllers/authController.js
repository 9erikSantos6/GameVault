const AuthService = require("../services/authService");
const { StatusCodes } = require("http-status-codes");

const AuthController = {
  async registrar(req, res) {
    const { nome, email, senha } = req.body;
    const dadosUsuario = { nome, email, senha };

    try {
      const registroTokens = await AuthService.registrar(dadosUsuario);

      res.cookie("refreshToken", registroTokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "PRODUCTION",
        sameSite: "Strict",
      });

      return res.json({ accessToken: registroTokens.accessToken });
    } catch (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Erro ao registrar usuário. Verifique os dados fornecidos.",
        details: err.message,
      });
    }
  },

  async login(req, res) {
    const { email, senha } = req.body;

    try {
      const autenticacaoDados = await AuthService.login(email, senha);

      return res.status(StatusCodes.OK).render("user", {
        accessToken: autenticacaoDados.accessToken,
        refreshToken: autenticacaoDados.refreshToken,
      });
    } catch (err) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Credenciais inválidas. Verifique seu email e senha.",
        details: err.message,
      });
    }
  },

  refresh(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Token de atualização não fornecido. Faça login novamente.",
      });
    }

    try {
      const novoRefresh = AuthService.fazerRefresh(refreshToken);

      res.cookie("refreshToken", novoRefresh.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "PRODUCTION",
        sameSite: "Strict",
      });

      return res.json({ accessToken: novoRefresh.accessToken });
    } catch (err) {
      return res.status(StatusCodes.FORBIDDEN).json({
        error: "Token de atualização inválido. Faça login novamente.",
        details: err.message,
      });
    }
  },
};

module.exports = AuthController;
