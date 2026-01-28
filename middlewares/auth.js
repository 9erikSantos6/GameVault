const jtw = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.render("/login", { error: "Autenticação não fornecida!" });
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    res.render("/login", { error: "Autenticação mau formada" });
  }

  try {
    const decoded = jtw.decode(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (_err) {
    res.render("/login", {
      error: "Erro de autenticação, tenter realizar o login novamente!",
    });
  }
};

module.exports = auth;
