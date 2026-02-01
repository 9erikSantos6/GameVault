const { Emprestimo } = require("../models");
const AmizadeService = require("./amizadeService");
const GameService = require("./gameService");
const { AmizadeStatus } = require("../utils/enums");

const EmprestimoService = {
  async criarEmprestimo(dadosEmprestimo) {
    const { id_mutuante, id_mutuario, id_game, data_inicio, data_fim } =
      dadosEmprestimo;

    if (!id_mutuante || !id_mutuario || !id_game || !data_inicio) {
      throw new Error("Todos os campos obrigatórios devem ser preenchidos!");
    }

    const emprestimoExiste = await Emprestimo.findOne({ where: { id_game } });
    if (emprestimoExiste) {
      throw new Error("Esse empréstimo já foi realizado!");
    }

    await this._verificarAmizade(id_mutuante, id_mutuario);

    const game = await GameService.verificarDono(id_game, id_mutuante);
    if (!game) {
      throw new Error("Esse jogo não existe na sua biblioteca!");
    }

    const emprestimo = await Emprestimo.create({
      id_mutuante,
      id_mutuario,
      id_game,
      data_inicio,
      data_fim,
    });

    return emprestimo;
  },

  async atualizarEmprestimo(id, dadosAtualizados) {
    const emprestimo = await Emprestimo.findByPk(id);
    if (!emprestimo) {
      throw new Error("Empréstimo não encontrado!");
    }

    const { id_game, id_mutuario, data_inicio, data_fim, retornou_em } =
      dadosAtualizados;

    await this._verificarAmizade(
      emprestimo.id_mutuante,
      id_mutuario || emprestimo.id_mutuario,
    );

    if (id_game) {
      const game = await GameService.verificarDono(
        id_game,
        emprestimo.id_mutuante,
      );
      if (!game) {
        throw new Error("Esse jogo não existe na sua biblioteca!");
      }
    }

    const dadosPermitidos = {
      id_game,
      id_mutuario,
      data_inicio,
      data_fim,
      retornou_em,
    };

    await emprestimo.update(dadosPermitidos);

    return emprestimo.reload();
  },

  async deletarEmprestimo(id) {
    const emprestimo = await Emprestimo.findByPk(id);
    if (!emprestimo) {
      throw new Error("Empréstimo não encontrado!");
    }

    await emprestimo.destroy();
    return true;
  },

  async buscarEmprestimoPorId(id) {
    const emprestimo = await Emprestimo.findByPk(id);
    return emprestimo || null;
  },

  async buscarEmprestimoPorMutuante(id_mutuante) {
    return await Emprestimo.findAll({ where: { id_mutuante } });
  },

  async buscarEmprestimosPorMutuario(id_mutuario) {
    return await Emprestimo.findAll({ where: { id_mutuario } });
  },

  async buscarTodosEmprestimos() {
    return await Emprestimo.findAll();
  },

  async _verificarAmizade(id_mutuante, id_mutuario) {
    const amizade = await AmizadeService.buscarAmizade(
      id_mutuante,
      id_mutuario,
    );
    if (!amizade || amizade.status !== AmizadeStatus.ACEITA) {
      throw new Error("A amizade com o mutuário não foi estabelecida!");
    }
  },
};

module.exports = EmprestimoService;
