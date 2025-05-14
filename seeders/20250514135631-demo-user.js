'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        username: 'user',
        email: 'user@example.com',
        password: 'Kiemhieu12@',
        role: 'user'
      },
      {
        username: 'admin',
        email: 'admin@example.com',
        password: 'Kiemhieu12@',
        role: 'admin'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
