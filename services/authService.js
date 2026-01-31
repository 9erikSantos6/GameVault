const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UsuarioService = require("./usuarioService");

const AuthService = {
  async registrar(dados) {
    const usuario = await UsuarioService.criarUsuario(dados);

    const tokens = { ...this._gerarTokens(usuario) };

    return tokens;
  },

  async login(email, senha) {
    const usuario = await UsuarioService.buscarUsuarioPorEmail(email);
    if (!usuario) {
      throw new Error("Credenciais inválidas: usuário não encontrado");
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new Error("Credenciais inválidas: senha incorreta");
    }

    const tokens = { ...this._gerarTokens(usuario) };

    return tokens;
  },

  async fazerRefresh(refreshToken) {
    if (!refreshToken) {
      throw new Error("Refresh token não fornecido");
    }

    let decoded;

    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        throw new Error("Refresh token expirado");
      }
      throw new Error("Refresh token inválido");
    }

    const usuario = await UsuarioService.buscarUsuarioPorId(decoded.id);
    if (!usuario) {
      throw new Error("Usuário não encontrado para o refresh token");
    }

    const tokens = { ...this._gerarTokens(usuario) };

    return tokens;
  },

  _gerarAccessToken(usuario) {
    console.log(`ENV_ACESS: ${process.env.JWT_SECRET_ACESS}`);
    if (!process.env.JWT_SECRET_ACESS) {
      throw new Error("JWT_SECRET_ACESS não configurado no ambiente");
    }

    return jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
      },
      process.env.JWT_SECRET_ACESS,
      { expiresIn: "15m" },
    );
  },

  _gerarRefreshToken(usuario) {
    if (!process.env.JWT_SECRET_REFRESH) {
      throw new Error("JWT_SECRET_REFRESH não configurado no ambiente");
    }

    return jwt.sign(
      {
        id: usuario.id,
      },
      process.env.JWT_SECRET_REFRESH,
      { expiresIn: "7d" },
    );
  },

  _gerarTokens(usuario) {
    return {
      accessToken: this._gerarAccessToken(usuario),
      refreshToken: this._gerarRefreshToken(usuario),
    };
  },
};

module.exports = AuthService;
