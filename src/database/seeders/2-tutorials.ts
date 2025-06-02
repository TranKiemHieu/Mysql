import { QueryInterface } from 'sequelize';

export default {
    up(queryInterface: QueryInterface) {
        return queryInterface.bulkInsert(
            'tutorials',
            [
                {
                    title: 'Introduction to Seed 2',
                    description: 'How to create and use Seed',
                    published: true,
                    price: 400000,
                    userid: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Introduction to TypeScript 2',
                    description: 'A beginner guide to TypeScript programming',
                    published: false,
                    price: 27000,
                    userid: 2,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ]);
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.bulkDelete('tutorials', {});
    }
};
