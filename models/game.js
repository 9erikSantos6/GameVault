const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      Game.belongsTo(models.Usuario, {
        foreignKey: "dono_id",
        as: "dono",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Game.hasMany(models.Emprestimo, {
        foreignKey: "id_game",
        as: "emprestimos",
      });
    }
  }
  Game.init(
    {
      titulo: DataTypes.STRING,
      plataforma: DataTypes.STRING,
      id_dono: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Game",
    },
  );
  return Game;
};
