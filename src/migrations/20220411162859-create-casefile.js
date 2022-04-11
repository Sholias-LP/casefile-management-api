'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Casefiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      caseID: {
        type: Sequelize.STRING
      },
      caseType: {
        type: Sequelize.STRING
      },
      client: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      occupation: {
        type: Sequelize.STRING
      },
      brief: {
        type: Sequelize.STRING
      },
      letter_of_engagement: {
        type: Sequelize.STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Casefiles');
  }
};