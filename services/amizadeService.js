const { Amizade } = require("../models");
const { AmizadeStatus } = require("../utils/enums");

const AmizadeService = {
  async criarAmizade(dadosAmizade) {
    if (!dadosAmizade.id_usuario || !dadosAmizade.id_amigo) {
      throw new Error("Os campos id_usuario e id_amigo são obrigatórios!");
    }

    const amizadeExistente = await Amizade.findOne({
      where: {
        id_usuario: dadosAmizade.id_usuario,
        id_amigo: dadosAmizade.id_amigo,
      },
    });

    if (amizadeExistente) {
      throw new Error("Essa amizade já foi cadastrada!");
    }

    const amizade = await Amizade.create({
      id_usuario: dadosAmizade.id_usuario,
      id_amigo: dadosAmizade.id_amigo,
      status: AmizadeStatus.PENDENTE,
    });

    return amizade;
  },

  async deletarAmizade(id_usuario, id_amigo) {
    const amizade = await this.buscarAmizade(id_usuario, id_amigo);

    if (!amizade) {
      throw new Error("Erro ao deletar amizade: Amizade não encontrada!");
    }

    await amizade.destroy();
    return true;
  },

  async atualizarStatusAmizade(id_usuario, id_amigo, novoStatus) {
    const amizade = await this.buscarAmizade(id_usuario, id_amigo);

    if (!amizade) {
      throw new Error("Amizade não encontrada!");
    }

    const validStatuses = Object.values(AmizadeStatus);
    if (!validStatuses.includes(novoStatus)) {
      throw new Error(
        `Status de amizade inválido! Valores permitidos: ${validStatuses.join(", ")}.`,
      );
    }

    amizade.status = novoStatus;
    await amizade.save();

    return amizade.reload();
  },

  async buscarAmizade(id_usuario, id_amigo) {
    return await Amizade.findOne({
      where: {
        id_usuario,
        id_amigo,
      },
    });
  },

  async buscarAmizadesPorUsuario(id_usuario) {
    return await Amizade.findAll({ where: { id_usuario } });
  },

  async buscarAmizadesPorAmigo(id_amigo) {
    return await Amizade.findAll({ where: { id_amigo } });
  },
};

module.exports = AmizadeService;
