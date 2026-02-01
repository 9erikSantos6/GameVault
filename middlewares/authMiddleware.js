const { AuthService } = require("../services");

const AuthMiddleware = {
  verificarAutenticacao(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      const token = AuthService.pegarTokenDoHeader(authHeader);

      if (!token) {
        return res.status(401).render("login", {
          error: "Você precisa estar autenticado para acessar esta página",
        });
      }

      const userDecoded = AuthService.desencriptarAcessToken(token);

      req.user = {
        id: userDecoded.id,
        email: userDecoded.email,
      };

      return next();
    } catch (error) {
      console.error("Erro de autenticação:", error.message);

      return res.status(401).render("login", {
        error: "Sua sessão expirou. Faça login novamente.",
      });
    }
  },
};

module.exports = AuthMiddleware;
