const { Model } = require("sequelize");
const { AmizadeStatus } = require("../utils/enums");

module.exports = (sequelize, DataTypes) => {
  class Amizade extends Model {
    static associate(models) {
      Amizade.belongsTo(models.Usuario, {
        foreignKey: "id_usuario",
        as: "usuario",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Amizade.belongsTo(models.Usuario, {
        foreignKey: "id_amigo",
        as: "amigo",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Amizade.init(
    {
      id_usuario: DataTypes.INTEGER,
      id_amigo: DataTypes.INTEGER,
      status: DataTypes.ENUM(
        AmizadeStatus.PENDENTE,
        AmizadeStatus.ACEITA,
        AmizadeStatus.RECUSADA,
      ),
    },
    {
      sequelize,
      modelName: "Amizade",
    },
  );
  return Amizade;
};
