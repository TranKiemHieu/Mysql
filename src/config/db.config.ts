export const config = {
  HOST: process.env.DB_HOST || '127.0.0.1',
  USER: process.env.DB_USER || 'root',
  PASSWORD: process.env.DB_PASSWORD || '1234',
  DB: process.env.DB_NAME || 'testdb',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

export const dialect = "mysql";
