"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Players", {
      playerID: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      teamID: { type: Sequelize.INTEGER },
      playerImage: { type: Sequelize.STRING },
      firstName: { type: Sequelize.STRING },
      lastName: { type: Sequelize.STRING },
      jerseyNumber: { type: Sequelize.INTEGER },
      position: { type: Sequelize.STRING },
      height: { type: Sequelize.INTEGER },
      weight: { type: Sequelize.INTEGER },
      handedness: { type: Sequelize.STRING },
      class: { type: Sequelize.STRING },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Players");
  },
};
