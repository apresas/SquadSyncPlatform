'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      eventID: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gameID: {
        type: Sequelize.INTEGER
      },
      scoringTeam: {
        type: Sequelize.INTEGER
      },
      goalID: {
        type: Sequelize.INTEGER
      },
      primaryAssistID: {
        type: Sequelize.INTEGER
      },
      secondaryAssistID: {
        type: Sequelize.INTEGER
      },
      homeScore: {
        type: Sequelize.INTEGER
      },
      awayScore: {
        type: Sequelize.INTEGER
      },
      gameTime: {
        type: Sequelize.FLOAT
      },
      period: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Events');
  }
};
