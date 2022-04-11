'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Casefiles', [
      {
        caseID: `SHO_${uuidv4()}`,
        caseType: 'Politics',
        client: 'Dada Taiwo',
        gender: 'Male',
        occupation: 'Software Developer',
        brief: 'BRIEF: is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.',
        letter_of_engagement: 'LETTER OF ENGAGMENT: is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        caseID: `SHO_${uuidv4()}`,
        caseType: 'Land Settlement',
        client: 'Fashola Olaniyi',
        gender: 'Male',
        occupation: 'Software Developer',
        brief: 'BRIEF: is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.',
        letter_of_engagement: 'LETTER OF ENGAGMENT: is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Casefiles', null, {});

  }
};
