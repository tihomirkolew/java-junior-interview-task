# User Management System

A full-stack CRUD (Create, Read, Update, Delete) application for user management, built as a Junior Java/Kotlin Developer interview task. Features a **Spring Boot** REST API backend and a **React** frontend with authentication, search, pagination, and more.

## 📋 Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Security](#security)

---

## ✨ Features

### Core Functionality
- **Create User** — Add new users to the system
- **Read User** — Retrieve a single user by ID
- **Read All Users** — Retrieve all users at once
- **Search Users** — Search by first name, last name, email, or phone number with **pagination** and **sorting** by last name and date of birth
- **Update User** — Modify existing user information (auto-fills the form by ID)
- **Delete User** — Remove users from the system with a confirmation prompt

### Auth
- **Register** — Create a personal account
- **Login / Logout** — Session managed via React Context
- **Protected routes** — All user management pages require authentication
- **Guest routes** — Login and register redirect away if already logged in

### Additional Features
- **Data Validation** — Client-side (React) and server-side (Jakarta Bean Validation)
- **DTO Pattern** — Separate request, response, and edit DTOs
- **RESTful API** — Standard HTTP methods (GET, POST, PUT, DELETE)
- **HTTP Basic Auth** — Spring Security with BCrypt password hashing
- **Swagger / OpenAPI** — Interactive API documentation
- **Global Exception Handling** — Descriptive error responses for all custom exceptions
- **Duplicate detection** — Unique constraints on email and phone number with proper error messages
- **Sample data seeding** — Auto-loads users from `sample-users.json` on first startup

---

## 🛠 Technologies

**Backend**
- **Java** 21
- **Spring Boot** 3.x
- **Spring Data JPA** — Database interactions
- **Spring Security** — HTTP Basic Authentication
- **Spring Validation** — Input data validation
- **BCrypt** — Password hashing
- **Lombok** — Boilerplate reduction
- **Swagger / OpenAPI** (SpringDoc) — API documentation
- **Maven** — Build tool
- **MySQL** — Relational database

**Frontend**
- **React** (Vite)
- **React Router**
- **CSS Modules**

---

## 📦 Prerequisites

Before running this application, ensure you have the following installed:

- **JDK** 21
- **Maven** 3.6+
- **MySQL** 8.0+
- **Node.js** 18+ and **npm**
- **Git**

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/tihomirkolew/java-junior-interview-task
cd java-junior-interview-task
```

### 2. MySQL Database Setup

```sql
CREATE DATABASE java_junior_interview_task;
```

The table schema is generated automatically on startup via `spring.jpa.hibernate.ddl-auto=update`.

### 3. Configure `application.properties`

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/java_junior_interview_task
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
server.port=8086
```

### 4. Frontend Setup

The frontend expects the backend running at `http://localhost:8086`.

```bash
cd frontend   # or the directory containing package.json
npm install
```

---

## ▶️ Running the Application

### Backend

```bash
./mvnw spring-boot:run
```

Or with Maven installed globally:

```bash
mvn spring-boot:run
```

The API starts at **http://localhost:8086**.

> On first startup, if the database is empty, sample users are automatically loaded from `src/main/resources/sample-users.json`.

### Frontend

```bash
npm run dev
```

The app starts at **http://localhost:5173**.

---

## 📖 API Documentation

### Swagger UI

```
http://localhost:8086/swagger-ui.html
```

### REST API Endpoints

> All `/api/users/**` endpoints require **HTTP Basic Authentication** (email + password of a registered account).  
> `/api/auth/register` and `/api/auth/login` are public.

---

#### Auth

##### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1995-06-15",
  "phoneNumber": "+359888123456",
  "email": "john.doe@example.com",
  "password": "secret123"
}

Response: 200 OK
{ "message": "User registered successfully" }
```

##### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "secret123"
}

Response: 200 OK
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1995-06-15",
  "phoneNumber": "+359888123456",
  "email": "john.doe@example.com"
}
```

---

#### Users

##### Create User
```http
POST /api/users/create
Content-Type: application/json
Authorization: Basic <base64(email:password)>

{
  "firstName": "Jane",
  "lastName": "Smith",
  "dateOfBirth": "1990-03-22",
  "phoneNumber": "+359877654321",
  "email": "jane.smith@example.com",
  "password": "12345678"
}

Response: 201 Created
```

##### Get User by ID
```http
GET /api/users/{id}
Authorization: Basic <base64(email:password)>

Response: 200 OK
{
  "id": 2,
  "firstName": "Jane",
  "lastName": "Smith",
  "dateOfBirth": "1990-03-22",
  "phoneNumber": "+359877654321",
  "email": "jane.smith@example.com"
}
```

##### Get All Users
```http
GET /api/users
Authorization: Basic <base64(email:password)>

Response: 200 OK
[ { ... }, { ... } ]
```

##### Search Users (paginated)
```http
GET /api/users/search?term=smith&page=0&size=5
Authorization: Basic <base64(email:password)>

Response: 200 OK
{
  "content": [ { ... }, { ... } ],
  "totalPages": 3,
  "totalElements": 12,
  "number": 0,
  "size": 5
}
```

Searches across **first name**, **last name**, **email**, and **phone number** (case-insensitive).  
Results are sorted by **last name** then **date of birth** in ascending order.

##### Update User
```http
PUT /api/users/edit/{id}
Content-Type: application/json
Authorization: Basic <base64(email:password)>

{
  "firstName": "Jane",
  "lastName": "Smith",
  "dateOfBirth": "1990-03-22",
  "phoneNumber": "+359877000000",
  "email": "jane.new@example.com"
}

Response: 200 OK
```

##### Delete User
```http
DELETE /api/users/delete/{id}
Authorization: Basic <base64(email:password)>

Response: 204 No Content
```

---

### Validation Rules

| Field | Rules |
|-------|-------|
| First name | Required, 2–50 characters |
| Last name | Required, 2–50 characters |
| Date of birth | Required, must be in the past |
| Phone number | Required, 7–15 digits, optional `+` prefix, **unique** |
| Email | Required, valid format, **unique** |
| Password | Required (min. 6 characters on registration) |

### Error Response Examples

```json
{ "email": "Email already in use." }
```
```json
{ "phoneNumber": "Phone number already in use." }
```
```json
{ "id": "User with id 99 not found." }
```

---

## 📁 Project Structure

```
java-junior-interview-task/
├── src/main/java/java_junior_interview_task/
│   ├── config/
│   │   └── SecurityConfig.java           # Spring Security + CORS
│   ├── exception/
│   │   ├── GlobalExceptionHandler.java   # Centralized error handling
│   │   ├── EmailDuplicateException.java
│   │   ├── PhoneNumberDuplicateException.java
│   │   ├── NoUserFoundByIdException.java
│   │   ├── NoUserFoundByEmailException.java
│   │   └── IncorrectPasswordException.java
│   ├── security/
│   │   └── Authentication.java           # UserDetails implementation
│   └── user/
│       ├── controller/
│       │   ├── AuthController.java       # /api/auth
│       │   └── UserController.java       # /api/users
│       ├── dto/
│       │   ├── LoginRequest.java
│       │   ├── RegisterRequest.java
│       │   ├── UserRequestDto.java
│       │   ├── UserResponseDto.java
│       │   └── UserEditDto.java
│       ├── entity/
│       │   └── User.java
│       ├── init/
│       │   └── UserInit.java             # Sample data loader
│       ├── mapper/
│       │   └── UserMapper.java
│       ├── repository/
│       │   └── UserRepository.java
│       └── service/
│           ├── AuthService.java
│           └── UserService.java
└── src/main/resources/
    ├── application.properties
    └── sample-users.json                 # Seed data

frontend/src/
├── components/
│   ├── home/         Home.jsx
│   ├── login/        Login.jsx
│   ├── register/     Register.jsx
│   ├── sidebar/      SideBar.jsx
│   ├── userCard/     UserCard.jsx
│   ├── userCreate/   UserCreate.jsx
│   ├── userDetails/  UserDetails.jsx
│   ├── userEdit/     UserEdit.jsx
│   ├── userList/     UserList.jsx
│   └── userSearch/   UserSearch.jsx
├── contexts/
│   └── UserContext.jsx                   # Auth state & login handler
├── hooks/
│   └── useUserDelete.js
└── routes/
    ├── GuestRoute.jsx                    # Redirects logged-in users
    └── ProtectedRoute.jsx                # Redirects unauthenticated users
```

---

## 🔒 Security

- All `/api/users/**` endpoints are protected with **HTTP Basic Authentication**
- Passwords are hashed with **BCrypt** before storage — plain-text passwords are never saved
- CORS is configured to allow requests from `http://localhost:5173` (the React dev server)
- CSRF protection is disabled (standard for stateless REST APIs)
- `/api/auth/register` and `/api/auth/login` are publicly accessible

**Example with curl:**
```bash
curl -u john.doe@example.com:secret123 http://localhost:8086/api/users/1
```

> The API can also be explored interactively via **Swagger UI** at `http://localhost:8086/swagger-ui.html` or through the **React frontend** at `http://localhost:5173`.

---

## 👤 Author

**Tihomir Kolew**  
GitHub: [@tihomirkolew](https://github.com/tihomirkolew)
