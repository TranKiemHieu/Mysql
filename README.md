Tutorial API
A Node.js-based REST API for managing tutorials with user authentication. Users can register, sign in, and manage tutorials (create, read, update, delete). Tutorials are linked to users via a userid foreign key, allowing each user to view their own tutorials.
Features

User Authentication: Register and sign in with JWT-based Bearer Token.
Tutorial Management: CRUD operations for tutorials (admin role required for create/update/delete).
User-Tutorial Relationship: Each tutorial is associated with a user via userid.
API Documentation: Interactive Swagger UI for testing endpoints.
Strong Password & Email Validation: Passwords must be at least 8 characters with uppercase, lowercase, numbers, and special characters. Emails must be valid.

Tech Stack

Node.js & Express: Backend framework.
TypeScript: For type safety and better development experience.
Sequelize: ORM for MySQL database.
MySQL: Database for storing users and tutorials.
Swagger: API documentation and testing.
JWT: For user authentication via Bearer Token.

Prerequisites

Node.js: v16 or higher.
MySQL: v5.7 or higher.
npm: Package manager for installing dependencies.

Installation

Clone the repository:
git clone <repository-url>
cd <repository-name>


Install dependencies:
npm install


Set up environment variables:

Create a .env file in the root directory.
Add the following variables:DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=testdb
JWT_SECRET=your-secret-key
PORT=8080




Set up MySQL database:

Create a database named testdb:CREATE DATABASE testdb;


Sequelize will automatically sync the database schema when the application starts.


Build the project (TypeScript to JavaScript):
npm run build


Run the application:
npm run start


The server will run at http://localhost:8080.
Swagger UI will be available at http://localhost:8080/api-docs.



API Documentation

Swagger UI: Access the interactive API documentation at:http://localhost:8080/api-docs


The Swagger UI provides a user-friendly interface to test all API endpoints, including authentication and tutorial management.

API Usage
1. Register a User

Endpoint: POST /api/auth/signup
Body:{
  "username": "admin1",
  "email": "admin1@example.com",
  "password": "P@ssw0rd!2023",
  "role": "admin"
}


Response (201):{
  "message": "User was registered successfully!"
}



2. Sign In

Endpoint: POST /api/auth/signin
Body:{
  "username": "admin1",
  "password": "P@ssw0rd!2023"
}


Response (200):{
  "id": 1,
  "username": "admin1",
  "email": "admin1@example.com",
  "role": "admin",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}


Use the accessToken for authenticated requests (Bearer Token).

3. Create a Tutorial (Admin Only)

Endpoint: POST /api/tutorials
Headers:Authorization: Bearer <accessToken>


Body:{
  "title": "Tutorial 1",
  "description": "Description",
  "published": true
}


Response (201):{
  "message": "Tutorial created successfully",
  "tutorial": {
    "id": 1,
    "title": "Tutorial 1",
    "description": "Description",
    "published": true,
    "userid": 1
  }
}



4. Get Tutorials by User

Endpoint: GET /api/tutorials/user
Headers:Authorization: Bearer <accessToken>


Response (200):{
  "message": "Tutorials retrieved successfully",
  "tutorials": [
    {
      "id": 1,
      "title": "Tutorial 1",
      "description": "Description",
      "published": true,
      "userid": 1
    }
  ]
}



5. Other Endpoints

Get All Tutorials: GET /api/tutorials
Get Published Tutorials: GET /api/tutorials/published
Get Tutorial by ID: GET /api/tutorials/:id
Update Tutorial (Admin): PUT /api/tutorials/:id
Delete Tutorial (Admin): DELETE /api/tutorials/:id
Delete All Tutorials (Admin): DELETE /api/tutorials
Refer to Swagger UI for full details.

Project Structure
├── src/
│   ├── controllers/       # Request handlers (auth, tutorial)
│   ├── middleware/        # Middleware (authJwt for JWT validation)
│   ├── models/            # Sequelize models (User, Tutorial)
│   ├── repositories/      # Data access layer (tutorial.repository)
│   ├── routes/            # API routes (auth, tutorial)
│   ├── docs/              # API documentation (swagger.yaml)
│   ├── config/            # Configuration (db.config)
│   ├── db/                # Database connection (index.ts)
│   └── server.ts          # Main application entry point
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
└── README.md              # Project documentation

Notes

Development Environment:
The project uses sequelize.sync({ force: true }) by default, which drops and recreates tables on startup. For production, use migrations to manage schema changes:npx sequelize-cli migration:generate --name add-userid-to-tutorials
npx sequelize-cli db:migrate




Security:
Store JWT_SECRET in .env and avoid hardcoding.
In production, configure CORS to allow specific origins instead of all (cors()).


Extending the Project:
Add more endpoints (e.g., user profile management).
Include more validation (e.g., tutorial title length).
Enhance Swagger documentation with more examples.



License
This project is licensed under the MIT License.
