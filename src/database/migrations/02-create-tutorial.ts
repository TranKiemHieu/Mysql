import { DataTypes, Model, QueryInterface } from 'sequelize';
import { Tutorial } from '../../types/Tutorial';

export default {
    up(queryInterface: QueryInterface) {
        return queryInterface.createTable<Model<Tutorial>>('tutorials', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            title: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            published: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            userid: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
        });
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.dropTable('tutorials');
    }
};
