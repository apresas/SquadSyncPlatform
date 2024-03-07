'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Teams', {
      teamID: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      schoolName: {
        type: Sequelize.STRING
      },
      mascotName: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      divisions: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.STRING
      },
      primaryColor: {
        type: Sequelize.STRING
      },
      secondaryColor: {
        type: Sequelize.STRING
      },
      abbreviation: {
        type: Sequelize.STRING
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Teams');
  }
};
