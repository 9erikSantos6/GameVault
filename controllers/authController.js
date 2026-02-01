const AuthService = require("../services/authService");
const { StatusCodes } = require("http-status-codes");

const AuthController = {
  async registrar(req, res) {
    try {
      const { nome, email, senha } = req.body;
      const dadosUsuario = { nome, email, senha };

      const registroTokens = await AuthService.registrar(dadosUsuario);

      res.cookie("refreshToken", registroTokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "PRODUCTION", // para funcionar com http tem que ser false
        sameSite: "Strict",
      });

      return res.json({ accessToken: registroTokens.accessToken });
    } catch (err) {
      console.error("Erro de autenticação:", err.message);
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Erro ao registrar usuário. Verifique os dados fornecidos.",
      });
    }
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body;

      const loginTokens = await AuthService.login(email, senha);

      res.cookie("refreshToken", loginTokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "PRODUCTION", // para funcionar com http tem que ser false
        sameSite: "Strict",
      });

      return res
        .status(StatusCodes.OK)
        .json({ accessToken: loginTokens.accessToken });
    } catch (err) {
      console.error("Erro de autenticação:", err.message);

      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Credenciais inválidas. Verifique seu email e senha.",
      });
    }
  },

  async refresh(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          error: "Token de atualização não fornecido. Faça login novamente.",
        });
      }

      const novoRefresh = await AuthService.fazerRefresh(refreshToken);

      res.cookie("refreshToken", novoRefresh.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "PRODUCTION", // para funcionar com http tem que ser false
        sameSite: "Strict",
      });

      return res.json({ accessToken: novoRefresh.accessToken });
    } catch (err) {
      console.error("Erro de autenticação:", err.message);
      return res.status(StatusCodes.FORBIDDEN).json({
        error: "Token de atualização inválido. Faça login novamente.",
      });
    }
  },
};

module.exports = AuthController;
