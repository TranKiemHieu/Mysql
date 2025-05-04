# Tutorial API

REST API for managing tutorials with user authentication using JWT.

## Features
- User auth (signup/signin) with JWT Bearer Token.
- CRUD tutorials (admin role required for create/update/delete).
- User-Tutorial relationship via `userid`.
- Swagger UI for API documentation.

## Tech Stack
- Node.js, Express, TypeScript
- Sequelize, MySQL
- Swagger, JWT

## Prerequisites
- **Node.js**: v18 or higher (if not using Docker).
- **MySQL**: v8.0 or higher (if not using Docker).
- **Docker**: For containerized setup.

## Installation
1. Clone: `git clone https://github.com/TranKiemHieu/Mysql.git`
2. Install: `npm install`
3. Setup `.env`:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=testdb
   JWT_SECRET=your-secret-key
   PORT=8080
   ```
4. Create DB: `CREATE DATABASE testdb;`
5. Build: `npm run build`
6. Run: `npm run start`

## Installation (With Docker)
1. Clone: `git clone https://github.com/TranKiemHieu/Mysql.git`
2. Ensure Docker and Docker Compose are installed.
3. Build and run:
   ```
   docker-compose up --build
   ```
4. Access the app:
   - API: `http://localhost:8080`
   - Swagger UI: `http://localhost:8080/api-docs`
   - MySQL: `localhost:3306` (user: root, password: 1234)

## Run with Docker
### # Run in Docker
docker-compose up
### # use -d flag to run in background
docker-compose up -d
### # Tear down
docker-compose down
### # To be able to edit files, add volume to compose file
volumes: ['.:/app']
### # To re-build
docker-compose --build

## API Docs
- Swagger UI: `http://localhost:8080/api-docs`

## API Usage
- **Signup**: `POST /api/auth/signup`
  ```json
  { "username": "admin1", "email": "admin1@example.com", "password": "P@ssw0rd!2023", "role": "admin" }
  ```
- **Signin**: `POST /api/auth/signin`
  ```json
  { "username": "admin1", "password": "P@ssw0rd!2023" }
  ```
- **Create Tutorial (Admin)**: `POST /api/tutorials`
  - Header: `Authorization: Bearer <token>`
  ```json
  { "title": "Tutorial 1", "description": "Description", "published": true }
  ```
- **Get User Tutorials**: `GET /api/tutorials/user`
  - Header: `Authorization: Bearer <token>`

## Notes

- Secure `JWT_SECRET` in `.env`.
- Configure CORS for production.

## License
MIT License.