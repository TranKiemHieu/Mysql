import { Sequelize } from "sequelize-typescript";
import config from '../database/config/database';
import { dialect } from '../database/config/database';
import Tutorial from "../database/models/tutorial.model";
import User from '../database/models/user.model';

class Database {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    this.sequelize = new Sequelize({
      database: config.database,
      username: config.username,
      password: config.password,
      host: config.host,
      dialect: dialect,
      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
      },
      models: [Tutorial, User],
      logging: console.log
    });

    //
    await this.sequelize
      .sync({ alter: true })
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the Database:", err);
      });
  }
}

export default Database;
