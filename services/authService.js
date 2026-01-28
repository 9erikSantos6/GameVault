const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UsuarioService = require("./usuarioService");

const AuthService = {
  gerarAccessToken(usuario) {
    return jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );
  },

  gerarRefreshToken(usuario) {
    return jwt.sign(
      {
        id: usuario.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
  },

  gerarTokens(usuario) {
    return {
      accessToken: this.gerarAccessToken(usuario),
      refreshToken: this.gerarRefreshToken(usuario),
    };
  },

  async registrar(dados) {
    const usuario = await UsuarioService.criarUsuario(dados);

    const tokens = this.gerarTokens(usuario);

    return {
      id: usuario.id,
      email: usuario.email,
      ...tokens,
    };
  },

  async login(email, senha) {
    const usuario = await UsuarioService.buscarUsuarioPorEmail(email);
    if (!usuario) {
      throw new Error("Credenciais inválidas");
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new Error("Credenciais inválidas");
    }

    const tokens = this.gerarTokens(usuario);

    return {
      id: usuario.id,
      email: usuario.email,
      ...tokens,
    };
  },
  async refresh(refreshToken) {
    let decoded;

    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    } catch {
      throw new Error("Refresh token inválido");
    }

    const usuario = await UsuarioService.buscarUsuarioPorId(decoded.id);
    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    return {
      accessToken: this.gerarAccessToken(usuario),
      usuario,
    };
  },
};

module.exports = AuthService;
