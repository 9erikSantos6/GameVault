const { UsuarioService } = require("../services");

const UsuarioController = {
  async getUsuarioPorEmail(req, res) {
    try {
      const { email } = req.query;

      if (!email) {
        return res.status(400).render("error", {
          error: "Email não informado",
        });
      }

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
    } catch (error) {
      console.error("[UsuarioController] getUsuarioPorEmail:", error);

      return res.status(500).render("error", {
        error: "Erro interno ao buscar usuário",
      });
    }
  },

  async criarUsuario(req, res) {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).render("registrar", {
          error: "Preencha todos os campos",
        });
      }

      const usuario = await UsuarioService.criarUsuario({ nome, email, senha });

      return res.status(201).render("user", {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      });
    } catch (error) {
      console.error("[UsuarioController] criarUsuario:", error);

      return res.status(400).render("registrar", {
        error: "Não foi possível criar o usuário",
      });
    }
  },

  async buscarTodosUsuarios(_req, res) {
    try {
      const usuarios = await UsuarioService.buscarTodosUsuarios();

      return res.status(200).render("users", { usuarios });
    } catch (error) {
      console.error("[UsuarioController] buscarTodosUsuarios:", error);

      return res.status(500).render("error", {
        error: "Erro ao buscar usuários",
      });
    }
  },

  async buscarUsuarioPorId(req, res) {
    try {
      const { id } = req.params;

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
    } catch (error) {
      console.error("[UsuarioController] buscarUsuarioPorId:", error);

      return res.status(500).render("error", {
        error: "Erro ao buscar usuário",
      });
    }
  },

  async deletarUsuarioPorId(req, res) {
    try {
      const { id } = req.params;

      const deletado = await UsuarioService.deletarUsuarioPorId(id);

      if (!deletado) {
        return res.status(404).render("error", {
          error: "Usuário não encontrado",
        });
      }

      return res.status(200).render("success", {
        message: "Usuário deletado com sucesso",
      });
    } catch (error) {
      console.error("[UsuarioController] deletarUsuarioPorId:", error);

      return res.status(500).render("error", {
        error: "Erro ao deletar usuário",
      });
    }
  },
};

module.exports = UsuarioController;
