const { Usuario } = require("../models");
const bcrypt = require("bcryptjs");

const UsuarioService = {
  async criarUsuario(dadosUsuario) {
    // Falta adicionar mais validações
    if (await this.buscarUsuarioPorEmail(dadosUsuario.email)) {
      throw new Error("Um usuário semelhante já foi cadastrado!");
    }

    senhaHash = await bcrypt.hash(
      dadosUsuario.senha,
      process.env.BCRYPTJS_SALT,
    );

    return await Usuario.create({ ...dadosUsuario, senha: senhaHash });
  },

  async buscarTodosUsuarios() {
    return await Usuario.findAll();
  },

  async buscarUsuarioPorEmail(email) {
    // Falta adicionar validações
    return await Usuario.findOne({ where: { email } });
  },

  async buscarUsuarioPorId(id) {
    // Falta adicionar validações
    return await Usuario.findByPk(id);
  },

  async deletarUsuarioPorId(id) {
    // Falta adicionar validações
    return await Usuario.destroy({ where: { id } });
  },
};

module.exports = UsuarioService;
