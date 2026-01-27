const { Model } = require("sequelize");
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
    },
    {
      sequelize,
      modelName: "Amizade",
    },
  );
  return Amizade;
};
