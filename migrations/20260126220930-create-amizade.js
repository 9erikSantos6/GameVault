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
    await queryInterface.sequelize.query(`
      ALTER TABLE Amizades
      ADD CONSTRAINT check_amizade_status_enum
      CHECK (status IN ('${AmizadeStatus.PENDENTE}', '${AmizadeStatus.ACEITA}', '${AmizadeStatus.RECUSADA}'))
    `);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("Amizades");
  },
};
