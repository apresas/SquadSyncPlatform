"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("GameStats", {
      gameStatsID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
      },
      gameID: { type: Sequelize.INTEGER },
      homeShots: { type: Sequelize.INTEGER },
      awayShots: { type: Sequelize.INTEGER },
      homeFaceoff: { type: Sequelize.INTEGER },
      awayFaceoff: { type: Sequelize.INTEGER },
      homePP: { type: Sequelize.INTEGER },
      awayPP: { type: Sequelize.INTEGER },
      homePPG: { type: Sequelize.INTEGER },
      awayPPG: { type: Sequelize.INTEGER },
      homeMinors: { type: Sequelize.INTEGER },
      awayMinors: { type: Sequelize.INTEGER },
      homeMajors: { type: Sequelize.INTEGER },
      awayMajors: { type: Sequelize.INTEGER },
      homeHits: { type: Sequelize.INTEGER },
      awayHits: { type: Sequelize.INTEGER },
      homeBlocks: { type: Sequelize.INTEGER },
      awayBlocks: { type: Sequelize.INTEGER },
      homeGiveaways: { type: Sequelize.INTEGER },
      awayGiveaways: { type: Sequelize.INTEGER },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GameStats');
  },
};
