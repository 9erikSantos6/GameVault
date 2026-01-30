/** @type {import('sequelize-cli').Migration} */
const { AmizadeStatus } = require("../utils/enums");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Amizades", {
      id_usuario: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Usuarios",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      id_amigo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Usuarios",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: AmizadeStatus.PENDENTE,
        validate: {
          isIn: [
            [
              AmizadeStatus.PENDENTE,
              AmizadeStatus.ACEITA,
              AmizadeStatus.RECUSADA,
            ],
          ],
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("Amizades");
  },
};
