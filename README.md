# shreyash_todo_buddy
Node with TypeORM Todo App

TodoBuddy is a role-based collaborative Todo management system built with 
**Node.js**, **TypeScript**, **Express**, and **PostgreSQL** using **TypeORM**. 
It supports features like user invitations via email, authentication, and todo management.
---
## Tech Stack
- **Backend: Node.js, Express.js, TypeScript
- Database: PostgreSQL + TypeORM
- Auth: JWT + bcrypt
- Mailing: Nodemailer
- Validation: class-validator
- ORM: TypeORM
---
## User Roles
- Admin: Invite users via email, view all users
- User: Create, read, update, delete (CRUD) their own todos
---
## Features
- JWT Authentication
- Role-based access control
- Email invitation system (SuperAdmin → User?Admin)
- CRUD operations on todos
- Filtering, search, pagination
- Soft delete and partial updates

---
## file_folder: Project Structure
src/ 
 config/
 controllers/ 
 dtos/
 helpers/
 middleware/ 
 models/ 
 routes/ 
 services/
 app.ts
 index.ts
---
## Setup Instructions

# 1. Clone the repo
git clone https://github.com/MERN-Bootcamp-2025/shreyash_todo_buddy.git

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env

# 5. Start the server
npm start / npm run dev

postman: API Endpoints
Method	Endpoint	Role	         Description
POST	/api/login	Admin/User	Login and get JWT
POST	/api/invite	Admin	        Invite a new user via sending cradentials to email
GET	/api/users	Admin		List all users
GET	/api/todos	User/Admin	List user's todos
POST	/api/todos/:id	User/Admin	Create a todo
PUT	/api/todos/:id	User/Admin	Update todo
PATCH	/api/todos/:id	User/Admin	Partially update todo
DELETE	/api/todos/:id	User/Admin	Soft delete todo










