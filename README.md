# Student Management System

A full-stack Student Management System built using **React.js, Spring Boot, and PostgreSQL**. This application allows users to manage student, teacher, and course records through a simple and responsive interface.

## Live Demo

- **Frontend:** https://student-management-system-lime-eta.vercel.app/
- **Backend:** https://student-management-system-api-mwmx.onrender.com
- **GitHub Repository:** https://github.com/Ishika-Goel56/Student-Management-System

## Features

### Student Management
- Add new students
- View all students
- Update student details
- Delete student records
- Pagination and sorting support

### Teacher Management
- Add new teachers
- View teacher records
- Update teacher details
- Delete teacher records

### Course Management
- Add new courses
- View course records
- Update course details
- Delete course records

### Backend Features
- RESTful APIs using Spring Boot
- CRUD operations for all modules
- DTO-based data handling
- Input validation using Jakarta Validation
- Global exception handling
- Custom Resource Not Found Exception
- PostgreSQL database integration

## Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, JavaScript, HTML, CSS |
| Backend | Java 17, Spring Boot |
| Database | PostgreSQL |
| API Communication | REST APIs, Axios, Fetch API |
| ORM | Spring Data JPA, Hibernate |
| Build Tool | Maven |
| Deployment | Vercel, Render |
| Database Hosting | Neon PostgreSQL |
| Version Control | Git, GitHub |

## Project Structure

```text
Student-Management-System/
│
├── src/
│   └── main/
│       ├── java/
│       │   └── com/ishika/student_management_system/
│       │       ├── controller/
│       │       ├── service/
│       │       ├── repository/
│       │       ├── entity/
│       │       ├── dto/
│       │       └── exception/
│       │
│       └── resources/
│           └── application.properties
│
├── st-project-view/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── Dockerfile
├── settings.xml
├── pom.xml
└── README.md
```

## REST API Endpoints

Base URL:

```text
https://student-management-system-api-mwmx.onrender.com
```

### Student APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/students` | Get all students |
| POST | `/students` | Add a student |
| PUT | `/students/{id}` | Update a student |
| DELETE | `/students/{id}` | Delete a student |
| GET | `/students/page` | Get paginated students |

### Teacher APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/teachers` | Get all teachers |
| POST | `/teachers` | Add a teacher |
| PUT | `/teachers/{id}` | Update a teacher |
| DELETE | `/teachers/{id}` | Delete a teacher |

### Course APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/courses` | Get all courses |
| POST | `/courses` | Add a course |
| PUT | `/courses/{id}` | Update a course |
| DELETE | `/courses/{id}` | Delete a course |

## Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Ishika-Goel56/Student-Management-System.git
```

```bash
cd Student-Management-System
```

### 2. Backend Setup

Open the project in IntelliJ IDEA.

Configure your PostgreSQL database credentials using environment variables:

```text
SPRING_DATASOURCE_URL
SPRING_DATASOURCE_USERNAME
SPRING_DATASOURCE_PASSWORD
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

Backend will run at:

```text
http://localhost:8080
```

### 3. Frontend Setup

Open a terminal and navigate to the frontend directory:

```bash
cd st-project-view
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm start
```

Frontend will run at:

```text
http://localhost:3000
```

**Note:** For local development, configure the frontend API URLs to use `http://localhost:8080` instead of the deployed backend URL.

## Deployment

The application is deployed using:

- **Frontend:** Vercel
- **Backend:** Render (Docker deployment)
- **Database:** Neon PostgreSQL

The React frontend communicates with the deployed Spring Boot backend through REST APIs. The backend connects to the Neon PostgreSQL database using environment variables.

## Learning Outcomes

Through this project, I gained practical experience in:

- Building RESTful APIs using Spring Boot.
- Developing frontend applications using React.js.
- Performing CRUD operations.
- Connecting React with Spring Boot.
- Integrating PostgreSQL using Spring Data JPA.
- Implementing validation and exception handling.
- Working with Git and GitHub.
- Deploying a full-stack application using Vercel, Render, and Neon.

## Author

**Ishika Goel**

- GitHub: https://github.com/Ishika-Goel56

---

If you find this project useful, feel free to explore the repository!

