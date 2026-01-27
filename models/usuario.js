const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.hasMany(models.Game, {
        foreignKey: "dono_id",
        as: "games",
      });

      Usuario.belongsToMany(models.Usuario, {
        through: models.Amizade,
        as: "amigos",
        foreignKey: "id_usuario",
        otherKey: "id_amigo",
      });

      Usuario.hasMany(models.Emprestimo, {
        foreignKey: "id_mutuario",
        as: "emprestimos",
      });
    }
  }
  Usuario.init(
    {
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Usuario",
    },
  );
  return Usuario;
};
