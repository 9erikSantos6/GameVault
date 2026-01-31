const jwt = require("jsonwebtoken");

const AuthMiddleware = {
  verificarAutenticacao(req, res, next) {
    const authHeader = req.headers.authorization;

    const token = this._pegarToken(authHeader);

    if (!token) {
      return res
        .status(401)
        .render("/login", { error: "Autenticação mal formada" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = {
        id: decoded.id,
        email: decoded.email,
      };

      next();
    } catch (_err) {
      return res.body;
    }
  },

  pegarAutenticacao(req, res, _next) {
    const authHeader = req.headers.authorization;

    const token = this._pegarToken(authHeader);

    if (!token) {
      return res
        .status(401)
        .render("/login", { error: "Autenticação mal formada" });
    }

    return token;
  },

  _pegarToken(authHeader) {
    if (!authHeader) {
      return null;
    }
    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
      return null;
    }
    return token;
  },
};

module.exports = {
  AuthMiddleware,
};
