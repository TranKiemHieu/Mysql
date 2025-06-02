import { QueryInterface } from 'sequelize';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

export default {
    up(queryInterface: QueryInterface) {
        return queryInterface.bulkInsert(
            'users',
            [
                {
                    username: 'user3',
                    email: 'user3@example.com',
                    password: bcrypt.hashSync('Kiemhieu12@', SALT_ROUNDS),
                    role: 'user'
                },
                {
                    username: 'admin3',
                    email: 'admin3@example.com',
                    password: bcrypt.hashSync('Kiemhieu12@', SALT_ROUNDS),
                    role: 'admin'
                }
            ]);
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.bulkDelete('users', {});
    }
};
