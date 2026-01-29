const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notificacao extends Model {
    static associate(models) {
      Notificacao.belongsTo(models.Usuario, {
        foreignKey: "id_remetente",
        as: "remetente",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Notificacao.belongsTo(models.Usuario, {
        foreignKey: "id_destinatario",
        as: "destinatario",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Notificacao.init(
    {
      id_remetente: { type: DataTypes.INTEGER, allowNull: true },
      id_destinatario: { type: DataTypes.INTEGER, allowNull: false },
      tipo: DataTypes.STRING,
      titulo: DataTypes.STRING,
      conteudo: DataTypes.STRING,
      lida: DataTypes.BOOLEAN,
      lida_em: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Notificacao",
    },
  );
  return Notificacao;
};
