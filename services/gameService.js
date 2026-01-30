const { Game } = require("../models");

const GameService = {
  async criarGame(dadosGame) {
    const gameExistente = await this.buscarGamePorId(dadosGame.id);

    if (gameExistente) {
      throw new Error("Um game semelhante já foi cadastrado!");
    }

    const game = await Game.create({
      titulo: dadosGame.titulo,
      plataforma: dadosGame.plataforma,
      id_dono: dadosGame.id_dono,
    });

    return game;
  },

  async atualizarGame(id, dadosAtualizados) {
    const game = await Game.findByPk(id);

    if (!game) {
      throw new Error("Game não encontrado!");
    }

    const dadosPermitidos = {};

    if (dadosAtualizados.id_dono) {
      dadosPermitidos.id_dono = dadosAtualizados.id_dono;
    }

    if (dadosAtualizados.titulo) {
      dadosPermitidos.titulo = dadosAtualizados.titulo;
    }

    if (dadosAtualizados.plataforma) {
      dadosPermitidos.plataforma = dadosAtualizados.plataforma;
    }

    await game.update(dadosPermitidos);

    return game.reload();
  },

  async buscarTodosGames() {
    const games = await Game.findAll();
    return games.length > 0 ? games : [];
  },

  async buscarGamePorDono(id_dono) {
    const games = await Game.findAll({ where: { id_dono } });
    return games.length > 0 ? games : [];
  },

  async buscarGamePorId(id) {
    const game = await Game.findByPk(id);
    return game ? game : null;
  },

  async deletarGamePorId(id) {
    const game = await Game.findByPk(id);
    if (!game) {
      throw new Error("Erro ao deletar game: Game não encontrado!");
    }

    await game.destroy();
    return true;
  },
};

module.exports = GameService;
