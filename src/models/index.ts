import { Sequelize } from 'sequelize-typescript';
import { config, dialect } from '../config/db.config';
import Tutorial from './tutorial.model';
import User from './user.model';

export const sequelize = new Sequelize({
  database: config.DB,
  username: config.USER,
  password: config.PASSWORD,
  host: config.HOST,
  dialect: dialect,
  pool: config.pool,
  models: [Tutorial, User], // Register models here
});