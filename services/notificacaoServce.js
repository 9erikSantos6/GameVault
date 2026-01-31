const { Notificacao } = require("../models");
const UsuarioService = require("./usuarioService");

const NotificacaoService = {
  async criarNotificacao(dadosNotificacao) {
    const dadosValidados = await this._validarDados(dadosNotificacao);

    const notificacao = await Notificacao.create(dadosValidados);

    return notificacao;
  },

  async atualizarNotificacao(id, novosDados) {
    const notificacao = await Notificacao.findByPk(id);
    if (!notificacao) {
      throw new Error("Essa notificação não existe!");
    }

    const dadosValidados = await this._validarDados(novosDados);

    await notificacao.update(dadosValidados);

    return notificacao.reload();
  },

  async _validarDados(dados) {
    const {
      id_remetente,
      id_destinatario,
      tipo,
      titulo,
      conteudo,
      lida,
      lida_em,
    } = dados;

    if (!id_destinatario) {
      throw new Error("A notificação precisa conter um destinatário!");
    }

    if (id_remetente) {
      const remetente = await UsuarioService.buscarUsuarioPorId(id_remetente);
      if (!remetente) {
        throw new Error("O remetente não existe!");
      }
    }

    const destinatario =
      await UsuarioService.buscarUsuarioPorId(id_destinatario);
    if (!destinatario) {
      throw new Error("O destinatário não existe!");
    }

    return {
      id_remetente,
      id_destinatario,
      tipo,
      titulo,
      conteudo,
      lida,
      lida_em,
    };
  },

  async getNotificacaoPorId(id) {
    const notificacao = await Notificacao.findByPk(id);
    return notificacao || null;
  },

  async pegarNotificacoesPorUsuario(id_usuario) {
    return await Notificacao.findAll({
      where: {
        [Op.or]: [
          { id_destinatario: id_usuario },
          { id_remetente: id_usuario },
        ],
      },
    });
  },

  async deletarNotificacaoPorId(id) {
    const notificacao = await Notificacao.findByPk(id);
    if (!notificacao) {
      throw new Error("Notificação não encontrada para exclusão!");
    }
    await notificacao.destroy();
    return true;
  },

  async deletarNotificacoesPorUsuario(id_usuario) {
    const notificacoes = await Notificacao.findAll({
      where: {
        [Op.or]: [
          { id_destinatario: id_usuario },
          { id_remetente: id_usuario },
        ],
      },
    });
    return this._deletarNotificacoes(notificacoes);
  },

  async _deletarNotificacoes(notificacoes) {
    if (!notificacoes || notificacoes.length === 0) {
      throw new Error("Não existem notificações a serem excluídas!");
    }

    for (const notificacao of notificacoes) {
      await notificacao.destroy();
    }
    return true;
  },
};

module.exports = NotificacaoService;
