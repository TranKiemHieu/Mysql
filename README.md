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

- Configure CORS for production.

## License
MIT License.