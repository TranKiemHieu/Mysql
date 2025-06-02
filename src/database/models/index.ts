import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import config from '../config/database';
import { dialect } from '../config/database';
import Tutorial from './tutorial.model';
import User from './user.model';

const sequelizeOptions: SequelizeOptions = {
    database: config.database,
    username: config.username,
    password: config.password,
    host: config.host,
    dialect: dialect,
    pool: config.pool,
    models: [Tutorial, User],
};

export const sequelize = new Sequelize(sequelizeOptions);
