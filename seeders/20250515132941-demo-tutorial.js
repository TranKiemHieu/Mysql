'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tutorials', [
      {
        title: 'Introduction to Seed',
        description: 'How to create and use Seed',
        published: true,
        price: 450000,
        userid: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Introduction to TypeScript',
        description: 'A beginner guide to TypeScript programming',
        published: false,
        price: 23000,
        userid: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tutorials', null, {});
  }
};
