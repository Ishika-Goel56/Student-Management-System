# 🎓 Student Management System

A full-stack **Student Management System** built using **Spring Boot, React.js, and PostgreSQL**. The application provides a simple and responsive interface to manage student records with complete CRUD (Create, Read, Update, Delete) functionality through REST APIs.

## 🚀 Live Demo

🌐 **Frontend:** https://student-management-system-lime-eta.vercel.app

⚙️ **Backend API:** https://student-management-system-ja95.onrender.com


## 📌 Features

- ➕ Add new students
- 📋 View all students
- ✏️ Update student information
- 🗑️ Delete students
- 🔍 Fetch student by ID
- 🌐 RESTful API architecture
- 📱 Responsive React UI
- ☁️ Cloud deployment with Vercel & Render
- 🗄️ PostgreSQL database hosted on Neon
- 🔒 Secure configuration using Environment Variables


## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Axios

### Backend
- Java
- Spring Boot
- Spring Data JPA (Hibernate)
- REST APIs
- Maven

### Database
- PostgreSQL (Neon)

### Deployment
- Vercel (Frontend)
- Render (Backend)

### Tools
- Git
- GitHub
- IntelliJ IDEA
- Postman


## 📂 Project Structure

```
student-management-system
│
├── src/                     # Spring Boot Backend
├── st-project-view/         # React Frontend
├── pom.xml
├── Dockerfile
├── mvnw
├── README.md
```


## 📡 REST API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /students | Get all students |
| GET | /students/{id} | Get student by ID |
| POST | /students | Add a student |
| PUT | /students/{id} | Update a student |
| DELETE | /students/{id} | Delete a student |


## ⚙️ Backend Setup

### Clone Repository

```bash
git clone https://github.com/Ishika-Goel56/Student-Management-System.git

cd Student-Management-System
```

### Configure Environment Variables

Create the following environment variables:

```properties
SPRING_DATASOURCE_URL=your_database_url

SPRING_DATASOURCE_USERNAME=your_username

SPRING_DATASOURCE_PASSWORD=your_password
```

### Run Spring Boot

```bash
./mvnw spring-boot:run
```

## 💻 Frontend Setup

```bash
cd st-project-view

npm install

npm start
```

## 🗄️ Database

This project uses **Neon PostgreSQL** as the cloud database.

Hibernate automatically creates and updates the database schema using:

```properties
spring.jpa.hibernate.ddl-auto=update
```

## 👩‍💻 Author

**Ishika Goel**

GitHub: https://github.com/Ishika-Goel56


## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

