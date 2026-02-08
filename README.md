# User Management REST API

A CRUD (Create, Read, Update, Delete) REST API application for user management, built with Spring Boot.

## 📋 Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)

## ✨ Features

### Core Functionality
- **Create User** - Add new users to the system
- **Read User** - Retrieve a single user by ID
- **Search Users** - Search users by term
- **Update User** - Modify existing user information
- **Delete User** - Remove users from the system

### Additional Features
- **Data Validation** - Bean Validation with Jakarta Validation
- **DTO Pattern** - Data Transfer Objects for clean separation
- **RESTful API** - Standard HTTP methods (GET, POST, PUT, DELETE)
- **Security** - Spring Security with HTTP Basic Authentication
- **Swagger Documentation** - OpenAPI/Swagger UI for API documentation
- **Exception Handling** - Proper error handling and responses

## 🛠 Technologies

- **Java** 21
- **Spring Boot** 4.0.2
- **Spring Data JPA** - Database interactions
- **Spring Security** - HTTP Basic Authentication
- **Spring Validation** - Input data validation
- **MySQL** - Relational database
- **Maven** - Build tool
- **Lombok** - Reduce boilerplate code
- **Swagger/OpenAPI** 2.3.0 - API documentation
- **Thymeleaf** - Template engine

## 📦 Prerequisites

Before running this application, ensure you have the following installed:

- **JDK** 21
- **Maven** 3.6+
- **MySQL** 8.0+
- **Git** (for cloning the repository)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/tihomirkolew/java-junior-interview-task
cd java-junior-interview-task
```

### 2. MySQL Database Setup

Create a MySQL database (or it will be created automatically):

```sql
CREATE DATABASE java_junior_interview_task;
```

### 3. Configure Environment Variables

Set up the following environment variables or configure them in your IDE:

```properties
DM_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
SECURITY_USERNAME=admin
SECURITY_PASSWORD=your_secure_password
```

**For Windows (Command Prompt):**
```cmd
set DM_USERNAME=root
set DB_PASSWORD=your_password
set SECURITY_USERNAME=admin
set SECURITY_PASSWORD=admin123
```

**For Windows (PowerShell):**
```powershell
$env:DM_USERNAME="root"
$env:DB_PASSWORD="your_password"
$env:SECURITY_USERNAME="admin"
$env:SECURITY_PASSWORD="admin123"
```

**For Linux/Mac:**
```bash
export DM_USERNAME=root
export DB_PASSWORD=your_password
export SECURITY_USERNAME=admin
export SECURITY_PASSWORD=admin123
```

### 4. Database Schema

The application automatically creates the following table on startup (`spring.jpa.hibernate.ddl-auto=update`):

```sql
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE
);
```

## ▶️ Running the Application

### Using Maven:

```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

### Using IDE:

1. Open the project in IntelliJ IDEA / Eclipse
2. Set environment variables for MySQL and Spring Security
3. Run the main class with `@SpringBootApplication`

The application will start on `http://localhost:8086`

## 📖 API Documentation

### Swagger UI

Once the application is running, access the interactive API documentation at:

```
http://localhost:8086/swagger-ui.html
```

**Authentication required for Swagger access:**
- Username: value of `SECURITY_USERNAME`
- Password: value of `SECURITY_PASSWORD`

### REST API Endpoints

**Important:** All `/api/**` endpoints require HTTP Basic Authentication!

#### 1. Create User
```http
POST /api/users
Content-Type: application/json
Authorization: Basic <credentials>

{
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "email": "john.doe@example.com"
}

Response: 201 Created
{
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "email": "john.doe@example.com"
}
```

#### 2. Get User by ID
```http
GET /api/users/{id}
Authorization: Basic <credentials>

Response: 200 OK
{
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "email": "john.doe@example.com"
}
```

#### 3. Search Users
```http
GET /api/users/search?term=John
Authorization: Basic <credentials>

Response: 200 OK
[
  {
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+1234567890",
    "email": "john.doe@example.com"
  },
  {
    "firstName": "Jane",
    "lastName": "Johnson",
    "phoneNumber": "+1234567891",
    "email": "jane.johnson@example.com"
  }
]
```

**Note:** Search checks all fields (firstName, lastName, email, phoneNumber) and is case-insensitive.

#### 4. Update User
```http
PUT /api/users/{id}
Content-Type: application/json
Authorization: Basic <credentials>

{
  "firstName": "John",
  "lastName": "Smith",
  "phoneNumber": "+1234567890",
  "email": "john.smith@example.com"
}

Response: 200 OK
{
  "firstName": "John",
  "lastName": "Smith",
  "phoneNumber": "+1234567890",
  "email": "john.smith@example.com"
}
```

#### 5. Delete User
```http
DELETE /api/users/{id}
Authorization: Basic <credentials>

Response: 204 No Content
```

### Validation Rules

All fields are required and have the following constraints:

- **firstName**: 2-50 characters
- **lastName**: 2-50 characters
- **phoneNumber**: 7-15 digits (may start with +)
- **email**: Valid email format

### Error Response Example

```json
{
  "timestamp": "2025-02-08T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "First name must be between 2 and 50 characters",
  "path": "/api/users"
}
```

## 📁 Project Structure

```
src/
├── main/
│   ├── java/
│   │   └── java_junior_interview_task/
│   │       ├── config/
│   │       │   └── SecurityConfig.java          # Spring Security configuration
│   │       └── user/
│   │           ├── controller/
│   │           │   └── UserController.java      # REST controller
│   │           ├── service/
│   │           │   └── UserService.java         # Business logic
│   │           ├── repository/
│   │           │   └── UserRepository.java      # Data access layer
│   │           ├── entity/
│   │           │   └── User.java                # JPA Entity
│   │           ├── dto/
│   │           │   └── UserDto.java             # Data Transfer Object
│   │           └── mapper/
│   │               └── UserMapper.java          # Entity ↔ DTO mapper
│   └── resources/
│       └── application.properties               # Application configuration
└── test/                                         # Test classes
```

## 🔒 Security

The application uses **Spring Security** with **HTTP Basic Authentication**:

- All `/api/**` endpoints require authentication
- Username and password are set via environment variables
- CSRF protection is disabled for REST API

**Example authentication with curl:**
```bash
curl -u admin:admin123 http://localhost:8086/api/users/1
```

## 🧪 Testing

You can test the API using:

1. **Swagger UI** - `http://localhost:8086/swagger-ui.html`
2. **Postman** - Import endpoints and add Basic Auth
3. **curl** - Command line tool

**Example with curl:**
```bash
# Create a user
curl -X POST http://localhost:8086/api/users \
  -u admin:admin123 \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "phoneNumber": "+1234567890",
    "email": "test@example.com"
  }'
```

## 👤 Author

**Tihomir Kolew**
- GitHub: [@tihomirkolew](https://github.com/tihomirkolew)

---

**Note:** Remember to set environment variables before running the application!
