import { Options } from 'sequelize';

const config: Options & { defaultPageSize: number; pool: NonNullable<Options["pool"]> } = {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'testdb',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    defaultPageSize: parseInt(process.env.DEFAULT_PAGE_SIZE || '5'),
};

export default config;

export const dialect = "mysql";
