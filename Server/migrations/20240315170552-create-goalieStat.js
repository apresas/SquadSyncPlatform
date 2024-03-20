'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("GoalieStats", {
      goalieStatsID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
      },
      gameID: { type: Sequelize.INTEGER },
      playerID: { type: Sequelize.INTEGER },
      teamID: { type: Sequelize.INTEGER },
      shotsAgainst: { type: Sequelize.INTEGER },
      goalsAgainst: { type: Sequelize.INTEGER },
      saves: { type: Sequelize.INTEGER },
      toi: { type: Sequelize.FLOAT }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('GoalieStats');
  }
};
