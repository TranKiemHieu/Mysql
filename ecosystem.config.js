module.exports = {
	apps: [
		{
			name: 'Mysql',
			script: 'npm',
			args: 'run start',
			interpreter: 'none',
			env: {
				DB_HOST: 'db',
				DB_USER: 'root',
				DB_PASSWORD: '1234',
				DB_NAME: 'testdb',
				JWT_SECRET: 'your-secret-key',
				PORT: '8080',
				NODE_VERSION: 18,
				DEFAULT_PAGE_SIZE: 5,
				BCRYPT_SALT_ROUNDS: 10
			},
		},
	],
};
