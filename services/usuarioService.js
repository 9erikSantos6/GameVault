const { Usuario } = require("../models");
const bcrypt = require("bcryptjs");

const SALT_ROUNDS = Number(process.env.BCRYPTJS_SALT) || 10;

const UsuarioService = {
  async criarUsuario(dadosUsuario) {
    const usuarioExistente = await this.buscarUsuarioPorEmail(
      dadosUsuario.email,
    );

    if (usuarioExistente) {
      throw new Error("Um usuário com este email já foi cadastrado!");
    }

    const senhaHash = await bcrypt.hash(dadosUsuario.senha, SALT_ROUNDS);

    const usuario = await Usuario.create({
      nome: dadosUsuario.nome,
      email: dadosUsuario.email,
      senha: senhaHash,
    });

    return this._sanitize(usuario);
  },

  async atualizarUsuario(id, dadosAtualizados) {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      throw new Error("Usuário não encontrado!");
    }

    const dadosPermitidos = {};

    if (dadosAtualizados.nome) {
      dadosPermitidos.nome = dadosAtualizados.nome;
    }

    if (dadosAtualizados.email) {
      const emailExistente = await this.buscarUsuarioPorEmail(
        dadosAtualizados.email,
      );
      if (emailExistente && emailExistente.id !== id) {
        throw new Error("O email fornecido já está em uso por outro usuário!");
      }
      dadosPermitidos.email = dadosAtualizados.email;
    }

    if (dadosAtualizados.senha) {
      dadosPermitidos.senha = await bcrypt.hash(
        dadosAtualizados.senha,
        SALT_ROUNDS,
      );
    }

    await usuario.update(dadosPermitidos);

    return this._sanitize(usuario.reload());
  },

  async buscarTodosUsuarios() {
    const usuarios = await Usuario.findAll();
    return usuarios.map(this._sanitize);
  },

  async buscarUsuarioPorEmail(email) {
    return await Usuario.findOne({ where: { email } });
  },

  async buscarUsuarioPorId(id) {
    const usuario = await Usuario.findByPk(id);
    return usuario ? this._sanitize(usuario) : null;
  },

  async deletarUsuarioPorId(id) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      throw new Error("Usuário não encontrado para exclusão!");
    }

    await usuario.destroy();
    return true;
  },

  _sanitize(usuario) {
    const { senha, ...dadosSeguros } = usuario.get({ plain: true });
    return dadosSeguros;
  },
};

module.exports = UsuarioService;
