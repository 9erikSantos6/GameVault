const { Amizade } = require("../models");
const { AmizadeStatus } = require("../utils/enums");

const AmizadeService = {
  async criarAmizade(dadosAmizade) {
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
    const amizade = await Amizade.findOne({
      where: {
        id_usuario,
        id_amigo,
      },
    });

    if (!amizade) {
      throw new Error("Erro ao deletar amizade: Amizade não encontrada!");
    }

    await amizade.destroy();
    return true;
  },

  async atualizarStatusAmizade(id_usuario, id_amigo, novoStatus) {
    const amizade = await Amizade.findOne({
      where: {
        id_usuario,
        id_amigo,
      },
    });

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

    return amizade;
  },

  async buscarAmizade(id_usuario, id_amigo) {
    const amizade = await Amizade.findOne({
      where: {
        id_usuario,
        id_amigo,
      },
    });

    if (!amizade) {
      throw new Error("Amizade não encontrada!");
    }

    return amizade;
  },
};

module.exports = AmizadeService;
