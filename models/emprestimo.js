const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Emprestimo extends Model {
    static associate(models) {
      Emprestimo.belongsTo(models.Game, {
        foreignKey: "id_game",
        as: "game",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Emprestimo.belongsTo(models.Usuario, {
        foreignKey: "id_mutuante",
        as: "mutuante",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Emprestimo.belongsTo(models.Usuario, {
        foreignKey: "id_mutuario",
        as: "mutuario",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Emprestimo.init(
    {
      id_game: DataTypes.INTEGER,
      id_mutuante: { type: DataTypes.INTEGER, allowNull: false },
      id_mutuario: { type: DataTypes.INTEGER, allowNull: false },
      data_inicio: { type: DataTypes.DATE, allowNull: false },
      data_fim: DataTypes.DATE,
      retornou_em: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Emprestimo",
    },
  );
  return Emprestimo;
};
