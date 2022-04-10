'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [
      {
      firstName: 'Ilias',
      lastName: 'Kazeem',
      email: 'ilias@sholiaslp.com',
      role: 'partner',
      hash: 'someRandomeString',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Sheila',
      lastName: 'Ovweriavwose',
      email: 'sheila@sholiaslp.com',
      role: 'partner',
      hash: 'someRandomeString',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
