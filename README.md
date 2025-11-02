# Lynxlab - Todo App

A full-stack task management application built with Vue.js (frontend) and Node.js/Express (backend), using PostgreSQL
database and Prisma ORM.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)

## ✨ Features

- User authentication and authorization
- Task management (create, read, update, delete)
- Project organization
- Schedule management
- Role-based permissions
- Calendar view
- Real-time task tracking

## 🛠 Tech Stack

### Backend

- Node.js + Express.js
- TypeScript
- PostgreSQL (Database)
- Prisma ORM
- Docker & Docker Compose
- JWT Authentication
- Crypto-JS for encryption

### Frontend

- Vue.js 3
- TypeScript
- Vite
- TailwindCSS
- PrimeVue Components
- Axios

---

## 🚀 Backend Setup

### Prerequisites

Before running the backend, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **pnpm**
- **Docker** and **Docker Compose** (for PostgreSQL and pgAdmin)
- **Git**

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd Todo-App/Todo-App-Backend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the `Todo-App-Backend` directory by copying the example file:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# PostgreSQL Configuration
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password

# pgAdmin Configuration
PGADMIN_EMAIL=admin@admin.com
PGADMIN_PASSWORD=your_secure_password
PGADMIN_PORT=8088

# Application Configuration
API_PORT=8089
DATABASE_URL="postgresql://postgres:your_secure_password@localhost:5432/postgres?schema=public"

# JWT Configuration
TOKEN_LIFE_TIME=30  # in minutes
SECRET_KEY=your_secret_key_here

# CORS Origin (comma-separated for multiple origins)
ORIGIN=http://localhost:5173,https://pm.lynx-lab.org
```

### Step 4: Start PostgreSQL Database

Using Docker Compose, start the PostgreSQL database and pgAdmin:

```bash
docker-compose up -d
```

This will start:

- **PostgreSQL** on port `5432`
- **pgAdmin** on port `8088` (accessible at http://localhost:8088)

To check if containers are running:

```bash
docker-compose ps
```

### Step 5: Run Prisma Migrations

Generate Prisma Client and run database migrations:

```bash
# Generate Prisma Client
npx prisma generate --schema=./database/prisma/schema.prisma

# Run migrations (if you have migration files)
npx prisma migrate deploy --schema=./database/prisma/schema.prisma

# Or push the schema to the database
npx prisma db push --schema=./database/prisma/schema.prisma
```

### Step 6: (Optional) Seed the Database

If you have seed data or initial SQL scripts:

```bash
# If you have a schema SQL file
psql -h localhost -U postgres -d postgres -f ./database/schemaV1.sql
```

Or connect to the database and run scripts manually via pgAdmin at http://localhost:8088

### Step 7: Start the Development Server

```bash
npm run dev
```

The backend API will be running at:

- **API Server**: http://localhost:8089

### Step 8: Verify the Backend

Test if the backend is running by accessing:

- API endpoint: http://localhost:8089
- pgAdmin: http://localhost:8088 (login with credentials from `.env`)

---

## 🎨 Frontend Setup

### Step 1: Navigate to Frontend Directory

```bash
cd ../Todo-App-Frontend
```

### Step 2: Install Dependencies

```bash
npm install
# or
pnpm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the `Todo-App-Frontend` directory:

```env
VITE_API_URL=http://localhost:8089
```

### Step 4: Start the Development Server

```bash
npm run dev
# or
pnpm dev
```

The frontend will be running at:

- **Frontend**: http://localhost:5173

---

## 📝 Environment Variables

### Backend Environment Variables

| Variable            | Description                  | Default                 | Required |
|---------------------|------------------------------|-------------------------|----------|
| `POSTGRES_DB`       | PostgreSQL database name     | `postgres`              | ✅        |
| `POSTGRES_USER`     | PostgreSQL username          | `postgres`              | ✅        |
| `POSTGRES_PASSWORD` | PostgreSQL password          | -                       | ✅        |
| `PGADMIN_EMAIL`     | pgAdmin login email          | `admin@admin.com`       | ✅        |
| `PGADMIN_PASSWORD`  | pgAdmin login password       | -                       | ✅        |
| `PGADMIN_PORT`      | pgAdmin port                 | `8088`                  | ✅        |
| `API_PORT`          | Backend API port             | `8089`                  | ✅        |
| `DATABASE_URL`      | PostgreSQL connection string | -                       | ✅        |
| `TOKEN_LIFE_TIME`   | JWT token expiry (minutes)   | `30`                    | ✅        |
| `SECRET_KEY`        | JWT secret key               | -                       | ✅        |
| `ORIGIN`            | CORS allowed origins         | `http://localhost:5173` | ✅        |

---

## 🔌 API Documentation

### Base URL

```
http://localhost:8089
```

### Available Endpoints

#### Authentication

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout

#### Users

- `GET /user` - Get all users
- `GET /user/:id` - Get user by ID
- `PUT /user/:id` - Update user
- `DELETE /user/:id` - Delete user

#### Tasks

- `GET /tasks` - Get all tasks
- `POST /tasks` - Create new task
- `GET /tasks/:id` - Get task by ID
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

#### Projects

- `GET /projects` - Get all projects
- `POST /projects` - Create new project
- `GET /projects/:id` - Get project by ID
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

#### Schedules

- `GET /schedules` - Get all schedules
- `POST /schedules` - Create new schedule
- `GET /schedules/:id` - Get schedule by ID
- `PUT /schedules/:id` - Update schedule
- `DELETE /schedules/:id` - Delete schedule

#### Roles & Permissions

- `GET /roles` - Get all roles
- `POST /roles` - Create new role
- `GET /permissions` - Get all permissions
- `POST /permissions` - Create new permission

---

## 🐳 Docker Commands

### Start services

```bash
docker-compose up -d
```

### Stop services

```bash
docker-compose down
```

### View logs

```bash
docker-compose logs -f
```

### Rebuild containers

```bash
docker-compose up -d --build
```

### Remove all data (⚠️ Warning: This will delete all database data)

```bash
docker-compose down -v
```

---

## 🛠 Troubleshooting

### Database Connection Issues

If you can't connect to the database:

1. Check if Docker containers are running:
   ```bash
   docker-compose ps
   ```

2. Check Docker logs:
   ```bash
   docker-compose logs todo-app-db
   ```

3. Verify `DATABASE_URL` in `.env` matches your PostgreSQL configuration

### Port Conflicts

If ports 5432, 8088, or 8089 are already in use:

1. Change the ports in `.env` file
2. Restart Docker containers:
   ```bash
   docker-compose down
   docker-compose up -d
   ```

### Prisma Issues

If Prisma isn't working:

1. Regenerate Prisma Client:
   ```bash
   npx prisma generate --schema=./database/prisma/schema.prisma
   ```

2. Reset the database (⚠️ Warning: This will delete all data):
   ```bash
   npx prisma migrate reset --schema=./database/prisma/schema.prisma
   ```

---

## 📄 License

This project is licensed under the ISC License.

---

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Contact

For questions or support, please contact the project maintainer.

```

