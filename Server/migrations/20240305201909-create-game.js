'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Games', {
      gameID: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRING
      },
      homeID: {
        type: Sequelize.INTEGER
      },
      awayID: {
        type: Sequelize.INTEGER
      },
      homeScore: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      awayScore: { 
        type: Sequelize.INTEGER, 
        allowNull: true
      },
      time: {
        type: Sequelize.STRING,
      },
      arena: {
        type: Sequelize.STRING
      },
      final: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Games');
  }
};
