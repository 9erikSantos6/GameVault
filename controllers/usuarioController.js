const { UsuarioService } = require("../services");

const UsuarioController = {
  async getUsuarioPorEmail(req, res) {
    const { email } = req.query;

    try {
      const usuario = await UsuarioService.buscarUsuarioPorEmail(email);

      if (!usuario) {
        return res.status(404).render("error", {
          error: "Usuário não encontrado",
        });
      }

      return res.status(200).render("user", {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      });
    } catch (err) {
      return res.status(500).render("error", {
        error: err.message,
      });
    }
  },

  async criarUsuario(req, res) {
    const { nome, email, senha } = req.body;
    const dadosUsuario = { nome, email, senha };

    try {
      const usuario = await UsuarioService.criarUsuario(dadosUsuario);

      return res.status(201).render("user", {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      });
    } catch (err) {
      return res.status(400).render("registrar", {
        error: err.message,
      });
    }
  },

  async buscarTodosUsuarios(_req, res) {
    try {
      const usuarios = await UsuarioService.buscarTodosUsuarios();

      return res.status(200).render("users", {
        usuarios,
      });
    } catch (err) {
      return res.status(500).render("error", {
        error: err.message,
      });
    }
  },

  async buscarUsuarioPorId(req, res) {
    const { id } = req.params;

    try {
      const usuario = await UsuarioService.buscarUsuarioPorId(id);

      if (!usuario) {
        return res.status(404).render("error", {
          error: "Usuário não encontrado",
        });
      }

      return res.status(200).render("user", {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      });
    } catch (err) {
      return res.status(500).render("error", {
        error: err.message,
      });
    }
  },

  async deletarUsuarioPorId(req, res) {
    const { id } = req.params;

    try {
      const resultado = await UsuarioService.deletarUsuarioPorId(id);

      if (!resultado) {
        return res.status(404).render("error", {
          error: "Usuário não encontrado",
        });
      }

      return res.status(200).json({ message: "Usuário deletado com sucesso!" });
    } catch (err) {
      return res.status(500).render("error", {
        error: err.message,
      });
    }
  },
};

module.exports = UsuarioController;
