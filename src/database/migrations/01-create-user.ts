import { DataTypes, Model, QueryInterface } from 'sequelize';
import { User } from '../../types/User';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<User>>('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user',
      }
    });
  },

  async down(queryInterface : QueryInterface) {
    await queryInterface.dropTable('users');
  }
};
